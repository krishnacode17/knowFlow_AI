
import { MessageSquare, Upload, FolderOpen } from "lucide-react";

const actions = [
  {
    id: 1,
    title: "Ask AI",
    description: "Start a conversation with AI",
    icon: MessageSquare,
  },
  {
    id: 2,
    title: "Upload File",
    description: "Add a document to your workspace",
    icon: Upload,
  },
  {
    id: 3,
    title: "Browse Workspace",
    description: "Explore your knowledge workspace",
    icon: FolderOpen,
  },
];

function QuickActions() {
  return (
    <section className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <h2 className="mb-4 text-base font-semibold text-gray-900">
        Quick Actions
      </h2>

      <div className="space-y-2">
        {actions.map(({ id, title, description, icon: Icon }) => (
          <button
            key={id}
            type="button"
            title={description}
            className="flex min-h-10 w-full items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-left text-sm font-medium text-gray-700 transition hover:border-[#d5cffb] hover:bg-[#f7f5ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5140c9]"
          >
            <Icon size={17} className="shrink-0 text-gray-500" />
            <span className="truncate">{title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;
