import { useState } from "react";

const DEFAULT_CONFIG = {
  role: "Backend Developer",
  interviewType: "technical",
  difficulty: "medium",
  totalQuestions: 5,
};

export const ROLE_OPTIONS = [
  "Backend Developer",
  "Frontend Developer",
  "Full Stack Developer",
  "Software Engineer",
  "AI/ML Engineer",
  "DevOps Engineer",
  "Data Engineer",
];

export const INTERVIEW_TYPE_OPTIONS = [
  {
    value: "technical",
    label: "Technical",
    description: "Technical knowledge & problem solving",
  },
  {
    value: "behavioral",
    label: "Behavioral",
    description: "Experience & communication",
  },
  {
    value: "mixed",
    label: "Mixed",
    description: "Technical + behavioral",
  },
];

export const DIFFICULTY_OPTIONS = [
  {
    value: "easy",
    label: "Easy",
    description: "Foundational",
  },
  {
    value: "medium",
    label: "Medium",
    description: "Interview level",
  },
  {
    value: "hard",
    label: "Hard",
    description: "Challenging",
  },
];

export const QUESTION_COUNT_OPTIONS = [5, 10, 15];

export default function useInterviewConfig() {
  const [role, setRole] = useState(DEFAULT_CONFIG.role);

  const [interviewType, setInterviewType] = useState(
    DEFAULT_CONFIG.interviewType,
  );

  const [difficulty, setDifficulty] = useState(
    DEFAULT_CONFIG.difficulty,
  );

  const [totalQuestions, setTotalQuestions] = useState(
    DEFAULT_CONFIG.totalQuestions,
  );

  const resetConfig = () => {
    setRole(DEFAULT_CONFIG.role);
    setInterviewType(DEFAULT_CONFIG.interviewType);
    setDifficulty(DEFAULT_CONFIG.difficulty);
    setTotalQuestions(DEFAULT_CONFIG.totalQuestions);
  };

  return {
    role,
    interviewType,
    difficulty,
    totalQuestions,

    setRole,
    setInterviewType,
    setDifficulty,
    setTotalQuestions,

    resetConfig,
  };
}