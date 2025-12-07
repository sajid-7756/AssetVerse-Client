import React, { useRef } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const modalRef = useRef(null);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;

    try {
      await updateUserProfile(name, photoURL);
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
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
        {/* Profile Info */}
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <img
            alt="profile"
            src={user?.photoURL}
            className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white"
          />
          <p className="p-2 px-4 text-xs text-white bg-lime-500 rounded-full">
            role
          </p>
          <p className="mt-2 text-xl font-medium text-gray-800">
            User Id: {user?.uid}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-gray-600">
                  {user?.displayName}
                </span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-gray-600">{user?.email}</span>
              </p>

              <div>
                {/* Open modal programmatically */}
                <button
                  onClick={() => modalRef.current?.showModal()}
                  className="bg-lime-500 px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-lime-800 block mb-1"
                >
                  Update Profile
                </button>
                <button className="bg-lime-500 px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-lime-800">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Native dialog modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Profile</h3>

          <form onSubmit={handleUpdateProfile} className="space-y-4 mt-4">
            {/* Name */}
            <div>
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                defaultValue={user?.displayName}
                className="input input-bordered w-full"
                name="name"
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                defaultValue={user?.photoURL}
                className="input input-bordered w-full"
                name="photoURL"
              />
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-full">
              Save Changes
            </button>
          </form>

          {/* Close Button */}
          <div className="modal-action">
            <button
              type="button"
              onClick={() => modalRef.current?.close()}
              className="btn"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
