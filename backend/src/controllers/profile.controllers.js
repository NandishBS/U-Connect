import Pending from '../models/pending.model.js';
import User from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.utils.js';
import { ApiResponse } from '../utils/ApiResponse.utils.js'
import {asyncHandler} from '../utils/asyncHandler.utils.js'
import { deleteOnCloudinary, uploadOnCloudinary } from '../utils/cloudinary.utils.js';

const getUserProfile = asyncHandler(async(req , res)=>{
    try {
        const usn = req.params.usn || req.user.usn;
        
        let userProfile = await User.findOne({usn},{password : 0, refreshToken:0, createdAt:0, updatedAt:0, __v:0})
        userProfile = await userProfile.populate({path:"posts",populate:[
            {path:"author", select: "usn username avatar"},
            {path:"comments", populate:[
                {path : "author", select: "usn username avatar"},
                {path : "replies.author", select: "usn username avatar"}
            ] ,select : "-createdAt -updatedAt -__v" , options:{sort : {createdAt:-1}} },
            {path:"likes", populate:{path : "author", select: "usn username avatar"} , select : "-__v"}
        ] ,select:"-updatedAt -__v -id", options:{sort:{createdAt:-1}}})   
        userProfile = await userProfile.populate({path:"connections" , select:"_id usn username avatar"})
        userProfile = await userProfile.populate({path:"invitations" , populate:{path:"from" , select:"_id usn username avatar"},select:"from -to"})
        userProfile = await userProfile.populate({path:"invitationSent" , populate:{path:"to", select:"_id usn username avatar"} , select:"to -from"})

        return res.status(200).json(new ApiResponse(200, userProfile, "user profile fetched successfully"))
    } catch (error) {
        throw new ApiError(error.status, "error in fetching userprofile :: " + error.message)
    }
})

const editProfile = asyncHandler(async (req,res)=>{
    try {
        const { profile_id } = req.params;
        const { username, bio, github, linkedin } = req.body;
        const avatar = req.file;
        const userId = await User.findById(req.user?._id, { _id: 1 });

        if (!profile_id) {
            return res.status(400).json(new ApiResponse(400, null, "profile Id is missing"));
        }


        const prevProfile = await User.findById(profile_id);

        if (! prevProfile._id.equals(userId._id)) {
            return res.status(400).json(new ApiResponse(400, null, "you cannot edit this profile"))
        }

        if (!prevProfile) {
            return res.status(409).json(new ApiResponse(409, null, "profile Id is missing"));
        }


            prevProfile.bio = bio
            if(prevProfile.username !== username){
                const isUsernameExists = await User.find({username})
                if(isUsernameExists.length > 0){
                    return res.status(409).json(new ApiResponse(409, null , "username already exisits"))
                }
                else{
                    prevProfile.username = username
                }
            }
            prevProfile.github = github
            prevProfile.linkedin = linkedin

            if (avatar) {
                const deletedResult = await deleteOnCloudinary(prevProfile.avatar)
                const newAvatar = await uploadOnCloudinary(avatar.buffer)
                if (!newAvatar) {
                    return res.status(500).json(new ApiResponse(500, null, "error in uploading data on cloudinary"))
                }
                prevProfile.avatar = newAvatar.secure_url;
            }
            const newProfile = await prevProfile.save();
            if (!newProfile) {
                return res.status(500).json(new ApiResponse(500, null, "error in editing the profile"))
            }
            return res.status(201).json(new ApiResponse(201, newProfile, "profile edited successfully"))
    } catch (error) {
        throw new ApiError(error.status, error.message)
    }
})

