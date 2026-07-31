import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Hero() {
  const { isAuthenticated, user } = useAuth();

  const cta = {
    href: isAuthenticated ? "/dashboard" : "/login",
    label: isAuthenticated ? "Open Workspace" : "Get Started",
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl flex-col items-center justify-center px-6 text-center">

        <div className="mb-6 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted">
          AI Career Intelligence Platform
        </div>

        {isAuthenticated && (
          <p className="mb-4 text-primary font-medium">
            Welcome back, {user?.name}! 👋
          </p>
        )}

        <h1 className="max-w-5xl text-5xl font-bold tracking-tight lg:text-7xl">
          Build Your Career With
          <span className="block text-primary">
            AI Intelligence
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-muted">
          Analyze resumes, prepare for interviews, chat with AI,
          and track your career progress — all in one intelligent platform.
        </p>

        <Link
          to={cta.href}
          className="mt-10 inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-4 font-semibold text-primary-foreground transition hover:scale-[1.02]"
        >
          {cta.label}

          <ArrowRight className="h-5 w-5" />
        </Link>

      </div>
    </section>
  );
}

export default Hero;