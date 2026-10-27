
import { useRef, useState } from "react";
import { UploadCloud, FileUp } from "lucide-react";

export default function DocumentUpload() {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file.name);
    }
  };

  return (
    <section className="rounded-2xl border border-dashed border-[#c9c1ff] bg-[#faf9ff] p-5 sm:p-8">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eeebff] text-[#5140c9]">
          <UploadCloud size={28} />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-gray-900">
          Add documents to your knowledge space
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Select a file to preview the upload experience. Files are not
          sent or saved anywhere in this UI-only version.
        </p>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt,.md"
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#5140c9] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4232b0]"
        >
          <FileUp size={17} />
          Choose a document
        </button>

        <p className="mt-3 text-xs text-gray-400">
          PDF, DOC, DOCX, TXT or Markdown
        </p>

        {selectedFile && (
          <p className="mt-3 max-w-full break-all text-sm font-medium text-[#4932c8]">
            Selected: {selectedFile}
          </p>
        )}
      </div>
    </section>
  );
}
