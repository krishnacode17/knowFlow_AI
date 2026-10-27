
import { useMemo, useState } from "react";
import { FileText, Files, CheckCircle2, Clock3 } from "lucide-react";
import DocumentUpload from "../components/documents/DocumentUpload";
import DocumentToolbar from "../components/documents/DocumentToolbar";
import DocumentList from "../components/documents/DocumentList";

const initialDocuments = [
  {
    id: 1,
    name: "KnowFlow Project Requirements",
    type: "PDF",
    size: "2.4 MB",
    modified: "Oct 24, 2026",
    status: "Ready",
  },
  {
    id: 2,
    name: "React Authentication Guide",
    type: "DOCX",
    size: "856 KB",
    modified: "Oct 22, 2026",
    status: "Ready",
  },
  {
    id: 3,
    name: "MongoDB Indexing Notes",
    type: "PDF",
    size: "1.2 MB",
    modified: "Oct 20, 2026",
    status: "Processing",
  },
  {
    id: 4,
    name: "AI Agent Ideas",
    type: "TXT",
    size: "24 KB",
    modified: "Oct 18, 2026",
    status: "Ready",
  },
];

export default function Documents() {
  const [documents] = useState(initialDocuments);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredDocuments = useMemo(() => {
    return documents.filter((document) => {
      const matchesSearch = document.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || document.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [documents, search, filter]);

  const readyCount = documents.filter(
    (document) => document.status === "Ready"
  ).length;

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-6 p-2 sm:p-4 lg:p-6">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Files size={16} />
            Workspace / Documents
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Documents
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Manage your files and prepare them for AI-powered knowledge search.
          </p>
        </div>
      </section>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat
          label="Total documents"
          value={documents.length}
          icon={Files}
          note="In your library"
        />
        <Stat
          label="Ready to use"
          value={readyCount}
          icon={CheckCircle2}
          note="Available for future AI search"
        />
        <Stat
          label="Processing"
          value={documents.filter((d) => d.status === "Processing").length}
          icon={Clock3}
          note="Sample status only"
        />
      </section>

      {/* Upload UI */}
      <DocumentUpload />

      {/* Library */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 p-4 sm:p-5">
          <h2 className="text-base font-semibold text-gray-900">
            Your document library
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Browse and manage your saved documents.
          </p>

          <div className="mt-4">
            <DocumentToolbar
              search={search}
              onSearchChange={setSearch}
              filter={filter}
              onFilterChange={setFilter}
            />
          </div>
        </div>

        <DocumentList documents={filteredDocuments} />
      </section>
    </div>
  );
}

function Stat({ label, value, icon: Icon, note }) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0edff] text-[#5140c9]">
        <Icon size={21} />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
        <p className="mt-1 text-xs leading-5 text-gray-400">{note}</p>
      </div>
    </div>
  );
}
