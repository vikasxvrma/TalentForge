import {Router} from "express"
import authMiddleware from "../middleware/auth.middleware.js";
import { generatePresignedUploadUrl } from "../controllers/storageController.js";
const storageRouter=Router();
storageRouter.post("/presigned-upload",authMiddleware,generatePresignedUploadUrl);
export default storageRouter