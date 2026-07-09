import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { RAG_CONFIG } from "../../config/rag.js";

const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: RAG_CONFIG.CHUNK_SIZE,
    chunkOverlap: RAG_CONFIG.CHUNK_OVERLAP,
    separators: [
        "\n\n",
        "\n",
        " ",
        ""
    ]
});

export const chunkTextService = async (text) => {
    return await textSplitter.splitText(text);
};