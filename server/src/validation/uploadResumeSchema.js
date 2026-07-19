import { z } from "zod";

export const uploadResumeSchema = z.object({
  objectKey: z.string().min(1),
  fileName: z.string().min(1),
  mimeType: z.literal("application/pdf"),
  fileSize: z
    .number()
    .int()
    .positive()
    .max(10 * 1024 * 1024), // 10 MB
});