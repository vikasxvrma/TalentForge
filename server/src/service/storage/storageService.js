import {
  PutObjectCommand,
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
}

export default new StorageService();