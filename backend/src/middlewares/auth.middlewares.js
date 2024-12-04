import {asyncHandler} from "../utils/asyncHandler.utils.js"
import ApiError from '../utils/ApiError.utils.js'
import jwt from 'jsonwebtoken'
import User from "../models/user.model.js"

const authenticateUser = asyncHandler(async (req, res, next)=>{
    
})


export {verifyJWT}