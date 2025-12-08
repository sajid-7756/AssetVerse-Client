import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const AssetCard = ({ asset, onRequest }) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const requestData = {
      assetId: asset._id,
      assetName: asset.productName,
      assetType: asset.productType,
      requesterName: user?.displayName,
      hrEmail: asset.hrEmail,
      companyName: asset.companyName,
      note: data.note,
      processedBy: asset.hrEmail,
    };
    onRequest(requestData);
    setOpen(false);
    reset();
  };

  return (
    <div className="card bg-base-200 shadow-md">
      <figure className="px-4 pt-4">
        <img
          src={asset.productImage}
          alt={asset.productName}
          className="rounded-xl h-32 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{asset.productName}</h2>
        <p className="text-sm">
          Type:{" "}
          <span
            className={`badge ${
              asset.productType === "Returnable"
                ? "badge-success"
                : "badge-error"
            }`}
          >
            {asset.productType}
          </span>
        </p>
        <p className="text-sm">
          Available:{" "}
          <span className="font-bold">{asset.availableQuantity}</span>
        </p>

        <div className="card-actions justify-end mt-4">
          <button
            onClick={() => setOpen(true)}
            className="btn btn-outline btn-primary btn-sm"
          >
            Request
          </button>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Request Asset</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="py-2">Add a note for this request:</p>
              <textarea
                {...register("note", { required: "Note is required" })}
                className="textarea textarea-bordered w-full"
                placeholder="Write your note..."
              />
              {errors.note && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.note.message}
                </p>
              )}

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    reset();
                  }}
                  className="btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetCard;
