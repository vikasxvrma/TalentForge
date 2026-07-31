import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    title: "Dashboard",
    description: "Overview of your career workspace.",
    icon: LayoutDashboard,
  },
  {
    name: "Resume",
    href: "/resume",
    title: "Resume",
    description: "Upload and manage your resume.",
    icon: FileText,
  },
  {
    name: "AI Chat",
    href: "/chat",
    title: "AI Career Assistant",
    description: "Chat with your AI career assistant.",
    icon: MessageSquare,
  },
  {
    name: "Analytics",
    href: "/analytics",
    title: "Analytics",
    description: "Track your interview progress.",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/settings",
    title: "Settings",
    description: "Manage your account preferences.",
    icon: Settings,
  },
];