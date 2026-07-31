import {
  ArrowRight,
  CheckCircle2,
  FileText,
  LoaderCircle,
  Upload,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useResume } from "../../hooks/useResume.js";


export default function ResumeCard() {
  const navigate = useNavigate();

  const {
    isLoading,
    hasResume,
    isProcessing,
    isResumeReady,
  } = useResume();

  if (isLoading) {
    return (
      <section className="rounded-3xl border border-border bg-card p-8 shadow-sm">
        <div className="animate-pulse">
          <div className="mb-6 h-14 w-14 rounded-2xl bg-muted" />

          <div className="mb-4 h-7 w-36 rounded-md bg-muted" />

          <div className="space-y-2">
            <div className="h-4 w-full rounded-md bg-muted" />
            <div className="h-4 w-3/4 rounded-md bg-muted" />
          </div>

          <div className="mt-8 h-12 w-44 rounded-xl bg-muted" />
        </div>
      </section>
    );
  }

  if (!hasResume) {
    return (
      <section className="rounded-3xl border border-border bg-card p-8 transition-all duration-200 hover:border-primary/30">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <FileText className="text-primary" size={26} />
        </div>

        <h2 className="text-2xl font-semibold text-foreground">
          Resume
        </h2>

        <p className="mt-4 text-muted-foreground">
          No resume uploaded yet.
        </p>

        <p className="mt-1 text-muted-foreground">
          Upload your resume to unlock your AI Career Workspace.
        </p>

        <button
          onClick={() => navigate("/resume")}
          className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-5 py-3 text-primary-foreground transition-all hover:opacity-90"
        >
          <Upload size={18} />
          Upload Resume
          <ArrowRight size={16} />
        </button>
      </section>
    );
  }

  if (isProcessing) {
    return (
      <section className="rounded-3xl border border-border bg-card p-8 transition-all duration-200 hover:border-primary/30">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <LoaderCircle
            className="animate-spin text-primary"
            size={26}
          />
        </div>

        <h2 className="text-2xl font-semibold text-foreground">
          Resume Processing
        </h2>

        <p className="mt-4 text-muted-foreground">
          TalentForge is analyzing your resume and preparing your AI workspace.
        </p>

        <p className="mt-1 text-muted-foreground">
          This usually takes less than a minute.
        </p>

        <button
          disabled
          className="mt-8 inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-border px-5 py-3 text-muted-foreground"
        >
          <LoaderCircle
            size={18}
            className="animate-spin"
          />
          Processing...
        </button>
      </section>
    );
  }

  if (isResumeReady) {
    return (
      <section className="rounded-3xl border border-border bg-card p-8 transition-all duration-200 hover:border-primary/30">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10">
          <CheckCircle2
            className="text-green-500"
            size={26}
          />
        </div>

        <h2 className="text-2xl font-semibold text-foreground">
          Resume Ready
        </h2>

        <p className="mt-4 text-muted-foreground">
          Your resume has been successfully analyzed.
        </p>

        <p className="mt-1 text-muted-foreground">
          Start working with your AI-powered career assistant.
        </p>

        <button
          onClick={() => navigate("/chat")}
          className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-5 py-3 text-primary-foreground transition-all hover:opacity-90"
        >
          Open AI Workspace
          <ArrowRight size={16} />
        </button>
      </section>
    );
  }

  return null;
}