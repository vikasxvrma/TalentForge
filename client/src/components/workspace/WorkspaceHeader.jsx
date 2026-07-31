import {
  FileText,
  LoaderCircle,
  Sparkles,
  TriangleAlert,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useResume } from "../../hooks/useResume";

export default function WorkspaceHeader({
  onMenuClick,
}) {
  const {
    resume,
    hasResume,
    isResumeReady,
    isProcessing,
  } = useResume();

  const navigate = useNavigate();

  const renderResumeBadge = () => {
    if (!hasResume) {
      return (
        <button
          onClick={() => navigate("/resume")}
          className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-sm transition hover:bg-amber-500/15"
        >
          <FileText
            size={16}
            className="text-amber-500"
          />

          <span className="hidden sm:inline text-amber-600 dark:text-amber-300">
            Upload Resume
          </span>
        </button>
      );
    }

    if (isProcessing) {
      return (
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-2">
          <LoaderCircle
            size={16}
            className="animate-spin text-sky-500"
          />

          <span className="hidden sm:inline text-sm text-sky-600 dark:text-sky-300">
            Processing
          </span>
        </div>
      );
    }

    if (isResumeReady) {
      return (
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-2">
          <Sparkles
            size={16}
            className="text-emerald-500"
          />

          <span className="hidden sm:inline text-sm text-emerald-600 dark:text-emerald-300">
            Resume Ready
          </span>
        </div>
      );
    }

    if (resume?.status === "FAILED") {
      return (
        <button
          onClick={() => navigate("/resume")}
          className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-2 transition hover:bg-red-500/15"
        >
          <TriangleAlert
            size={16}
            className="text-red-500"
          />

          <span className="hidden sm:inline text-sm text-red-600 dark:text-red-300">
            Processing Failed
          </span>
        </button>
      );
    }

    return null;
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-background px-4 sm:px-6 lg:px-8">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 transition hover:bg-surface lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-lg font-semibold text-foreground">
            AI Workspace
          </h1>

          <p className="hidden text-sm text-muted sm:block">
            Powered by TalentForge AI
          </p>
        </div>
      </div>

      {/* Right */}
      {renderResumeBadge()}
    </header>
  );
}