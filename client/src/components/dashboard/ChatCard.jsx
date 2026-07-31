import { MessageSquare, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ChatCard() {
  const navigate = useNavigate();

  return (
    <section className="rounded-3xl border border-border bg-card p-8 transition hover:border-primary/30">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
        <MessageSquare className="text-primary" size={26} />
      </div>

      <h2 className="text-2xl font-semibold">
        AI Career Assistant
      </h2>

      <p className="mt-4 text-muted-foreground">
        Ask questions about your resume or career.
      </p>

      <p className="mt-1 text-muted-foreground">
        Get AI-powered answers and guidance.
      </p>

      <button
        onClick={() => navigate("/chat")}
        className="mt-8 cursor-pointer inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 transition hover:bg-accent"
      >
        Open Chat
        <ArrowRight size={16} />
      </button>
    </section>
  );
}

export default ChatCard;