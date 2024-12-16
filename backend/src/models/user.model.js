import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    usn :{
        type : String,
        unique : true,
        required : true,
        uppercase : true,
        index : true,
        trim: true
    },
    username : {
        type : String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true,
        index:true
    },
    fullName:{
        type:String,
        uppercase : true,
        required:true,
        trim:true,
    },
    email:{
        type : String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true,
    },
    avatar: {
        type : String,
        default : '',
    },
    password: {
        type : String,
        required:true,
    },
    refreshToken: {
        type : String,
        unique:true,
        default : '',
    },
    role : {
        type : String,
        required:true,
        enum : ['student','teacher']
    },
    bio : {
        type : String,
        default : '',
    },
    github : {
        type : String,
        default : '',
    },
    linkedin : {
        type : String,
        default : '',
    },
    connections : {
        type : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }]
    }
}, {timestamps:true})

// encrypting the password using bcrypt befor inserting into pre
userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})


// adding method to check if password is correct into the userSchema
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.virtual("posts", {
    ref:'Post',
    localField:"_id",
    foreignField: "author",
  })

  userSchema.virtual("invitations", {
    ref : 'Pending',
    localField : "_id",
    foreignField: "to"
  })

  userSchema.virtual("invitationSent", {
    ref : "Pending",
    localField : '_id',
    foreignField : "from"
  })


  userSchema.set("toObject", { virtuals: true });
  userSchema.set("toJSON", { virtuals: true });

const User = mongoose.model("User",userSchema)

export default User;