import crypto from "crypto";
import { qdrant } from "../../config/qdrant.js";
import logger from "../../config/logger.js";

const COLLECTION_NAME = "resumes";
const VECTOR_SIZE = 3072;

export const initializeVectorStore = async () => {
  const { collections } = await qdrant.getCollections();

  const exists = collections.some(
    (collection) => collection.name === COLLECTION_NAME,
  );

  if (exists) {
    logger.info("✅ Qdrant collection already exists.");
    return;
  }

  await qdrant.createCollection(COLLECTION_NAME, {
    vectors: {
      size: VECTOR_SIZE,
      distance: "Cosine",
    },
  });

  logger.info("✅ Qdrant collection created.");
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

  await qdrant.upsert(COLLECTION_NAME, {
    wait: true,
    points,
  });

  return points.length;
};

export const searchEmbeddings = async ({ userId, queryVector,documentType, limit = 3 }) => {
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
};
export const deleteDocumentEmbeddings = async ({ userId, documentId }) => {
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
};
