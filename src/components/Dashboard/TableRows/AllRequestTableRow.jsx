import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AllRequestTableRow = ({ request, index, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const { assetId, assetName, requestDate, requestStatus, requesterName } =
    request;

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
    toast.success("Approved");
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
    toast.success("Rejected");
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
