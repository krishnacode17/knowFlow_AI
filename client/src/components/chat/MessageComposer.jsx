
import { useState } from "react";
import {
  Paperclip,
  Mic,
  Send,
  LayoutGrid,
} from "lucide-react";

export default function MessageComposer({
  active,
  onDemoSubmit,
}) {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!message.trim()) return;

    // UI preview only: no API call.
    onDemoSubmit(message.trim());
    setMessage("");
  };

  return (
    <div className="shrink-0 border-t border-gray-200 bg-white px-3 pb-3 pt-3 sm:px-6 sm:pb-5">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-3xl"
      >
        <div className="flex items-end gap-2 rounded-2xl border border-gray-300 bg-white p-2 shadow-sm transition focus-within:border-[#8d80e5] focus-within:ring-2 focus-within:ring-[#5140c9]/10">
          <button
            type="button"
            aria-label="Attach file"
            className="mb-0.5 shrink-0 rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <Paperclip size={19} />
          </button>

          <textarea
            rows={1}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
            placeholder={
              active ? "Ask a follow-up..." : "Ask anything..."
            }
            className="max-h-32 min-h-10 min-w-0 flex-1 resize-none bg-transparent py-2 text-sm leading-6 text-gray-800 outline-none placeholder:text-gray-400"
          />

          <button
            type="button"
            aria-label="Voice input"
            className="mb-0.5 hidden shrink-0 rounded-lg p-2 text-gray-500 hover:bg-gray-100 sm:inline-flex"
          >
            <Mic size={19} />
          </button>

          <button
            type="button"
            aria-label="Prompt library"
            className="mb-0.5 hidden shrink-0 rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:inline-flex"
          >
            <LayoutGrid size={18} />
          </button>

          <button
            type="submit"
            aria-label="Send message"
            disabled={!message.trim()}
            className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5140c9] text-white transition hover:bg-[#4232b0] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
          >
            <Send size={17} />
          </button>
        </div>

        <p className="mt-2 hidden text-center text-[11px] text-gray-400 sm:block">
          KnowFlow AI can make mistakes. Check important information.
        </p>
      </form>
    </div>
  );
}
