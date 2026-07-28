import { Router } from "express";
import { getCurrentUser, googleLogin } from "../controllers/authController.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { googleLoginSchema } from "../validation/authSchema.js";
import { authRateLimiter } from "../middleware/rateLimiter.middleware.js";
const authRouter =Router();
authRouter.post("/google",authRateLimiter, validate(googleLoginSchema), googleLogin);
authRouter.get("/me",authMiddleware,getCurrentUser)
export default authRouter