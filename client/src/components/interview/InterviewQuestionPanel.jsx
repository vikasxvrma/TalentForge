export default function InterviewQuestionPanel({
  question,
  interviewType,
  transcript,
  isRecording,
  submitting,
  onSubmit,
}) {
  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.5rem] border border-border bg-surface p-5 shadow-xl sm:p-7">
      {/* Question header */}

      <div className="flex shrink-0 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <QuestionIcon />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
              Question
            </p>

            <p className="mt-0.5 text-sm text-muted">
              Question {question.question_number}
            </p>
          </div>
        </div>

        <div className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium capitalize text-muted">
          {interviewType}
        </div>
      </div>

      {/* Question */}

      <div className="min-h-0 flex-1 overflow-y-auto py-7">
        <p className="text-2xl font-semibold leading-[1.35] tracking-tight sm:text-3xl">
          {question.question_text}
        </p>

        <div className="mt-7 flex items-center gap-2 text-sm text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />

          {isRecording
            ? "Your answer is being transcribed"
            : "Answer when you're ready"}
        </div>
      </div>

      {/* Answer */}

      <div className="shrink-0 border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
            Your Answer
          </p>

          {isRecording && (
            <div className="flex items-center gap-2 text-xs font-medium text-danger">
              <span className="h-2 w-2 animate-pulse rounded-full bg-danger" />

              Listening
            </div>
          )}
        </div>

        <div className="mt-3 max-h-28 min-h-[68px] overflow-y-auto rounded-2xl border border-border bg-background p-4">
          {transcript ? (
            <p className="text-sm leading-6">
              {transcript}
            </p>
          ) : (
            <p className="text-sm leading-6 text-muted">
              Your transcript will appear here as you
              answer...
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onSubmit}
          disabled={
            !transcript.trim() ||
            submitting ||
            isRecording
          }
          className="mt-3 flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-background px-6 py-3.5 text-sm font-semibold transition-all duration-200 hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground" />

              Evaluating your answer...
            </>
          ) : (
            <>
              Submit Answer

              <ArrowRight />
            </>
          )}
        </button>
      </div>
    </section>
  );
}

function QuestionIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
      />

      <path
        d="M9.5 9a2.5 2.5 0 1 1 4.4 1.6c-.9.9-1.9 1.2-1.9 2.4M12 16h.01"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}