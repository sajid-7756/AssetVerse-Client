import React from "react";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import MyAssets from "../Employee/MyAssets";
import Statistics from "../HR/Statistics";

const DashboardHome = () => {
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) return <LoadingSpinner />;

  if (role === "employee") return <MyAssets />;

  if (role === "hr") return <Statistics />;
};

export default DashboardHome;
