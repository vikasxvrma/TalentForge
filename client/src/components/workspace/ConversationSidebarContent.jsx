import { Plus, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ConversationItem from "./ConversationItem";
import { useConversations } from "../../hooks/workspace/useConversations";

export default function ConversationSidebarContent({
  conversationId,
  onNavigate,
}) {
  const navigate = useNavigate();

  const {
    conversations,
    isLoading,
    error,
  } = useConversations();

  const handleNewChat = () => {
    navigate("/chat");
    onNavigate?.();
  };

  const handleConversationClick = (id) => {
    navigate(`/chat/${id}`);
    onNavigate?.();
  };

  return (
    <>
      {/* Header */}
      <div className="border-b border-border p-4">
        <button
          onClick={handleNewChat}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary hover:text-primary-foreground"
        >
          <Plus size={18} />
          New Chat
        </button>
      </div>

      {/* Conversation List */}
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
        {isLoading &&
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="mb-2 h-14 animate-pulse rounded-xl bg-background"
            />
          ))}

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
            <p className="text-sm text-red-500">
              Failed to load conversations.
            </p>
          </div>
        )}

        {!isLoading &&
          !error &&
          conversations.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center px-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background">
                <MessageSquare
                  size={28}
                  className="text-muted"
                />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-foreground">
                No conversations yet
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted">
                Start a new conversation with TalentForge AI.
              </p>
            </div>
          )}

        {!isLoading &&
          !error &&
          conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              active={conversation.id === conversationId}
              onClick={() =>
                handleConversationClick(conversation.id)
              }
            />
          ))}
      </div>
    </>
  );
}