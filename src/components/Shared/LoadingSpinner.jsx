import { FaBox } from "react-icons/fa";

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={`${
        smallHeight ? "h-[300px]" : "h-screen"
      } w-full flex justify-center items-center relative overflow-hidden bg-lime-50`}
    >
      {/* --- Ambient Background Effects --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-lime-200/40 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] bg-green-200/40 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] bg-yellow-100/50 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
      </div>
      {/* Animated Logo Section */}
      <div className="relative flex justify-center items-center">
        {/* Orbiting Ring */}
        <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-lime-500 border-r-lime-400 border-b-green-300 animate-spin"></div>

        {/* Inner Glow */}
        <div className="absolute inset-0 w-24 h-24 rounded-full bg-lime-400/10 blur-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
