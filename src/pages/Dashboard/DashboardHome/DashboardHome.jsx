import React from "react";
import useRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { FaBox, FaClipboardList, FaUsers, FaArrowUp, FaChartBar } from "react-icons/fa";
import Statistics from "../HR/Statistics";
import MyAssets from "../Employee/MyAssets";

const DashboardHome = () => {
  const { role, isRoleLoading } = useRole();
  const { user } = useAuth();

  if (isRoleLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-lime-50 p-8 rounded-[2rem] border border-lime-200 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-black mb-2 tracking-tight">
            Welcome back, <span className="text-lime-600">{user?.displayName}!</span> 👋
          </h1>
          <p className="text-base-content/60 font-medium">
            Here's what's happening with your {role === "hr" ? "company" : "workspace"} today.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="bg-base-100 p-4 rounded-2xl shadow-sm border border-base-300 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <FaCalendarAlt size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-base-content/40">Today</p>
              <p className="text-sm font-bold">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </div>

      {role === "hr" ? (
        <div className="space-y-8">
          <Statistics isAnimationActive={true} />
        </div>
      ) : (
        <div className="space-y-8">
          <MyAssets />
        </div>
      )}
    </div>
  );
};

// Internal icon for date
const FaCalendarAlt = ({ size }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height={size} width={size} xmlns="http://www.w3.org/2000/svg"><path d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm336-176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16v-48zm0 112c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16v-48zm-160-112c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16v-48zm0 112c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16v-48zm-160-112c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16v-48zm0 112c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16v-48zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path></svg>
);

export default DashboardHome;
