import Comment from "../models/comment.model.js";
import Connection from "../models/connection.model.js";
import Like from "../models/like.model.js";
import Post from "../models/post.model.js";
import Replycomment from "../models/replycomment.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";

const uploadPost = asyncHandler(async (req,res)=>{
    try {
        if(!req.user._id){
            return res.status(400).json(new ApiResponse(400, null, "Missing Credentials : user id is missing newPassword is missing"));
        }
        
        const author = req.user._id;
        const {type, description} = req.body;
        const content = req.file
        
        if(!(author && type && description && content)){
            return res.status(400).json(new ApiResponse(400, null, "Missing Credentials : author, posttype, description or content is missing"));
        }
        
        const uploadedFile = await uploadOnCloudinary(content.path)
    
        if(!uploadedFile){
            return res.status(409).json(new ApiResponse(409, null, "Missing Credentials : author, posttype, description or content is missing"));
        }
        
        const post = await Post.create({
            author, type, description, content : uploadedFile.secure_url
        })
        
        return res.status(201).json(new ApiResponse(201, post, "post uploaded successfully"))
    } catch (error) {
        throw ApiError(error.status, "error in upload post"+error.message)
    }
})

const updatePost = asyncHandler(async (req,res)=>{

})

const deletePost = asyncHandler(async (req, res)=>{

})

const connect = asyncHandler(async (req,res)=>{
    const connectfrom = req.user._id;
    const connectwith = req.body._id;

    const response = await Connection.create({
        connectedUsers : [connectfrom, connectwith]
    })
    return res.status(201).json(new ApiResponse(201,{connectfrom, connectwith},"request sent successfully"))
})

const like = asyncHandler(async (req,res)=>{
    const author = req.user._id;
    const post = req.body.postId;
    console.log(req.body.postId)
    const response = await Like.create({author, post});
    return res.status(201).json(new ApiResponse(201,{author, post},"liked message successfully"))
})

const comment = asyncHandler(async (req,res)=>{
    const author = req.user._id;
    const post = req.body.postId;
    const text = req.body.text;
    const response = await Comment.create({post, author, text})
    return res.status(201).json(new ApiResponse(201,response, "comment added successfully"))
})

const replyComment = asyncHandler(async (req,res)=>{
    const author = req.user._id;
    const comment = req.body.commentId;
    const text = req.body.text;
    const response = await Replycomment.create({comment, author, text})
    return res.status(201).json(new ApiResponse(201,response, "reply added comment added successfully"))
})




const populateLike = async(req, res)=>{
    const connectfrom = "67557beefa233f31a561a7e9";
    const users = await User.find({},{_id:1})
    
    users.map((user,id)=>{
        if(id%3===0){
            Connection.create({
                connectedUsers : [connectfrom, user._id]
            })
        }
    })
}

const populate = async (req, res)=>{
    const users = await User.find({},{_id:1})
    users.map((user,id)=>{
        const post =  Post.create({
            author : user._id , type : 'public' , description : `discription text ${id}`, content : 'https://res.cloudinary.com/dd2qbbabx/image/upload/v1733675043/qa19cne5zbf6s5vz6rgd.jpg'
        })
    })

    console.log(users)
    res.json(users)
}

export {uploadPost ,like, comment, replyComment,connect, populate, populateLike}