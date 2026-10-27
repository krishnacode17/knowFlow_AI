import { NavLink, Link } from "react-router-dom";
import {
  BrainCircuit,
  LayoutDashboard,
  MessageSquare,
  FileText,
  Database,
  Settings,
  UserRound,
  LibraryBig
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "AI Chat",
    path: "/chat",
    icon: MessageSquare,
  },
  {
    label: "Documents",
    path: "/documents",
    icon: FileText,
  },
  {
    label: "Knowledge Base",
    path: "/knowledge-base",
    icon: LibraryBig,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];


const comingSoon = [
  { label: "Integrations", icon: Database },
];


function Sidebar({ onNavigate }) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      {/* Logo */}
      {/* Logo — hide inside mobile drawer */}
      <Link
        to="/dashboard"
        onClick={onNavigate}
        className="hidden h-16 shrink-0 items-center gap-2.5 border-b border-gray-100 px-5 lg:flex"
      >
        <BrainCircuit
          className="h-8 w-8 shrink-0 text-[#5140c9]"
          strokeWidth={1.8}
        />

        <span className="text-lg font-semibold tracking-tight text-gray-950">
          KnowFlow AI
        </span>
      </Link>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
        {navigation.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-[#eeebff] text-[#4932c8]"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-950"
              }`
            }
          >
            <Icon size={19} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}

        <div className="!mt-5 space-y-1">
          {comingSoon.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              title={`${label} page coming later`}
              className="flex w-full cursor-default items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* User Profile UI — static for now */}
      <div className="shrink-0 border-t border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eeebff] text-[#5140c9]">
            <UserRound size={20} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">
              Your Profile
            </p>
            <p className="truncate text-xs text-gray-500">
              Welcome to KnowFlow
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
