import { useEffect, useRef } from "react";

import EmptyWorkspace from "./EmptyWorkspace";
import MessageBubble from "./MessageBubble";

import { useConversationMessages } from "../../hooks/workspace/useConversationMessages";

export default function MessageList({ conversationId, isSending, pendingMessages }) {
    const {
        messages,
        isLoading,
        error,
    } = useConversationMessages(conversationId);

    const bottomRef = useRef(null);

  useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, pendingMessages, isSending]);

    if (!conversationId && pendingMessages.length === 0) {
    return <EmptyWorkspace />;
}
    const allMessages = [...messages, ...pendingMessages];

    if (isLoading) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <div className="space-y-3">
                    <div className="h-4 w-48 animate-pulse rounded bg-zinc-800"></div>
                    <div className="h-4 w-80 animate-pulse rounded bg-zinc-800"></div>
                    <div className="h-4 w-64 animate-pulse rounded bg-zinc-800"></div>
                </div>
            </div>
        );
    }


    if (error) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-4 text-red-400">
                    Failed to load conversation.
                </div>
            </div>
        );
    }
    return (
        <div className="flex-1 overflow-y-auto">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-8 py-10">
                {allMessages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                    />
                ))}

                {isSending && (
                    <div className="flex">
                        <div className="rounded-3xl border border-white/10 bg-[#15151B] px-6 py-4">
                            <div className="flex gap-2">
                                <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" />

                                <span
                                    className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"
                                    style={{
                                        animationDelay: "150ms",
                                    }}
                                />

                                <span
                                    className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"
                                    style={{
                                        animationDelay: "300ms",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>
        </div>
    );
}