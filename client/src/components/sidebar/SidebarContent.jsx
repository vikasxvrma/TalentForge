import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";

import { navigation } from "../../constants/navigation";
import { useAuth } from "../../hooks/useAuth";

export default function SidebarContent({ onNavigate }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleNavigate(path) {
    navigate(path);
    onNavigate?.();
  }
  

  return (
    <>
      {/* Logo */}
      <div className="flex h-18 items-center border-b border-border px-6">
        <NavLink
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <img
            src="/star.png"
            alt="TalentForge Logo"
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
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={onNavigate}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-muted hover:bg-surface-hover hover:text-foreground"
                )
              }
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="border-t border-border p-4">
        <button
          onClick={() => handleNavigate("/settings")}
          className="flex cursor-pointer w-full items-center gap-3 rounded-xl bg-background p-3 transition hover:bg-surface-hover"
        >
          <div className="flex h-10 w-10  items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
            {user?.name?.charAt(0) || "U"}
          </div>

          <div className="min-w-0 text-left">
            <p className="truncate font-medium">
              {user?.name || "User"}
            </p>

            <p className="truncate text-sm text-muted">
              {user?.email}
            </p>
          </div>
        </button>
      </div>
    </>
  );
}