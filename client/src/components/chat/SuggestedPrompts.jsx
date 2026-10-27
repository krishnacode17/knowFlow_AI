
import {
  CircleHelp,
  Code2,
  FileText,
  Lightbulb,
  Sparkles,
} from "lucide-react";

const prompts = [
  {
    label: "Explain a complex topic",
    description: "Understand difficult concepts simply",
    icon: CircleHelp,
    message: "Explain a complex topic with a simple example.",
  },
  {
    label: "Help me write code",
    description: "Explore code and programming ideas",
    icon: Code2,
    message: "Help me write a React code example.",
  },
  {
    label: "Summarize a document",
    description: "Turn long content into key points",
    icon: FileText,
    message: "Show me how to summarize a document.",
  },
  {
    label: "Explore an idea",
    description: "Brainstorm and discover possibilities",
    icon: Lightbulb,
    message: "Help me explore a new project idea.",
  },
];

export default function SuggestedPrompts({ onSelect }) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-8 sm:py-12">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0edff]">
        <Sparkles className="h-7 w-7 text-[#5140c9]" />
      </div>

      <h2 className="max-w-lg text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
        What would you like to learn today?
      </h2>

      <p className="mt-3 max-w-md text-center text-sm leading-6 text-gray-500 sm:text-base">
        KnowFlow AI is here to help you understand complex ideas, code, and documents.
      </p>

      <div className="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        {prompts.map(({ label, description, icon: Icon, message }) => (
          <button
            key={label}
            onClick={() => onSelect(message)}
            className="group flex min-w-0 items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition hover:border-[#c9c1ff] hover:bg-[#faf9ff] hover:shadow-sm"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-600 transition group-hover:border-[#e0dbff] group-hover:text-[#5140c9]">
              <Icon size={18} />
            </span>

            <span className="min-w-0">
              <span className="block text-sm font-semibold text-gray-800">
                {label}
              </span>
              <span className="mt-1 block text-xs leading-5 text-gray-500">
                {description}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
