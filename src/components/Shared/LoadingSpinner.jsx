import { ScaleLoader } from "react-spinners";
import { FaBox } from "react-icons/fa";

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={`${
        smallHeight ? "h-[250px]" : "h-[70vh]"
      } flex flex-col justify-center items-center relative overflow-hidden`}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-50 via-green-50 to-lime-100 opacity-50"></div>
      
      {/* Animated Circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-lime-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-20 right-10 w-32 h-32 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-20 w-32 h-32 bg-lime-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with floating animation */}
        <div className="mb-6 flex items-center gap-3 animate-float">
          <div className="w-16 h-16 bg-gradient-to-br from-lime-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
            <FaBox className="text-white text-3xl" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
            AssetVerse
          </h2>
        </div>

        {/* Spinner */}
        <div className="mb-6">
          <ScaleLoader size={100} color="#84cc16" />
        </div>

        {/* Loading Text with pulse */}
        <p className="text-gray-700 font-semibold text-lg animate-pulse">
          Loading your assets...
        </p>

        {/* Progress dots */}
        <div className="flex gap-2 mt-4">
          <div className="w-2 h-2 bg-lime-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-lime-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-lime-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
