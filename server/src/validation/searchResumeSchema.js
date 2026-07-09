 import {z} from "zod";
export const searchResumeSchema = z.object({
    message: z
        .string()
        .trim()
        .min(1, "Message is required")
        .max(2000, "Message cannot exceed 2000 characters")
});