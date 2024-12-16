import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { authenticateUser } from "../middlewares/auth.middlewares.js";
import { comment, deletePost, editPost, getPosts, like, replyComment, unlike, uploadPost } from "../controllers/post.controllers.js";

const postRouter = Router();

postRouter.post("/upload-post",authenticateUser, upload.fields([
    { name: 'content', maxCount: 1 }, {name: 'coverImage' , maxCount:1}
  ]), uploadPost);
postRouter.post("/edit-post/:post_id", authenticateUser, upload.single('coverImage'), editPost );
postRouter.post("/delete-post/:post_id", authenticateUser, deletePost);
postRouter.get("/get-posts",authenticateUser, getPosts);
postRouter.post("/like",authenticateUser , like);
postRouter.post("/unlike", authenticateUser, unlike);
postRouter.post("/comment",authenticateUser, comment);
postRouter.post("/replycomment",authenticateUser, replyComment);



export default postRouter;