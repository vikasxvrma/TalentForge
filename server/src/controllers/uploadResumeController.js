import { uploadResumeService } from "../service/resume/uploadResumeService.js";

export const uploadResumeController = async (req, res) => {
  const userId = req.user.id;

  const {
    objectKey,
    fileName,
    mimeType,
    fileSize,
  } = req.body;

  const resume = await uploadResumeService({
    userId,
    objectKey,
    fileName,
    mimeType,
    fileSize,
  });

  return res.status(202).json({
    success: true,
    message: "Resume accepted for processing.",
    data: {
      resumeId: resume.id,
      status: resume.status,
    },
  });
};