import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaClipboardList,
  FaSearch,
  FaFilter,
  FaCheck,
  FaTimes,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Swal from "sweetalert2";

const AllRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const { data = {}, refetch } = useQuery({
    queryKey: ["all-assetRequests", user?.email, page],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/asset-requests/${user?.email}?limit=${limit}&skip=${skip}`
      );
      return res.data;
    },
  });

  const { requests: allRequests = [], total = 0 } = data;
  const limit = 10;
  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  // Filter requests based on search and status
  const filteredRequests = allRequests.filter((request) => {
    const matchesSearch =
      request.requesterName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.assetName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.assetType?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || request.requestStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const pendingCount = allRequests.filter(
    (r) => r.requestStatus === "pending"
  ).length;
  const approvedCount = allRequests.filter(
    (r) => r.requestStatus === "approved"
  ).length;
  const rejectedCount = allRequests.filter(
    (r) => r.requestStatus === "rejected"
  ).length;

  const handleApprove = async (request) => {
    const result = await Swal.fire({
      title: "Approve Request?",
      html: `Are you sure you want to approve <strong>${request.requesterName}'s</strong> request for <strong>${request.assetName}</strong>?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#84cc16",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-lg",
        cancelButton: "rounded-lg",
      },
    });

    if (result.isConfirmed) {
      try {
        const updateRequest = {
          requestStatus: "approved",
          assetId: request.assetId,
        };
        const res = await axiosSecure.patch(
          `/approve-employee-requests/${request._id}`,
          updateRequest
        );

        if (res.data.modifiedCount) {
          await Swal.fire({
            title: "Approved!",
            text: `${request.requesterName}'s request has been approved.`,
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
          text: "Failed to approve request. Please try again.",
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

  const handleReject = async (request) => {
    const result = await Swal.fire({
      title: "Reject Request?",
      html: `Are you sure you want to reject <strong>${request.requesterName}'s</strong> request for <strong>${request.assetName}</strong>?<br><br><small class="text-red-600">This action cannot be undone.</small>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-lg",
        cancelButton: "rounded-lg",
      },
    });

    if (result.isConfirmed) {
      try {
        const rejectRequest = {
          requestStatus: "rejected",
        };
        const res = await axiosSecure.patch(
          `/reject-employee-requests/${request._id}`,
          rejectRequest
        );

        if (res.data.modifiedCount) {
          await Swal.fire({
            title: "Rejected!",
            text: `${request.requesterName}'s request has been rejected.`,
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
          text: "Failed to reject request. Please try again.",
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

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="badge badge-warning gap-2">
            <FaClock />
            Pending
          </span>
        );
      case "approved":
        return (
          <span className="badge badge-success gap-2">
            <FaCheckCircle />
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="badge badge-error gap-2">
            <FaTimesCircle />
            Rejected
          </span>
        );
      default:
        return <span className="badge">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-lime-500 rounded-lg flex items-center justify-center">
              <FaClipboardList className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Requests</h1>
              <p className="text-gray-600">Manage employee asset requests</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center">
                <FaClipboardList className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">
                  Total Requests
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {allRequests.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <FaClock className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pendingCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <FaCheckCircle className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {approvedCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <FaTimesCircle className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">
                  {rejectedCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Search Bar */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by employee, asset name or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all appearance-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="bg-lime-500 text-white">
              <tr>
                <th className="text-white">#</th>
                <th className="text-white">Employee</th>
                <th className="text-white">Asset</th>
                <th className="text-white">Type</th>
                <th className="text-white">Date</th>
                <th className="text-white">Status</th>
                <th className="text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <FaClipboardList className="text-gray-400 text-4xl" />
                      <p className="text-gray-600 font-semibold">
                        {searchTerm || statusFilter !== "all"
                          ? "No requests found"
                          : "No requests yet"}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {searchTerm || statusFilter !== "all"
                          ? "Try adjusting your search or filter"
                          : "Asset requests will appear here"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRequests.map((request, index) => (
                  <tr key={request._id} className="hover">
                    <td className="font-semibold">{index + 1}</td>
                    <td className="font-semibold">{request.requesterName}</td>
                    <td>{request.assetName}</td>
                    <td>
                      <span className="badge badge-ghost">
                        {request.assetType}
                      </span>
                    </td>
                    <td>
                      {new Date(request.requestDate).toLocaleDateString()}
                    </td>
                    <td>{getStatusBadge(request.requestStatus)}</td>
                    <td>
                      <div className="flex gap-2">
                        {request.requestStatus === "pending" ? (
                          <>
                            <button
                              onClick={() => handleApprove(request)}
                              className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-0"
                            >
                              <FaCheck />
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(request)}
                              className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-0"
                            >
                              <FaTimes />
                              Reject
                            </button>
                          </>
                        ) : (
                          <span className="text-gray-500 text-sm italic">
                            {request.requestStatus === "approved"
                              ? "Approved"
                              : "Rejected"}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-lime-50 hover:text-lime-600 hover:border-lime-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white cursor-pointer"
        >
          <FaChevronLeft />
        </button>

        <div className="flex items-center gap-2">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setPage(num + 1)}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all text-sm font-medium cursor-pointer ${
                page === num + 1
                  ? "bg-lime-500 text-white shadow-md shadow-lime-200"
                  : "hover:bg-gray-100 text-gray-600 bg-white border border-transparent hover:border-gray-200"
              }`}
            >
              {num + 1}
            </button>
          ))}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-lime-50 hover:text-lime-600 hover:border-lime-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white cursor-pointer"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default AllRequests;
