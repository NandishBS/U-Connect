import {asyncHandler} from "../utils/asyncHandler.utils.js"
import ApiError from '../utils/ApiError.utils.js'
import jwt from 'jsonwebtoken'
import User from "../models/user.model.js"

const verifyJWT = asyncHandler(async (req, res, next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Autherization")?.replace("Bearer ","")

        if(!token){
            throw new ApiError(400, "the unauthorized request")
        }
    
        const decodedToken =  await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken._id).select("-password -refreshToken")

        if(!user){
            throw new ApiError(400, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        console.log("ERROR :: VerifyToken :: ",error)
    }
})


export {verifyJWT}