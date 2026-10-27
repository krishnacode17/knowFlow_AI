import { useState } from "react";
import { X, FolderOpen, BookOpen, Code2, BrainCircuit } from "lucide-react";

const icons = [
  { name: "General", icon: FolderOpen },
  { name: "Learning", icon: BookOpen },
  { name: "Development", icon: Code2 },
  { name: "AI", icon: BrainCircuit },
];

const CreateCollectionModal = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("General");

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) return;

    onCreate?.({
      name: name.trim(),
      description: description.trim(),
      icon: selectedIcon,
    });

    setName("");
    setDescription("");
    setSelectedIcon("General");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="collection-modal-title"
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
          <div>
            <h2
              id="collection-modal-title"
              className="text-xl font-semibold text-gray-900"
            >
              Create collection
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Organize related documents in one place.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          <div>
            <label
              htmlFor="collection-name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Collection name <span className="text-red-500">*</span>
            </label>

            <input
              id="collection-name"
              autoFocus
              required
              maxLength={60}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. React Development"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#5140c9] focus:ring-2 focus:ring-purple-100"
            />
          </div>

          <div>
            <label
              htmlFor="collection-description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Description
            </label>

            <textarea
              id="collection-description"
              rows={3}
              maxLength={200}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What kind of knowledge will this collection contain?"
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#5140c9] focus:ring-2 focus:ring-purple-100"
            />

            <p className="mt-1 text-right text-xs text-gray-400">
              {description.length}/200
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-gray-700">
              Choose an icon
            </p>

            <div className="grid grid-cols-4 gap-2">
              {icons.map(({ name: iconName, icon: Icon }) => {
                const isSelected = selectedIcon === iconName;

                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setSelectedIcon(iconName)}
                    aria-pressed={isSelected}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-xs transition ${
                      isSelected
                        ? "border-[#5140c9] bg-purple-50 text-[#5140c9]"
                        : "border-gray-200 text-gray-500 hover:border-purple-200 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={22} />
                    {iconName}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!name.trim()}
              className="rounded-xl bg-[#5140c9] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#4932c8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create collection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCollectionModal;