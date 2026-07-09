import { generateText } from "./aiService.js";

export default async function generateResponse({
    message,
    history=[]
}) {
    const safeHistory = Array.isArray(history) ? history : [];
    const conversationHistory = safeHistory.slice(-10).map(msg => `${msg.role}: ${msg.content}`).join("\n");

    const prompt = `
Continue the conversation naturally.
You are TalentForge, an AI Career Copilot.

You are continuing an existing conversation with the user.

Instructions:
- Use the conversation history to understand context.
- Resolve follow-up questions such as "he", "she", "it", "that", "those", "previous one", etc. using the conversation history.
- Do not claim that you cannot remember previous messages if they are present in the conversation history below.
- Answer naturally and consistently with the previous conversation.

Conversation History:
--------------------
${conversationHistory}

Current User Message:
--------------------
${message}
`;
     console.log("prompt history:",prompt);
    return await generateText(prompt);
}