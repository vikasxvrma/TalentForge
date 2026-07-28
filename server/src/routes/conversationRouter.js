import {Router} from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getConversationMessagesController, getConversationsController } from "../controllers/conversationController.js";
const conversationRouter = Router();

conversationRouter.get("/",authMiddleware,getConversationsController);
conversationRouter.get("/:conversationId/messages",authMiddleware,getConversationMessagesController);
export default conversationRouter