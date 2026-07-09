import logger from "../../config/logger.js";
import { generateEmbeddingService } from "../ai/generateEmbeddingService.js";
import { searchEmbeddings } from "./vectorService.js";

export const retrieveDocumentService = async (
  userId,
  message,
  documentType,
  limit = 3,
) => {
  const [embedding] = await generateEmbeddingService([message]);

  const results = await searchEmbeddings({
    userId,
    queryVector: embedding.values,
    documentType,
    limit,
  });
  const context = results.map((result) => result.payload.text).join("\n\n");
  logger.info(
    {
      chunks: results.length,
    },
    "Retrieved resume chunks",
  );
  return {
    context,
    chunks: results,
  };
};
