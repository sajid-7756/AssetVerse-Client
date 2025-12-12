import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";

const AllAssetTableRow = ({ asset, refetch }) => {
  const [open, setOpen] = useState(false);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: myEmployees = [] } = useQuery({
    queryKey: ["my-employees", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-employees/${user?.email}`);
      return res.data;
    },
  });

  console.log(myEmployees);

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

    try {
      const res = await axiosSecure.patch(`/assets/${_id}`, assetData);

      if (res.data.modifiedCount) {
        await Swal.fire({
          title: "Updated!",
          text: `${data.productName} has been updated successfully.`,
          icon: "success",
          confirmButtonColor: "#84cc16",
          customClass: {
            popup: "rounded-2xl",
            confirmButton: "rounded-lg",
          },
        });
        refetch();
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update asset. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
        customClass: {
          popup: "rounded-2xl",
          confirmButton: "rounded-lg",
        },
      });
    }
  };

  const handleDeleteAsset = async () => {
    const result = await Swal.fire({
      title: "Delete Asset?",
      html: `Are you sure you want to delete <strong>${productName}</strong>?<br><br><small class="text-red-600">This action cannot be undone.</small>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-lg",
        cancelButton: "rounded-lg",
      },
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/asset/${_id}`);
        if (res.data.deletedCount) {
          await Swal.fire({
            title: "Deleted!",
            text: `${productName} has been deleted.`,
            icon: "success",
            confirmButtonColor: "#84cc16",
            customClass: {
              popup: "rounded-2xl",
              confirmButton: "rounded-lg",
            },
          });
          refetch();
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete asset. Please try again.",
          icon: "error",
          confirmButtonColor: "#ef4444",
          customClass: {
            popup: "rounded-2xl",
            confirmButton: "rounded-lg",
          },
        });
      }
    }
  };

  const handleAssignAsset = () => {
    setOpenAssignModal(true);
  };

  const handleAssignToEmployee = async (employee) => {
    try {
      const assignmentData = {
        assetId: _id,
        assetName: productName,
        assetImage: productImage,
        assetType: productType,
        employeeEmail: employee.email,
        employeeName: employee.name,
        hrEmail: user?.email,
        companyName: companyName,
        assignmentDate: new Date().toISOString(),
        returnDate: null,
        status: "assigned",
      };

      // Update asset quantity
      const updatedAsset = {
        availableQuantity: availableQuantity - 1,
      };
      await axiosSecure.patch(`/assign-asset/${_id}`, updatedAsset);

      await axiosSecure.post("/assigned-assets", assignmentData);

      await Swal.fire({
        title: "Assigned!",
        text: `${productName} has been assigned to ${employee.name} successfully.`,
        icon: "success",
        confirmButtonColor: "#84cc16",
        customClass: {
          popup: "rounded-2xl",
          confirmButton: "rounded-lg",
        },
      });

      refetch();
      setOpenAssignModal(false);
    } catch (error) {
      console.error("Assignment error:", error.response?.data?.message);
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Failed to assign asset. Please try again.",
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
            className={`text-xs opacity-70 badge badge-outline ${
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
          <div className="flex gap-2">
            <button
              onClick={() => setOpen(true)}
              className="btn btn-sm bg-yellow-500 hover:bg-yellow-600 text-white border-0"
              title="Edit Asset"
            >
              <FaEdit />
            </button>
            <button
              onClick={handleDeleteAsset}
              className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-0"
              title="Delete Asset"
            >
              <FaTrash />
            </button>
            <button
              onClick={handleAssignAsset}
              className="btn btn-sm bg-lime-500 hover:bg-lime-600 text-white border-0"
              title="Assign to Employee"
            >
              <FaUserPlus />
            </button>
          </div>
        </th>
      </tr>

      {/* Edit Modal */}
      {open && (
        <dialog open className="modal">
          <div className="modal-box max-w-xl bg-white rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-lime-500 rounded-lg flex items-center justify-center">
                <FaEdit className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Edit Asset</h3>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Product Name
                  </span>
                </label>
                <input
                  {...register("productName", { required: true })}
                  className="input input-bordered w-full focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Company
                  </span>
                </label>
                <input
                  readOnly
                  {...register("companyName", { required: true })}
                  className="input input-bordered w-full bg-gray-50"
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Image URL
                  </span>
                </label>
                <input
                  {...register("productImage")}
                  className="input input-bordered w-full focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all"
                  type="url"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Available Quantity
                  </span>
                </label>
                <input
                  {...register("availableQuantity", { valueAsNumber: true })}
                  className="input input-bordered w-full focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all"
                  type="number"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Total Quantity
                  </span>
                </label>
                <input
                  {...register("productQuantity", { valueAsNumber: true })}
                  className="input input-bordered w-full focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all"
                  type="number"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Type
                  </span>
                </label>
                <select
                  {...register("productType")}
                  className="select select-bordered w-full focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all"
                >
                  <option value="Returnable">Returnable</option>
                  <option value="Non-Returnable">Non-Returnable</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    HR Email
                  </span>
                </label>
                <input
                  readOnly
                  {...register("hrEmail")}
                  className="input input-bordered w-full bg-gray-50"
                  type="email"
                />
              </div>

              <div className="md:col-span-2 flex gap-3 pt-4">
                <button
                  type="submit"
                  className="btn flex-1 bg-lime-500 hover:bg-lime-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn flex-1 btn-outline border-2 border-gray-300 hover:border-lime-500 hover:bg-lime-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setOpen(false)}>close</button>
          </form>
        </dialog>
      )}
      {openAssignModal && (
        <dialog open className="modal">
          <div className="modal-box max-w-2xl bg-white rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-lime-500 rounded-lg flex items-center justify-center">
                <FaUserPlus className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Assign "{productName}" to Employee
              </h3>
            </div>

            {myEmployees.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No employees found in your company
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead className="bg-lime-500 text-white">
                    <tr>
                      <th className="text-white">#</th>
                      <th className="text-white">Name</th>
                      <th className="text-white">Email</th>
                      <th className="text-white">Current Assets</th>
                      <th className="text-white">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myEmployees.map((employee, index) => (
                      <tr key={employee.email}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-10 w-10">
                                <img
                                  src={
                                    employee.image ||
                                    "https://via.placeholder.com/40"
                                  }
                                  alt={employee.name}
                                />
                              </div>
                            </div>
                            <span className="font-bold">{employee.name}</span>
                          </div>
                        </td>
                        <td>{employee.email}</td>
                        <td>
                          <span className="badge badge-sm">
                            {employee.assetCount || 0}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => handleAssignToEmployee(employee)}
                            className="btn btn-sm bg-lime-500 hover:bg-lime-600 text-white border-0"
                          >
                            Assign
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setOpenAssignModal(false)}
                className="btn btn-outline border-2 border-gray-300 hover:border-lime-500 hover:bg-lime-50"
              >
                Close
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setOpenAssignModal(false)}>close</button>
          </form>
        </dialog>
      )}
    </>
  );
};

export default AllAssetTableRow;
