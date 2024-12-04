import { asyncHandler } from "../utils/asyncHandler.utils.js";
import {
    fetchStudentsDataFromCollege,
    fetchTeachersDataFromCollege,
} from "../db/college.db.js";
import { ApiResponse } from "../utils/ApiRespnse.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { sendOtpTo } from "../utils/otp.utils.js";
import Otp from "../models/otp.model.js";
import User from "../models/user.model.js";

const verifyController = asyncHandler(async (req, res) => {
    try {
        const { usn, password, username, role } = req.body;
        if (!(usn && password && username && role)) {
            return res
                .status(400)
                .json(
                    new ApiResponse(
                        400,
                        null,
                        "Missing Credentials : USN , Username, password or role  missing"
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
                .json(new ApiResponse(409, null, "username already exists"));
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
                        "wait for 2 minute to get new otp"
                    )
                );
        }

        const otp = await sendOtpTo(user.email);

        if (!otp) {
            return res.status(500).json(new ApiResponse(500, null, "we didn't able to send otp your email"));
        }

        await Otp.create({ usn, otp });

        return res.status(200).json(new ApiResponse(200, null, "otp is sent to your email successfully"));
    } catch (error) {
        throw new ApiError(error.status, "error in otp generation");
    }
});

const registerUser = asyncHandler(async (req, res) => {
    try {
        const { usn, username, password, otp, role } = req.body;
        if (!(usn && username && password && otp && role)) {
            return res
                .status(400)
                .json(
                    new ApiResponse(
                        400,
                        null,
                        "Missing Credentials : USN, username, password , role or OTP is missing"
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
        throw new ApiError(error.status, "user already exists");
    }
});

const login = asyncHandler(async (req, res) => {
    const { usn, password } = req.body;
    
    if (!usn || !password) {
        return res.status(400).json(new ApiResponse(400, null, "Missing Credentials : USN , Username, password or role  missing"));
    }

    const user = await User.findOne({usn});

});

export { registerUser, verifyController };
