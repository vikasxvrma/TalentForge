import storageService from "../storage/storageService.js";
import { documentIngestionService } from "../document/documentIngestionService.js";
import {
    findResumeById,
    updateResumeStatus,
} from "../../repositories/resumeRepository.js";

export const processResumeService = async (resumeId) => {

    const resume = await findResumeById(resumeId);

    if (!resume) {
        throw new Error("Resume not found.");
    }

    try {

        await updateResumeStatus({
            resumeId,
            status: "PROCESSING",
        });


        const fileBuffer = await storageService.downloadObject({
            objectKey: resume.object_key,
        });

        await documentIngestionService({
            fileBuffer,
            fileName: resume.file_name,
            userId: resume.user_id,
            documentType: "resume",
        });

        await updateResumeStatus({
            resumeId,
            status: "COMPLETED",
            processedAt: new Date(),
        });

        return resume;
    } catch (error) {

        await updateResumeStatus({
            resumeId,
            status: "FAILED",
            failedReason: error.message,
        });

        throw error;
    }
};