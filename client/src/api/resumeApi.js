import client from "./client.js";

export async function generatePresignedUpload() {
  const response = await client.post("/storage/presigned-upload");

  return response.data.data;
}

// get latest status 
export async function getLatestResume() {
    const resume = await client.get("/resumes/latest");
    return resume.data.data;
    
}

export async function processResume({
  objectKey,
  fileName,
  mimeType,
  fileSize,
}) {
  const response = await client.post("/resumes/process", {
    objectKey,
    fileName,
    mimeType,
    fileSize,
  });

  return response.data.data;
}