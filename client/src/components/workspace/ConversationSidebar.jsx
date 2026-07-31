import ConversationSidebarContent from "./ConversationSidebarContent";

export default function ConversationSidebar({
  conversationId,
}) {
  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-border bg-surface lg:flex lg:flex-col">
      <ConversationSidebarContent
        conversationId={conversationId}
      />
    </aside>
  );
}