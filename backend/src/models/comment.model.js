import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post',
        required : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    replies : {
        type : [{
            author : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User',
            },
            text : String
        }]
    },
    text : String   
}, {timestamps:true});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment