import { FileText, MoreHorizontal, FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const KnowledgeBaseCard = ({ collection }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/knowledge-base/${collection.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          navigate(`/knowledge-base/${collection.id}`);
        }
      }}
      className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-[#5140c9]">
          <FolderOpen size={24} />
        </div>

        <button
          type="button"
          aria-label={`More options for ${collection.name}`}
          className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>

      <h3 className="mt-5 text-lg font-semibold text-gray-900">
        {collection.name}
      </h3>

      <p className="mt-2 min-h-10 text-sm leading-5 text-gray-500">
        {collection.description}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FileText size={16} className="text-[#5140c9]" />
          <span>{collection.documentCount} documents</span>
        </div>

        <span className="text-xs text-gray-400">{collection.updatedAt}</span>
      </div>
    </div>
  );
};

export default KnowledgeBaseCard;
