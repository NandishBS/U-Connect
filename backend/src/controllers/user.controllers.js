import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { fetchStudentsDataFromCollege, fetchTeachersDataFromCollege, } from "../db/college.db.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { sendOtpTo } from "../utils/otp.utils.js";
import Otp from "../models/otp.model.js";
import User from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken, decodeRefreshToken, decodeAccessToken } from '../utils/tokenHandler.utils.js'
import { cookieOptions } from '../constants.js';
import jwt from 'jsonwebtoken'

const verify = asyncHandler(async (req, res) => {
    try {
        const { usn, password, username, role } = req.body;
        if (!(usn && password && username && role)) {
            return res
                .status(400)
                .json(
                    new ApiResponse(
                        400,
                        null,
                        "all the fields are necessary"
                    )
                );
        }

        const isUserExists = await User.findOne({ usn });

        if (isUserExists) {
            return res
                .status(409)
                .json(new ApiResponse(409, null, "user already exists"));
        }

        const isUsernameExists = await User.findOne({ username });

        if (isUsernameExists) {
            return res
                .status(409)
                .json(new ApiResponse(409, null, "this username already exists"));
        }

        const user =
            role === "student"
                ? await fetchStudentsDataFromCollege(usn)
                : await fetchTeachersDataFromCollege(usn);

        if (!user) {
            return res
                .status(404)
                .json(
                    new ApiResponse(
                        404,
                        null,
                        `${role} not found in college data base`
                    )
                );
        }

        const otpExists = await Otp.findOne({ usn });

        if (otpExists) {
            return res
                .status(400)
                .json(
                    new ApiResponse(
                        400,
                        null,
                        "wait 2 minutes for new otp"
                    )
                );
        }

        const otp = await sendOtpTo(user.email);

        if (!otp) {
            return res.status(500).json(new ApiResponse(500, null, "couldn't send OTP"));
        }

        await Otp.create({ usn, otp });

        return res.status(200).json(new ApiResponse(200, null, "OTP sent to your mail"));
    } catch (error) {
        throw new ApiError(error.status, error.message);
    }
});

const register = asyncHandler(async (req, res) => {
    try {
        const { usn, username, password, otp, role } = req.body;
        if (!(usn && username && password && otp && role)) {
            return res
                .status(400)
                .json(
                    new ApiResponse(
                        400,
                        null,
                        "all the fields are necessary"
                    )
                );
        }

        const otpData = await Otp.findOne({ usn, otp });

        if (!otpData) {
            return res
                .status(404)
                .json(new ApiResponse(404, null, "wrong otp"));
        }

        const preUser =
            role === "student"
                ? await fetchStudentsDataFromCollege(usn)
                : await fetchTeachersDataFromCollege(usn);

        const user = await User.create({
            usn: preUser.usn,
            username,
            fullName: preUser.fullName,
            email: preUser.email,
            password,
            role,
        });

        if (!user) {
            return res
                .status(500)
                .json(
                    new ApiResponse(
                        500,
                        null,
                        "problem in registering the user"
                    )
                );
        }

        return res
            .status(201)
            .json(new ApiResponse(201, null, "User registered Successfully"));
    } catch (error) {
        throw new ApiError(error.status, error.message);
    }
});

const login = asyncHandler(async (req, res) => {
    try {
        const { usn, password } = req.body;

        if (!usn || !password) {
            return res.status(400).json(new ApiResponse(400, null, "all the fields are necessary"));
        }

        const user = await User.findOne({ usn });

        if (!user) {
            return res.status(404).json(new ApiResponse(404, null, "user doesen't exist"));
        }

        if (!(await user.isPasswordCorrect(password))) {
            return res.status(404).json(new ApiResponse(404, null, "usn or password is wrong"));
        }

        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);
        user.refreshToken = refreshToken;
        const loginedUser = await user.save();
        if (loginedUser.refreshToken === refreshToken) {
            return res
                .status(201)
                .cookie("accessToken", accessToken, cookieOptions)
                .cookie("refreshToken", refreshToken, cookieOptions)
                .json(new ApiResponse(201, null, "User logged in Successfully"));
        } else {
            return res.status(500).json(new ApiResponse(201, null, "failed to generate refresh token"))
        }
    } catch (error) {
        throw new ApiError(error.status, error.message)
    }
});

