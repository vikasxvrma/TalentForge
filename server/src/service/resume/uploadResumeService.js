import {
    createResume,
} from "../../repositories/resumeRepository.js";

import resumeQueue from "../../queues/resumeQueue.js";

export const uploadResumeService = async ({
    userId,
    objectKey,
    fileName,
    mimeType,
    fileSize,
}) => {
    console.log("Creating resume for user:", userId);
    const resume = await createResume({
        userId,
        objectKey,
        fileName,
        mimeType,
        fileSize,
    });
    console.log("Resume created:", resume.id);
    await resumeQueue.enqueueResume({
        resumeId: resume.id,
    });
    console.log("Resume enqueued");
    return resume;
};