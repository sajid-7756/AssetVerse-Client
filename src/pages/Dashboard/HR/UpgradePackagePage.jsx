import React from "react";
import UpgradePackage from "./UpgradePackage";
import PaymentHistory from "../../../components/Dashboard/PaymentHistory/PaymentHistory";

const UpgradePackagePage = () => {
  return (
    <div>
      <UpgradePackage />
      <PaymentHistory />
    </div>
  );
};

export default UpgradePackagePage;
