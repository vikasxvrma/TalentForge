export default function InterviewEnvironment({
  isFullscreen,
  microphoneStatus,
  microphoneError,
  onEnterFullscreen,
  onRequestMicrophone,
}) {
  const microphoneReady =
    microphoneStatus === "granted";

  const microphoneRequesting =
    microphoneStatus === "requesting";

  const microphoneUnsupported =
    microphoneStatus === "unsupported";

  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold">
            Interview environment
          </p>

          <p className="mt-1 text-xs text-muted">
            Both checks are required before starting.
          </p>
        </div>

        {isFullscreen && microphoneReady && (
          <StatusCheck />
        )}
      </div>

      <div className="mt-4 space-y-2">
        <EnvironmentItem
          icon={
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3"
                strokeLinecap="round"
              />
            </svg>
          }
          title="Full screen"
          description={
            isFullscreen
              ? "Ready"
              : "Required for the interview"
          }
          ready={isFullscreen}
          action={
            !isFullscreen && (
              <button
                type="button"
                onClick={onEnterFullscreen}
                className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold transition-colors hover:bg-surface-hover"
              >
                Enter
              </button>
            )
          }
        />

        <EnvironmentItem
          icon={
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4"
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
          title="Microphone"
          description={
            microphoneReady
              ? "Ready"
              : microphoneRequesting
                ? "Requesting access..."
                : microphoneUnsupported
                  ? "Not supported"
                  : "Permission required"
          }
          ready={microphoneReady}
          action={
            !microphoneReady &&
            !microphoneUnsupported && (
              <button
                type="button"
                onClick={onRequestMicrophone}
                disabled={microphoneRequesting}
                className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                {microphoneRequesting
                  ? "Allowing..."
                  : "Allow"}
              </button>
            )
          }
        />
      </div>

      {microphoneUnsupported && (
        <p className="mt-3 text-xs leading-5 text-danger">
          Microphone recording is not supported in this
          browser. Please use a modern browser with
          microphone support.
        </p>
      )}

      {microphoneError && (
        <p className="mt-3 text-xs leading-5 text-danger">
          {microphoneError}
        </p>
      )}
    </div>
  );
}

function EnvironmentItem({
  icon,
  title,
  description,
  ready,
  action,
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-3 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
            ready
              ? "bg-primary/10 text-primary"
              : "bg-background text-muted"
          }`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium">
            {title}
          </p>

          <p className="truncate text-xs text-muted">
            {description}
          </p>
        </div>
      </div>

      {ready ? (
        <span className="shrink-0 text-xs font-medium text-primary">
          Ready
        </span>
      ) : (
        action
      )}
    </div>
  );
}

function StatusCheck() {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-4 w-4"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path
          d="m5 12 4 4L19 6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}