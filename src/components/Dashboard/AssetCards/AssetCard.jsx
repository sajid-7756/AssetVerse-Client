import React from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaBuilding, FaBox } from "react-icons/fa";

const AssetCard = ({ asset, onRequest }) => {
  const { user } = useAuth();

  const handleRequestClick = async () => {
    const { value: note } = await Swal.fire({
      title: "Request Asset",
      html: `
        <div class="text-left">
          <p class="mb-2"><strong>Asset:</strong> ${asset.productName}</p>
          <p class="mb-2"><strong>Company:</strong> ${asset.companyName}</p>
          <p class="mb-4"><strong>Type:</strong> ${asset.productType}</p>
        </div>
      `,
      input: "textarea",
      inputLabel: "Add a note for this request",
      inputPlaceholder: "Write your reason for requesting this asset...",
      inputAttributes: {
        "aria-label": "Request note",
      },
      showCancelButton: true,
      confirmButtonColor: "#84cc16",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Submit Request",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "Please provide a note for your request";
        }
      },
    });

    if (note) {
      try {
        const requestData = {
          assetId: asset._id,
          assetName: asset.productName,
          assetType: asset.productType,
          requesterName: user?.displayName,
          hrEmail: asset.hrEmail,
          companyName: asset.companyName,
          note: note,
          processedBy: asset.hrEmail,
        };
        await onRequest(requestData);
        toast.success("Asset request submitted successfully!");
      } catch (error) {
        if (error.response?.status === 409) {
          toast.error("You have already requested this asset");
        } else {
          toast.error("Failed to submit request. Please try again.");
        }
      }
    }
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-lime-300 transition-all duration-300 hover:scale-105">
      {/* Asset Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img
          src={asset.productImage}
          alt={asset.productName}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://i.ibb.co.com/zWDrGvkn/a7ae73fd-a6cc-463f-91a6-49ed7ed143be.jpg";
          }}
        />
        {/* Type Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              asset.productType === "Returnable"
                ? "bg-blue-500 text-white"
                : "bg-purple-500 text-white"
            }`}
          >
            {asset.productType}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Asset Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {asset.productName}
        </h3>

        {/* Company Name */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <FaBuilding className="text-lime-600" />
          <span className="text-sm">{asset.companyName}</span>
        </div>

        {/* Available Quantity */}
        <div className="flex items-center gap-2 mb-4">
          <FaBox className="text-gray-500" />
          <span className="text-sm text-gray-700">
            <span className="font-bold text-gray-900">
              {asset.availableQuantity}
            </span>{" "}
            available
          </span>
        </div>

        {/* Request Button */}
        <button
          onClick={handleRequestClick}
          className="btn btn-sm w-full bg-linear-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300"
        >
          Request Asset
        </button>
      </div>
    </div>
  );
};

export default AssetCard;
