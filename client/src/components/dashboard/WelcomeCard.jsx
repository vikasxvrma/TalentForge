
import { useAuth } from "../../hooks/useAuth";

function WelcomeCard() {
  const { user } = useAuth();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-card p-10">
      <div className="absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.18),transparent_70%)]" />

      <div className="relative z-10">
        <p className="text-sm text-muted-foreground">
          {greeting},
        </p>

        <h1 className="mt-2 text-5xl font-bold tracking-tight">
          {user?.name ?? "User"} 👋
        </h1>

        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Welcome back to TalentForge.
          Continue building your AI-powered career workspace.
        </p>
      </div>
    </section>
  );
}

export default WelcomeCard;