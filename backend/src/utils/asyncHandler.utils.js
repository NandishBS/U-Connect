import { ApiResponse } from "./ApiRespnse.utils.js";

const asyncHandler = (func)=>{
    return async (req, res, next) => {
        try {
           return await func(req,res,next);
        } catch (error) {
            res.status(error.code || 500).json(new ApiResponse(error.code || 500, null, "error during async handler"))
        }
    }
}

export {asyncHandler}