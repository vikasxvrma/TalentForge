import { Bell, Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { navigation } from "../../constants/navigation";
import { useAuth } from "../../hooks/useAuth";

import SearchBar from "./SearchBar";
import { useEffect } from "react";
import ThemeToggle from "../ui/ThemeToggle";
import { useSidebar } from "../../providers/SidebarProvider";

function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAuth();
  const { openSidebar, closeSidebar } = useSidebar();

  const currentPage =
    navigation.find((item) => item.href === location.pathname) ??
    navigation[0];
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        closeSidebar();
      }
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [closeSidebar]);
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl">
      <div className="flex h-18 items-center justify-between px-6 lg:px-8">
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <button
            onClick={openSidebar}
            className="rounded-lg p-2 transition hover:bg-surface lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              {currentPage.title}
            </h1>

            <p className="hidden text-sm text-muted md:block">
              {currentPage.description}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <SearchBar />

          <ThemeToggle />

          <button className="rounded-xl border border-border bg-surface p-2 transition hover:bg-surface-hover">
            <Bell className="h-5 w-5" />
          </button>

          <button
            onClick={() => navigate("/settings")}
            className="flex cursor-pointer h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground transition hover:opacity-90"
          >
            {user?.name?.charAt(0).toUpperCase()}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Topbar;