import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaUsers,
  FaSearch,
  FaEnvelope,
  FaBox,
  FaTrash,
  FaUserTie,
} from "react-icons/fa";
import Swal from "sweetalert2";

const EmployeeList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: myEmployees = [], refetch } = useQuery({
    queryKey: ["my-employees", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-employees/${user?.email}`);
      return res.data;
    },
  });

  // Filter employees based on search
  const filteredEmployees = myEmployees.filter(
    (employee) =>
      employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveEmployee = async (employee) => {
    const result = await Swal.fire({
      title: "Remove Employee?",
      html: `Are you sure you want to remove <strong>${employee.name}</strong> from your team?<br><br><small class="text-red-600">⚠️ This action cannot be undone. The employee will lose access to all assigned assets.</small>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-lg",
        cancelButton: "rounded-lg",
      },
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/my-employees/${employee.email}`);
        if (res.data.deletedCount) {
          await Swal.fire({
            title: "Removed!",
            text: `${employee.name} has been removed from your team.`,
            icon: "success",
            confirmButtonColor: "#84cc16",
            customClass: {
              popup: "rounded-2xl",
              confirmButton: "rounded-lg",
            },
          });
          refetch();
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to remove employee. Please try again.",
          icon: "error",
          confirmButtonColor: "#ef4444",
          customClass: {
            popup: "rounded-2xl",
            confirmButton: "rounded-lg",
          },
        });
        console.error(error);
      }
    }
  };

  // Calculate total assets
  const totalAssets = myEmployees.reduce(
    (sum, emp) => sum + (emp.assetCount || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-lime-500 rounded-lg flex items-center justify-center">
              <FaUsers className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Employee List
              </h1>
              <p className="text-gray-600">
                Manage your team members and their assets
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-lime-50 rounded-xl p-4 border-2 border-lime-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-lime-500 rounded-lg flex items-center justify-center">
                <FaUsers className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">
                  Total Employees
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {myEmployees.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <FaBox className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">
                  Total Assets
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalAssets}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <FaUserTie className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">
                  Avg Assets/Employee
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {myEmployees.length > 0
                    ? (totalAssets / myEmployees.length).toFixed(1)
                    : 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all"
          />
        </div>
      </div>

      {/* Employee Grid */}
      {filteredEmployees.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUsers className="text-gray-400 text-3xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {searchTerm ? "No employees found" : "No employees yet"}
          </h3>
          <p className="text-gray-600">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Add employees to your team to see them here"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <div
              key={employee.email}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-lime-200"
            >
              {/* Card Header */}
              <div className="bg-linear-to-r from-lime-500 to-green-600 h-24 relative">
                <div className="absolute -bottom-12 left-6">
                  <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                    <img
                      src={
                        employee.image ||
                        "https://i.ibb.co.com/N2N3hH1k/icons8-user-48.png"
                      }
                      alt={employee.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="pt-16 pb-6 px-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {employee.name}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <FaEnvelope className="text-lime-500" />
                    {employee.email}
                  </p>
                </div>

                {/* Asset Count */}
                <div className="bg-lime-50 rounded-xl p-4 border-2 border-lime-200 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaBox className="text-lime-600" />
                      <span className="text-sm font-semibold text-gray-700">
                        Assets Assigned
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-lime-600">
                      {employee.assetCount || 0}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <button
                  onClick={() => handleRemoveEmployee(employee)}
                  className="w-full btn bg-red-500 hover:bg-red-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaTrash />
                  Remove from Team
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
