import { BarChart3, Clock3, Sparkles } from "lucide-react";

export default function Analytics() {
  return (
    <div className="flex min-h-[calc(100vh-9rem)] items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl rounded-3xl border border-border bg-card p-6 text-center shadow-xl sm:p-8 lg:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 sm:h-20 sm:w-20">
          <BarChart3
            size={36}
            className="text-blue-400 sm:h-10 sm:w-10"
          />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-foreground sm:mt-8 sm:text-3xl">
          Analytics Coming Soon
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          TalentForge Analytics will provide deep insights into your
          interview performance, resume effectiveness, application
          progress, and AI usage—all in one place.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-background/50 p-5 sm:mt-10 sm:p-6">
          <div className="mb-5 flex items-center justify-center gap-2">
            <Sparkles
              size={18}
              className="text-primary"
            />

            <span className="font-semibold text-foreground">
              Planned Features
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Feature text="Resume Match Score" />
            <Feature text="Interview Performance" />
            <Feature text="Skill Progress Tracking" />
            <Feature text="AI Conversation Insights" />
            <Feature text="Application Analytics" />
            <Feature text="Learning Recommendations" />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-center">
            <Clock3
              size={16}
              className="text-amber-400"
            />

            <span className="text-sm text-amber-300">
              Available in a future release
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
      <div className="h-2 w-2 flex-shrink-0 rounded-full bg-emerald-400" />

      <span className="text-sm text-foreground">
        {text}
      </span>
    </div>
  );
}