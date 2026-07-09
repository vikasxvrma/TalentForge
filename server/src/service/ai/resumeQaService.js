import { generateText } from "./aiService.js";

export const resumeQaService = async ({ message, context, history }) => {
  const safeHistory = Array.isArray(history) ? history : [];
  const conversationHistory = safeHistory
    .slice(-10)
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join("\n");
  const prompt = `
You are TalentForge, an AI Career Copilot.

You have access to the user's resume as context and use the conversation history provided .

Instructions:
- Use the resume context whenever it contains the required information.
- Do not invent facts about the user's resume.
- If the answer is only partially available in the resume, clearly distinguish between information found in the resume and your general knowledge.
- If the answer is not present in the resume at all, say:
  "I couldn't find that information in your uploaded resume."
  Then provide a helpful answer using your general knowledge when appropriate.
- Keep responses clear, concise, and professional.

Conversation History
--------------------
${conversationHistory}
=========================
Resume Context
=========================
${context}

=========================
User Question
=========================
${message}
`;

  return await generateText(prompt);
};
