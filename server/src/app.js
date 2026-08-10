// here we are setting up our server not starting
import express from "express";
import chatRouter from "./routes/chatRouter.js";
import resumeRouter from "./routes/resumeRouter.js";
import errorMiddleware from "./middleware/error.middleware.js";
import pinoHttp from "pino-http";
import crypto from "crypto";
import logger from "./config/logger.js";
import cors from "cors";
import config from "./config/index.js";
import storagetRouter from "./routes/storageRouter.js";
import storageRouter from "./routes/storageRouter.js";
import healthRouter from "./routes/index.js";
import authRouter from "./routes/authRouter.js";
import conversationRouter from "./routes/conversationRouter.js";
import interviewRouter from "./routes/interviewRouter.js";
// create object
const app = express();

// <-----------------middlewares-------------->
// cors middleware
app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without Origin (Postman, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      if (config.frontend.origins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`Origin ${origin} is not allowed by CORS`)
      );
    },
    credentials: true,
  }),
);
// logger middleware
app.use(
  pinoHttp({
    logger,
  }),
);
app.use(express.json());

// to provide each user a request id
// so that their logs differ from others

app.use((req, res, next) => {
  req.requestId = crypto.randomUUID();

  next();
});
//  <--------------routing --------------------->
// health router 
app.use("/api/v1", healthRouter);
// chat router
app.use("/api/v1/chat", chatRouter);
// resumes router
app.use("/api/v1/resumes", resumeRouter);
// login via google oAuth
app.use("/api/v1/auth", authRouter);
// storage router 
app.use("/api/v1/storage", storageRouter);
// conversations router 
app.use("/api/v1/conversations", conversationRouter);
// interview router
app.use("/api/v1/interviews" ,interviewRouter);
// default routing
app.get("/", (req, res) => {
  return res.status(200).json({
    name: "TalentForge API",
    version: "v1",
    status: "running",
  });
});
// error middleware
app.use(errorMiddleware);

// we will not make it listen
export default app;
