import AppError from "../../errors/AppError.js";
import logger from "../../config/logger.js";

import {
  findInterviewSession,
  findInterviewQuestion,
  createInterviewAnswer,
  createInterviewEvaluation,
  createInterviewQuestion,
  getInterviewHistory,
  updateInterviewProgress,
  completeInterviewSession,
  createInterviewSession,
  findInterviewQuestionForUser,
} from "../../repositories/interviewRepository.js";

import { evaluateAnswer } from "./answerEvaluationService.js";

import { retrieveDocumentService } from "../document/retrievalTextService.js";
import { generateText } from "../ai/aiService.js";
import { generateInterviewSpeech } from "./rimeService.js";

import {
  getInterviewStage,
} from "../../constants/interviewBlueprint.js";

/* =========================================================
   LATENCY HELPERS
   ========================================================= */

function elapsedMs(startTime) {
  return Math.round(performance.now() - startTime);
}

/* =========================================================
   QUESTION GENERATOR
   ========================================================= */

async function generateInterviewQuestion({
  role,
  interviewType,
  questionNumber,
  resumeContext = "",
}) {
  const stage = getInterviewStage(questionNumber);

  if (!stage) {
    throw new AppError(
      `Invalid interview question number: ${questionNumber}`,
      400,
    );
  }

  const prompt = `
You are TalentForge, an AI mock interviewer.

Your job is to generate exactly ONE interview question.

## Interview Configuration

Role:
${role}

Interview Type:
${interviewType}

Question Number:
${questionNumber}

Question Type:
${stage.type}

Difficulty:
${stage.difficulty}

## Interview Direction

${stage.instruction}

## Candidate Resume Context

${
  resumeContext
    ? resumeContext
    : "No resume context is required for this question."
}

## Rules

- Generate exactly ONE interview question.
- Return ONLY the question.
- Do not provide an answer.
- Do not provide feedback.
- Do not introduce yourself.
- Do not mention the question type.
- Do not mention the difficulty.
- Do not invent candidate experience.
- Do not make this question a direct follow-up to the previous question.
- Keep the question appropriate for a real interview.
- Respect the specified difficulty.
- For resume-based questions, only use information present in the resume context.
`;

  // ---------------------------------------
  // Gemini question generation latency
  // ---------------------------------------

  const generationStart = performance.now();

  const question = await generateText(prompt);

  const generationMs = elapsedMs(generationStart);

  logger.info(
    {
      questionNumber,
      questionType: stage.type,
      difficulty: stage.difficulty,
      generationMs,
    },
    "Interview question generation completed",
  );

  return {
    question: question.trim(),
    latencyMs: generationMs,
  };
}

/* =========================================================
   START INTERVIEW
   ========================================================= */

