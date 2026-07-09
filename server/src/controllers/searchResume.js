import { retrieveDocumentService } from "../service/document/retrievalTextService.js";
import { resumeQaService } from "../service/ai/resumeQaService.js";

export const searchResume = async (req, res) => {

    const {  message } = req.body;
    const userId =req.user.id;

    //  as it is a resume search documentType ="resume "
    const documentType="resume";

  const { context, chunks } = await retrieveDocumentService(
    userId,
    message,documentType
);

    const answer = await resumeQaService({
        message,
        context
    });

    return res.json({
        success: true,
        answer,
        retrievedChunks: chunks.length
    });
};