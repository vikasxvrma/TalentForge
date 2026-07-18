import {Router} from "express"
import authMiddleware from "../middleware/auth.middleware.js";
import { generatePresignedUploadUrl } from "../controllers/storageController.js";
const storagetRouter=Router();
storagetRouter.post("/storage/presigned-upload",authMiddleware,generatePresignedUploadUrl);
export default storagetRouter