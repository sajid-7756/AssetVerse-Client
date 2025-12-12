import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import AssetCard from "../../../components/Dashboard/AssetCards/AssetCard";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import {
  FaShoppingCart,
  FaSearch,
  FaFilter,
  FaBox,
  FaCheckCircle,
} from "react-icons/fa";

const RequestAsset = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const {
    data: allAssets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/assets");
      return res.data;
    },
  });

  // Filter assets based on search, type, and availability
  const filteredAssets = allAssets.filter((asset) => {
    const matchesSearch =
      asset.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      filterType === "All" || asset.productType === filterType;
    const isAvailable = asset.availableQuantity > 0;
    return matchesSearch && matchesType && isAvailable;
  });

  // Calculate stats
  const totalAvailable = allAssets.filter((a) => a.availableQuantity > 0).length;
  const returnableCount = allAssets.filter(
    (a) => a.availableQuantity > 0 && a.productType === "Returnable"
  ).length;
  const nonReturnableCount = allAssets.filter(
    (a) => a.availableQuantity > 0 && a.productType === "Non-returnable"
  ).length;

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

    await axiosSecure.post("/asset-requests", requestData);
    refetch();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-lime-500 rounded-lg flex items-center justify-center">
            <FaShoppingCart className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Request Asset</h1>
            <p className="text-gray-600">
              Browse and request available assets from companies
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center">
                <FaBox className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">
                  Available Assets
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalAvailable}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <FaCheckCircle className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">
                  Returnable
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {returnableCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <FaBox className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">
                  Non-returnable
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {nonReturnableCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by asset or company name..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all appearance-none bg-white"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
          </div>
        </div>
      </div>

      {/* Asset Cards Grid */}
      {filteredAssets.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <FaBox className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {searchTerm || filterType !== "All"
                ? "No Assets Found"
                : "No Available Assets"}
            </h3>
            <p className="text-gray-600 max-w-md">
              {searchTerm || filterType !== "All"
                ? "Try adjusting your search or filter criteria"
                : "There are no assets available to request at the moment"}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <AssetCard key={asset._id} asset={asset} onRequest={handleRequest} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestAsset;
