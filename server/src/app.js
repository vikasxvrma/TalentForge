// here we are setting up our server not starting
import express from "express";
import router from "./routes/index.js";
import chatRouter from "./routes/chatRouter.js";
import resumeRouter from "./routes/resumeRouter.js";
import authRoute from "./routes/authRoute.js";
import errorMiddleware from "./middleware/error.middleware.js";
import pinoHttp from "pino-http";
import crypto from "crypto";
import logger from "./config/logger.js";
import cors from "cors";
import config from "./config/index.js";
// create object
const app = express();

// <-----------------middlewares-------------->
// cors middleware
app.use(
  cors({
    origin: [config.frontend.origins],
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
app.use("/api/v1", router);
// chat router
app.use("/api/v1/chat", chatRouter);
// resume upload router
app.use("/api/v1/resumes", resumeRouter);
// login via google oAuth
app.use("/api/v1/auth", authRoute);

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
