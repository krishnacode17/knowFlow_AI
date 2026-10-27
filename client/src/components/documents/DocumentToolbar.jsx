
import { Search, SlidersHorizontal } from "lucide-react";

export default function DocumentToolbar({
  search,
  onSearchChange,
  filter,
  onFilterChange,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative min-w-0 flex-1">
        <Search
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search documents..."
          className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#8d80e5] focus:ring-2 focus:ring-[#5140c9]/10"
        />
      </div>

      <label className="flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3">
        <SlidersHorizontal size={16} className="shrink-0 text-gray-500" />
        <span className="text-sm text-gray-500">Status</span>
        <select
          value={filter}
          onChange={(event) => onFilterChange(event.target.value)}
          className="min-w-0 bg-transparent text-sm font-medium text-gray-700 outline-none"
        >
          <option value="All">All</option>
          <option value="Ready">Ready</option>
          <option value="Processing">Processing</option>
        </select>
      </label>
    </div>
  );
}
