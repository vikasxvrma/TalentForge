import {
  CircleAlert,
  RotateCcw,
} from "lucide-react";

import ResumeUpload from "./ResumeUpload";

export default function ResumeFailed({ resume }) {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
            <CircleAlert
              size={34}
              className="text-red-400"
            />
          </div>

          <h2 className="mt-6 text-xl font-bold text-foreground sm:text-2xl">
            Resume Processing Failed
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            We couldn't process your resume this time. This can happen
            if the file is corrupted, password protected, or contains
            unsupported formatting.
          </p>

          {resume?.failed_reason && (
            <div className="mt-8 w-full max-w-xl rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-left">
              <p className="text-sm font-medium text-red-300">
                Failure Reason
              </p>

              <p className="mt-2 text-sm leading-6 text-red-200">
                {resume.failed_reason}
              </p>
            </div>
          )}

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2">
            <RotateCcw
              size={16}
              className="text-red-400"
            />

            <span className="text-sm text-red-300">
              Try uploading your resume again
            </span>
          </div>
        </div>
      </div>

      <ResumeUpload />
    </div>
  );
}