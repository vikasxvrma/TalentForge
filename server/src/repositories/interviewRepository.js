import pool from "../config/db.js";

/**
 * Create a new mock interview session.
 */
export async function createInterviewSession({
  userId,
  role,
  interviewType = "technical",
  difficulty = "medium",
  totalQuestions = 5,
}) {
  const query = `
    INSERT INTO interview_sessions (
      user_id,
      role,
      interview_type,
      difficulty,
      total_questions
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [
    userId,
    role,
    interviewType,
    difficulty,
    totalQuestions,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
}

/**
 * Find an interview session belonging to a specific user.
 */
export async function findInterviewSession({
  sessionId,
  userId,
}) {
  const query = `
    SELECT *
    FROM interview_sessions
    WHERE id = $1
      AND user_id = $2
    LIMIT 1;
  `;

  const { rows } = await pool.query(query, [
    sessionId,
    userId,
  ]);

  return rows[0] ?? null;
}

/**
 * Create a question for an interview session.
 */
export async function createInterviewQuestion({
  sessionId,
  questionNumber,
  questionText,
}) {
  const query = `
    INSERT INTO interview_questions (
      session_id,
      question_number,
      question_text
    )
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [
    sessionId,
    questionNumber,
    questionText,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
}

/**
 * Get all questions for an interview session.
 */
export async function getInterviewQuestions({
  sessionId,
}) {
  const query = `
    SELECT
      id,
      question_number,
      question_text,
      created_at
    FROM interview_questions
    WHERE session_id = $1
    ORDER BY question_number;
  `;

  const { rows } = await pool.query(query, [sessionId]);

  return rows;
}

/**
 * Get the latest question for an interview session.
 */
export async function getLatestInterviewQuestion({
  sessionId,
}) {
  const query = `
    SELECT *
    FROM interview_questions
    WHERE session_id = $1
    ORDER BY question_number DESC
    LIMIT 1;
  `;

  const { rows } = await pool.query(query, [sessionId]);

  return rows[0] ?? null;
}
/**
 * find interview question 
 */
export async function findInterviewQuestion({
  questionId,
  sessionId,
}) {
  const query = `
    SELECT
      q.*
    FROM interview_questions q
    JOIN interview_sessions s
      ON s.id = q.session_id
    WHERE q.id = $1
      AND q.session_id = $2
    LIMIT 1;
  `;

  const { rows } = await pool.query(query, [
    questionId,
    sessionId,
  ]);

  return rows[0] ?? null;
}

/**
 * Save a candidate's answer.
 */
export async function createInterviewAnswer({
  questionId,
  transcript,
  interrupted = false,
}) {
  const query = `
    INSERT INTO interview_answers (
      question_id,
      transcript,
      interrupted
    )
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [
    questionId,
    transcript,
    interrupted,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
}

/**
 * Save evaluation for an answer.
 */
export async function createInterviewEvaluation({
  answerId,
  technicalScore,
  depthScore,
  communicationScore,
  strengths,
  weaknesses,
  feedback,
}) {
  const query = `
    INSERT INTO interview_evaluations (
      answer_id,
      technical_score,
      depth_score,
      communication_score,
      strengths,
      weaknesses,
      feedback
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const values = [
    answerId,
    technicalScore,
    depthScore,
    communicationScore,
    strengths,
    weaknesses,
    feedback,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
}

/**
 * Get complete interview history.
 *
 * Returns:
 * question -> answer -> evaluation
 */
export async function getInterviewHistory({
  sessionId,
}) {
  const query = `
    SELECT
      q.id AS question_id,
      q.question_number,
      q.question_text,

      a.id AS answer_id,
      a.transcript,
      a.interrupted,

      e.id AS evaluation_id,
      e.technical_score,
      e.depth_score,
      e.communication_score,
      e.strengths,
      e.weaknesses,
      e.feedback

    FROM interview_questions q

    LEFT JOIN interview_answers a
      ON a.question_id = q.id

    LEFT JOIN interview_evaluations e
      ON e.answer_id = a.id

    WHERE q.session_id = $1

    ORDER BY q.question_number;
  `;

  const { rows } = await pool.query(query, [sessionId]);

  return rows;
}

/**
 * Update current interview question number.
 */
export async function updateInterviewProgress({
  sessionId,
  currentQuestionNumber,
}) {
  const query = `
    UPDATE interview_sessions
    SET
      current_question_number = $2,
      updated_at = NOW()
    WHERE id = $1
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [
    sessionId,
    currentQuestionNumber,
  ]);

  return rows[0] ?? null;
}

/**
 * Complete an interview session.
 */
export async function completeInterviewSession({
  sessionId,
}) {
  const query = `
    UPDATE interview_sessions
    SET
      status = 'COMPLETED',
      completed_at = NOW(),
      updated_at = NOW()
    WHERE id = $1
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [sessionId]);

  return rows[0] ?? null;
}

export async function findInterviewQuestionForUser({
  questionId,
  sessionId,
  userId,
}) {
  console.log("SPEAK PARAMS:", {
    questionId,
    sessionId,
    userId,
  });

  const query = `
    SELECT
      q.*
    FROM interview_questions q
    JOIN interview_sessions s
      ON s.id = q.session_id
    WHERE q.id = $1
      AND q.session_id = $2
      AND s.user_id = $3
    LIMIT 1;
  `;

  const { rows } = await pool.query(query, [
    questionId,
    sessionId,
    userId,
  ]);

  return rows[0] ?? null;
}