import {
  FileText,
  MessageSquare,
  BarChart3,
  Brain,
} from "lucide-react";

export const workspaceModules = [
  {
    title: "Resume Studio",
    description:
      "Upload, analyze and improve your resume using AI-powered insights.",
    icon: FileText,
    href: "/resume",
    requiresAuth: true,
  },
  {
    title: "AI Career Assistant",
    description:
      "Chat with your resume and receive personalized career guidance.",
    icon: MessageSquare,
    href: "/chat",
    requiresAuth: true,
  },
  {
    title: "Career Analytics",
    description:
      "Track interview performance and measure your career progress.",
    icon: BarChart3,
    href: "/analytics",
    requiresAuth: true,
  },
  {
    title: "Interview Practice",
    description:
      "Practice mock interviews with AI and receive instant feedback.",
    icon: Brain,
    href: "/chat",
    requiresAuth: true,
  },
];