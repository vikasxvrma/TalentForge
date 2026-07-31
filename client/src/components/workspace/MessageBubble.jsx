import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-3xl rounded-3xl bg-violet-600 px-5 py-3 text-[15px] leading-7 text-white shadow-lg">
          <p className="whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-4xl rounded-3xl border border-white/10 bg-[#15151B] px-6 py-5 text-[15px] leading-8 text-zinc-100">
        <div className="prose prose-invert prose-pre:rounded-xl prose-pre:border prose-pre:border-white/10 prose-code:text-violet-300 max-w-none">
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