import { z } from "zod";

export const startInterviewSchema = z.object({
  role: z
    .string()
    .trim()
    .min(2, "Role is required."),

  interviewType: z
    .enum([
      "technical",
      "behavioral",
      "system_design",
    ])
    .default("technical"),

  difficulty: z
    .enum([
      "easy",
      "medium",
      "hard",
    ])
    .default("medium"),

  totalQuestions: z
    .number()
    .int()
    .min(3)
    .max(10)
    .default(5),
});