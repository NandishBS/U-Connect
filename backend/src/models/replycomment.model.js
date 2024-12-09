import mongoose from 'mongoose'

const replycommentSchema = new mongoose.Schema({
    comment : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment',
        required : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    text : String   
}, {timestamps:true});

const Replycomment = mongoose.model("Replycomment", replycommentSchema);

export default Replycomment