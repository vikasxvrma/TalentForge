import {
  FileText,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import ResumeUpload from "./resumeUpload";

function ResumeEmpty() {
  return (
    <div className="space-y-4">
      {/* Header */}

      <div>
        <h1 className="text-2xl sm:text-3xlfont-bold">
          Resume
        </h1>

        <p className="mt-2 text-muted-foreground">
          Upload your resume to unlock AI-powered career insights.
        </p>
      </div>

      {/* Upload Card */}

      <ResumeUpload />

      {/* AI Pipeline */}

      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">

        <h3 className="text-xl font-semibold">
          What happens next?
        </h3>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <FileText className="text-primary" />
            </div>
            <h4 className="font-medium">
              Upload
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Your resume is securely uploaded to cloud storage.
            </p>
          </div>

          <div>
            <Sparkles className="mb-4 text-primary" />
            <h4 className="font-medium">
              AI Processing
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              TalentForge extracts, analyzes and embeds your resume.
            </p>
          </div>

          <div>
            <MessageSquare className="mb-4 text-primary" />
            <h4 className="font-medium">
              Start Chatting
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Ask questions about your resume instantly.
            </p>
          </div>

        </div>

      </section>
    </div>
  );
}

export default ResumeEmpty;