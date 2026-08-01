import {
  Sparkles,
  FileText,
  Briefcase,
  GraduationCap,
  MessageCircle,
} from "lucide-react";

const suggestions = [
  {
    icon: FileText,
    text: "Review my resume",
  },
  {
    icon: Briefcase,
    text: "Prepare for interviews",
  },
  {
    icon: GraduationCap,
    text: "Explain React hooks",
  },
  {
    icon: MessageCircle,
    text: "Mock HR interview",
  },
];

export default function EmptyWorkspace() {
  return (
    <div className="flex flex-1 items-start justify-center overflow-y-auto px-6 py-10 sm:items-center sm:py-0">
      <div className="w-full max-w-3xl text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Sparkles
            size={38}
            className="text-primary"
          />
        </div>

        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
          What would you like to work on?
        </h2>

        <p className="mt-4 text-base leading-8 text-muted sm:text-lg">
          Ask questions about your resume, prepare for interviews,
          improve your skills, or explore career opportunities with
          TalentForge AI.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {suggestions.map(({ icon: Icon, text }) => (
            <button
              key={text}
              className="group flex items-center gap-3 rounded-2xl border border-border bg-surface p-5 text-left transition-all duration-200 hover:border-primary/30 hover:bg-surface-hover"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition group-hover:bg-primary/15">
                <Icon
                  size={18}
                  className="text-primary"
                />
              </div>

              <span className="font-medium text-foreground">
                {text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}