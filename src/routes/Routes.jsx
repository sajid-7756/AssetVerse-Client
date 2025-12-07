import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import { createBrowserRouter } from "react-router";
import JoinAsEmployee from "../pages/Home/JoinAsEmployee/JoinAsEmployee";
import JoinAsHR from "../pages/Home/JoinAsHR/JoinAsHR";
import Profile from "../components/Shared/Profile/Profile";
import MyAssets from "../pages/Employee/MyAssets";
import EmployeeRoute from "./EmployeeRoute";
import MyTeam from "../pages/Employee/MyTeam";
import RequestAsset from "../pages/Employee/RequestAsset";
import AssetList from "../pages/HR/AssetList";
import HRRoute from "./HRRoute";
import AddAsset from "../pages/HR/AddAsset";
import AllRequests from "../pages/HR/AllRequests";
import EmployeeList from "../pages/HR/EmployeeList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/join-as-employee",
        element: <JoinAsEmployee />,
      },
      {
        path: "/join-as-hr",
        element: <JoinAsHR />,
      },
      {
        path: "/my-asset",
        element: (
          <EmployeeRoute>
            <MyAssets />
          </EmployeeRoute>
        ),
      },
      {
        path: "/my-team",
        element: (
          <EmployeeRoute>
            <MyTeam />
          </EmployeeRoute>
        ),
      },
      {
        path: "/request-asset",
        element: (
          <EmployeeRoute>
            <RequestAsset />
          </EmployeeRoute>
        ),
      },
      {
        path: "/asset-list",
        element: (
          <HRRoute>
            <AssetList />
          </HRRoute>
        ),
      },
      {
        path: "/add-asset",
        element: (
          <HRRoute>
            <AddAsset />
          </HRRoute>
        ),
      },
      {
        path: "/all-requests",
        element: (
          <HRRoute>
            <AllRequests />
          </HRRoute>
        ),
      },
      {
        path: "/employee-list",
        element: (
          <HRRoute>
            <EmployeeList />
          </HRRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      //dashboard children
    ],
  },
]);
