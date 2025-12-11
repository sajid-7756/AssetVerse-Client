import { Navigate, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import {
  FaLock,
  FaEnvelope,
  FaShieldAlt,
  FaBolt,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";

const Login = () => {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state || "/";

  if (user) return <Navigate to={from} replace={true} />;

  // form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      //User Login
      await signIn(email, password);

      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const features = [
    {
      icon: FaShieldAlt,
      title: "Secure Access",
      description: "Enterprise-grade security for your data",
    },
    {
      icon: FaBolt,
      title: "Lightning Fast",
      description: "Instant access to your dashboard",
    },
    {
      icon: FaChartLine,
      title: "Real-time Insights",
      description: "Monitor assets and requests live",
    },
  ];

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lime-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>

      {/* Left Side - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-lime-500 to-green-600 p-12 flex-col justify-between relative z-10">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">AssetVerse</h1>
          <p className="text-lime-100 text-lg">
            Your Complete Asset Management Solution
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white mb-8">
            Welcome Back! 👋
          </h2>

          {/* Features */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                    <feature.icon className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-lime-100 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <p className="text-lime-100 text-sm">Companies</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">1000+</div>
              <p className="text-lime-100 text-sm">Users</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">99.9%</div>
              <p className="text-lime-100 text-sm">Uptime</p>
            </div>
          </div>
        </div>

        <p className="text-lime-100 text-sm">
          © 2024 AssetVerse. All rights reserved.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              AssetVerse
            </h1>
            <p className="text-gray-600">Asset Management Solution</p>
          </div>

          {/* Login Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10 border-2 border-gray-100">
            {/* Header */}
            <div className="mb-8">
              <div className="inline-block px-4 py-2 bg-lime-100 text-lime-700 rounded-full font-bold text-sm mb-4">
                <FaLock className="inline mr-2" />
                Secure Login
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">
                Sign in to access your dashboard
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                    <FaEnvelope className="text-lime-500" />
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="your@email.com"
                  className="input input-bordered w-full focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all"
                />
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                    <FaLock className="text-lime-500" />
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  id="password"
                  required
                  placeholder="Enter your password"
                  className="input input-bordered w-full focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn w-full bg-linear-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="divider my-6 text-gray-500">OR</div>

            {/* Register Links */}
            <div className="space-y-3">
              <p className="text-center text-gray-600 text-sm">
                Don't have an account?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/join-as-hr"
                  className="btn btn-outline border-2 border-lime-500 text-lime-600 hover:bg-lime-500 hover:text-white hover:border-lime-500 text-sm"
                >
                  Join as HR
                </Link>
                <Link
                  to="/join-as-employee"
                  className="btn btn-outline border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white hover:border-green-500 text-sm"
                >
                  Join as Employee
                </Link>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                <FaCheckCircle className="text-lime-500" />
                <span>Secure & encrypted connection</span>
              </div>
            </div>
          </div>

          {/* Mobile Stats */}
          <div className="lg:hidden grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
              <div className="text-2xl font-bold text-lime-600 mb-1">500+</div>
              <p className="text-gray-700 text-xs font-semibold">Companies</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
              <div className="text-2xl font-bold text-lime-600 mb-1">1000+</div>
              <p className="text-gray-700 text-xs font-semibold">Users</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
              <div className="text-2xl font-bold text-lime-600 mb-1">99.9%</div>
              <p className="text-gray-700 text-xs font-semibold">Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
