import { useEffect } from "react";
import { X } from "lucide-react";
import clsx from "clsx";

import SidebarContent from "./SidebarContent";
import { useSidebar } from "../../providers/SidebarProvider";

export default function MobileSidebar() {
  const { isOpen, closeSidebar } = useSidebar();

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeSidebar();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeSidebar]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeSidebar}
        className={clsx(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        )}
      />

      {/* Drawer */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border bg-surface shadow-2xl transition-transform duration-300 ease-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close button */}
        <div className="absolute right-4 top-4">
          <button
            onClick={closeSidebar}
            className="rounded-lg p-2 text-muted transition hover:bg-surface-hover hover:text-foreground"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <SidebarContent onNavigate={closeSidebar} />
      </aside>
    </>
  );
}