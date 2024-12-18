import { Router } from "express";
import { forgetPassword, getAllUsers, getUserInfo, login, logout, refreshAccessToken, register ,resetPassword ,verify} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { authenticateUser } from "../middlewares/auth.middlewares.js";

const userRouter = Router()

userRouter.route("/register").post(register)
userRouter.route("/verify").post(verify)
userRouter.route("/login").post(login)
userRouter.route("/logout").post(authenticateUser, logout)
userRouter.route("/forgetpassword").post(forgetPassword)
userRouter.route("/resetpassword").patch(resetPassword)
userRouter.route("/refreshaccesstoken").patch(refreshAccessToken);
userRouter.route("/getuserinfo").get(authenticateUser, getUserInfo)
userRouter.route("/get-all-users").get(authenticateUser, getAllUsers);

export default userRouter

