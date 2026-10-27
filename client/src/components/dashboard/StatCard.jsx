
function StatCard({ title, value, change, description }) {
  return (
    <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
      <p className="text-sm font-medium text-gray-600">
        {title}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-950 sm:text-3xl">
          {value}
        </h2>

        {change && (
          <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
            {change}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-2 text-xs text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
}

export default StatCard;
