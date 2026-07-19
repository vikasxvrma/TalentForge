import crypto from "crypto";

import { extractTextService } from "./extractTextService.js";
import { normalizeTextService } from "./normalizeTextService.js";
import { chunkTextService } from "./chunkTextService.js";
import { generateEmbeddingService } from "../ai/generateEmbeddingService.js";
import {
  storeEmbeddings,
  deleteDocumentEmbeddings,
} from "./vectorService.js";
import logger from "../../config/logger.js";

export const documentIngestionService = async ({
  fileBuffer,
  fileName,
  userId,
  documentType,
}) => {
  // Every uploaded document gets its own id
  let documentId = crypto.randomUUID();

  // Step 1 - Extract text from PDF buffer
  const extractedText = await extractTextService(fileBuffer);

  // Step 2 - Normalize extracted text
  const normalizedText = normalizeTextService(extractedText);

  // Step 3 - Split into chunks
  const chunks = await chunkTextService(normalizedText);

  // Step 4 - Generate embeddings
  const start = Date.now();

  const embeddings = await generateEmbeddingService(chunks);

  logger.info(
    {
      duration: Date.now() - start,
    },
    "Gemini completed"
  );

  // Resume is a singleton document for each user
  if (documentType === "resume") {
    await deleteDocumentEmbeddings({
      userId,
      documentId: "resume",
    });

    documentId = "resume";
  }

  // Step 5 - Store vectors
  const storedVectors = await storeEmbeddings({
    userId,
    documentId,
    documentType,
    chunks,
    embeddings,
  });

  return {
    documentId,
    documentType,
    fileName,
    textLength: normalizedText.length,
    totalChunks: chunks.length,
    storedVectors,
  };
};