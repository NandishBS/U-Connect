import {asyncHandler} from "../utils/asyncHandler.utils.js"
import User from "../models/user.model.js"
import {decodeAccessToken} from '../utils/tokenHandler.utils.js'
import { ApiResponse} from '../utils/ApiResponse.utils.js'
import { ApiError } from "../utils/ApiError.utils.js"

const authenticateUser = asyncHandler(async (req, res, next)=>{
    try {
        if(!req.cookies?.accessToken){
            return res.status(401).json(new ApiResponse(401, null, "Missing Credentials"));
        }
        const decoded = await decodeAccessToken(req.cookies.accessToken)
        const user = await User.findById(decoded._id,{usn:1}) 
         req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, "authenticate user catch block" + error.message)
    }
})


export {authenticateUser}