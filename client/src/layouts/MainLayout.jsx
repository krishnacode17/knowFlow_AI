import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { BrainCircuit, Menu, Plus, X } from "lucide-react";
import Sidebar from "../components/dashboard/Sidebar";
import { useLocation } from "react-router-dom";

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { pathname } = useLocation();

  if (pathname === "/chat") {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-gray-900">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[220px] border-r border-gray-200 bg-white lg:block">
        <Sidebar />
      </aside>

      {/* Mobile & Tablet Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setSidebarOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          <aside className="absolute inset-y-0 left-0 w-[260px] max-w-[85vw] bg-white shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4">
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-7 w-7 text-[#5140c9]" />
                <span className="font-semibold">KnowFlow AI</span>
              </div>

              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setSidebarOpen(false)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <Sidebar onNavigate={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="min-h-screen lg:ml-[220px]">
        {/* Mobile & Tablet Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-gray-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:hidden">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setSidebarOpen(true)}
              className="shrink-0 rounded-lg p-2 text-gray-700 transition hover:bg-gray-100"
            >
              <Menu size={22} />
            </button>

            <Link to="/dashboard" className="flex min-w-0 items-center gap-2">
              <BrainCircuit className="h-7 w-7 shrink-0 text-[#5140c9]" />
              <span className="truncate font-semibold tracking-tight">
                KnowFlow AI
              </span>
            </Link>
          </div>

          <Link
            to="/chat"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#5140c9] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#4232b0]"
          >
            <Plus size={17} />
            <span className="hidden min-[360px]:inline">New Chat</span>
          </Link>
        </header>

        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
