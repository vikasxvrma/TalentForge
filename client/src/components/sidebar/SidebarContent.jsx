import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";

import { navigation } from "../../constants/navigation";
import { useAuth } from "../../hooks/useAuth";

export default function SidebarContent({ onNavigate }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    onNavigate?.();
  };

  return (
    <>
      {/* =====================================================
          LOGO
      ===================================================== */}

      <div className="border-b border-border px-4 py-5">
        <button
          type="button"
          onClick={() => handleNavigate("/dashboard")}
          className="flex w-full cursor-pointer items-center gap-3 text-left"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-lg font-semibold text-primary-foreground shadow-sm">
            T
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold tracking-tight">
              TalentForge
            </h1>

            <p className="truncate text-xs text-muted">
              AI Career Intelligence
            </p>
          </div>
        </button>
      </div>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav className="flex-1 space-y-1.5 overflow-y-auto p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/dashboard"}
              onClick={onNavigate}
              className={({ isActive }) =>
                clsx(
                  "group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
                  "outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                  isActive
                    ? "bg-primary/12 text-primary"
                    : "text-muted hover:bg-surface-hover hover:text-foreground",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    className="shrink-0 transition-transform duration-200 group-hover:scale-105"
                  />

                  <span className="font-medium">
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}

        {/* =================================================
            DIRECT INTERVIEW ACTION

            Keeps Mock Interview highly visible even if it
            isn't present in the navigation config yet.
        ================================================= */}

        <button
          type="button"
          onClick={() =>
            handleNavigate("/interview")
          }
          className={clsx(
            "group flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3",
            "text-muted transition-all duration-200",
            "hover:bg-surface-hover hover:text-foreground",
            "outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
          )}
        >
          <div className="flex h-5 w-5 shrink-0 items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 transition-transform duration-200 group-hover:scale-105"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                d="M12 3a7 7 0 0 0-7 7v3a2 2 0 0 0 2 2h1v-5a4 4 0 0 1 8 0v5h1a2 2 0 0 0 2-2v-3a7 7 0 0 0-7-7Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M9 19h6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <span className="font-medium">
            Mock Interview
          </span>
        </button>
      </nav>

      {/* =====================================================
          PROFILE
      ===================================================== */}

      <div className="border-t border-border p-4">
        <button
          type="button"
          onClick={() =>
            handleNavigate("/settings")
          }
          className="flex w-full cursor-pointer items-center gap-3 rounded-xl bg-background p-3 text-left transition hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
            {user?.name?.charAt(0)?.toUpperCase() ||
              "U"}
          </div>

          <div className="min-w-0">
            <p className="truncate font-medium">
              {user?.name || "User"}
            </p>

            <p className="truncate text-sm text-muted">
              {user?.email || ""}
            </p>
          </div>
        </button>
      </div>
    </>
  );
}