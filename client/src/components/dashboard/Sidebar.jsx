import { NavLink, Link } from "react-router-dom";
import {
  BrainCircuit,
  LayoutDashboard,
  MessageSquare,
  FileText,
  Database,
  Settings,
  UserRound,
  LogOut,
  LibraryBig,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

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

const comingSoon = [{ label: "Integrations", icon: Database }];

function Sidebar({ onNavigate }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      onNavigate?.();
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

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
      
{/* User Profile and Logout */}
<div className="mt-auto shrink-0 border-t border-gray-100 bg-white p-3 sm:p-4">
  <div className="flex min-w-0 items-center gap-3">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eeebff] text-[#5140c9]">
      <UserRound size={20} />
    </div>

    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-semibold text-gray-900">
        {user
          ? `${user.firstName} ${user.lastName}`
          : "Your Profile"}
      </p>

      <p className="truncate text-xs text-gray-500">
        {user?.email || "Welcome to KnowFlow"}
      </p>
    </div>
  </div>

  <button
    type="button"
    onClick={handleLogout}
    className="mt-3 flex min-h-10 w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
  >
    <LogOut size={18} className="shrink-0" />
    <span>Logout</span>
  </button>
</div>



    </div>
  );
}

export default Sidebar;
