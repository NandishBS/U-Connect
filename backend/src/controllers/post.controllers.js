import Comment from "../models/comment.model.js";
import Like from "../models/like.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.utils.js";


const uploadPost = asyncHandler(async (req, res) => {
    try {
        if (!req.user._id) {
            return res.status(400).json(new ApiResponse(400, null, "Missing Credentials : user id is missing "));
        }

        const author = req.user._id;
        const { type, description } = req.body;
        let content, coverImage;

        console.log("this is req.files ", req.files)

        if (req.files?.content) {
            content = req.files.content[0]
        }

        if (req.files?.coverImage) {
            coverImage = req.files.coverImage[0]
        }


        if (!(author && type && description && content)) {
            return res.status(400).json(new ApiResponse(400, null, "Missing Credentials : author, posttype, description or content is missing"));
        }

        const contentFile = await uploadOnCloudinary(content.buffer)
        console.log(contentFile)
        if (!contentFile) {
            return res.status(500).json(new ApiResponse(500, null, "error while uploading"));
        }
        if (type === 'post') {
            const post = await Post.create({
                author, type, description, content: contentFile.secure_url
            })
            return res.status(201).json(new ApiResponse(201, post, "post uploaded successfully"))
        }

        if (type === 'project') {
            let coverImageFile;
            if (coverImage) {
                coverImageFile = await uploadOnCloudinary(coverImage.buffer)
                if (!coverImageFile) {
                    return res.status(500).json(new ApiResponse(500, null, "error while uploading"));
                }
            }
            const { title, sourceCode, projectLink } = req.body;

            const post = await Post.create({
                author, type, description, content: contentFile.secure_url, title, sourceCode, projectLink, coverImage: coverImageFile?.secure_url
            })

            if (post) {
                return res.status(201).json(new ApiResponse(201, post, "project uploaded successfully"))
            }
        }

        return res.status(409).json(new ApiResponse(409, null, "type should be post or project type"))

    } catch (error) {
        throw new ApiError(error.status, "error in uploading post " + error.message)
    }
})

const editPost = asyncHandler(async (req, res) => {
    try {
        const { post_id } = req.params;
        const { description, title, sourceCode, projectLink } = req.body;
        const coverImage = req.file;
        const userId = await User.findById(req.user?._id, { _id: 1 });

        if (!post_id) {
            return res.status(400).json(new ApiResponse(400, null, "post Id is missing"));
        }

        const prevPost = await Post.findById(post_id);

        if (!prevPost.author.equals(userId._id)) {
            return res.status(400).json(new ApiResponse(400, null, "you cannot edit this post"))
        }

        if (!prevPost) {
            return res.status(409).json(new ApiResponse(409, null, "post Id is missing"));
        }

        if (prevPost.type === "post") {
            prevPost.description = description;
            console.log(prevPost.description)
            const response = await prevPost.save();
            console.log(response)
            return res.status(201).json(new ApiResponse(201, response, "Post Edited successfully"));
        }

        if (prevPost.type === "project") {
            prevPost.description = description;
            prevPost.title = title;
            prevPost.sourceCode = sourceCode;
            prevPost.projectLink = projectLink;

            if (coverImage) {
                const deletedResult = await deleteOnCloudinary(prevPost.coverImage)
                const newCoverImage = await uploadOnCloudinary(coverImage.buffer)
                if (!newCoverImage) {
                    return res.status(500).json(new ApiResponse(500, null, "error in uploading data on cloudinary"))
                }
                prevPost.coverImage = newCoverImage.secure_url;
            }
            const newPost = await prevPost.save();
            if (!newPost) {
                return res.status(500).json(new ApiResponse(500, null, "error in editing the post"))
            }
            return res.status(201).json(new ApiResponse(201, newPost, "file edited successfully"))
        }
    } catch (error) {
        throw new ApiError(error.status, "error in editing the post :: " + error.message)
    }
})

