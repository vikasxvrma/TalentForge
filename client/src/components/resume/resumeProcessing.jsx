import { LoaderCircle, FileText, Sparkles } from "lucide-react";

export default function ResumeProcessing({ resume }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <LoaderCircle
            size={34}
            className="animate-spin text-primary"
          />
        </div>

        <h2 className="mt-6 text-xl font-bold text-foreground sm:text-2xl">
          Processing Your Resume
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          We're extracting, analyzing, and indexing your resume so
          TalentForge AI can provide personalized career guidance,
          resume insights, and interview preparation.
        </p>

        <div className="mt-8 w-full max-w-xl rounded-2xl border border-border bg-muted/30 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
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
                Uploaded successfully and waiting for AI processing.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            {resume.status}
          </span>

          <span className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground">
            Usually completes within a few seconds
          </span>
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles
            size={16}
            className="text-primary"
          />

          This page will update automatically when processing finishes.
        </div>
      </div>
    </div>
  );
}