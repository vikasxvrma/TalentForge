import pool from "../config/db.js";

/**
 * Create a new resume record.
 */
export const createResume = async ({
  userId,
  fileName,
  objectKey,
  mimeType,
  fileSize,
}) => {
  const query = `
    INSERT INTO resumes (
      user_id,
      file_name,
      object_key,
      mime_type,
      file_size
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [
    userId,
    fileName,
    objectKey,
    mimeType,
    fileSize,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
};

/**
 * Find a resume by its id.
 */
export const findResumeById = async (resumeId) => {
  const query = `
    SELECT *
    FROM resumes
    WHERE id = $1
    LIMIT 1;
  `;

  const { rows } = await pool.query(query, [resumeId]);

  return rows[0] ?? null;
};

/**
 * Update resume processing status.
 */
export const updateResumeStatus = async ({
  resumeId,
  status,
  processedAt = null,
  failedReason = null,
}) => {
  const query = `
    UPDATE resumes
    SET
      status = $2,
      processed_at = $3,
      failed_reason = $4,
      updated_at = NOW()
    WHERE id = $1
    RETURNING *;
  `;

  const values = [
    resumeId,
    status,
    processedAt,
    failedReason,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
};

/**
 * Get the latest uploaded resume for a user.
 */
export const findLatestResumeByUser = async (userId) => {
  const query = `
    SELECT *
    FROM resumes
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT 1;
  `;

  const { rows } = await pool.query(query, [userId]);

  return rows[0] ?? null;
};