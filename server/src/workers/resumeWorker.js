import { Worker } from "bullmq";

import logger from "../config/logger.js";
import redisConnection from "../config/redis.js";
import { resumeProcessor } from "../processors/resumeProcessor.js";

const resumeWorker = new Worker(
    "resume-processing",
    resumeProcessor,
    redisConnection
);

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