import { Link } from "react-router-dom";

import ThemeToggle from "../ui/ThemeToggle";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <img
            src="/star.png"
            alt="TalentForge"
            className="h-10 w-10 rounded-xl"
          />

          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              TalentForge
            </h1>

            <p className="text-xs text-muted">
              AI Career Intelligence
            </p>
          </div>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            to={isAuthenticated ? "/dashboard" : "/login"}
            className="rounded-xl bg-primary px-5 py-2.5 font-medium text-primary-foreground transition hover:opacity-90"
          >
            {isAuthenticated
              ? "Go to Dashboard"
              : "Login"}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;