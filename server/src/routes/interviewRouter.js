import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { speakInterviewQuestionController, speakInterviewTextController, startInterviewController, submitInterviewAnswerController } from "../controllers/interviewController.js";
import { startInterviewSchema } from "../validation/interviewSchema.js";
import { testInterviewVoiceController } from "../controllers/voiceController.js";


const interviewRouter = Router();

interviewRouter.post(
    "/",
    authMiddleware,
    validate(startInterviewSchema),
    startInterviewController,
);
interviewRouter.post(
    "/:sessionId/answer",
    authMiddleware,
    submitInterviewAnswerController,
);
interviewRouter.post(
    "/voice/test",
    authMiddleware,
    testInterviewVoiceController,
);

interviewRouter.post(
    "/:sessionId/speak",
    authMiddleware,
    speakInterviewQuestionController,
);
interviewRouter.post("/speak-text", authMiddleware,speakInterviewTextController );
export default interviewRouter;