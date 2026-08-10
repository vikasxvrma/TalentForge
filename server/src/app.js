// Here we are setting up our server, not starting it.

import express from "express";
import cors from "cors";
import crypto from "crypto";
import pinoHttp from "pino-http";

import chatRouter from "./routes/chatRouter.js";
import resumeRouter from "./routes/resumeRouter.js";
import errorMiddleware from "./middleware/error.middleware.js";
import logger from "./config/logger.js";
import config from "./config/index.js";
import storageRouter from "./routes/storageRouter.js";
import healthRouter from "./routes/index.js";
import authRouter from "./routes/authRouter.js";
import conversationRouter from "./routes/conversationRouter.js";
import interviewRouter from "./routes/interviewRouter.js";

// =====================================================
// CREATE APP
// =====================================================

const app = express();

// =====================================================
// CORS
// =====================================================

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without Origin
      // (Postman, server-to-server, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (
        config.frontend.origins.includes(origin)
      ) {
        return callback(null, true);
      }

      return callback(
        new Error(
          `Origin ${origin} is not allowed by CORS`,
        ),
      );
    },

    credentials: true,
  }),
);

// =====================================================
// LOGGER
// =====================================================

app.use(
  pinoHttp({
    logger,
  }),
);

// =====================================================
// BODY PARSER
// =====================================================

app.use(express.json());

// =====================================================
// REQUEST ID
// =====================================================

app.use((req, res, next) => {
  req.requestId = crypto.randomUUID();

  next();
});

// =====================================================
// ROUTES
// =====================================================

// Health
app.use("/api/v1", healthRouter);

// Chat
app.use("/api/v1/chat", chatRouter);

// Resumes
app.use("/api/v1/resumes", resumeRouter);

// Authentication
app.use("/api/v1/auth", authRouter);

// Storage
app.use("/api/v1/storage", storageRouter);

// Conversations
app.use(
  "/api/v1/conversations",
  conversationRouter,
);

// Interviews
app.use(
  "/api/v1/interviews",
  interviewRouter,
);

// =====================================================
// ROOT
// =====================================================

app.get("/", (req, res) => {
  return res.status(200).json({
    name: "TalentForge API",
    version: "v1",
    status: "running",
  });
});

// =====================================================
// ERROR HANDLER
// =====================================================

app.use(errorMiddleware);

// =====================================================
// EXPORT
// =====================================================

// We intentionally do not call app.listen() here.
// The server entry point is responsible for starting it.

export default app;