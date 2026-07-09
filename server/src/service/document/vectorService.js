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
  const indexes = [
    "userId",
    "documentId",
    "documentType",
  ];

  for (const field of indexes) {
    try {
      await qdrant.createPayloadIndex(COLLECTION_NAME, {
        field_name: field,
        field_schema: "keyword",
      });

      logger.info(`✅ Payload index created: ${field}`);
    } catch (error) {
      // Ignore if index already exists
      logger.debug(
        `Payload index '${field}' already exists or could not be created.`,
      );
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
