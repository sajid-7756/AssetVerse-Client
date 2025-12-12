import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import {
  FaUsers,
  FaBirthdayCake,
  FaUserTie,
  FaUser,
  FaBuilding,
} from "react-icons/fa";

const MyTeam = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedCompany, setSelectedCompany] = useState("");

  // Fetch user's companies
  const { data: myCompanyNames = [] } = useQuery({
    enabled: !!user?.email,
    queryKey: ["my-companies", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-companies/${user?.email}`);
      return res.data;
    },
  });

  // Fetch team members for selected company
  const { data: myTeamMembers = [], isLoading } = useQuery({
    enabled: !!selectedCompany,
    queryKey: ["my-team", selectedCompany],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-team/${selectedCompany}`);
      return res.data;
    },
  });

  // Filter members with birthdays in current month
  const currentMonth = new Date().getMonth();
  const upcomingBirthdays = myTeamMembers.filter((member) => {
    if (!member.upcomingBirthday) return false;
    return new Date(member.upcomingBirthday).getMonth() === currentMonth;
  });

  // Format birthday date
  const formatBirthday = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-lime-500 rounded-lg flex items-center justify-center">
              <FaUsers className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Team</h1>
              <p className="text-gray-600">
                {selectedCompany
                  ? `${myTeamMembers.length} team members`
                  : "Select a company to view team"}
              </p>
            </div>
          </div>

          {/* Company Selector */}
          <div className="relative">
            <FaBuilding className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              onChange={(e) => setSelectedCompany(e.target.value)}
              value={selectedCompany}
              className="w-full md:w-64 pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all appearance-none bg-white font-semibold"
            >
              <option value="">Select a Company</option>
              {myCompanyNames.map((company, index) => (
                <option key={index} value={company.companyName}>
                  {company.companyName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Empty State - No Company Selected */}
      {!selectedCompany && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-lime-100 rounded-full flex items-center justify-center">
              <FaBuilding className="text-lime-600 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Select a Company
            </h3>
            <p className="text-gray-600 max-w-md">
              Choose a company from the dropdown above to view your team members
              and upcoming birthdays.
            </p>
          </div>
        </div>
      )}

      {/* Team Members Grid */}
      {selectedCompany && myTeamMembers.length > 0 && (
        <div className="space-y-6">
          {/* Team Members Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FaUsers className="text-lime-600" />
              Team Members
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {myTeamMembers.map((member) => (
                <div
                  key={member.email}
                  className="bg-linear-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-lime-300 transition-all duration-300 hover:scale-105"
                >
                  {/* Profile Photo */}
                  <div className="flex justify-center mb-3">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-lime-100">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/80?text=User";
                          }}
                        />
                      </div>
                      {/* Position Badge */}
                      <div
                        className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center ${
                          member.position === "hr"
                            ? "bg-lime-500"
                            : "bg-blue-500"
                        }`}
                      >
                        {member.position === "hr" ? (
                          <FaUserTie className="text-white text-sm" />
                        ) : (
                          <FaUser className="text-white text-sm" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="text-center">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 break-all">
                      {member.email}
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        member.position === "hr"
                          ? "bg-lime-100 text-lime-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {member.position === "hr" ? "HR Manager" : "Employee"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Birthdays Section */}
          <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-6 border-2 border-purple-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FaBirthdayCake className="text-purple-600" />
              Upcoming Birthdays This Month
            </h2>

            {upcomingBirthdays.length === 0 ? (
              <div className="text-center py-8">
                <FaBirthdayCake className="text-gray-400 text-4xl mx-auto mb-3" />
                <p className="text-gray-600 font-semibold">
                  No upcoming birthdays this month
                </p>
                <p className="text-gray-500 text-sm">
                  Check back next month for celebrations!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingBirthdays.map((member) => (
                  <div
                    key={member.email}
                    className="bg-white rounded-xl p-4 border-2 border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center gap-3">
                      {/* Photo */}
                      <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-purple-100 shrink-0">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/64?text=User";
                          }}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 truncate">
                          {member.name}
                        </h3>
                        <div className="flex items-center gap-1 text-purple-600 font-semibold text-sm">
                          <FaBirthdayCake />
                          <span>{formatBirthday(member.upcomingBirthday)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty State - No Team Members */}
      {selectedCompany && myTeamMembers.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <FaUsers className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              No Team Members
            </h3>
            <p className="text-gray-600 max-w-md">
              There are no team members in {selectedCompany} yet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTeam;
