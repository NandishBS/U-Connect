import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import {verifyController} from '../controllers/user.controllers.js'

const userRouter = Router()

userRouter.route("/register").post(registerUser)
userRouter.route("/verify").post(verifyController)

export default userRouter
