import  ai  from "../../config/gemini.js";

export const generateEmbeddingService = async (chunks) => {

    const response = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: chunks
    });

    return response.embeddings;
};