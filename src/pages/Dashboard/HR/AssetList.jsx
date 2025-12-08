import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AllAssetTableRow from "../../../components/Dashboard/TableRows/AllAssetTableRow";
import { useState } from "react";

const AssetList = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allAssets = [], refetch } = useQuery({
    queryKey: ["all-assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/assets");
      return res.data;
    },
  });
  const [searchTerm, setSearchTerm] = useState("");
  const filteredAsset = allAssets.filter(
    (asset) =>
      asset.productName
        .toLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      asset.companyName.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  return (
    <>
      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by product or company..."
          className="input input-bordered w-full max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Type</th>
              <th>HR Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAsset.map((asset) => (
              <AllAssetTableRow
                key={asset._id}
                asset={asset}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AssetList;
