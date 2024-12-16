import mongoose from 'mongoose'

const pendingSchema = new mongoose.Schema({
    from : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    to : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
})

const Pending = mongoose.model("Pending",pendingSchema);

export default Pending