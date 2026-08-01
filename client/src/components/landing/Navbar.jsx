import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

import ThemeToggle from "../ui/ThemeToggle";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
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

            <p className="hidden text-xs text-muted md:block">
              AI Career Intelligence
            </p>
          </div>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            to={isAuthenticated ? "/dashboard" : "/login"}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-all duration-200 hover:scale-[1.02] hover:bg-primary-hover"
          >
            {isAuthenticated ? (
              <>
                <LayoutDashboard size={18} />
                <span className="hidden sm:inline">
                  Dashboard
                </span>
              </>
            ) : (
              "Login"
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}