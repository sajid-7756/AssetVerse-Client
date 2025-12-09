import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { imageUpload } from "../../../Utils";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";

const JoinAsEmployee = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const from = location.state || "/";

  const onSubmit = async (data) => {
    const imageFile = data.profileImage?.[0];
    console.log(imageFile);
    try {
      // Upload Image
      const imageURL = await imageUpload(imageFile);
      console.log(imageURL);

      // Create User
      const result = await createUser(data?.email, data?.password);
      console.log("Employee =>", result);

      // Update User
      await updateUserProfile(data?.name, imageURL);

      // Auto-assign role
      const payload = {
        profileImage: imageURL,
        name: data.name,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        role: "employee",
      };

      await axiosInstance.post("/users", payload);

      console.log("Employee Registered:", payload);

      navigate(from, { replace: true });
      toast.success("Employee Signup Successful 🎉");
    } catch (error) {
      console.error("Signup error:", error);

      // Firebase Auth errors
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Please log in instead.");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password is too weak. Please choose a stronger one.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email format. Please check again.");
      }
      // Axios backend errors
      else if (error.response) {
        toast.error(error.response.data?.message || "Server error occurred");
      }
      // General fallback
      else {
        toast.error(error.message || "Something went wrong, please try again");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Join as Employee</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter full name"
            className="input input-bordered w-full"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-error text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter personal email"
            className="input input-bordered w-full"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-error text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Profile Image */}
        <div>
          <label className="label">
            <span className="label-text">Profile Image</span>
          </label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            {...register("profileImage", {
              required: "Profile Image is required",
            })}
          />
          {errors.profileImage && (
            <p className="text-error text-sm">{errors.profileImage.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Min 6 characters"
            className="input input-bordered w-full"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters required" },
            })}
          />
          {errors.password && (
            <p className="text-error text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="label">
            <span className="label-text">Date of Birth</span>
          </label>
          <input
            type="date"
            className="input input-bordered w-full"
            {...register("dateOfBirth", {
              required: "Date of birth is required",
            })}
          />
          {errors.dateOfBirth && (
            <p className="text-error text-sm">{errors.dateOfBirth.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default JoinAsEmployee;
