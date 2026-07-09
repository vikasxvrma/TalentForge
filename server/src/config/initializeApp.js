import { initializeVectorStore } from "../service/document/vectorService.js";

export const initializeApp = async () => {
    await initializeVectorStore();
};