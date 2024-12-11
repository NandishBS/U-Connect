import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    type : {
        type : String,
        required:true,
        enum : ['post','project'] 
    },
    content : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    coverImage : String,
    title : String,
    sourceCode : String,
    projectLink : String,
}, {timestamps:true});

const Post = mongoose.model("Post", postSchema);

export default Post