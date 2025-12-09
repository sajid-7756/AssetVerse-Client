import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AllAssetTableRow from "../../../components/Dashboard/TableRows/AllAssetTableRow";
import { useState } from "react";
import AssetCard from "../../../components/Dashboard/AssetCards/AssetCard";
import useAuth from "../../../hooks/useAuth";

const RequestAsset = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
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

  // Filter available assets
  const filteredAvailableQuantityAssets = filteredAsset.filter((asset) => {
    return asset.availableQuantity > 0;
  });
  const handleRequest = async (data) => {
    const requestData = {
      assetId: data.assetId,
      assetName: data.assetName,
      assetType: data.assetType,
      companyName: data.companyName,
      hrEmail: data.hrEmail,
      note: data.note,
      processedBy: data.processedBy,
      requesterName: data.requesterName,
      requesterEmail: user?.email,
    };

    const res = await axiosSecure.post("/asset-requests", requestData);
    console.log(res.data);
    refetch();
  };
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

      {/* Grid view */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAvailableQuantityAssets.map((asset) => (
          <AssetCard key={asset._id} asset={asset} onRequest={handleRequest} />
        ))}
      </div>
    </>
  );
};

export default RequestAsset;
