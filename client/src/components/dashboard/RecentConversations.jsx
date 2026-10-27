
import { ChevronRight, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const conversations = [
  { id: 1, title: "Q1 Marketing Strategy" },
  { id: 2, title: "Onboarding Flow UX" },
  { id: 3, title: "Code Debugging" },
  { id: 4, title: "Marketing Strategy" },
];

function RecentConversations() {
  return (
    <section className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-gray-900">
          Recent Conversations
        </h2>

        <MessageSquare size={18} className="text-gray-400" />
      </div>

      <div className="space-y-2">
        {conversations.map((conversation) => (
          <Link
            key={conversation.id}
            to="/chat"
            className="flex min-h-10 items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition hover:border-[#d5cffb] hover:bg-[#f7f5ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5140c9]"
          >
            <span className="min-w-0 truncate font-medium text-gray-700">
              {conversation.title}
            </span>

            <ChevronRight
              size={17}
              className="shrink-0 text-gray-400"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RecentConversations;
