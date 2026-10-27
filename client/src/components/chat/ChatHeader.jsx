
import {
  Menu,
  Share2,
  MoreHorizontal,
  Sparkles,
   Plus,
} from "lucide-react";

export default function ChatHeader({ title, onMenuClick, active }) {
  return (
    <header className="flex h-[68px] shrink-0 items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
            {title || "New Conversation"}
          </h1>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500">
            <Sparkles size={13} className="text-[#5140c9]" />
            <span>KnowFlow AI</span>
            <span>·</span>
            <span>{active ? "Conversation" : "Ready to help"}</span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
  type="button"
  // onClick={onNewChat}
  className="inline-flex items-center gap-2 rounded-lg bg-[#5140c9] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#4932c8]"
>
  <Plus size={16} />
  <span className="hidden sm:inline">New Chat</span>
</button>
        <button
          aria-label="Share conversation"
          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
        >
          <Share2 size={18} />
        </button>
        <button
          aria-label="More options"
          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>
    </header>
  );
}
