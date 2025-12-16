import { useRef } from "react";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaUser,
  FaEnvelope,
  FaIdCard,
  FaEdit,
  FaBuilding,
  FaBriefcase,
} from "react-icons/fa";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const { role, isRoleLoading } = useRole();
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);

  const { data: myCompanyNames = [] } = useQuery({
    enabled: !!user?.email && role === "employee",
    queryKey: ["my-companies", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-companies/${user?.email}`);
      return res.data;
    },
  });

  const { data: userData = {} } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  if (isRoleLoading) return <LoadingSpinner />;

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;

    try {
      await updateUserProfile(name, photoURL);
      await axiosSecure.patch("/user", { name });
      toast.success("Profile updated successfully 🎉");

      // Close modal programmatically
      if (modalRef.current) {
        modalRef.current.close();
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.message || "Failed to update profile");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
        {/* Cover Background */}
        <div className="h-32 bg-linear-to-r from-lime-500 to-green-600 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
              <img
                alt="profile"
                src={
                  user?.photoURL ||
                  "https://i.ibb.co.com/N2N3hH1k/icons8-user-48.png"
                }
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-20 pb-8 px-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {user?.displayName || "User"}
                </h1>
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-lime-500 text-white">
                  {role === "hr" ? "HR Manager" : "Employee"}
                </span>
              </div>
              <p className="text-gray-600 flex items-center gap-2 mb-1">
                <FaEnvelope className="text-lime-500" />
                {user?.email}
              </p>
              <p className="text-gray-500 text-sm flex items-center gap-2">
                <FaIdCard className="text-lime-500" />
                User ID: {user?.uid?.slice(0, 20)}...
              </p>
            </div>

            <button
              onClick={() => modalRef.current?.showModal()}
              className="btn bg-lime-500 hover:bg-lime-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <FaEdit />
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* HR Company Information */}
      {role === "hr" && userData?.companyLogo && (
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-lime-500 rounded-lg flex items-center justify-center">
              <FaBuilding className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Company Information
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Company Logo */}
            <div className="flex flex-col items-center justify-center bg-lime-50 rounded-xl p-8 border-2 border-lime-200">
              <p className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wider">
                Company Logo
              </p>
              <div className="w-32 h-32 bg-white rounded-xl shadow-lg flex items-center justify-center p-4 border-2 border-gray-100">
                <img
                  src={userData?.companyLogo}
                  alt="Company Logo"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            {/* Company Details */}
            <div className="flex flex-col justify-center space-y-4">
              <div className="bg-lime-50 rounded-xl p-6 border-2 border-lime-200">
                <p className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                  <FaBuilding className="text-lime-600" />
                  Company Name
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {userData?.companyName || "Not specified"}
                </p>
              </div>

              <div className="bg-lime-50 rounded-xl p-6 border-2 border-lime-200">
                <p className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                  <FaBriefcase className="text-lime-600" />
                  Subscription Plan
                </p>
                <p className="text-xl font-bold text-gray-900 capitalize">
                  {userData?.subscription || "Basic"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Employee Company Affiliations */}
      {role === "employee" && myCompanyNames.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-lime-500 rounded-lg flex items-center justify-center">
              <FaBuilding className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Company Affiliations
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myCompanyNames.map((company, index) => (
              <div
                key={index}
                className="bg-lime-50 rounded-xl p-4 border-2 border-lime-200 hover:border-lime-400 transition-all duration-200 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-lime-500 rounded-lg flex items-center justify-center shrink-0">
                  <FaBuilding className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {company.companyName}
                  </p>
                  <p className="text-xs text-gray-600">Active</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Update Profile Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-md bg-white rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-lime-500 rounded-lg flex items-center justify-center">
              <FaEdit className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Update Profile</h3>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-5">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                  <FaUser className="text-lime-500" />
                  Full Name
                </span>
              </label>
              <input
                type="text"
                defaultValue={user?.displayName}
                className="input input-bordered w-full focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all"
                name="name"
                required
              />
            </div>

            {/* Photo URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                  <FaUser className="text-lime-500" />
                  Photo URL
                </span>
              </label>
              <input
                type="text"
                defaultValue={user?.photoURL}
                className="input input-bordered w-full focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all"
                name="photoURL"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="btn flex-1 bg-lime-500 hover:bg-lime-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => modalRef.current?.close()}
                className="btn flex-1 btn-outline border-2 border-gray-300 hover:border-lime-500 hover:bg-lime-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Profile;
