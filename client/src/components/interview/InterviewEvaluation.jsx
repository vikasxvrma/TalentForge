import ScoreGrid from "./interviewScoreGrid";

export default function InterviewEvaluation({
  evaluation,
  final = false,
}) {
  if (!evaluation) {
    return null;
  }

  if (final) {
    return (
      <div className="w-full max-w-2xl rounded-[2rem] border border-border bg-surface p-8 text-center shadow-2xl sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <CheckIcon />
        </div>

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Interview Complete
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Great work.
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted">
          You have completed your TalentForge mock
          interview. Here's your evaluation.
        </p>

        <ScoreGrid evaluation={evaluation} />

        {evaluation.feedback && (
          <div className="mt-6 rounded-2xl border border-border bg-background p-5 text-left">
            <p className="text-sm font-medium">
              Feedback
            </p>

            <p className="mt-3 text-sm leading-7 text-muted">
              {evaluation.feedback}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="rounded-2xl border border-border bg-surface px-4 py-3 shadow-sm sm:px-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">
              Latest evaluation
            </p>

            <p className="mt-0.5 truncate text-xs text-muted">
              Feedback from your previous answer
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
          Evaluated
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <Score
          label="Technical"
          value={evaluation.technical_score}
        />

        <Score
          label="Depth"
          value={evaluation.depth_score}
        />

        <Score
          label="Communication"
          value={evaluation.communication_score}
        />
      </div>

      {evaluation.feedback && (
        <p className="mt-3 truncate text-xs leading-5 text-muted">
          {evaluation.feedback}
        </p>
      )}
    </section>
  );
}

function Score({ label, value }) {
  return (
    <div className="rounded-xl border border-border bg-background px-3 py-2">
      <div className="flex items-baseline gap-1">
        <span className="text-base font-semibold">
          {value}
        </span>

        <span className="text-[10px] text-muted">
          /10
        </span>
      </div>

      <p className="mt-0.5 text-[10px] text-muted">
        {label}
      </p>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-8 w-8"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="m5 12 4 4L19 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}