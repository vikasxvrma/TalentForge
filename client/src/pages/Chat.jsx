import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import WorkspaceHeader from "../components/workspace/WorkspaceHeader";
import ConversationSidebar from "../components/workspace/ConversationSidebar";
import MobileConversationSidebar from "../components/workspace/MobileConversationSidebar";
import PromptComposer from "../components/workspace/PromptComposer";
import MessageList from "../components/workspace/MessageList";

import { useSendMessage } from "../hooks/workspace/useSendMessage";

export default function ChatPage() {
  const { conversationId } = useParams();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [pendingMessages, setPendingMessages] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sendMessageMutation = useSendMessage({
    onMutate: async (variables) => {
      const optimisticMessage = {
        id: `temp-${Date.now()}`,
        role: "user",
        content: variables.message,
      };

      if (!variables.conversationId) {
        setPendingMessages((prev) => [
          ...prev,
          optimisticMessage,
        ]);

        return;
      }

      await queryClient.cancelQueries({
        queryKey: ["messages", variables.conversationId],
      });

      const previousMessages = queryClient.getQueryData([
        "messages",
        variables.conversationId,
      ]);

      queryClient.setQueryData(
        ["messages", variables.conversationId],
        (old = []) => [...old, optimisticMessage]
      );

      return { previousMessages };
    },

    onError: (_, variables, context) => {
      if (!variables.conversationId) {
        setPendingMessages([]);
        return;
      }

      if (context?.previousMessages) {
        queryClient.setQueryData(
          ["messages", variables.conversationId],
          context.previousMessages
        );
      }
    },

    onSuccess: (data) => {
      setPendingMessages([]);

      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });

      queryClient.invalidateQueries({
        queryKey: ["messages", data.conversation.id],
      });

      if (!conversationId) {
        navigate(`/chat/${data.conversation.id}`, {
          replace: true,
        });
      }

      setSidebarOpen(false);
    },
  });

  const handleSendMessage = (message) => {
    sendMessageMutation.mutate({
      conversationId,
      message,
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <ConversationSidebar
        conversationId={conversationId}
      />

      {/* Mobile Drawer */}
      <MobileConversationSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        conversationId={conversationId}
      />

      {/* Workspace */}
      <main className="flex min-h-0 flex-1 flex-col">
        <WorkspaceHeader
          onMenuClick={() => setSidebarOpen(true)}
        />

        <MessageList
          conversationId={conversationId}
          pendingMessages={pendingMessages}
          isSending={sendMessageMutation.isPending}
        />

        <PromptComposer
          onSend={handleSendMessage}
          isSending={sendMessageMutation.isPending}
        />
      </main>
    </div>
  );
}