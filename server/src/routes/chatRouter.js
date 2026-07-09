// this route is for chat functionalities or our app 
import { Router } from "express";
import chatController from "../controllers/chatController.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { chatSchema } from "../validation/chatSchema.js";
import { chatRateLimiter } from "../middleware/rateLimiter.middleware.js";
const chatRouter =Router();
chatRouter.post("/",authMiddleware,chatRateLimiter, validate(chatSchema), chatController);
export default chatRouter