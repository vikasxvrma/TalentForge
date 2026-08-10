export default function ScoreGrid({ evaluation }) {
  if (!evaluation) {
    return null;
  }

  const scores = [
    {
      label: "Technical",
      value: evaluation.technical_score,
      description: "Technical accuracy",
    },
    {
      label: "Depth",
      value: evaluation.depth_score,
      description: "Depth of reasoning",
    },
    {
      label: "Communication",
      value: evaluation.communication_score,
      description: "Clarity of explanation",
    },
  ];

  const getScoreColor = (score) => {
    if (score >= 8) {
      return "text-emerald-500";
    }

    if (score >= 6) {
      return "text-primary";
    }

    if (score >= 4) {
      return "text-amber-500";
    }

    return "text-danger";
  };

  return (
    <div className="mt-6">
      {/* Header */}
      <div className="mb-4">
        <p className="text-sm font-medium text-muted">
          Answer evaluation
        </p>

        <h3 className="mt-1 text-lg font-semibold tracking-tight">
          How you performed
        </h3>
      </div>

      {/* Score Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {scores.map((score) => (
          <div
            key={score.label}
            className="
              rounded-xl
              border border-border
              bg-surface
              p-4
              transition-colors
              duration-200
              hover:bg-surface-hover
            "
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium">
                  {score.label}
                </p>

                <p className="mt-1 text-xs text-muted">
                  {score.description}
                </p>
              </div>

              <div
                className={`shrink-0 text-xl font-semibold ${getScoreColor(
                  score.value,
                )}`}
              >
                {score.value}
                <span className="ml-0.5 text-sm text-muted">
                  /10
                </span>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-background">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{
                  width: `${Math.min(
                    Math.max(
                      Number(score.value) * 10,
                      0,
                    ),
                    100,
                  )}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Feedback */}
      {evaluation.feedback && (
        <div className="mt-4 rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  d="M8 10h8M8 14h5"
                  strokeLinecap="round"
                />

                <path
                  d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6l-4 3v-3H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p className="font-medium">
              Interviewer feedback
            </p>
          </div>

          <p className="mt-3 text-sm leading-6 text-muted">
            {evaluation.feedback}
          </p>
        </div>
      )}
    </div>
  );
}