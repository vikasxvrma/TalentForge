import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { formatRelativeDate } from "../../utils/formatRelativeDate";

export default function ConversationItem({
  conversation,
  active,
}) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/chat/${conversation.id}`)}
      className={`group mb-2 flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-200 ${
        active
          ? "border-primary/30 bg-primary/10"
          : "border-transparent hover:border-border hover:bg-background"
      }`}
    >
      <div
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
          active
            ? "bg-primary/15 text-primary"
            : "bg-background text-muted group-hover:text-foreground"
        }`}
      >
        <MessageSquare size={16} />
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className={`truncate text-sm font-medium transition-colors ${
            active
              ? "text-foreground"
              : "text-foreground group-hover:text-primary"
          }`}
        >
          {conversation.title}
        </h3>

        <p className="mt-1 text-xs text-muted">
          {formatRelativeDate(conversation.updated_at)}
        </p>
      </div>
    </button>
  );
}