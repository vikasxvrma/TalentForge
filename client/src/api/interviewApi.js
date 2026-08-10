import client from "./client";
import apiClient from "./client";

export const startInterview = async ({
  role,
  interviewType,
  difficulty,
  totalQuestions,
}) => {
  const response = await client.post("/interviews", {
    role,
    interviewType,
    difficulty,
    totalQuestions,
  });

  return response.data;
};

export const submitInterviewAnswer = async ({
  sessionId,
  questionId,
  answer,
}) => {
  const response = await client.post(
    `/interviews/${sessionId}/answer`,
    {
      questionId,
      answer,
    },
  );

  return response.data;
};

export const getInterviewQuestionAudio = async ({
  sessionId,
  questionId,
}) => {
  const response = await client.post(
    `/interviews/${sessionId}/speak`,
    {
      questionId,
    },
    {
      responseType: "blob",
    },
  );

  return response.data;
};
export async function speakInterviewText(text) {
  const response = await client.post(
    "/interviews/speak-text",
    {
      text,
    },
    {
      responseType: "blob",
    },
  );

  return response.data;
}