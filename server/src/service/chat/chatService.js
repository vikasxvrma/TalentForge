import logger from "../../config/logger.js";
import AppError from "../../errors/AppError.js";
import { aiOrchestratorService } from "../ai/aiOrchestratorService.js";

import {
  createConversation,
  getConversation,
  touchConversation,
} from "../conversation/conversationService.js";

import {
  createMessage,
  getConversationMessages,
} from "../conversation/messageService.js";

export async function chatService({ userId, conversationId, message }) {
  let conversation;
  logger.info(
    {
      userId,
      conversationId,
    },
    "Generating AI response",
  );
  // Step 1
  if (!conversationId) {
    conversation = await createConversation(userId);
  } else {
    conversation = await getConversation(conversationId, userId);

    if (!conversation) {
      throw new AppError("Conversation not found", 404);
    }
  }

  // Step 2
  await createMessage({
    conversationId: conversation.id,
    role: "user",
    content: message,
  });

  // Step 3
  const history = await getConversationMessages({
    conversationId: conversation.id,
    userId,
  });

  // Step 4
  const answer = await aiOrchestratorService({
    userId,
    message,
    history,
  });

  // Step 5
  await createMessage({
    conversationId: conversation.id,
    role: "assistant",
    content: answer,
  });

  // Step 6
  await touchConversation(conversation.id);

  return {
    conversationId: conversation.id,
    answer,
  };
}
