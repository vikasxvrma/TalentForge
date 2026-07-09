import { QdrantClient } from "@qdrant/js-client-rest";
import config from "./index.js";

export const qdrant = new QdrantClient({
  url: config.qdrant.url,
  apiKey: config.qdrant.apiKey || undefined,
});