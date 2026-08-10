export const INTERVIEW_BLUEPRINT = [
  {
    questionNumber: 1,
    type: "resume_intro",
    difficulty: "easy",
    useResume: true,
    instruction: `
Start with a light, conversational question about the candidate's
background, skills, or one project from their resume.
The candidate should feel comfortable answering this question.
Do not ask a deep technical question.
`,
  },

  {
    questionNumber: 2,
    type: "technical_fundamentals",
    difficulty: "easy-medium",
    useResume: false,
    instruction: `
Ask a core technical fundamentals question relevant to the candidate's role.
Do not make it a follow-up to question 1.
`,
  },

  {
    questionNumber: 3,
    type: "practical_scenario",
    difficulty: "medium",
    useResume: false,
    instruction: `
Give the candidate a realistic engineering scenario relevant to their role.
Ask how they would approach solving it.
Do not directly follow up on the previous question.
`,
  },

  {
    questionNumber: 4,
    type: "resume_project",
    difficulty: "medium-hard",
    useResume: true,
    instruction: `
Ask about one project, technology, or engineering decision from the
candidate's resume.
Focus on understanding their actual ownership and implementation.
Do not ask an unnecessarily obscure or extremely difficult question.
`,
  },

  {
    questionNumber: 5,
    type: "deep_technical",
    difficulty: "hard",
    useResume: true,
    instruction: `
Ask one challenging technical question relevant to the candidate's role.
It can use a project or technology from the resume, but should test
deeper understanding, trade-offs, architecture, or practical reasoning.
`,
  },
];

export function getInterviewStage(questionNumber) {
  return INTERVIEW_BLUEPRINT[questionNumber - 1] ?? null;
}