import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AllAssetTableRow from "../../../components/Dashboard/TableRows/AllAssetTableRow";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { FaBox, FaSearch, FaCheckCircle } from "react-icons/fa";

const AssetList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: allAssets = [], refetch } = useQuery({
    queryKey: ["all-assets"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/company-assets/${user?.email}`);
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

  // Calculate stats
  const totalAssets = allAssets.reduce(
    (sum, asset) => sum + asset.productQuantity,
    0
  );
  const availableAssets = allAssets.reduce(
    (sum, asset) => sum + asset.availableQuantity,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-lime-500 rounded-lg flex items-center justify-center">
              <FaBox className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Asset List</h1>
              <p className="text-gray-600">Manage your company assets</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center">
                <FaBox className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">
                  Total Assets
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalAssets}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <FaCheckCircle className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">Available</p>
                <p className="text-2xl font-bold text-gray-900">
                  {availableAssets}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by product or company name..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="bg-lime-500 text-white">
              <tr>
                <th className="text-white">Product</th>
                <th className="text-white">Quantity</th>
                <th className="text-white">Type</th>
                <th className="text-white">HR Email</th>
                <th className="text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAsset.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <FaBox className="text-gray-400 text-4xl" />
                      <p className="text-gray-600 font-semibold">
                        {searchTerm ? "No assets found" : "No assets yet"}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {searchTerm
                          ? "Try adjusting your search terms"
                          : "Add assets to see them here"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAsset.map((asset) => (
                  <AllAssetTableRow
                    key={asset._id}
                    asset={asset}
                    refetch={refetch}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssetList;
