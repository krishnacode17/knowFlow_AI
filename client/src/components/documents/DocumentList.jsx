
import { FileText, File, MoreHorizontal, CheckCircle2, Clock3 } from "lucide-react";

const typeStyles = {
  PDF: "bg-red-50 text-red-600",
  DOCX: "bg-blue-50 text-blue-600",
  TXT: "bg-gray-100 text-gray-600",
};

export default function DocumentList({ documents }) {
  if (documents.length === 0) {
    return (
      <div className="px-5 py-14 text-center">
        <FileText className="mx-auto h-10 w-10 text-gray-300" />
        <h3 className="mt-3 font-semibold text-gray-800">
          No documents found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Try a different search or status filter.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop list */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[600px] text-left">
          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-5 py-3">Document</th>
              <th className="px-4 py-3">Size</th>
              <th className="px-4 py-3">Last modified</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {documents.map((document) => (
              <tr key={document.id} className="transition hover:bg-gray-50/70">
                <td className="px-5 py-4">
                  <DocumentName document={document} />
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">
                  {document.size}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">
                  {document.modified}
                </td>
                <td className="px-4 py-4">
                  <Status status={document.status} />
                </td>
                <td className="px-4 py-4 text-right">
                  <button
                    type="button"
                    aria-label={`More actions for ${document.name}`}
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 p-3 sm:hidden">
        {documents.map((document) => (
          <article
            key={document.id}
            className="rounded-xl border border-gray-100 p-3"
          >
            <div className="flex items-start gap-3">
              <DocumentIcon type={document.type} />
              <div className="min-w-0 flex-1">
                <p className="break-words text-sm font-semibold leading-5 text-gray-800">
                  {document.name}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {document.type} · {document.size}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Modified {document.modified}
                </p>
                <div className="mt-3">
                  <Status status={document.status} />
                </div>
              </div>
              <button
                type="button"
                aria-label={`More actions for ${document.name}`}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function DocumentIcon({ type }) {
  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
        typeStyles[type] || "bg-violet-50 text-violet-600"
      }`}
    >
      <File size={20} />
    </div>
  );
}

function DocumentName({ document }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <DocumentIcon type={document.type} />
      <div className="min-w-0">
        <p className="max-w-[300px] truncate text-sm font-medium text-gray-800">
          {document.name}
        </p>
        <p className="mt-1 text-xs text-gray-400">{document.type}</p>
      </div>
    </div>
  );
}

function Status({ status }) {
  const ready = status === "Ready";

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
        ready
          ? "bg-emerald-50 text-emerald-700"
          : "bg-amber-50 text-amber-700"
      }`}
    >
      {ready ? <CheckCircle2 size={13} /> : <Clock3 size={13} />}
      {status}
    </span>
  );
}
