import mongoose from "mongoose";
import Comment from "./comment.model.js";
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

postSchema.pre("findOneAndDelete", async function (next) {
    const postId = this.getQuery()._id;
    await Comment.deleteMany({ post: postId });
    next();
  });

postSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "post",
  });

  postSchema.virtual("likes", {
    ref:'Like',
    localField:"_id",
    foreignField: "post",
  })

  postSchema.set("toObject", { virtuals: true });
  postSchema.set("toJSON", { virtuals: true });

const Post = mongoose.model("Post", postSchema);

export default Post