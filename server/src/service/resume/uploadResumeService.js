import { documentIngestionService } from "../document/documentIngestionService.js";

export const uploadResumeService = async ({
    file,
    userId
}) => {

    return await documentIngestionService({
        file,
        userId,
        documentType: "resume"
    });

};