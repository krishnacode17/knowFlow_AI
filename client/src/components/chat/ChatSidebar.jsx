import { useNavigate } from "react-router-dom";
import {
  BrainCircuit,
  LayoutDashboard,
  MessageCircle,
  Files,
  Database,
  Settings,
  Plus,
  X,
  PanelLeftClose,
  Sparkles,
} from "lucide-react";

const recentChats = [
  "Understanding MongoDB Indexes",
  "React Auth Flow",
  "LangChain Tool Calling",
];

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "AI Chat", icon: MessageCircle },
  { label: "Documents", icon: Files },
  { label: "Knowledge Base", icon: Database },
  { label: "Settings", icon: Settings },
];

export default function ChatSidebar({
  open,
  onClose,
  onNewChat,
  onSelectChat,
  activeChat,
}) {
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile drawer backdrop */}
      {open && (
        <button
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[270px] max-w-[85vw]
          flex-col border-r border-gray-200 bg-white transition-transform duration-200
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo */}
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-gray-100 px-5">
          <div className="flex items-center gap-2.5">
            <BrainCircuit className="h-8 w-8 text-[#5140c9]" />
            <span className="text-lg font-bold tracking-tight text-gray-900">
              KnowFlow AI
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        

        {/* Main navigation */}
        <nav className="space-y-1 px-3 pt-5">
          {navigation.map(({ label, icon: Icon }) => {
            const selected = label === "AI Chat";

            return (
              <button
                key={label}
                onClick={() => {
                  if (label === "Dashboard") {
                    navigate("/dashboard");
                  } else if (label === "AI Chat") {
                    navigate("/chat");
                  } else if (label === "Documents") {
                    navigate("/documents");
                  } else if (label === "Knowledge Base") {
                    navigate("/knowledge-base");
                  } else if (label === "Settings") {
                    navigate("/settings");
                  } else {
                    return;
                  }

                  onClose();
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5
                  text-left text-sm transition
                  ${
                    selected
                      ? "bg-[#f0edff] font-semibold text-[#5140c9]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <Icon size={18} />
                {label}
                {label === "AI Chat" && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#5140c9]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Recent chats */}
        <div className="mt-7 min-h-0 flex-1 overflow-y-auto px-3">
          <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Recent Chats
          </p>

          <div className="space-y-1">
            {recentChats.map((chat) => (
              <button
                key={chat}
                onClick={() => {
                  onSelectChat(chat);
                  onClose();
                }}
                className={`w-full rounded-lg px-3 py-2.5 text-left text-sm
                  transition ${
                    activeChat === chat
                      ? "bg-[#f0edff] font-medium text-[#4932c8]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <span className="block truncate">{chat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Profile */}
        <div className="flex shrink-0 items-center gap-3 border-t border-gray-100 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
            AR
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-800">
              Alex Rivera
            </p>
            <p className="truncate text-xs text-gray-500">
              alex@braincircuit.com
            </p>
          </div>

          <span className="rounded-md bg-violet-100 px-2 py-1 text-[10px] font-semibold text-violet-700">
            Pro
          </span>
        </div>
      </aside>
    </>
  );
}
