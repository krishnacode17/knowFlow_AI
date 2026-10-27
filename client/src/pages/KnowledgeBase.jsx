import { useState } from "react";
import { Plus, Search, LibraryBig, FolderOpen, FileText } from "lucide-react";
import KnowledgeBaseCard from "../components/knowledge-base/KnowledgeBaseCard";

import CreateCollectionModal from "../components/knowledge-base/CreateCollectionModal";

const sampleCollections = [
  {
    id: 1,
    name: "React Development",
    description: "React concepts, hooks, routing and frontend architecture.",
    documentCount: 8,
    updatedAt: "Today",
  },
  {
    id: 2,
    name: "MongoDB",
    description: "Database design, aggregation pipelines and indexing notes.",
    documentCount: 6,
    updatedAt: "Yesterday",
  },
  {
    id: 3,
    name: "AI Engineering",
    description: "RAG, AI agents, LLMs and prompt engineering resources.",
    documentCount: 12,
    updatedAt: "2 days ago",
  },
];

const KnowledgeBase = () => {
  const [search, setSearch] = useState("");
  const [collections, setCollections] = useState(sampleCollections);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalDocuments = collections.reduce(
    (total, collection) => total + collection.documentCount,
    0,
  );

  return (
    <div className="min-h-screen bg-[#f7f7fb] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <LibraryBig size={17} />
              <span>Workspace / Knowledge Base</span>
            </div>

            <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Knowledge Base
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Organize your knowledge and keep everything connected.
            </p>
          </div>

          <button
          onClick={() => setIsCreateModalOpen(true)}
            type="button"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#5140c9] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#4932c8] sm:w-auto"
          >
            <Plus size={18} />
            Create collection
          </button>
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-[#5140c9]">
              <FolderOpen size={23} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Collections</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {collections.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FileText size={23} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total documents</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {totalDocuments}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:col-span-2 lg:col-span-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <LibraryBig size={23} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Workspace status</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                Ready to organize
              </p>
            </div>
          </div>
        </div>

        {/* Search and Collection List */}
        <div className="mt-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Your collections
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Browse your topic-based knowledge spaces.
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
                placeholder="Search collections..."
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#5140c9] focus:ring-2 focus:ring-purple-100"
              />
            </div>
          </div>

          {filteredCollections.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredCollections.map((collection) => (
                <KnowledgeBaseCard
                  key={collection.id}
                  collection={collection}
                />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
              <FolderOpen size={32} className="mx-auto text-gray-400" />
              <h3 className="mt-4 font-semibold text-gray-900">
                No collections found
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Try another search term.
              </p>
            </div>
          
        )}
      </div>
    </div>

    {/* Create Collection Modal */}
    <CreateCollectionModal
      isOpen={isCreateModalOpen}
      onClose={() => setIsCreateModalOpen(false)}
      onCreate={(newCollection) => {
        setCollections((previous) => [
          {
            id: Date.now(),
            ...newCollection,
            documentCount: 0,
            updatedAt: "Just now",
          },
          ...previous,
        ]);
      }}
    />
  </div>
);
};


export default KnowledgeBase;
