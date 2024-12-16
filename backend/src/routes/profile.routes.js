import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { authenticateUser } from "../middlewares/auth.middlewares.js";
import { acceptInvitation, checkFriendStatus, deleteInvitation, disconnect, getUserProfile, sendInvitation } from "../controllers/profile.controllers.js";


const profileRouter = Router();

profileRouter.get("/get-profile/:usn", authenticateUser, getUserProfile);
profileRouter.post("/send-invitation", authenticateUser, sendInvitation);
profileRouter.post('/accept-invitation', authenticateUser, acceptInvitation);
profileRouter.post('/delete-invitation', authenticateUser, deleteInvitation);
profileRouter.post('/check-friend-status', authenticateUser, checkFriendStatus);
profileRouter.post('/disconnect',authenticateUser , disconnect);

export default profileRouter;