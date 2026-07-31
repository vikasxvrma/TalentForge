import {
  ArrowRight,
  Upload,
  MessageSquare,
  Zap,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function ActionCard({
  icon,
  title,
  subtitle,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="flex cursor-pointer w-full items-center justify-between rounded-2xl border border-border p-5 text-left transition hover:border-primary/30 hover:bg-accent"
    >
      <div className="flex items-center gap-4">
        <div className="flex  h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>

        <div>
          <h3 className="font-medium">
            {title}
          </h3>

          <p className="text-sm text-muted-foreground">
            {subtitle}
          </p>
        </div>
      </div>

      <ArrowRight size={18} />
    </button>
  );
}

function QuickActions() {
  const navigate = useNavigate();

  return (
    <section className="rounded-3xl border border-border bg-card p-8">
      <div className="mb-6 flex items-center gap-2">
        <Zap
          className="text-primary"
          size={22}
        />

        <h2 className="text-2xl font-semibold">
          Quick Actions
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ActionCard
          icon={<Upload size={20} />}
          title="Upload Resume"
          subtitle="Add your resume"
          onClick={() => navigate("/resume")}
        />

        <ActionCard
          icon={<MessageSquare size={20} />}
          title="Open AI Chat"
          subtitle="Start a conversation"
          onClick={() => navigate("/chat")}
        />
      </div>
    </section>
  );
}

export default QuickActions;