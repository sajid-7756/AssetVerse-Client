import { ScaleLoader } from "react-spinners";
import { FaBox } from "react-icons/fa";

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={`${
        smallHeight ? "h-[250px]" : "h-[70vh]"
      } flex flex-col justify-center items-center bg-lime-50`}
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="w-12 h-12 bg-lime-500 rounded-lg flex items-center justify-center animate-pulse">
          <FaBox className="text-white text-2xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">AssetVerse</h2>
      </div>
      <ScaleLoader size={100} color="#84cc16" />
      <p className="mt-6 text-gray-600 font-medium">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
