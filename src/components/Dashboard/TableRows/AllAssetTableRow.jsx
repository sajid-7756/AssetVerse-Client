import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllAssetTableRow = ({ asset, refetch }) => {
  const [open, setOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    availableQuantity,
    companyName,
    dateAdded,
    hrEmail,
    productImage,
    productName,
    productQuantity,
    productType,
    _id,
  } = asset;

  // react-hook-form setup
  const { register, handleSubmit, reset } = useForm({
    defaultValues: asset,
  });

  useEffect(() => {
    reset(asset);
  }, [asset, reset]);

  const onSubmit = async (data) => {
    const assetData = {
      productName: data.productName,
      productImage: data.productImage,
      availableQuantity: data.availableQuantity,
      productQuantity: data.productQuantity,
      productType: data.productType,
    };

    const res = await axiosSecure.patch(`/assets/${_id}`, assetData);

    refetch();
    console.log(res.data);

    setOpen(false);
  };

  const handleDeleteAsset = async () => {
    const res = await axiosSecure.delete(`/asset/${_id}`);
    console.log(res);
    refetch();
  };

  return (
    <>
      <tr>
        {/* Product Image + Name + Company */}
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={productImage} alt={productName} />
              </div>
            </div>
            <div>
              <div className="font-bold">{productName}</div>
              <div className="text-sm opacity-50">Company: {companyName}</div>
            </div>
          </div>
        </td>

        {/* Quantity Info */}
        <td>
          <span className="badge badge-outline badge-sm">
            {availableQuantity} / {productQuantity}
          </span>
        </td>

        {/* Status */}
        <td>
          <span
            className={`text-xs opacity-70 badge ${
              productType === "Returnable" ? "badge-success" : "badge-error"
            }`}
          >
            {productType}
          </span>
        </td>

        {/* HR Email */}
        <td>
          <span className="text-sm">{hrEmail}</span>
          <br />
          <span className="text-xs opacity-50">
            Added: {new Date(dateAdded).toLocaleDateString()}
          </span>
        </td>

        {/* Action Buttons */}
        <th>
          <div className="flex gap-4">
            <button
              onClick={() => setOpen(true)}
              className="btn btn-outline btn-warning"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteAsset}
              className="btn btn-outline btn-error"
            >
              Delete
            </button>
          </div>
        </th>
      </tr>

      {/* DaisyUI Edit Modal */}
      {open && (
        <dialog open className="modal">
          <div className="modal-box max-w-xl">
            <h3 className="font-bold text-lg">Edit Asset</h3>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  {...register("productName", { required: true })}
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Company</span>
                </label>
                <input
                  readOnly
                  {...register("companyName", { required: true })}
                  className="input input-bordered"
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label>
                <input
                  {...register("productImage")}
                  className="input input-bordered"
                  type="url"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Available Quantity</span>
                </label>
                <input
                  {...register("availableQuantity", { valueAsNumber: true })}
                  className="input input-bordered"
                  type="number"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Total Quantity</span>
                </label>
                <input
                  {...register("productQuantity", { valueAsNumber: true })}
                  className="input input-bordered"
                  type="number"
                />
              </div>

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

              <div className="form-control">
                <label className="label">
                  <span className="label-text">HR Email</span>
                </label>
                <input
                  readOnly
                  {...register("hrEmail")}
                  className="input input-bordered"
                  type="email"
                />
              </div>

              <div className="modal-action md:col-span-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
};

export default AllAssetTableRow;
