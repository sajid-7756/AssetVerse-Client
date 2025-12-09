import React from "react";

const MyEmployeesTableRow = ({ employee, index, refetch }) => {
  const { name, image, email, assetCount } = employee;

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
          <button className="btn btn-ghost">details</button>
        </th>
      </tr>
    </>
  );
};

export default MyEmployeesTableRow;