const logout = asyncHandler(async (req, res) => {
    // try {
    //     const { usn } = req.user;
        
    //     if (!usn) {
    //         return res.status(400).json(new ApiResponse(400, null, "Missing Credentials : USN "));
    //     }
        return res.status(201)
            .clearCookie("accessToken",cookieOptions)
            .clearCookie("refreshToken",cookieOptions)
            .json(new ApiResponse(201, null, "logout successfull"))
    // } catch (error) {
    //     throw new ApiError(error.status, error.message)
    // }
})

const forgetPassword = asyncHandler(async (req, res) => {
    try {
        const { usn } = req.body;

        if (!usn) {
            return res.status(400).json(new ApiResponse(400, null, "fill all the fields"));
        }

        const user = await User.findOne({ usn })

        if (!user) {
            return res.status(400).json(new ApiResponse(400, null, "USN may be wrong"));
        }

        const otpExists = await Otp.findOne({ usn });

        if (otpExists) {
            return res.status(400).json(new ApiResponse(400, null, "wait 2 minutes for new otp"));
        }

        const otp = await sendOtpTo(user.email);

        if (!otp) {
            return res.status(500).json(new ApiResponse(500, null, "Couldn't send OTP"));
        }

        await Otp.create({ usn, otp });

        return res.status(200).json(new ApiResponse(200, null, "OTP sent to your mail"));
    } catch (error) {
        throw new ApiError(error.status, error.message)
    }

})

const resetPassword = asyncHandler(async (req, res) => {
    try {
        const { usn, otp, newPassword } = req.body;
        if (!(usn && otp && newPassword)) {
            return res.status(400).json(new ApiResponse(400, null, "Missing Credentials : USN , otp or newPassword is missing"));
        }

        const otpData = await Otp.findOne({ usn, otp });

        if (!otpData) { return res.status(404).json(new ApiResponse(404, null, "wrong otp")); }

        const user = await User.findOne({ usn });

        console.log(user.password)

        user.password = newPassword;
        await user.save();

        return res.status(201)
            .json(new ApiResponse(201, null, "password changed successfully"))
    } catch (error) {
        throw new ApiError(error.status, error.message)
    }
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const oldRefreshToken = req.cookies?.refreshToken;
    
        if (!oldRefreshToken) {
            return res.status(403).json(new ApiResponse(403, null, "missing refresh token"));
        }
    
        const decodedInfo = await decodeRefreshToken(oldRefreshToken);
    
        const user = await User.findById(decodedInfo._id, { refreshToken: 1 });
    
        if (!user) {
            return res.status(403).json(new ApiResponse(403, null, "missing refresh token"));
        }
    
        if (user.refreshToken !== oldRefreshToken) {
            return res.status(403).json(new ApiResponse(403, null, "redirect to login"));
        }
    
        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);
    
        user.refreshToken = refreshToken;
        const loginedUser = await user.save();
        if (loginedUser.refreshToken === refreshToken) {
            return res
                .status(201)
                .cookie("accessToken", accessToken, cookieOptions)
                .cookie("refreshToken", refreshToken, cookieOptions)
                .json(new ApiResponse(201, null, "access token refreshed successfully"));
        } else {
            return res.status(403).json(new ApiResponse(403, null, "failed to generate refresh token"))
        }
    } catch (error) {
        throw new ApiError(403, error.message)
    }
})

const getUserInfo = asyncHandler(async (req,res)=>{
    const userInfo = await User.findById(req.user._id, {usn : 1, username : 1, role : 1,avatar : 1,});
    
    if(!userInfo){
        return res.status(404).json(new ApiResponse(404, null, "user not found"));
    }
    
    return res.status(200).json(new ApiResponse(200, userInfo , "userinfo fetched successfully"));
})

const getAllUsers = asyncHandler(async (req,res)=>{
    const users = await User.find({}, {usn:1, username:1, avatar:1 , fullName:1})
    return res.status(200).json(new ApiResponse(200, users, "all users fetched successfully"))
})

export { register, verify, login, logout, forgetPassword, resetPassword, refreshAccessToken ,getAllUsers, getUserInfo};
