import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: allRequests = [] } = useQuery({
    queryKey: ["all-assetRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/asset-requests/${user?.email}`);
      return res.data;
    },
  });

  const {
    approvalDate,
    assetId,
    assetName,
    assetType,
    companyName,
    hrEmail,
    note,
    processedBy,
    requestDate,
    requestStatus,
    requesterName,
    _id,
  } = allRequests;

  console.log(allRequests);

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
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequests;
