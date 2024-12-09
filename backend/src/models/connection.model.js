import mongoose from 'mongoose'

const connectionSchema = new mongoose.Schema({
    connectedUsers : {
        type : [{ type : mongoose.Schema.Types.ObjectId, ref : "User" }],
        required : true,
    },
    state : {
        type : String,
        enum : ["connected","pending"],
        default : "pending"
    }
}, {timestamps:true});

const Connection = mongoose.model("Connection", connectionSchema);

export default Connection