import  ai  from "../../config/gemini.js";
import config from "../../config/index.js";

export const generateEmbeddingService = async (chunks) => {
    const EMBEDDING_MODEL = config.gemini.embeddingModel
        const response = await ai.models.embedContent({
        model: EMBEDDING_MODEL,
        contents: chunks
    });

    return response.embeddings;
};