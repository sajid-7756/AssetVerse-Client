import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Package = () => {
  const axiosSecure = useAxiosSecure();
  const { data: packages = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });

  console.log(packages);
  return (
    <div>
      <h3>package ({packages.length})</h3>

    </div>
  );
};

export default Package;
