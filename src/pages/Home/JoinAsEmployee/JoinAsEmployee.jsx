import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { imageUpload } from "../../../Utils";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";
import {
  FaUserCircle,
  FaBriefcase,
  FaClipboardList,
  FaBell,
  FaMobileAlt,
  FaAward,
  FaCheckCircle,
  FaUpload,
} from "react-icons/fa";
import { Link } from "react-router";

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

  const features = [
    {
      icon: FaBriefcase,
      title: "Asset Requests",
      description: "Request and track company assets easily",
    },
    {
      icon: FaClipboardList,
      title: "Request History",
      description: "View all your past and pending requests",
    },
    {
      icon: FaBell,
      title: "Instant Notifications",
      description: "Get notified about request status updates",
    },
    {
      icon: FaMobileAlt,
      title: "Mobile Friendly",
      description: "Access your dashboard from anywhere",
    },
  ];

  return (
    <div className="min-h-screen py-12 md:py-20 px-4 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-lime-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block px-4 py-2 bg-lime-100 text-lime-700 rounded-full font-bold text-sm mb-4">
            <FaUserCircle className="inline mr-2" />
            Employee Registration
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
            Join as{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-500 to-green-600">
              Employee
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Start your journey with us! Register to request assets, track your
            requests, and collaborate seamlessly with your team.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Side - Features & Benefits */}
          <div className="space-y-8">
            {/* Why Join Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-2 border-lime-100 hover:border-lime-300 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-lime-500 rounded-xl flex items-center justify-center">
                  <FaBriefcase className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Why Join AssetVerse?
                </h2>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                AssetVerse makes it simple for employees to request, track, and
                manage company assets. Stay connected with your team and get
                instant updates on all your requests.
              </p>

              {/* Feature Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-lime-50 rounded-xl p-4 hover:bg-lime-100 transition-colors duration-200"
                  >
                    <feature.icon className="text-lime-600 text-2xl mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits List */}
            <div className="bg-linear-to-br from-lime-500 to-green-600 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaAward className="text-yellow-300" />
                Employee Benefits
              </h3>
              <ul className="space-y-4">
                {[
                  "Quick and easy asset request process",
                  "Real-time status tracking for all requests",
                  "Personalized dashboard for your assets",
                  "Instant notifications on approvals",
                  "Seamless communication with HR",
                  "Access from any device, anywhere",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="text-yellow-300 mt-1 shrink-0" />
                    <span className="text-white/90">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border-2 border-gray-100 hover:border-lime-200 transition-all duration-300">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Create Your Account
              </h2>
              <p className="text-gray-600">
                Join your team in just a few steps
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Full Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Jane Smith"
                  className="input input-bordered w-full focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <span className="label-text-alt text-error mt-1 flex items-center gap-1">
                    ⚠️ {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="jane@email.com"
                  className="input input-bordered w-full focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="label-text-alt text-error mt-1 flex items-center gap-1">
                    ⚠️ {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Minimum 6 characters"
                  className="input input-bordered w-full focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters required",
                    },
                  })}
                />
                {errors.password && (
                  <span className="label-text-alt text-error mt-1 flex items-center gap-1">
                    ⚠️ {errors.password.message}
                  </span>
                )}
              </div>

              {/* Date of Birth */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Date of Birth
                  </span>
                </label>
                <input
                  type="date"
                  className="input input-bordered w-full focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all"
                  {...register("dateOfBirth", {
                    required: "Date of birth is required",
                  })}
                />
                {errors.dateOfBirth && (
                  <span className="label-text-alt text-error mt-1 flex items-center gap-1">
                    ⚠️ {errors.dateOfBirth.message}
                  </span>
                )}
              </div>

              {/* Profile Image */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                    <FaUpload className="text-lime-500" />
                    Profile Image
                  </span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all"
                  {...register("profileImage", {
                    required: "Profile Image is required",
                  })}
                />
                {errors.profileImage && (
                  <span className="label-text-alt text-error mt-1 flex items-center gap-1">
                    ⚠️ {errors.profileImage.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn w-full bg-linear-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold mt-6"
              >
                Create Employee Account
              </button>

              {/* Login Link */}
              <p className="text-center text-gray-600 text-sm mt-4">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-lime-600 hover:text-lime-700 font-semibold"
                >
                  Sign in here
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-lime-600 mb-2">1000+</div>
            <p className="text-gray-700 font-semibold">Active Employees</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-lime-600 mb-2">
              &lt;2min
            </div>
            <p className="text-gray-700 font-semibold">Average Response Time</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-lime-600 mb-2">98%</div>
            <p className="text-gray-700 font-semibold">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinAsEmployee;
