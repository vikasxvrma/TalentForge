import { chatService } from "../service/chat/chatService.js";

const chatController = async (req, res) => {
  // 1. Destructure prompt from req.body
  const { message, conversationId } = req.body;
  const userId = req.user.id;

  // already validated from validate.middleware.js 
  // // 2. Validation: Check if prompt is missing or just empty whitespace
  // if (!message || typeof message !== "string" || !message.trim()) {
  //   throw new AppError("please enter valid prompt", 400);
  // }

  // 3. Call the AI service with the extracted string

  const result = await chatService({
    userId,
    conversationId,
    message,
  });

  // 4. Success Response
  return res.status(200).json({
    success: true,
    message: "Response generated successfully.",
    data: result,
  });
};

export default chatController;
