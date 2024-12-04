import mongoose from 'mongoose'

const otpSchema = new mongoose.Schema({
    usn : {
        type: String,
        required : true,
        unique : true,
    },
    otp :{
        type: Number,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now, 
        expires: 60
    }
});

const Otp = mongoose.model("Otp", otpSchema);

export default Otp