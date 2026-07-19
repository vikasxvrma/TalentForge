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

    const resume = await createResume({
        userId,
        objectKey,
        fileName,
        mimeType,
        fileSize,
    });

    await resumeQueue.enqueueResume({
        resumeId: resume.id,
    });

    return resume;
};