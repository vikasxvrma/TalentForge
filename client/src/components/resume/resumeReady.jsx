import {
  CheckCircle2,
  FileText,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ResumeReady({ resume }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2
            size={34}
            className="text-primary"
          />
        </div>

        <h2 className="mt-5 text-xl sm:text-2xlfont-bold text-foreground">
          Resume Ready
        </h2>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Your resume has been successfully processed and indexed.
          TalentForge AI is now ready to answer questions about your
          resume, generate interview preparation, and provide
          personalized career guidance.
        </p>

        <div className="mt-8 w-full max-w-xl rounded-xl border border-border bg-muted/30 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="rounded-lg bg-primary/10 p-3">
              <FileText
                size={22}
                className="text-primary"
              />
            </div>

            <div className="min-w-0 flex-1 text-left">
              <p className="truncate font-medium text-foreground">
                {resume.file_name}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Processed on{" "}
                {new Date(
                  resume.processed_at
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

       <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
          <Link
            to="/chat"
            className="inline-flex w-full justify-center sm:w-auto items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90"
          >
            <MessageSquare size={18} />
            Open AI Workspace 
          </Link>

          <button
            disabled
            className="rounded-xl w-full sm:w-auto cursor-not-allowed border border-border px-6 py-3 text-sm font-medium text-muted-foreground opacity-60"
          >
            Replace Resume
            <span className="  ml-2 text-xs">(Coming Soon)</span>
          </button>
        </div>
      </div>
    </div>
  );
}