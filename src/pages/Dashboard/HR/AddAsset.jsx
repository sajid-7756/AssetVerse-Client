import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../Utils";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaBox,
  FaBuilding,
  FaImage,
  FaHashtag,
  FaEnvelope,
  FaPlus,
  FaExclamationTriangle,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const AddAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const { data: userData = {} } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    try {
      const imageFile = data.productImage[0];

      // Upload image and get URL
      const imgURL = await imageUpload(imageFile);

      const asset = {
        productName: data.productName,
        companyName: userData?.companyName,
        productImage: imgURL,
        availableQuantity: parseInt(data.availableQuantity),
        productQuantity: parseInt(data.productQuantity),
        productType: data.productType,
        hrEmail: data.hrEmail,
        dateAdded: new Date().toISOString(),
      };

      // Send asset to backend
      const res = await axiosSecure.post("/assets", asset);

      if (res.data.insertedId) {
        await Swal.fire({
          title: "Success!",
          text: `${data.productName} has been added successfully.`,
          icon: "success",
          confirmButtonColor: "#84cc16",
          customClass: {
            popup: "rounded-2xl",
            confirmButton: "rounded-lg",
          },
        });
        reset(); // clear form after submit
      }
    } catch (error) {
      console.error("Error submitting asset:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add asset. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
        customClass: {
          popup: "rounded-2xl",
          confirmButton: "rounded-lg",
        },
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-lime-500 rounded-lg flex items-center justify-center">
            <FaPlus className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Asset</h1>
            <p className="text-gray-600">Add a new asset to your inventory</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Product Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                <FaBox className="text-lime-500" />
                Product Name
              </span>
            </label>
            <input
              {...register("productName", {
                required: "Product name is required",
              })}
              className={`input input-bordered w-full focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all ${
                errors.productName ? "border-red-500" : ""
              }`}
              placeholder="Enter product name"
            />
            {errors.productName && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <FaExclamationTriangle />
                {errors.productName.message}
              </p>
            )}
          </div>

          {/* Company Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                <FaBuilding className="text-lime-500" />
                Company Name
              </span>
            </label>
            <input
              {...register("companyName", {})}
              className={`input input-bordered w-full focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all ${
                errors.companyName ? "border-red-500" : ""
              }`}
              placeholder="Enter company name"
              value={userData?.companyName}
              disabled
            />
            {errors.companyName && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <FaExclamationTriangle />
                {errors.companyName.message}
              </p>
            )}
          </div>

          {/* Product Image (File Upload) */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                <FaImage className="text-lime-500" />
                Product Image
              </span>
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("productImage", { required: "Image is required" })}
              className={`file-input file-input-bordered w-full focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all ${
                errors.productImage ? "border-red-500" : ""
              }`}
            />
            {errors.productImage && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <FaExclamationTriangle />
                {errors.productImage.message}
              </p>
            )}
          </div>

          {/* Available Quantity */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                <FaHashtag className="text-lime-500" />
                Available Quantity
              </span>
            </label>
            <input
              {...register("availableQuantity", {
                required: "Available quantity is required",
                min: { value: 0, message: "Quantity must be at least 0" },
                valueAsNumber: true,
              })}
              className={`input input-bordered w-full focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all ${
                errors.availableQuantity ? "border-red-500" : ""
              }`}
              type="number"
              min="0"
              placeholder="0"
            />
            {errors.availableQuantity && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <FaExclamationTriangle />
                {errors.availableQuantity.message}
              </p>
            )}
          </div>

          {/* Total Quantity */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                <FaHashtag className="text-lime-500" />
                Total Quantity
              </span>
            </label>
            <input
              {...register("productQuantity", {
                required: "Total quantity is required",
                min: { value: 1, message: "Quantity must be at least 1" },
                valueAsNumber: true,
              })}
              className={`input input-bordered w-full focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all ${
                errors.productQuantity ? "border-red-500" : ""
              }`}
              type="number"
              min="1"
              placeholder="0"
            />
            {errors.productQuantity && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <FaExclamationTriangle />
                {errors.productQuantity.message}
              </p>
            )}
          </div>

          {/* Product Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                <FaBox className="text-lime-500" />
                Product Type
              </span>
            </label>
            <select
              {...register("productType", {
                required: "Product type is required",
              })}
              className={`select select-bordered w-full focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all ${
                errors.productType ? "border-red-500" : ""
              }`}
            >
              <option value="">Select type</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-Returnable">Non-Returnable</option>
            </select>
            {errors.productType && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <FaExclamationTriangle />
                {errors.productType.message}
              </p>
            )}
          </div>

          {/* HR Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                <FaEnvelope className="text-lime-500" />
                HR Email
              </span>
            </label>
            <input
              value={user?.email || ""}
              readOnly
              {...register("hrEmail", { required: "HR email is required" })}
              className="input input-bordered w-full bg-gray-50"
              type="email"
            />
            {errors.hrEmail && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <FaExclamationTriangle />
                {errors.hrEmail.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn w-full bg-lime-500 hover:bg-lime-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-lg h-14 disabled:bg-gray-400"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Adding Asset...
                </>
              ) : (
                <>
                  <FaPlus />
                  Add Asset
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
          <FaBox className="text-blue-600" />
          Asset Information
        </h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>
            • <strong>Returnable:</strong> Assets that must be returned when no
            longer needed
          </li>
          <li>
            • <strong>Non-Returnable:</strong> Assets that are permanently
            assigned
          </li>
          <li>
            • <strong>Available Quantity:</strong> Number of units currently
            available for assignment
          </li>
          <li>
            • <strong>Total Quantity:</strong> Total number of units in
            inventory
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AddAsset;
