import { retrieveDocumentService } from "../document/retrievalTextService.js";
import { resumeQaService } from "./resumeQaService.js";
import { detectIntent } from "./intentDetectionService.js";
import generateResponse from "./generateResponseService.js";
import logger from "../../config/logger.js";
export const INTENTS = {
  RESUME: "resume",
  GENERAL: "general",
};
export async function aiOrchestratorService({ userId, message, history }) {
  //    here we are making a routing decision based on the users query
  // if it related to his resume we will have RAG pipeline
  // else general query direct connection to LLM
  // lets code

  const intent = detectIntent(message);
  if (intent == INTENTS.RESUME) {
    // means it is a retrieval call
    //as documentType is resume
    const documentType = "resume";
    const start = Date.now();
    const { context} = await retrieveDocumentService(
      userId,
      message,
      documentType,
    );

    logger.info(
      {
        duration: Date.now() - start,
      },
      "Resume Retrieval completed ",
    );
    // now ask for answer from llm
    const answer = await resumeQaService({
      message,
      context,
      history,
    });
    return answer;
  }
  // else it is normal chat
  return await generateResponse({ message, history });
}
