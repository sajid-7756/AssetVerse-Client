import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import MyTeamTableRow from "../../../components/Dashboard/TableRows/MyTeamTableRow";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const MyTeam = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedCompany, setSelectedCompany] = useState("");
  const { data: myCompanyNames = [] } = useQuery({
    enabled: !!user?.email,
    queryKey: ["my-companies", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-companies/${user?.email}`);
      return res.data;
    },
  });
  const { data: myTeamMembers = [], isLoading } = useQuery({
    enabled: !!selectedCompany,
    queryKey: ["my-team", selectedCompany],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-team/${selectedCompany}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-4xl font-semibold">
          {selectedCompany
            ? `My Team ${myTeamMembers.length}`
            : "Please select a company"}
        </h3>
        <select
          onChange={(e) => setSelectedCompany(e.target.value)}
          defaultValue="Select a Company"
          className="select"
        >
          <option disabled={true}>Select a Company</option>
          {myCompanyNames.map((company, index) => (
            <option key={index} value={company.companyName}>
              {company.companyName}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        {!selectedCompany && (
          <p className="text-red-500 mt-4">Please select a company first.</p>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Position</th>
              <th>Upcoming Birthday</th>
            </tr>
          </thead>
          <tbody>
            {myTeamMembers.map((member, index) => (
              <MyTeamTableRow
                key={member.email}
                member={member}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTeam;
