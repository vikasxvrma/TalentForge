export default function AIInterviewerPanel({
  isSpeaking,
  isRecording,
  submitting,
  onStartRecording,
  onStopRecording,
}) {
  const status = getStatus({
    isSpeaking,
    isRecording,
    submitting,
  });

  return (
    <section className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.5rem] border border-border bg-surface shadow-xl lg:min-h-0">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative flex shrink-0 items-center justify-between p-5 sm:p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            AI Interviewer
          </p>

          <p className="mt-1 text-sm font-medium">
            TalentForge AI
          </p>
        </div>

        <div
          className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${
            isRecording
              ? "border-danger/30 bg-danger/5 text-danger"
              : "border-border bg-background text-muted"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isRecording
                ? "animate-pulse bg-danger"
                : "bg-primary"
            }`}
          />

          {status.label}
        </div>
      </div>

      <div className="relative flex min-h-[220px] flex-1 items-center justify-center">
        <AIOrb
          isSpeaking={isSpeaking}
          isRecording={isRecording}
        />
      </div>

      <div className="relative shrink-0 px-6 text-center">
        <h2 className="text-xl font-semibold">
          {status.label}
        </h2>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">
          {status.description}
        </p>
      </div>

      <div className="relative shrink-0 p-5 sm:p-6">
        {!isRecording ? (
          <button
            type="button"
            onClick={onStartRecording}
            disabled={submitting}
            className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/25 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-foreground/15">
              <MicrophoneIcon />
            </span>

            {isSpeaking
              ? "Interrupt & Answer"
              : "Start Answer"}
          </button>
        ) : (
          <button
            type="button"
            onClick={onStopRecording}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-danger/30 bg-danger/5 px-6 py-3.5 text-sm font-semibold text-danger transition-all duration-200 hover:bg-danger/10"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-danger/10">
              <span className="h-3 w-3 rounded-sm bg-danger" />
            </span>

            Stop Recording
          </button>
        )}
      </div>
    </section>
  );
}

function getStatus({
  isSpeaking,
  isRecording,
  submitting,
}) {
  if (submitting) {
    return {
      label: "Evaluating",
      description:
        "Preparing your next question...",
    };
  }

  if (isRecording) {
    return {
      label: "Listening to you",
      description:
        "Take your time and explain your reasoning.",
    };
  }

  if (isSpeaking) {
    return {
      label: "AI is speaking",
      description:
        "Listen carefully. You can interrupt when you're ready to answer.",
    };
  }

  return {
    label: "Your turn",
    description:
      "When you're ready, start answering.",
  };
}

function AIOrb({
  isSpeaking,
  isRecording,
}) {
  return (
    <div className="relative flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
      <div
        className={`absolute inset-0 rounded-full border border-primary/10 ${
          isSpeaking || isRecording
            ? "animate-pulse"
            : ""
        }`}
      />

      <div className="absolute inset-5 rounded-full border border-primary/10" />

      <div className="absolute inset-10 rounded-full bg-primary/5" />

      <div
        className={`relative flex h-32 w-32 items-center justify-center rounded-full border border-primary/30 bg-primary/10 shadow-2xl shadow-primary/20 transition-all duration-500 ${
          isSpeaking
            ? "scale-110 shadow-primary/30"
            : isRecording
              ? "scale-105"
              : ""
        }`}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-xl shadow-primary/30">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-9 w-9"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path
              d="M12 3v3M6.5 6.5l2.1 2.1M3 12h3M6.5 17.5l2.1-2.1M12 21v-3M17.5 17.5l-2.1-2.1M21 12h-3M17.5 6.5l-2.1 2.1"
              strokeLinecap="round"
            />

            <circle
              cx="12"
              cy="12"
              r="3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MicrophoneIcon() {
  return (
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
  );
}