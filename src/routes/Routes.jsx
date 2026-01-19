import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import { createBrowserRouter } from "react-router";
import JoinAsEmployee from "../pages/Home/JoinAsEmployee/JoinAsEmployee";
import JoinAsHR from "../pages/Home/JoinAsHR/JoinAsHR";
import Profile from "../components/Shared/Profile/Profile";
import MyAssets from "../pages/Dashboard/Employee/MyAssets";
import EmployeeRoute from "./EmployeeRoute";
import MyTeam from "../pages/Dashboard/Employee/MyTeam";
import RequestAsset from "../pages/Dashboard/Employee/RequestAsset";
import AssetList from "../pages/Dashboard/HR/AssetList";
import HRRoute from "./HRRoute";
import AddAsset from "../pages/Dashboard/HR/AddAsset";
import AllRequests from "../pages/Dashboard/HR/AllRequests";
import EmployeeList from "../pages/Dashboard/HR/EmployeeList";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import UpgradePackagePage from "../pages/Dashboard/HR/UpgradePackagePage";
import Blog from "../pages/Blog/Blog";
import Support from "../pages/Support/Support";
import PrivacyTerms from "../pages/PrivacyTerms/PrivacyTerms";
import BlogDetails from "../pages/Blog/BlogDetails";

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
      { path: "/login", element: <Login /> },
      { path: "/blog", element: <Blog /> },
      { path: "/blog/:id", element: <BlogDetails /> },
      { path: "/support", element: <Support /> },
      { path: "/privacy-terms", element: <PrivacyTerms /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <>
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      </>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "/dashboard/my-asset",
        element: (
          <PrivateRoute>
            <EmployeeRoute>
              <MyAssets />
            </EmployeeRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-team",
        element: (
          <PrivateRoute>
            <EmployeeRoute>
              <MyTeam />
            </EmployeeRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/request-asset",
        element: (
          <PrivateRoute>
            <EmployeeRoute>
              <RequestAsset />
            </EmployeeRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/asset-list",
        element: (
          <PrivateRoute>
            <HRRoute>
              <AssetList />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-asset",
        element: (
          <PrivateRoute>
            <HRRoute>
              <AddAsset />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all-requests",
        element: (
          <PrivateRoute>
            <HRRoute>
              <AllRequests />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/employee-list",
        element: (
          <PrivateRoute>
            <HRRoute>
              <EmployeeList />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/upgrade-package",
        element: (
          <PrivateRoute>
            <HRRoute>
              <UpgradePackagePage />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
