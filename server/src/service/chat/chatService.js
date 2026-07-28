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

  // Step 1: Find or create conversation
  if (!conversationId) {
    conversation = await createConversation(userId);
  } else {
    conversation = await getConversation(conversationId, userId);

    if (!conversation) {
      throw new AppError("Conversation not found", 404);
    }
  }

  // Step 2: Persist user message
  const userMessage = await createMessage({
    conversationId: conversation.id,
    role: "user",
    content: message,
  });

  // Step 3: Load conversation history
  const history = await getConversationMessages({
    conversationId: conversation.id,
    userId,
  });

  // Step 4: Generate AI response
  const answer = await aiOrchestratorService({
    userId,
    message,
    history,
  });

  // Step 5: Persist assistant message
  const assistantMessage = await createMessage({
    conversationId: conversation.id,
    role: "assistant",
    content: answer,
  });

  // Step 6: Update conversation activity
  await touchConversation(conversation.id);

  // Step 7: Return response
  return {
    conversation: {
      id: conversation.id,
      title: conversation.title,
    },
    userMessage,
    assistantMessage,
  };
}