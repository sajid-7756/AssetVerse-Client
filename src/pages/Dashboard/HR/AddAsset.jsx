import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../Utils";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const imageFile = data.productImage[0];

      // Upload image and get URL
      const imgURL = await imageUpload(imageFile);

      const asset = {
        productName: data.productName,
        companyName: data.companyName,
        productImage: imgURL,
        availableQuantity: data.availableQuantity,
        productQuantity: data.productQuantity,
        productType: data.productType,
        hrEmail: data.hrEmail,
        dateAdded: new Date().toISOString(),
      };

      console.log("add asset", asset);

      // Send asset to backend
      const res = await axiosSecure.post("/assets", asset);

      console.log(res.data);

      reset(); // clear form after submit
    } catch (error) {
      console.error("Error submitting asset:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-200 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Add Asset</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Product Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input
            {...register("productName", {
              required: "Product name is required",
            })}
            className="input input-bordered"
          />
          {errors.productName && (
            <p className="text-red-500 text-xs">{errors.productName.message}</p>
          )}
        </div>

        {/* Company Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Company Name</span>
          </label>
          <input
            {...register("companyName", {
              required: "Company name is required",
            })}
            className="input input-bordered"
          />
          {errors.companyName && (
            <p className="text-red-500 text-xs">{errors.companyName.message}</p>
          )}
        </div>

        {/* Product Image (File Upload) */}
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text">Product Image</span>
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("productImage", { required: "Image is required" })}
            className="file-input file-input-bordered w-full"
          />
          {errors.productImage && (
            <p className="text-red-500 text-xs">
              {errors.productImage.message}
            </p>
          )}
        </div>

        {/* Available Quantity */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Available Quantity</span>
          </label>
          <input
            {...register("availableQuantity", { valueAsNumber: true })}
            className="input input-bordered"
            type="number"
            min="0"
          />
        </div>

        {/* Total Quantity */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Total Quantity</span>
          </label>
          <input
            {...register("productQuantity", { valueAsNumber: true })}
            className="input input-bordered"
            type="number"
            min="0"
          />
        </div>

        {/* Product Type */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Type</span>
          </label>
          <select
            {...register("productType")}
            className="select select-bordered"
          >
            <option value="Returnable">Returnable</option>
            <option value="Non-Returnable">Non-Returnable</option>
          </select>
        </div>

        {/* HR Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">HR Email</span>
          </label>
          <input
            value={user?.email}
            readOnly
            {...register("hrEmail", { required: "HR email is required" })}
            className="input input-bordered"
            type="email"
          />
          {errors.hrEmail && (
            <p className="text-red-500 text-xs">{errors.hrEmail.message}</p>
          )}
        </div>

        {/* Submit */}
        <div className="md:col-span-2 mt-4">
          <button type="submit" className="btn btn-primary w-full">
            Add Asset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAsset;