export async function startInterview({
  userId,
  role,
  interviewType = "technical",
  difficulty = "medium",
  totalQuestions = 5,
}) {
  const totalStart = performance.now();

  logger.info(
    {
      userId,
      role,
      interviewType,
      difficulty,
      totalQuestions,
    },
    "Starting mock interview",
  );

  // ---------------------------------------
  // 1. Create interview session
  // ---------------------------------------

  const sessionStart = performance.now();

  const session = await createInterviewSession({
    userId,
    role,
    interviewType,
    difficulty,
    totalQuestions,
  });

  const sessionCreationMs = elapsedMs(sessionStart);

  // ---------------------------------------
  // 2. Determine first interview stage
  // ---------------------------------------

  const stage = getInterviewStage(1);

  if (!stage) {
    throw new AppError(
      "Unable to determine first interview stage.",
      500,
    );
  }

  // ---------------------------------------
  // 3. Retrieve resume context for Q1
  // ---------------------------------------

  let context = "";
  let resumeRetrievalMs = 0;

  if (stage.useResume) {
    const retrievalQuery = `
Candidate role: ${role}

Generate a light introductory interview question
based on the candidate's resume, projects, skills,
and technologies.

Focus on understanding the candidate's experience,
not deep technical details.
`;

    const retrievalStart = performance.now();

    const {
      context: resumeContext,
      chunks,
    } = await retrieveDocumentService(
      userId,
      retrievalQuery,
      "resume",
      3,
    );

    resumeRetrievalMs = elapsedMs(retrievalStart);

    context = resumeContext;

    if (!context) {
      throw new AppError(
        "No processed resume found for this user.",
        400,
      );
    }

    logger.info(
      {
        sessionId: session.id,
        retrievedChunks: chunks.length,
        questionType: stage.type,
        resumeRetrievalMs,
      },
      "Resume context retrieved for interview",
    );
  }

  // ---------------------------------------
  // 4. Generate first question
  // ---------------------------------------

  const {
    question: questionText,
    latencyMs: questionGenerationMs,
  } =
    await generateInterviewQuestion({
      role,
      interviewType,
      questionNumber: 1,
      resumeContext: context,
    });

  // ---------------------------------------
  // 5. Save question
  // ---------------------------------------

  const questionCreationStart = performance.now();

  const question =
    await createInterviewQuestion({
      sessionId: session.id,
      questionNumber: 1,
      questionText,
    });

  const questionCreationMs = elapsedMs(
    questionCreationStart,
  );

  // ---------------------------------------
  // 6. Total backend latency
  // ---------------------------------------

  const totalBackendMs = elapsedMs(totalStart);

  const latency = {
    totalBackendMs,
    sessionCreationMs,
    resumeRetrievalMs,
    questionGenerationMs,
    questionCreationMs,
  };

  logger.info(
    {
      sessionId: session.id,
      latency,
    },
    "Interview start latency completed",
  );

  // ---------------------------------------
  // 7. Return session + first question
  // ---------------------------------------

  return {
    session,
    question,

    latency,
  };
}

/* =========================================================
   SUBMIT INTERVIEW ANSWER
   ========================================================= */

