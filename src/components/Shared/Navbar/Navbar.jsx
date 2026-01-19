import Container from "../Container";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import {
  FaBox,
  FaHome,
  FaUserTie,
  FaSignInAlt,
  FaSignOutAlt,
  FaClipboardList,
  FaUsers,
  FaPlus,
  FaUser,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role } = useRole();

  const handleUpBtn = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const links = (
    <>
      <li>
        <Link
          onClick={handleUpBtn}
          to="/"
          className="flex items-center gap-2 hover:text-lime-500"
        >
          <FaHome size={16} />
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/blog"
          className="flex items-center gap-2 hover:text-lime-500"
        >
          <FaUser size={16} />
          Blog
        </Link>
      </li>
      {!user ? (
        <>
          <li>
            <Link
              to={"/join-as-employee"}
              className="flex items-center gap-2 hover:text-lime-500"
            >
              <FaUserTie size={16} />
              Join as Employee
            </Link>
          </li>
          <li>
            <Link
              to={"/join-as-hr"}
              className="flex items-center gap-2 hover:text-lime-500"
            >
              <FaBox size={16} />
              Join as HR
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link
              to={"/dashboard"}
              className="flex items-center gap-2 hover:text-lime-500"
            >
              <FaBox size={16} />
              Dashboard
            </Link>
          </li>
        </>
      )}
    </>
  );

  const dropdowns = (
    <>
      {role === "employee" ? (
        <>
          <li>
            <Link to="/dashboard/my-asset" className="flex items-center gap-2">
              <FaBox size={16} />
              My Assets
            </Link>
          </li>
          <li>
            <Link to="/dashboard/my-team" className="flex items-center gap-2">
              <FaUsers size={16} />
              My Team
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/request-asset"
              className="flex items-center gap-2"
            >
              <FaClipboardList size={16} />
              Request Asset
            </Link>
          </li>
        </>
      ) : role === "hr" ? (
        <>
          <li>
            <Link
              to="/dashboard/asset-list"
              className="flex items-center gap-2"
            >
              <FaBox size={16} />
              Asset List
            </Link>
          </li>
          <li>
            <Link to="/dashboard/add-asset" className="flex items-center gap-2">
              <FaPlus size={16} />
              Add Asset
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/all-requests"
              className="flex items-center gap-2"
            >
              <FaClipboardList size={16} />
              All Requests
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/employee-list"
              className="flex items-center gap-2"
            >
              <FaUsers size={16} />
              Employee List
            </Link>
          </li>
        </>
      ) : null}
      <li>
        <Link to="/dashboard/profile" className="flex items-center gap-2">
          <FaUser size={16} />
          Profile
        </Link>
      </li>
      <li>
        <button
          onClick={logOut}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-bold"
        >
          <FaSignOutAlt size={16} />
          Logout
        </button>
      </li>
    </>
  );

  return (
    <div className="navbar bg-linear-to-r from-white/50 to-lime-50/50 shadow-md sticky top-0 z-50 backdrop-blur-md">
      <Container className="flex w-full sm:px-6">
        {/* Navbar Start - Mobile Menu + Logo */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-white rounded-lg z-50 mt-3 w-52 p-2 shadow-xl border border-gray-100"
            >
              {links}
            </ul>
          </div>
          <Link
            onClick={handleUpBtn}
            to={"/"}
            className="btn btn-ghost text-2xl font-bold bg-linear-to-r from-lime-500 to-green-600 text-white rounded-lg px-3 gap-2"
          >
            <img src="/favicon.png" alt="AssetVerse Logo" className="w-8 h-8" />
            AssetVerse
          </Link>
        </div>

        {/* Navbar Center - Desktop Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
        </div>

        {/* Navbar End - Profile/Login */}
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              {/* Profile picture as dropdown trigger */}
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar border-2 border-lime-500 cursor-pointer hover:border-lime-600 transition"
              >
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} alt="Profile" />
                </div>
              </label>

              {/* Dropdown menu */}
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow-xl bg-white rounded-lg w-56 border border-gray-100"
              >
                {/* User Info Header */}
                <li className="pointer-events-none">
                  <div className="px-3 py-2 bg-linear-to-r from-lime-50 to-green-50 rounded-md border-b border-gray-200 flex flex-col">
                    <p className="font-semibold text-gray-900">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-600">{user?.email}</p>
                    {role && (
                      <p className="text-xs font-medium text-lime-600 mt-1">
                        Role: {role?.toUpperCase()}
                      </p>
                    )}
                  </div>
                </li>
                <li>
                  <hr className="my-1" />
                </li>
                {dropdowns}
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn bg-lime-500 hover:bg-lime-600 text-white border-0 rounded-lg font-semibold gap-2"
            >
              <FaSignInAlt size={16} />
              Log In
            </Link>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
