import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { authenticateUser } from "../middlewares/auth.middlewares.js";
import { comment, connect, like, populate, populateLike, replyComment, uploadPost } from "../controllers/post.controllers.js";

const postRouter = Router();

postRouter.post("/upload",authenticateUser,upload.single('content'), uploadPost);
postRouter.post("/like",authenticateUser , like)
postRouter.post("/comment",authenticateUser, comment)
postRouter.post("/replycomment",authenticateUser, replyComment)
postRouter.post("/connect",authenticateUser, connect)

postRouter.post("/populate",populate);
postRouter.post("/populatelike",populateLike)


export default postRouter;