export async function submitInterviewAnswer({
  userId,
  sessionId,
  questionId,
  answer,
  interrupted = false,
}) {
  const totalStart = performance.now();

  // ---------------------------------------
  // 1. Validate interview session
  // ---------------------------------------

  const sessionLookupStart =
    performance.now();

  const session =
    await findInterviewSession({
      sessionId,
      userId,
    });

  const sessionLookupMs =
    elapsedMs(sessionLookupStart);

  if (!session) {
    throw new AppError(
      "Interview session not found.",
      404,
    );
  }

  if (session.status === "COMPLETED") {
    throw new AppError(
      "Interview has already been completed.",
      400,
    );
  }

  // ---------------------------------------
  // 2. Find current question
  // ---------------------------------------

  const questionLookupStart =
    performance.now();

  const question =
    await findInterviewQuestion({
      questionId,
      sessionId,
    });

  const questionLookupMs =
    elapsedMs(questionLookupStart);

  if (!question) {
    throw new AppError(
      "Interview question not found.",
      404,
    );
  }

  // ---------------------------------------
  // 3. Validate answer
  // ---------------------------------------

  if (!answer?.trim()) {
    throw new AppError(
      "Answer is required.",
      400,
    );
  }

  // ---------------------------------------
  // 4. Save candidate answer
  // ---------------------------------------

  const answerPersistenceStart =
    performance.now();

  const savedAnswer =
    await createInterviewAnswer({
      questionId,
      transcript: answer.trim(),
      interrupted,
    });

  const answerPersistenceMs =
    elapsedMs(answerPersistenceStart);

  // ---------------------------------------
  // 5. Retrieve relevant resume evidence
  //
  // QDRANT / RESUME RETRIEVAL
  // ---------------------------------------

  const retrievalStart = performance.now();

  const { context } =
    await retrieveDocumentService(
      userId,
      answer,
      "resume",
      2,
    );

  const resumeRetrievalMs =
    elapsedMs(retrievalStart);

  logger.info(
    {
      sessionId,
      questionNumber:
        question.question_number,
      resumeRetrievalMs,
    },
    "Interview resume retrieval completed",
  );

  // ---------------------------------------
  // 6. Load interview history
  // ---------------------------------------

  const historyStart =
    performance.now();

  const history =
    await getInterviewHistory({
      sessionId,
    });

  const historyLoadMs =
    elapsedMs(historyStart);

  const previousTurn =
    history.length > 0
      ? history[history.length - 1]
      : null;

  // ---------------------------------------
  // 7. Determine current interview stage
  // ---------------------------------------

  const currentStage =
    getInterviewStage(
      question.question_number,
    );

  if (!currentStage) {
    throw new AppError(
      "Invalid interview stage.",
      500,
    );
  }

  // ---------------------------------------
  // 8. Evaluate candidate answer
  //
  // GEMINI EVALUATION LATENCY
  // ---------------------------------------

  const evaluationStart =
    performance.now();

  const evaluation =
    await evaluateAnswer({
      role: session.role,
      difficulty: session.difficulty,
      question: question.question_text,
      answer: answer.trim(),
      resumeContext: context,
      previousFeedback:
        previousTurn?.feedback,
      questionNumber:
        question.question_number,
      totalQuestions:
        session.total_questions,
      questionType: currentStage.type,
    });

  const evaluationMs =
    elapsedMs(evaluationStart);

  logger.info(
    {
      sessionId,
      questionNumber:
        question.question_number,
      evaluationMs,
    },
    "Interview answer evaluation completed",
  );

  // ---------------------------------------
  // 9. Save evaluation
  // ---------------------------------------

  const evaluationPersistenceStart =
    performance.now();

  const savedEvaluation =
    await createInterviewEvaluation({
      answerId: savedAnswer.id,

      technicalScore:
        evaluation.technicalScore,

      depthScore:
        evaluation.depthScore,

      communicationScore:
        evaluation.communicationScore,

      strengths:
        evaluation.strengths,

      weaknesses:
        evaluation.weaknesses,

      feedback:
        evaluation.feedback,
    });

  const evaluationPersistenceMs =
    elapsedMs(evaluationPersistenceStart);

  // ---------------------------------------
  // 10. Check if interview is complete
  // ---------------------------------------

  if (
    question.question_number >=
    session.total_questions
  ) {
    const completionStart =
      performance.now();

    const completedSession =
      await completeInterviewSession({
        sessionId,
      });

    const completionMs =
      elapsedMs(completionStart);

    const totalBackendMs =
      elapsedMs(totalStart);

    const latency = {
      totalBackendMs,

      sessionLookupMs,
      questionLookupMs,
      answerPersistenceMs,
      resumeRetrievalMs,
      historyLoadMs,
      evaluationMs,
      evaluationPersistenceMs,
      completionMs,
    };

    logger.info(
      {
        sessionId,
        questionNumber:
          question.question_number,
        latency,
      },
      "Final interview answer latency completed",
    );

    return {
      completed: true,
      session: completedSession,
      evaluation: savedEvaluation,
      nextQuestion: null,

      latency,
    };
  }

  // ---------------------------------------
  // 11. Determine next question number
  // ---------------------------------------

  const nextQuestionNumber =
    question.question_number + 1;

  const nextStage =
    getInterviewStage(
      nextQuestionNumber,
    );

  if (!nextStage) {
    throw new AppError(
      "Unable to determine next interview stage.",
      500,
    );
  }

  // ---------------------------------------
  // 12. Retrieve resume context only if
  //     the next stage needs it
  // ---------------------------------------

  let nextResumeContext = "";
  let nextResumeRetrievalMs = 0;

  if (nextStage.useResume) {
    const retrievalQuery = `
Candidate role: ${session.role}

Generate a ${nextStage.difficulty}
${nextStage.type} interview question.

Focus on the candidate's actual projects,
technologies, implementation decisions,
and experience from their resume.
`;

    const nextRetrievalStart =
      performance.now();

    const {
      context: resumeContext,
    } = await retrieveDocumentService(
      userId,
      retrievalQuery,
      "resume",
      2,
    );

    nextResumeRetrievalMs =
      elapsedMs(nextRetrievalStart);

    nextResumeContext =
      resumeContext || "";

    logger.info(
      {
        sessionId,
        questionNumber:
          nextQuestionNumber,
        nextResumeRetrievalMs,
      },
      "Next question resume retrieval completed",
    );
  }

  // ---------------------------------------
  // 13. Generate next question
  //
  // GEMINI QUESTION GENERATION
  // ---------------------------------------

  const {
    question: nextQuestionText,
    latencyMs: nextQuestionGenerationMs,
  } =
    await generateInterviewQuestion({
      role: session.role,
      interviewType:
        session.interview_type,
      questionNumber:
        nextQuestionNumber,
      resumeContext:
        nextResumeContext,
    });

  // ---------------------------------------
  // 14. Save next question
  // ---------------------------------------

  const nextQuestionPersistenceStart =
    performance.now();

  const nextQuestion =
    await createInterviewQuestion({
      sessionId,
      questionNumber:
        nextQuestionNumber,
      questionText:
        nextQuestionText,
    });

  const nextQuestionPersistenceMs =
    elapsedMs(
      nextQuestionPersistenceStart,
    );

  // ---------------------------------------
  // 15. Update interview progress
  // ---------------------------------------

  const progressUpdateStart =
    performance.now();

  await updateInterviewProgress({
    sessionId,
    currentQuestionNumber:
      nextQuestionNumber,
  });

  const progressUpdateMs =
    elapsedMs(progressUpdateStart);

  // ---------------------------------------
  // 16. Total backend latency
  // ---------------------------------------

  const totalBackendMs =
    elapsedMs(totalStart);

  const latency = {
    totalBackendMs,

    sessionLookupMs,
    questionLookupMs,

    answerPersistenceMs,

    resumeRetrievalMs,
    historyLoadMs,

    evaluationMs,
    evaluationPersistenceMs,

    nextResumeRetrievalMs,
    nextQuestionGenerationMs,
    nextQuestionPersistenceMs,

    progressUpdateMs,
  };

  logger.info(
    {
      sessionId,
      questionNumber:
        question.question_number,
      nextQuestionNumber,
      latency,
    },
    "Interview answer processing latency completed",
  );

  // ---------------------------------------
  // 17. Return evaluation + next question
  // ---------------------------------------

  return {
    completed: false,
    sessionId,
    evaluation: savedEvaluation,
    nextQuestion,

    latency,
  };
}

