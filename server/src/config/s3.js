import { S3Client } from "@aws-sdk/client-s3";
import config from "./index.js";

const s3 = new S3Client({
  region: config.storage.region,

  credentials: {
    accessKeyId: config.storage.accessKeyId,
    secretAccessKey: config.storage.secretAccessKey,
  },
});

export default s3;