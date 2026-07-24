import { Router } from "express";

import  { uploadResumeController } from "../controllers/uploadResumeController.js";
import { upload } from "../middleware/upload.middleware.js";
import { searchResume } from "../controllers/searchResume.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { searchResumeSchema } from "../validation/searchResumeSchema.js";
import { uploadResumeRateLimiter } from "../middleware/rateLimiter.middleware.js";
import {  uploadResumeSchema } from "../validation/uploadResumeSchema.js";
import { getLatestResumeStatus } from "../controllers/handleResumeController.js";
const resumeRouter =Router();
resumeRouter.post("/process",authMiddleware,uploadResumeRateLimiter,validate(uploadResumeSchema), uploadResumeController);
resumeRouter.get("/search",authMiddleware,validate(searchResumeSchema), searchResume);
resumeRouter.get("/latest",authMiddleware, getLatestResumeStatus);
export default resumeRouter