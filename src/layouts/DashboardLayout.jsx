import { Link, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import {
  FaBox,
  FaUsers,
  FaClipboardList,
  FaPlusCircle,
  FaUser,
  FaArrowUp,
} from "react-icons/fa";
import { MdOutlineRequestPage } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";

const DashboardLayout = () => {
  const { role, isRoleLoading } = useRole();

  const employeeDashboardLinks = [
    { id: 1, name: "My Assets", path: "/dashboard/my-asset", icon: <FaBox /> },
    {
      id: 2,
      name: "My Team",
      path: "/dashboard/my-team",
      icon: <AiOutlineTeam />,
    },
    {
      id: 3,
      name: "Request Assets",
      path: "/dashboard/request-asset",
      icon: <MdOutlineRequestPage />,
    },
    {
      id: 4,
      name: "Profile",
      path: "/dashboard/profile",
      icon: <FaUser />,
    },
  ];

  const HRDashboardLinks = [
    {
      id: 1,
      name: "Asset List",
      path: "/dashboard/asset-list",
      icon: <FaClipboardList />,
    },
    {
      id: 2,
      name: "Add Asset",
      path: "/dashboard/add-asset",
      icon: <FaPlusCircle />,
    },
    {
      id: 3,
      name: "All Request",
      path: "/dashboard/all-requests",
      icon: <FaClipboardList />,
    },
    {
      id: 4,
      name: "Employee List",
      path: "/dashboard/employee-list",
      icon: <FaUsers />,
    },
    {
      id: 5,
      name: "Upgrade Package",
      path: "/dashboard/upgrade-package",
      icon: <FaArrowUp />,
    },
    {
      id: 6,
      name: "Profile",
      path: "/dashboard/profile",
      icon: <FaUser />,
    },
  ];

  if (isRoleLoading) return <LoadingSpinner />;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">Navbar Title</div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                to={"/"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* List item */}
            {role === "employee"
              ? employeeDashboardLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={link.path}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip={link.name}
                    >
                      {link.icon}
                      <span className="is-drawer-close:hidden">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))
              : HRDashboardLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={link.path}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip={link.name}
                    >
                      {link.icon}
                      <span className="is-drawer-close:hidden">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
