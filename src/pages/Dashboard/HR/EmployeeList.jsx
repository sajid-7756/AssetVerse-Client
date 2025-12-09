import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MyEmployeesTableRow from "../../../components/Dashboard/TableRows/MyEmployeesTableRow";

const EmployeeList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myEmployees = [], refetch } = useQuery({
    queryKey: ["my-employees", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-employees/${user?.email}`);
      return res.data;
    },
  });

  console.log(myEmployees);

  return (
    <div>
      <h3 className="text-4xl font-semibold">
        my employee list({myEmployees.length})
      </h3>

      <div className="overflow-x-auto">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Asset Count</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myEmployees.map((employee, index) => (
                <MyEmployeesTableRow
                  key={employee.email}
                  employee={employee}
                  index={index}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
