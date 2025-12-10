import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyEmployeesTableRow = ({ employee, index, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const { name, image, email, assetCount } = employee;

  const handleRemoveEmployee = async (email) => {
    const res = await axiosSecure.delete(`/my-employees/${email}`);
    console.log(res.data);
    refetch()
  };

  return (
    <>
      <tr>
        <th>{index + 1}</th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={image} alt={name} />
              </div>
            </div>
            <div>
              <div className="font-bold">{name}</div>
              <div className="text-sm opacity-50">{email}</div>
            </div>
          </div>
        </td>
        <td>{assetCount}</td>
        <th>
          <button
            onClick={() => handleRemoveEmployee(email)}
            className="btn btn-outline btn-error"
          >
            Remove From Team
          </button>
        </th>
      </tr>
    </>
  );
};

export default MyEmployeesTableRow;
