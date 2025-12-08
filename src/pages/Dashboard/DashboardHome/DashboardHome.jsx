import React from "react";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import MyAssets from "../Employee/MyAssets";
import AssetList from "../HR/AssetList";

const DashboardHome = () => {
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) return <LoadingSpinner />;

  if (role === "employee") return <MyAssets />;

  if (role === "hr") return <AssetList />;
};

export default DashboardHome;
