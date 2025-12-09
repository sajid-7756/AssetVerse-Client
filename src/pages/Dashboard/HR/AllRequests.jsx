import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AllRequestTableRow from "../../../components/Dashboard/TableRows/AllRequestTableRow";

const AllRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: allRequests = [], refetch } = useQuery({
    queryKey: ["all-assetRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/asset-requests/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h3 className="text-4xl font-semibold">
        All requests ({allRequests.length})
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Employee</th>
              <th>Asset</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allRequests.map((request, index) => (
              <AllRequestTableRow key={request._id} index={index} request={request} refetch={refetch} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequests;
