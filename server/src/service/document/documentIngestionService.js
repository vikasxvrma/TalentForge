import crypto from "crypto";

import { extractTextService } from "./extractTextService.js";
import { normalizeTextService } from "./normalizeTextService.js";
import { chunkTextService } from "./chunkTextService.js";
import { generateEmbeddingService } from "../ai/generateEmbeddingService.js";
import { storeEmbeddings, deleteDocumentEmbeddings } from "./vectorService.js";
import logger from "../../config/logger.js";

export const documentIngestionService = async ({
  file,
  userId,
  documentType,
}) => {
  // Every uploaded document gets its own id
  let documentId = crypto.randomUUID();

  // Step 1
  const extractedText = await extractTextService(file.path);

  // Step 2
  const normalizedText = normalizeTextService(extractedText);

  // Step 3
  const chunks = await chunkTextService(normalizedText);
  const start = Date.now();
  // Step 4
  const embeddings = await generateEmbeddingService(chunks);
  logger.info(
    {
      duration: Date.now() - start,
    },
    "Gemini completed",
  );
  // Optional:
  // Delete previous resume vectors before inserting new ones
  if (documentType === "resume") {
    await deleteDocumentEmbeddings({
      userId,
      documentId: "resume",
    });

    // keep a fixed document id for resumes
    // documentId = "resume";
  }
  if (documentType == "resume") {
    documentId = "resume";
  }
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
    fileName: file.filename,
    textLength: normalizedText.length,
    totalChunks: chunks.length,
    storedVectors,
  };
};
