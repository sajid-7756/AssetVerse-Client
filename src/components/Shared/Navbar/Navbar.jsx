import Container from "../Container";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role } = useRole();

  const links = (
    <>
      <li>
        <Link>Home</Link>
      </li>
      {!user && (
        <>
          <li>
            <Link to={"/join-as-employee"}>Join as Employee</Link>
          </li>
          <li>
            <Link to={"/join-as-hr"}>Join as HR</Link>
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
            <Link to="/dashboard/my-asset">My Assets</Link>
          </li>
          <li>
            <Link to="/dashboard/my-team">My Team</Link>
          </li>
          <li>
            <Link to="/dashboard/request-asset">Request Asset</Link>
          </li>
        </>
      ) : role === "hr" ? (
        <>
          <li>
            <Link to="/dashboard/asset-list">Asset List</Link>
          </li>
          <li>
            <Link to="/add-asset">Add Asset</Link>
          </li>
          <li>
            <Link to="/dashboard/all-requests">All Requests</Link>
          </li>
          <li>
            <Link to="/dashboard/employee-list">Asset List</Link>
          </li>
        </>
      ) : null}
      <li>
        <Link to="/dashboard/profile">Profile</Link>
      </li>
      <li>
        <button onClick={logOut}>Logout</button>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <Container className="flex">
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
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to={"/"} className="btn btn-ghost text-xl">
            AssetVerse
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              {/* Profile picture as dropdown trigger */}
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} alt="Profile" />
                </div>
              </label>

              {/* Dropdown menu */}
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
              >
                {dropdowns}
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Log In
            </Link>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