const deletePost = asyncHandler(async (req, res) => {
    try {
        const { post_id } = req.params;
        const userId = await User.findById(req.user?._id, { _id: 1 });
    
        if (!post_id) {
            return res.status(400).json(new ApiResponse(400, null, "post Id is missing"));
        }
    
        const prevPost = await Post.findById(post_id);
        
        if (!prevPost) {
            return res.status(409).json(new ApiResponse(409, null, "post Id is missing"));
        }
        if (!prevPost.author.equals(userId._id)) {
            return res.status(400).json(new ApiResponse(400, null, "you cannot delete this post"))
        }
    
        if(prevPost.coverImage){
            const deletedCoverImage = await deleteOnCloudinary(prevPost.coverImage)
        }
        if(prevPost.content){
            const deletedResult = await deleteOnCloudinary(prevPost.content)
        }
    
        const commentsDelete = await Comment.deleteMany({post: prevPost._id})
        const response = await Post.findByIdAndDelete(post_id)
    
        if(!response){
            return res.status(409).json(new ApiResponse(409, null, "error while deleting post"));
        }
    
        return res.status(201).json(new ApiResponse(201, response, "file deleted successfully"))
    } catch (error) {
        throw new ApiError(error.status, "error in deleting the post :: " + error.message)
    }
})

const getPosts = asyncHandler(async (req, res)=>{
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 20
        const skip = (page - 1) * limit;

        const posts = await Post.find().select("-updatedAt -__v -id")
        
        .populate({path:"author", select: "usn username avatar"})
        
        .populate({path:"comments", populate:[
            {path : "author", select: "usn username avatar"},
            {path : "replies.author", select: "usn username avatar"}
        ] ,select : "-createdAt -updatedAt -__v" , options:{sort : {createdAt:-1}} })   
    
        .populate({path:"likes", populate:{path : "author", select: "usn username avatar"} , select : "-__v"})
    
        .skip(skip).limit(limit)
        
        .sort({createdAt : -1})
        
        return res.status(201).json(new ApiResponse(201, posts , "posts fetched successfully"))
    } catch (error) {
        throw new ApiError(error.status, "error in fetching the post :: " + error.message)
    }
})

const like = asyncHandler(async (req, res) => {
    try {
        const author = req.user._id;
        const post = req.body.postId;
    
        if(!author || !post){
            return res.status(400).json(new ApiResponse(400, null, "author_id or post_id is missing"))
        }
    
        const response = await Like.create({ author, post });
        return res.status(201).json(new ApiResponse(201, response, "liked message successfully"))
    } catch (error) {
        throw new ApiError(error.status, "error in adding like :: " + error.message)
    }
})

const unlike = asyncHandler(async (req,res)=>{
    try {
        const author = req.user._id;
        const {postId} = req.body;
    
        const like = await Like.findOne({author, post : postId});
        if(!like){
            return res.status(400).json(new ApiResponse(400, null, "couldn't find the like"))
        }

        if(!like.author.equals(req.user._id)){
            return res.status(400).json(new ApiResponse(400, null, "you cannot dislike this post"))
        }
    
        const response = await Like.findByIdAndDelete(like._id);
        return res.status(201).json(new ApiResponse(201, null, "unlike successfully"))
    } catch (error) {
        throw new ApiError(error.status, "error in unlike :: " + error.message)
    }
})

const comment = asyncHandler(async (req, res) => {
    try {
        const post = req.body.postId;
        const author = req.user._id;
        const text = req.body.text;
    
        if(!author || !post || !text){
            return res.status(400).json(new ApiResponse(400, null, "author_id or post_id or text is missing"))
        }
        const response = await Comment.create({ post, author, text })
        return res.status(201).json(new ApiResponse(201, response, "comment added successfully"))
    } catch (error) {
        throw new ApiError(error.status, "error in commenting the post :: " + error.message)
    }
})

const replyComment = asyncHandler(async (req, res) => {
    try {
        const author = req.user._id;
        const comment_id = req.body.commentId;
        const text = req.body.text;
    
        if(!(author && comment_id && text)){
            return res.status(400).json(new ApiResponse(400, null, "author or comment-id or text is missing"))
        }
        
        let comment = await Comment.findById(comment_id);
        if(!comment){
            return res.status(409).json(new ApiResponse(409, null, "couldn't find the comment"))
        }

        comment.replies = [...comment.replies, {author, text}]
        const response = await comment.save();
        return res.status(201).json(new ApiResponse(201, response, "reply added comment added successfully"))
    } catch (error) {
        throw new ApiError(error.status, "error in adding reply to the comment :: " + error.message)
    }
})


export { uploadPost, editPost, deletePost, getPosts, like, unlike, comment, replyComment }