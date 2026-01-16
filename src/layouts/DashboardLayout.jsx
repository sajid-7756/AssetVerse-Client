import { Link, NavLink, Outlet, useLocation } from "react-router";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import {
  FaBox,
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaUsers,
  FaClipboardList,
  FaPlusCircle,
  FaChartBar,
  FaArrowUp,
  FaBars,
} from "react-icons/fa";
import { MdOutlineRequestPage } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
import { useState } from "react";

const DashboardLayout = () => {
  const { role, isRoleLoading } = useRole();
  const { user, logOut } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isRoleLoading) return <LoadingSpinner />;

  const employeeDashboardLinks = [
    { id: 1, name: "My Assets", path: "/dashboard/my-asset", icon: FaBox },
    {
      id: 2,
      name: "My Team",
      path: "/dashboard/my-team",
      icon: AiOutlineTeam,
    },
    {
      id: 3,
      name: "Request Assets",
      path: "/dashboard/request-asset",
      icon: MdOutlineRequestPage,
    },
    {
      id: 4,
      name: "Profile",
      path: "/dashboard/profile",
      icon: FaUser,
    },
  ];

  const HRDashboardLinks = [
    {
      id: 1,
      name: "Statistics",
      path: "/dashboard",
      icon: FaChartBar,
    },
    {
      id: 1,
      name: "Asset List",
      path: "/dashboard/asset-list",
      icon: FaClipboardList,
    },
    {
      id: 2,
      name: "Add Asset",
      path: "/dashboard/add-asset",
      icon: FaPlusCircle,
    },
    {
      id: 3,
      name: "All Requests",
      path: "/dashboard/all-requests",
      icon: FaClipboardList,
    },
    {
      id: 4,
      name: "Employee List",
      path: "/dashboard/employee-list",
      icon: FaUsers,
    },
    {
      id: 5,
      name: "Upgrade Package",
      path: "/dashboard/upgrade-package",
      icon: FaArrowUp,
    },
    {
      id: 6,
      name: "Profile",
      path: "/dashboard/profile",
      icon: FaUser,
    },
  ];

  const dashboardLinks =
    role === "employee" ? employeeDashboardLinks : HRDashboardLinks;

  const handleLogout = async () => {
    await logOut();
  };

  return (
    <div className="min-h-screen bg-lime-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 bg-white border-r-2 border-gray-200 shadow-xl`}
      >
        {/* Sidebar Header - Branding */}
        <div className="h-20 flex items-center justify-center border-b-2 border-gray-100 bg-linear-to-r from-lime-500 to-green-600">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <FaBox className="text-lime-600 text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AssetVerse</h1>
              <p className="text-xs text-lime-100">Dashboard</p>
            </div>
          </Link>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-b-2 border-gray-100 bg-lime-50">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full ring-2 ring-lime-500 ring-offset-2">
                <img
                  src={user?.photoURL || "https://via.placeholder.com/150"}
                  alt={user?.displayName || "User"}
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.displayName || "User"}
              </p>
              <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-lime-500 text-white">
                {role === "hr" ? "HR Manager" : "Employee"}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {/* Home Link */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-lime-500 text-white shadow-lg"
                      : "text-gray-700 hover:bg-lime-100 hover:text-lime-700"
                  }`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaHome className="text-lg" />
                <span className="font-medium">Homepage</span>
              </NavLink>
            </li>

            {/* Divider */}
            <li className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {role === "hr" ? "HR Management" : "My Workspace"}
              </p>
            </li>

            {/* Dashboard Links */}
            {dashboardLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <li key={link.id}>
                  <NavLink
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-lime-500 text-white shadow-lg"
                        : "text-gray-700 hover:bg-lime-100 hover:text-lime-700"
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Icon className="text-lg" />
                    <span className="font-medium">{link.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t-2 border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            <FaSignOutAlt className="text-lg" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Navbar */}
        <header className="sticky top-0 z-20 h-20 bg-white border-b-2 border-gray-200 shadow-sm">
          <div className="h-full px-4 md:px-6 flex items-center justify-between">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden btn btn-ghost btn-square text-gray-700"
            >
              <FaBars className="text-xl" />
            </button>

            {/* Page Title */}
            <div className="flex-1 lg:flex-none">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                {dashboardLinks.find((link) => link.path === location.pathname)
                  ?.name || "Dashboard"}
              </h2>
            </div>

            {/* Desktop User Info */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs text-gray-600">{user?.email}</p>
              </div>
              <div className="avatar">
                <div className="w-10 h-10 rounded-full ring-2 ring-lime-500">
                  <img
                    src={user?.photoURL || "https://i.ibb.co.com/N2N3hH1k/icons8-user-48.png"}
                    alt={user?.displayName || "User"}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-5rem)] p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
