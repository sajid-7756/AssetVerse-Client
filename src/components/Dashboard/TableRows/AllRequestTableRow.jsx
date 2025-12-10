import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllRequestTableRow = ({ request, index, refetch }) => {
  const axiosSecure = useAxiosSecure();
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
  } = request;
  console.log(request);

  const handleEmployeeApprove = async (request) => {
    const updateRequest = {
      requestStatus: "approved",
      assetId,
    };
    const res = await axiosSecure.patch(
      `/approve-employee-requests/${request?._id}`,
      updateRequest
    );
    console.log(res.data);
    refetch();
  };

  const handleEmployeeReject = async (request) => {
    const rejectRequest = {
      requestStatus: "rejected",
    };
    const res = await axiosSecure.patch(
      `/reject-employee-requests/${request?._id}`,
      rejectRequest
    );
    refetch();
    console.log(res.data);
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{requesterName}</td>
        <td>{assetName}</td>
        <td>{new Date(requestDate).toLocaleDateString()}</td>
        <td
          className={`badge ${
            requestStatus === "pending"
              ? "badge-warning"
              : requestStatus === "approved"
              ? "badge-success"
              : requestStatus === "rejected"
              ? "badge-error"
              : ""
          }`}
        >
          {requestStatus}
        </td>
        <td>
          <button
            onClick={() => handleEmployeeApprove(request)}
            className="btn btn-outline btn-success"
          >
            Approve
          </button>
          <button
            onClick={() => handleEmployeeReject(request)}
            className="btn btn-outline btn-error"
          >
            Reject
          </button>
        </td>
      </tr>
    </>
  );
};

export default AllRequestTableRow;
