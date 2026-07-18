import { Queue } from "bullmq";

import redisConnection from "../config/redis.js";

class ResumeQueue {
    constructor() {
        this.queue = new Queue(
            "resume-processing",
            {
                ...redisConnection,

                defaultJobOptions: {
                    attempts: 3,

                    backoff: {
                        type: "exponential",
                        delay: 5000,
                    },

                    removeOnComplete: 100,

                    removeOnFail: 500,
                },
            }
        );
    }

    async enqueueResume(data) {
        return this.queue.add(
            "process-resume",
            data
        );
    }
}

export default new ResumeQueue();