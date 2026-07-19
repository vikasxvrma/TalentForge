import resumeQueue from "./queues/resumeQueue.js";

await resumeQueue.enqueueResume({
    resumeId: "123",
    userId: "456",
    objectKey: "users/456/resume.pdf",
});

console.log("Job Added");
process.exit(0);