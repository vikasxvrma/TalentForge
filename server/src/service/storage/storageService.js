import {
  PutObjectCommand,GetObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import config from "../../config/index.js";
import s3 from "../../config/s3.js";

class StorageService {
  async generateUploadUrl({
    key,
    contentType,
    expiresIn = 300,
  }) {
    const command = new PutObjectCommand({
      Bucket: config.storage.bucket,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(
      s3,
      command,
      {
        expiresIn,
      }
    );

    return {
      uploadUrl,
      key,
    };
  }
 

async downloadObject({ objectKey }) {

    const command = new GetObjectCommand({
        Bucket: config.storage.bucket,
        Key: objectKey,
    });

    const response = await s3.send(command);

    const chunks = [];

    for await (const chunk of response.Body) {
        chunks.push(chunk);
    }

    return Buffer.concat(chunks);
}
}

export default new StorageService();