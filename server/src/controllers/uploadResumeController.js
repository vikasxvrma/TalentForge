import AppError from "../errors/AppError.js";
import { uploadResumeService } from "../service/resume/uploadResumeService.js";

export const uploadResumeController = async (req, res) => {
  const userId = req.user.id;

  if (!req.file || !userId) {
    throw new AppError("No resume uploaded or Invalid user.", 400);
  }

  const result = await uploadResumeService({
    file: req.file,
    userId: userId,
  });
  return res.status(201).json({
    success: true,
    message: "Resume uploaded successfully.",
    data: result,
  });
};