/* =========================================================
   SPEAK INTERVIEW QUESTION
   ========================================================= */

export async function speakInterviewQuestion({
  userId,
  sessionId,
  questionId,
}) {
  const totalStart = performance.now();

  logger.info(
    {
      sessionId,
      questionId,
      userId,
    },
    "Generating interview question speech",
  );

  // ---------------------------------------
  // Question lookup latency
  // ---------------------------------------

  const questionLookupStart =
    performance.now();

  const question =
    await findInterviewQuestionForUser({
      questionId,
      sessionId,
      userId,
    });

  const questionLookupMs =
    elapsedMs(questionLookupStart);

  if (!question) {
    throw new AppError(
      "Interview question not found.",
      404,
    );
  }

  // ---------------------------------------
  // Rime TTS latency
  // ---------------------------------------

  const rimeStart =
    performance.now();

  const audio =
    await generateInterviewSpeech(
      question.question_text,
    );

  const rimeTtsMs =
    elapsedMs(rimeStart);

  // ---------------------------------------
  // Total backend voice latency
  // ---------------------------------------

  const totalBackendMs =
    elapsedMs(totalStart);

  const latency = {
    totalBackendMs,
    questionLookupMs,
    rimeTtsMs,
  };

  logger.info(
    {
      sessionId,
      questionId,
      userId,
      latency,
    },
    "Interview voice generation latency completed",
  );

  return {
    question,
    audio,

    latency,
  };
}

/* =========================================================
   SPEAK TEXT
   ========================================================= */

export async function speakInterviewText(text) {
  if (!text?.trim()) {
    throw new AppError(
      "Text is required.",
      400,
    );
  }

  const totalStart = performance.now();

  // ---------------------------------------
  // Rime TTS latency
  // ---------------------------------------

  const rimeStart =
    performance.now();

  const audio =
    await generateInterviewSpeech(
      text.trim(),
    );

  const rimeTtsMs =
    elapsedMs(rimeStart);

  // ---------------------------------------
  // Total backend latency
  // ---------------------------------------

  const totalBackendMs =
    elapsedMs(totalStart);

  const latency = {
    totalBackendMs,
    rimeTtsMs,
  };

  logger.info(
    {
      latency,
    },
    "Interview text-to-speech latency completed",
  );

  return {
    audio,

    latency,
  };
}