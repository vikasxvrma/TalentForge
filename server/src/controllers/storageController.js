import storageService from "../service/storage/storageService.js";
import crypto from "crypto"
export const generatePresignedUploadUrl = async (req, res) => {
  const userId = req.user.id;

  const objectId= crypto.randomUUID();

  const key = `users/${userId}/resumes/${objectId}.pdf`;

  const { uploadUrl } =
    await storageService.generateUploadUrl({
      key,
      contentType: "application/pdf",
    });

  return res.status(200).json({
    success: true,
    data: {
      uploadUrl,
      key,
    },
  });
};