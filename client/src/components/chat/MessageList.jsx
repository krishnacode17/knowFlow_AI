
import { useState } from "react";
import {
  BrainCircuit,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
} from "lucide-react";

export default function MessageList({ userMessage }) {
  const [copied, setCopied] = useState(false);

  const code = `const loginUser = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};`;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-7 px-4 py-6 sm:px-6 sm:py-8">
      {/* User message */}
      <div className="flex justify-end gap-3">
        <div className="max-w-[88%] rounded-2xl rounded-br-md bg-[#5140c9] px-4 py-3 text-sm leading-6 text-white sm:max-w-[80%]">
          {userMessage}
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
          AR
        </div>
      </div>

      {/* AI message */}
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f0edff]">
          <BrainCircuit size={21} className="text-[#5140c9]" />
        </div>

        <article className="min-w-0 flex-1">
          <div className="mb-2 text-sm font-semibold text-gray-900">
            KnowFlow AI
          </div>

          <div className="space-y-4 text-sm leading-7 text-gray-700">
            <p>
              React mein authentication flow ko samajhne ke liye hum ise
              kuch simple steps mein divide kar sakte hain.
            </p>

            <div>
              <h3 className="font-semibold text-gray-900">
                1. Client Login
              </h3>
              <p>
                User apna email aur password form mein enter karta hai.
                Frontend credentials ko server tak bhejta hai.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                2. Server Response
              </h3>
              <p>
                Server credentials verify karke authentication response
                deta hai. HttpOnly cookie use karne par token ko
                JavaScript se directly read karne ki zaroorat nahi hoti.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                3. Protected Routes
              </h3>
              <p>
                Protected pages par access dene se pehle application
                authentication status check karti hai.
              </p>
            </div>

            {/* Code block */}
            <div className="overflow-hidden rounded-xl border border-gray-800 bg-[#1e1e24] text-gray-100">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <span className="text-xs text-gray-400">JavaScript</span>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-gray-300 hover:bg-white/10"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy code"}
                </button>
              </div>

              <pre className="overflow-x-auto p-4 text-xs leading-6 sm:text-sm">
                <code>{code}</code>
              </pre>
            </div>

            <p>
              Ye example sirf UI preview ke liye hai. Actual authentication
              implementation baad mein connect karenge.
            </p>
          </div>

          {/* Message actions */}
          <div className="mt-4 flex flex-wrap items-center gap-1">
            <button
              aria-label="Copy response"
              onClick={() => {
                navigator.clipboard?.writeText(
                  "React authentication involves client login, server verification, and protected routes."
                );
              }}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
              <Copy size={16} />
            </button>
            <button
              aria-label="Good response"
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
              <ThumbsUp size={16} />
            </button>
            <button
              aria-label="Bad response"
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
              <ThumbsDown size={16} />
            </button>
            <button
              aria-label="Regenerate response"
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
