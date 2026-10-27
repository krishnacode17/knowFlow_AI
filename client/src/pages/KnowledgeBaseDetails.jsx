import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FolderOpen,
  FileText,
  Search,
  Plus,
  MoreHorizontal,
  File,
} from "lucide-react";

const sampleCollections = [
  {
    id: 1,
    name: "React Development",
    description: "React concepts, hooks, routing and frontend architecture.",
    documents: [
      { id: 1, name: "React Hooks Guide.pdf", type: "PDF", size: "2.4 MB", status: "Ready" },
      { id: 2, name: "React Router Notes.docx", type: "DOCX", size: "856 KB", status: "Ready" },
      { id: 3, name: "Frontend Architecture.pdf", type: "PDF", size: "1.2 MB", status: "Processing" },
    ],
  },
  {
    id: 2,
    name: "MongoDB",
    description: "Database design, aggregation pipelines and indexing notes.",
    documents: [
      { id: 1, name: "MongoDB Indexing.pdf", type: "PDF", size: "1.8 MB", status: "Ready" },
      { id: 2, name: "Aggregation Pipeline.pdf", type: "PDF", size: "950 KB", status: "Ready" },
    ],
  },
  {
    id: 3,
    name: "AI Engineering",
    description: "RAG, AI agents, LLMs and prompt engineering resources.",
    documents: [
      { id: 1, name: "Introduction to RAG.pdf", type: "PDF", size: "3.1 MB", status: "Ready" },
      { id: 2, name: "AI Agent Ideas.txt", type: "TXT", size: "24 KB", status: "Ready" },
    ],
  },
];

const KnowledgeBaseDetails = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const collection = sampleCollections.find(
    (item) => String(item.id) === collectionId
  );

  const filteredDocuments = useMemo(() => {
    if (!collection) return [];

    return collection.documents.filter((document) =>
      document.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [collection, search]);

  if (!collection) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f7fb] p-6 text-center">
        <FolderOpen size={40} className="text-gray-400" />
        <h1 className="mt-4 text-xl font-semibold text-gray-900">
          Collection not found
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          This collection may not exist.
        </p>
        <button
          type="button"
          onClick={() => navigate("/knowledge-base")}
          className="mt-5 rounded-xl bg-[#5140c9] px-5 py-3 text-sm font-medium text-white"
        >
          Back to Knowledge Base
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7fb] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={() => navigate("/knowledge-base")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#5140c9]"
        >
          <ArrowLeft size={17} />
          Back to Knowledge Base
        </button>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-[#5140c9]">
                <FolderOpen size={28} />
              </div>

              <div>
                <p className="text-sm text-gray-500">Knowledge Base / Collection</p>
                <h1 className="mt-2 break-words text-2xl font-bold text-gray-900 sm:text-3xl">
                  {collection.name}
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                  {collection.description}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#5140c9] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#4932c8]"
            >
              <Plus size={18} />
              Add documents
            </button>
          </div>

          <div className="mt-7 flex flex-wrap gap-5 border-t border-gray-100 pt-5 text-sm text-gray-500">
            <span className="inline-flex items-center gap-2">
              <FileText size={17} className="text-[#5140c9]" />
              {collection.documents.length} documents
            </span>
            <span className="inline-flex items-center gap-2">
              <FolderOpen size={17} className="text-[#5140c9]" />
              Collection details
            </span>
          </div>
        </div>

        <div className="mt-9">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Documents
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Files in this knowledge collection.
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search documents..."
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-[#5140c9] focus:ring-2 focus:ring-purple-100"
              />
            </div>
          </div>

          {filteredDocuments.length > 0 ? (
            <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <div className="hidden grid-cols-[minmax(0,1fr)_100px_100px_120px_40px] gap-4 border-b border-gray-100 bg-gray-50 px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500 md:grid">
                <span>File name</span>
                <span>Type</span>
                <span>Size</span>
                <span>Status</span>
                <span></span>
              </div>

              {filteredDocuments.map((document) => (
                <div
                  key={document.id}
                  className="flex flex-col gap-3 border-b border-gray-100 p-4 last:border-b-0 hover:bg-gray-50/70 md:grid md:grid-cols-[minmax(0,1fr)_100px_100px_120px_40px] md:items-center md:gap-4 md:px-5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[#5140c9]">
                      <File size={20} />
                    </div>
                    <span className="break-words text-sm font-medium text-gray-800">
                      {document.name}
                    </span>
                  </div>

                  <span className="text-sm text-gray-500 md:block">
                    <span className="mr-2 text-xs text-gray-400 md:hidden">Type:</span>
                    {document.type}
                  </span>

                  <span className="text-sm text-gray-500">
                    <span className="mr-2 text-xs text-gray-400 md:hidden">Size:</span>
                    {document.size}
                  </span>

                  <span>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        document.status === "Ready"
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {document.status}
                    </span>
                  </span>

                  <button
                    type="button"
                    aria-label={`More options for ${document.name}`}
                    className="hidden rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 md:inline-flex md:justify-center"
                  >
                    <MoreHorizontal size={19} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
              <FileText size={32} className="mx-auto text-gray-400" />
              <h3 className="mt-4 font-semibold text-gray-900">
                No documents found
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Try another search term.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseDetails;