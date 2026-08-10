import { generateText } from "../ai/aiService.js";

export async function evaluateAnswer({
  role,
  difficulty,
  question,
  answer,
  resumeContext,
  previousFeedback,
  questionNumber,
  totalQuestions,
  questionType,
}) {
  const prompt = `
You are a strict but fair technical interviewer evaluating a candidate's answer.

## Interview

Role:
${role}

Overall Difficulty:
${difficulty}

Question Number:
${questionNumber} / ${totalQuestions}

Question Type:
${questionType}

## Question

${question}

## Candidate Answer

${answer}

## Relevant Resume Evidence

${resumeContext || "No resume evidence available."}

## Previous Feedback

${previousFeedback || "None"}

## Evaluation Instructions

Evaluate ONLY the candidate's answer.

Do NOT generate another interview question.

Score the candidate from 0 to 10 on:

1. Technical correctness
2. Depth of understanding
3. Communication clarity

Evaluation should depend on the question type.

For resume/project questions:

- Evaluate whether the candidate demonstrates genuine understanding
  and ownership of the work.
- Do not penalize them for not mentioning irrelevant resume details.

For technical fundamentals:

- Focus on conceptual correctness and clarity.

For practical scenarios:

- Focus on reasoning, problem decomposition, trade-offs,
  and practicality of the proposed solution.

For deep technical questions:

- Focus on depth, technical reasoning, trade-offs,
  and understanding of underlying mechanisms.

For introductory questions:

- Be encouraging and evaluate clarity, relevance,
  and understanding rather than expecting advanced technical depth.

Rules:

- Be strict but fair.
- Do not invent facts about the candidate.
- Use resume evidence only when relevant.
- Do not penalize the candidate for information that was not required.
- Keep strengths concise.
- Keep weaknesses concise.
- Keep feedback under 40 words.
- Return ONLY valid JSON.
- Do not wrap the JSON in markdown.
- Do not include any text before or after the JSON.

Return exactly this structure:

{
  "technicalScore": 0,
  "depthScore": 0,
  "communicationScore": 0,
  "strengths": "",
  "weaknesses": "",
  "feedback": ""
}
`;

  const response =
    await generateText(prompt);

  const cleaned = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error(
      "Failed to parse interview evaluation:",
      response,
    );

    throw new Error(
      "AI returned an invalid interview evaluation.",
      {
        cause: error,
      },
    );
  }
}