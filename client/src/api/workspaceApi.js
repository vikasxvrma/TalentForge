import client from "./client";

/**
 * Fetch all conversations for the authenticated user.
 */
export async function getConversations() {
  const response = await client.get("/conversations");

  return response.data.data;
}

/**
 * Fetch all messages for a conversation.
 */
export async function getConversationMessages(conversationId) {
  const response = await client.get(
    `/conversations/${conversationId}/messages`
  );

  return response.data.data;
}

/**
 * Send a message to the AI.
 */
export async function sendMessage(payload) {
  const response = await client.post("/chat", payload);

  return response.data.data;
}