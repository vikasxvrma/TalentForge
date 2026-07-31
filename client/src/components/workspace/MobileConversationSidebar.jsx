import { X } from "lucide-react";

import ConversationSidebarContent from "./ConversationSidebarContent";

export default function MobileConversationSidebar({
  open,
  onClose,
  conversationId,
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-border bg-surface shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-semibold text-foreground">
            Conversations
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-background"
          >
            <X size={20} />
          </button>
        </div>

        <ConversationSidebarContent
          conversationId={conversationId}
          onNavigate={onClose}
        />
      </aside>
    </>
  );
}