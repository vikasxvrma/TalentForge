// entry point for worker 
import logger from "./config/logger.js";
import "./workers/resumeWorker.js";

logger.info("Resume Worker started...");