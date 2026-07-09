import pino from "pino";
import config from "./index.js";

const logger = pino({
    level: config.log.level || "info",
});

export default logger;