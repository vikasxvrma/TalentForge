import { Router } from "express";

import  { uploadResumeController } from "../controllers/uploadResumeController.js";
import { upload } from "../middleware/upload.middleware.js";
import { searchResume } from "../controllers/searchResume.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { searchResumeSchema } from "../validation/searchResumeSchema.js";
import { uploadResumeRateLimiter } from "../middleware/rateLimiter.middleware.js";
const resumeRouter =Router();
resumeRouter.post("/upload",authMiddleware,uploadResumeRateLimiter, upload.single("resume"),uploadResumeController);
resumeRouter.get("/search",authMiddleware,validate(searchResumeSchema), searchResume);
export default resumeRouter