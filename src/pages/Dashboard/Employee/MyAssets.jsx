import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyAssets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myAssets = [] } = useQuery({
    queryKey: ["my-assets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-assets/${user?.email}`);
      return res.data;
    },
  });

  console.log(myAssets);

  return <div>my assets em</div>;
};

export default MyAssets;
