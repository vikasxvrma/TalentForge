import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().default(3000),

  LOG_LEVEL: z.string().default("info"),

  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  JWT_SECRET: z
    .string()
    .min(12, "JWT_SECRET must be at least 32 characters long"),

  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required"),

  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
  FRONTEND_URL: z.string().url("FRONTEND_URL must be a valid URL"),
  QDRANT_URL: z.string().url("QDRANT_URL must be a valid URL").optional(),

  QDRANT_API_KEY: z.string().optional(),
  GEMINI_CHAT_MODEL: z.string(),
  GEMINI_EMBEDDING_MODEL: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:\n");

  console.error(parsedEnv.error.format());

  process.exit(1);
}

const env = parsedEnv.data;

const config = Object.freeze({
  env: env.NODE_ENV,

  port: env.PORT,

  database: {
    url: env.DATABASE_URL,
  },

  jwt: {
    secret: env.JWT_SECRET,
  },

  google: {
    clientId: env.GOOGLE_CLIENT_ID,
  },

  qdrant: {
    url: env.QDRANT_URL,
    apiKey: env.QDRANT_API_KEY,
  },
  log: {
    level: env.LOG_LEVEL,
  },
  gemini: {
    apiKey: env.GEMINI_API_KEY,
    chatModel: env.GEMINI_CHAT_MODEL,
    embeddingModel: env.GEMINI_EMBEDDING_MODEL,
  },
  frontend: {
    origins: env.FRONTEND_URL.split(","),
  },
});

export default config;
