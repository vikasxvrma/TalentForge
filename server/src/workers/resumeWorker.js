import { Worker } from "bullmq";

import logger from "../config/logger.js";
import redisConnection from "../config/redis.js";
import { resumeProcessor } from "../processors/resumeProcessor.js";

logger.info("Creating BullMQ worker...");

const resumeWorker = new Worker(
    "resume-processing",
    resumeProcessor,
    redisConnection
);

logger.info("BullMQ worker instance created.");

resumeWorker.on("ready", () => {
    logger.info("✅ Worker connected to Redis");
});

resumeWorker.on("error", (error) => {
    logger.error({ error }, "❌ Worker error");
});

resumeWorker.on("completed", (job) => {
    logger.info(
        { jobId: job.id },
        "Resume job completed"
    );
});

resumeWorker.on("failed", (job, error) => {
    logger.error(
        {
            jobId: job?.id,
            error,
        },
        "Resume job failed"
    );
});

export default resumeWorker;