const sendInvitation = asyncHandler(async(req, res)=>{
    try {
        const to = req.body._id
        const from = req.user._id;

        if(!from || !to){
            return res.status(400).json(new ApiResponse(400, null , "invalid credentials"))
        }

        if(from.toString() === to.toString()){
            return res.status(400).json(new ApiResponse(400, null, "u cannot send invitation to your self"))
        }
    
        const isExist = await Pending.findOne({
            $or:[
                {from : from , to : to},
                {to : from , from : to}
            ]
        });

        const isFriend1 = await User.findOne({_id : from , connections : to});
        const isFriend2 = await User.findOne({_id : to, connections : from});
        
        if(isExist || isFriend1 || isFriend2){
            return res.status(400).json(new ApiResponse(400, null, "invitation already exists"))
        }
    
        const response = await Pending.create({from , to});
    
        return res.status(200).json(new ApiResponse(200, response, "invitation sent successfully"))
    } catch (error) {
        throw new ApiError(error.status, "error in sending invitation :: " + error.message)
    }
})

const acceptInvitation = asyncHandler(async(req, res)=>{
    try {
        const invitationSender = req.body._id
        const invitationAccepter = req.user._id;
    
        const reponse = await Pending.findOneAndDelete({from : invitationSender , to : invitationAccepter})
        if(!reponse){
            return res.status(400).json(new ApiResponse(400, null , "couldn't find invitation"))
        }
    
        const Friend1 = await User.findById(invitationSender);
        const Friend2 = await User.findById(invitationAccepter);
    
        Friend1.connections.push(invitationAccepter)
        Friend2.connections.push(invitationSender)
    
        await Friend1.save();
        await Friend2.save();
    
        return res.status(200).json(new ApiResponse(200, null , "added friends successfully"))
    } catch (error) {
        throw new ApiError(error.status, "error in accept invitation :: " + error.message)
    }
})

const deleteInvitation = asyncHandler(async (req, res)=>{
    try {
        const invitationSender = req.body._id
        const invitationAccepter = req.user._id;
    
        const reponse = await Pending.findOneAndDelete({$or:[
            {from : invitationSender , to : invitationAccepter},
            {from : invitationAccepter , to : invitationSender}
        ]})
    
        if(!reponse){
            return res.status(400).json(new ApiResponse(400, null , "couldn't find invitation"))
        }
        
        return res.status(200).json(new ApiResponse(200, null , "removed invitation successfully"))
    } catch (error) {
        throw new ApiError(error.status, "error delete invitation :: " + error.message)
    }
})

const checkFriendStatus = asyncHandler(async (req,res)=>{
    try {
        const user_id = req.user._id;
        const otherUser_id = req.body._id;
    
        const areFriends = await User.findOne({_id : user_id , connections : otherUser_id});
        if(areFriends){
            return res.status(200).json(new ApiResponse(200, {status : "connected"} , "both are connected"))
        }
    
        const isInvitationSent = await Pending.findOne({from : user_id, to: otherUser_id})
        if(isInvitationSent){
            return res.status(200).json(new ApiResponse(200, {status : "sent"} , "user has sent invitation"))
        }
    
        const isInvitationRecieved = await Pending.findOne({from : otherUser_id, to : user_id})
        if(isInvitationRecieved){
            return res.status(200).json(new ApiResponse(200, {status : "recieved"} , "user has recieved invitation"))
        }
    
        return res.status(200).json(new ApiResponse(200, {status : "disconnected"} , "both are not friends"))
    } catch (error) {
        throw new ApiError(error.status, "error in checking status :: " + error.message)
    }

})

const disconnect = asyncHandler(async (req,res)=>{
    try {
        const user_id = req.user._id;
        const otherUser_id = req.body._id;
    
        const user = await User.findById(user_id);
        const otherUser = await User.findById(otherUser_id);

        user.connections = user.connections.filter(connection => connection.toString() !== otherUser_id.toString())
        otherUser.connections = otherUser.connections.filter(connection => connection.toString() !== user_id.toString())
    
        await user.save()
        await otherUser.save()
    
        return res.status(200).json(new ApiResponse(200, null , "disconnected successfully"))
    } catch (error) {
        throw new ApiError(error.status, "error in disconnecting :: " + error.message)
    }
})

export {getUserProfile, editProfile , sendInvitation , acceptInvitation , deleteInvitation, checkFriendStatus , disconnect}