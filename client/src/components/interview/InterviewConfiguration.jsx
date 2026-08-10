import {
  DIFFICULTY_OPTIONS,
  INTERVIEW_TYPE_OPTIONS,
  QUESTION_COUNT_OPTIONS,
  ROLE_OPTIONS,
} from "../../hooks/interview/useInterviewConfig";
import InterviewEnvironment from "./IntrerviewEnvironment";


export default function InterviewConfiguration({
  config,
  environment,
  onStart,
  loading,
}) {
  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-[1.5rem] border border-border bg-surface shadow-xl">
      <div className="min-h-0 flex-1 overflow-y-auto p-6 sm:p-7 lg:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Interview configuration
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Make it yours.
          </h2>

          <p className="mt-2 text-sm text-muted">
            Choose how you want TalentForge to evaluate you.
          </p>
        </div>

        {/* Role */}

        <div className="mt-6">
          <label
            htmlFor="interview-role"
            className="text-xs font-semibold uppercase tracking-[0.15em] text-muted"
          >
            Role
          </label>

          <div className="relative mt-2">
            <select
              id="interview-role"
              value={config.role}
              onChange={(event) =>
                config.setRole(event.target.value)
              }
              className="w-full appearance-none rounded-xl border border-border bg-background px-4 py-3.5 pr-11 text-sm font-medium outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
            >
              {ROLE_OPTIONS.map((option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ))}
            </select>

            <ChevronDown />
          </div>
        </div>

        {/* Interview type */}

        <SelectionSection title="Interview type">
          <div className="grid gap-2 sm:grid-cols-3">
            {INTERVIEW_TYPE_OPTIONS.map(
              (option) => (
                <SelectionCard
                  key={option.value}
                  selected={
                    config.interviewType ===
                    option.value
                  }
                  onClick={() =>
                    config.setInterviewType(
                      option.value,
                    )
                  }
                  title={option.label}
                  description={option.description}
                />
              ),
            )}
          </div>
        </SelectionSection>

        {/* Difficulty */}

        <SelectionSection title="Difficulty">
          <div className="grid grid-cols-3 gap-2">
            {DIFFICULTY_OPTIONS.map((option) => (
              <SelectionCard
                key={option.value}
                selected={
                  config.difficulty ===
                  option.value
                }
                onClick={() =>
                  config.setDifficulty(
                    option.value,
                  )
                }
                title={option.label}
                description={option.description}
                centered
              />
            ))}
          </div>
        </SelectionSection>

        {/* Questions */}

        <SelectionSection title="Questions">
          <div className="grid grid-cols-3 gap-2">
            {QUESTION_COUNT_OPTIONS.map(
              (count) => (
                <SelectionCard
                  key={count}
                  selected={
                    config.totalQuestions ===
                    count
                  }
                  onClick={() =>
                    config.setTotalQuestions(count)
                  }
                  title={String(count)}
                  description="questions"
                  centered
                />
              ),
            )}
          </div>
        </SelectionSection>

        {/* Environment */}

        <div className="mt-6">
          <InterviewEnvironment
            isFullscreen={
              environment.isFullscreen
            }
            microphoneStatus={
              environment.microphoneStatus
            }
            microphoneError={
              environment.microphoneError
            }
            onEnterFullscreen={
              environment.enterFullscreen
            }
            onRequestMicrophone={
              environment.requestMicrophone
            }
          />
        </div>
      </div>

      {/* Start action */}

      {environment.environmentReady && (
        <div className="shrink-0 border-t border-border bg-surface p-5 sm:p-6">
          <button
            type="button"
            onClick={onStart}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/25 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />

                Preparing your interview...
              </>
            ) : (
              <>
                Start Interview

                <ArrowRight />
              </>
            )}
          </button>
        </div>
      )}

      {!environment.environmentReady && (
        <div className="shrink-0 border-t border-border px-5 py-4 text-center text-xs text-muted">
          Complete the environment checks to continue.
        </div>
      )}
    </section>
  );
}

function SelectionSection({
  title,
  children,
}) {
  return (
    <div className="mt-5">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
        {title}
      </p>

      <div className="mt-2">{children}</div>
    </div>
  );
}

function SelectionCard({
  selected,
  onClick,
  title,
  description,
  centered = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border p-3 text-left transition-all duration-200 ${
        centered ? "text-center" : ""
      } ${
        selected
          ? "border-primary bg-primary/5 text-primary shadow-sm"
          : "border-border bg-background text-foreground hover:bg-surface-hover"
      }`}
    >
      <div
        className={`flex items-center gap-2 ${
          centered
            ? "justify-center"
            : "justify-between"
        }`}
      >
        <span className="text-sm font-medium">
          {title}
        </span>

        {selected && <Check />}
      </div>

      {description && (
        <p className="mt-1 text-[11px] leading-4 text-muted">
          {description}
        </p>
      )}
    </button>
  );
}

function Check() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-3 w-3"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path
          d="m5 12 4 4L19 6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function ChevronDown() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="m6 9 6 6 6-6"
        strokeLinecap="round"
        strokeLinejoin="round"
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