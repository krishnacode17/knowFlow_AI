import { Search, Plus, Sun } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import RecentConversations from "../components/dashboard/RecentConversations";
import QuickActions from "../components/dashboard/QuickActions";

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="search"
          placeholder="Search"
          aria-label="Search dashboard"
          className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#5140c9] focus:ring-2 focus:ring-[#5140c9]/10"
        />
      </div>

      {/* Welcome */}
      <section className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="flex flex-wrap items-center gap-2 text-2xl font-semibold tracking-tight text-gray-950 sm:text-3xl">
            Good morning, Alex!
            <Sun className="h-6 w-6 text-amber-400" />
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Welcome back to your knowledge workspace.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#5140c9] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#4232b0] sm:w-auto"
        >
          <Plus size={18} />
          Start a new chat
        </button>
      </section>

      {/* Stats */}
      <section
        aria-label="Workspace statistics"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        <StatCard title="Total Conversations" value="148" change="+12%" />

        <StatCard title="Saved Documents" value="42" change="+5%" />

        <StatCard
          title="Recent Activity"
          value="6m ago"
          description="Last workspace activity"
        />
      </section>

      {/* Recent Conversations & Quick Actions */}
      <section className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <RecentConversations />
        <QuickActions />
      </section>
    </div>
  );
}

export default Dashboard;
