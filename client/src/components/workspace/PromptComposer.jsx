import { useEffect, useRef, useState } from "react";
import { SendHorizontal } from "lucide-react";

export default function PromptComposer({
  onSend,
  isSending = false,
}) {
  const [message, setMessage] = useState("");

  const textareaRef = useRef(null);

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "0px";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  }, [message]);

  const handleSubmit = () => {
    const trimmed = message.trim();

    if (!trimmed || isSending) return;

    onSend(trimmed);

    setMessage("");

    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "0px";
      }
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-border bg-background/90 px-3 py-3 backdrop-blur sm:px-4">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-border bg-surface transition-all duration-200 focus-within:border-primary/40 focus-within:shadow-[0_0_24px_rgba(124,58,237,0.15)]">
          <textarea
            ref={textareaRef}
            rows={1}
            value={message}
            placeholder="Ask TalentForge anything..."
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="max-h-52 min-h-[56px] w-full resize-none overflow-y-auto rounded-t-3xl bg-transparent px-5 pt-5 text-[15px] leading-7 text-foreground outline-none placeholder:text-muted sm:px-6"
          />

          <div className="flex flex-col gap-3 px-4 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-center text-xs text-muted sm:text-left">
              Enter to send · Shift + Enter for new line
            </p>

            <button
              onClick={handleSubmit}
              disabled={!message.trim() || isSending}
              className="flex h-11 w-11 items-center justify-center self-end rounded-full bg-primary text-white transition-all duration-200 hover:scale-105 hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-surface-hover disabled:text-muted"
            >
              <SendHorizontal size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}