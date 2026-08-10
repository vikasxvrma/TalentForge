export default function InterviewIntro() {
  return (
    <section className="relative flex min-h-0 flex-col justify-between overflow-hidden rounded-[1.5rem] border border-border bg-surface p-6 shadow-xl sm:p-8 lg:p-9">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          AI Career Intelligence
        </div>

        <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          Prepare for the
          <span className="block text-muted">
            interview that matters.
          </span>
        </h1>

        <p className="mt-4 max-w-md text-sm leading-6 text-muted sm:text-base sm:leading-7">
          Customize your interview and make sure your
          environment is ready before TalentForge begins.
        </p>
      </div>

      <div className="relative mt-8 space-y-3">
        <Feature
          icon={
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z"
                strokeLinecap="round"
              />

              <path
                d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v3M9 21h6"
                strokeLinecap="round"
              />
            </svg>
          }
          title="Voice-first interview"
          description="Speak naturally with the AI interviewer."
        />

        <Feature
          icon={
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                d="M4 19V5M4 19h16"
                strokeLinecap="round"
              />

              <path
                d="m7 15 3-4 3 2 5-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          title="AI evaluation"
          description="Receive structured feedback after each answer."
        />
      </div>
    </section>
  );
}

function Feature({
  icon,
  title,
  description,
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/70 p-3.5 backdrop-blur">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-muted">
          {description}
        </p>
      </div>
    </div>
  );
}