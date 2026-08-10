export default function InterviewHeader({
  mode = "setup",
  role,
  interviewType,
}) {
  const isInterview = mode === "interview";

  return (
    <header className="flex shrink-0 items-center justify-between border-b border-border pb-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              d="M12 3v18M3 12h18"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight">
            TalentForge
          </p>

          <p className="truncate text-xs text-muted">
            {isInterview
              ? `${role} · ${interviewType}`
              : "Mock Interview"}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />

        <span className="hidden sm:inline">
          {isInterview ? "AI Interview" : "Interview Setup"}
        </span>

        <span className="text-foreground">
          {isInterview ? "Active" : ""}
        </span>
      </div>
    </header>
  );
}