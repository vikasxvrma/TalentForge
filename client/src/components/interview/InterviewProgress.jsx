export default function InterviewProgress({
  currentQuestion,
  totalQuestions,
  submitting,
}) {
  const progress =
    currentQuestion > 0
      ? Math.round(
          (currentQuestion / totalQuestions) * 100,
        )
      : 0;

  return (
    <section className="shrink-0 rounded-2xl border border-border bg-surface px-5 py-3.5 shadow-sm sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {Array.from({
            length: totalQuestions,
          }).map((_, index) => {
            const number = index + 1;

            const isCurrent =
              number === currentQuestion;

            const isCompleted =
              number < currentQuestion;

            return (
              <div
                key={number}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  isCurrent
                    ? "bg-primary"
                    : isCompleted
                      ? "bg-primary/50"
                      : "bg-border"
                }`}
              />
            );
          })}
        </div>

        <div className="shrink-0">
          <span className="text-lg font-semibold">
            {currentQuestion}
          </span>

          <span className="text-sm text-muted">
            /{totalQuestions}
          </span>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-muted">
        <span>{progress}% complete</span>

        <span className="hidden sm:inline">
          {submitting
            ? "Preparing next question..."
            : "Take your time"}
        </span>
      </div>
    </section>
  );
}