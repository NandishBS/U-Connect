import {asyncHandler} from "../utils/asyncHandler.utils.js"
import User from "../models/user.model.js"
import {decodeAccessToken} from '../utils/tokenHandler.utils.js'
import { ApiResponse } from '../utils/ApiResponse.utils.js'

const authenticateUser = asyncHandler(async (req, res, next)=>{
try {
        const accessToken = req.cookies?.accessToken;

        if(!accessToken){
            return res.status(401).json(new ApiResponse(401, null, "Missing Credentials"));
        }

        const decoded = await decodeAccessToken(accessToken);
        const isauthorized = await User.findById(decoded._id); 
        if(isauthorized){
            req.user = {_id : decoded._id, usn : isauthorized.usn}
            next()
        }else{
            return res.status(401).json(new ApiResponse(401, true, "accessToken expired"));
        }

} catch (error) {
    console.log(error)
    return res.status(401).json(new ApiResponse(401, true, "accessToken expired"));
}
})


export {authenticateUser}