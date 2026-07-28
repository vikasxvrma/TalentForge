import {
  getUserConversations,
  getConversationMessagesForUser,
} from "../service/conversation/conversationService.js";

export async function getConversationsController(req, res) {
  const userId = req.user.id;

  const conversations = await getUserConversations(userId);

  return res.status(200).json({
    success: true,
    data: conversations,
  });
}

export async function getConversationMessagesController(req, res) {
  const userId = req.user.id;
  const { conversationId } = req.params;

  const messages = await getConversationMessagesForUser({
    conversationId,
    userId,
  });

  return res.status(200).json({
    success: true,
    data: messages,
  });
}