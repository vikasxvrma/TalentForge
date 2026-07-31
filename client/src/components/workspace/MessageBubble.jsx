import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[90%] rounded-3xl bg-primary px-5 py-3 text-sm leading-7 text-primary-foreground shadow-sm sm:max-w-2xl">
          <p className="whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="w-full max-w-4xl rounded-3xl border border-border bg-surface px-5 py-5 shadow-sm sm:px-6">
        <div
          className="
            prose
            max-w-none
            prose-sm
            sm:prose-base

            prose-headings:text-foreground
            prose-p:text-foreground
            prose-strong:text-foreground
            prose-li:text-foreground
            prose-blockquote:text-muted

            prose-a:text-primary

            prose-code:text-primary
            prose-code:before:hidden
            prose-code:after:hidden

            prose-pre:overflow-x-auto
            prose-pre:rounded-xl
            prose-pre:border
            prose-pre:border-border
            prose-pre:bg-background

            prose-table:block
            prose-table:overflow-x-auto
            prose-table:border-collapse

            dark:prose-invert
          "
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}