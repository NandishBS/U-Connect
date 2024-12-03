import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

const userRouter = Router()

userRouter.route("/register").post(registerUser)

export default userRouter
