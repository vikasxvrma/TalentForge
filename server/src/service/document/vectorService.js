import crypto from "crypto";
import { qdrant } from "../../config/qdrant.js";
import logger from "../../config/logger.js";
import AppError from "../../errors/AppError.js";

const COLLECTION_NAME = "resumes";
const VECTOR_SIZE = 3072;

const PAYLOAD_INDEXES = [
  "userId",
  "documentId",
  "documentType",
];

export const initializeVectorStore = async () => {
  const { collections } = await qdrant.getCollections();

  const exists = collections.some(
    (collection) => collection.name === COLLECTION_NAME,
  );

  if (!exists) {
    await qdrant.createCollection(COLLECTION_NAME, {
      vectors: {
        size: VECTOR_SIZE,
        distance: "Cosine",
      },
    });

    logger.info("✅ Qdrant collection created.");
  } else {
    logger.info("✅ Qdrant collection already exists.");
  }

  // Ensure payload indexes exist
  for (const field of PAYLOAD_INDEXES) {
    try {
      await qdrant.createPayloadIndex(COLLECTION_NAME, {
        field_name: field,
        field_schema: "keyword",
      });

      logger.info(`✅ Payload index created: ${field}`);
    } catch (error) {
      const message = error?.data?.status?.error || "";

      if (message.toLowerCase().includes("already exists")) {
        logger.debug(`Payload index '${field}' already exists.`);
      } else {
        logger.error(error, `Failed to create payload index '${field}'.`);
        throw new AppError("Failed to initialize vector database.", 500);
      }
    }
  }
};

export const storeEmbeddings = async ({
  userId,
  documentId,
  documentType,
  chunks,
  embeddings,
}) => {
  const points = chunks.map((chunk, index) => ({
    id: crypto.randomUUID(),

    vector: embeddings[index].values,

    payload: {
      userId,
      documentId,
      documentType,
      chunkNumber: index + 1,
      totalChunks: chunks.length,
      text: chunk,
    },
  }));

  try {
    await qdrant.upsert(COLLECTION_NAME, {
      wait: true,
      points,
    });

    return points.length;
  } catch (error) {
    logger.error(error, "Failed to store embeddings.");

    throw new AppError(
      "Failed to store resume embeddings.",
      500,
    );
  }
};

export const searchEmbeddings = async ({
  userId,
  queryVector,
  documentType,
  limit = 3,
}) => {
  try {
    const response = await qdrant.query(COLLECTION_NAME, {
      query: queryVector,

      filter: {
        must: [
          {
            key: "userId",
            match: {
              value: userId,
            },
          },
          {
            key: "documentType",
            match: {
              value: documentType,
            },
          },
        ],
      },

      limit,
      with_payload: true,
    });

    return response.points;
  } catch (error) {
    logger.error(error, "Vector search failed.");

    throw new AppError(
      "Failed to search resume.",
      500,
    );
  }
};

export const deleteDocumentEmbeddings = async ({
  userId,
  documentId,
}) => {
  try {
    await qdrant.delete(COLLECTION_NAME, {
      filter: {
        must: [
          {
            key: "userId",
            match: {
              value: userId,
            },
          },
          {
            key: "documentId",
            match: {
              value: documentId,
            },
          },
        ],
      },
    });
  } catch (error) {
    logger.error(error, "Failed to delete embeddings.");

    throw new AppError(
      "Failed to delete previous resume embeddings.",
      500,
    );
  }
};