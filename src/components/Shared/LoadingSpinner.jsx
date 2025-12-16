const LoadingSpinner = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-linear-to-br from-lime-50 via-green-50 to-yellow-50">
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-lime-300/30 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] bg-green-300/30 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/4 w-[400px] h-[400px] bg-yellow-200/40 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Center Logo Animation */}
      <div className="relative flex items-center justify-center">
        {/* Outer rotating ring */}
        <div className="absolute w-28 h-28 rounded-full border-[3px] border-transparent border-t-lime-500 border-r-green-400 animate-spin-slow"></div>

        {/* Middle pulse ring */}
        <div className="absolute w-20 h-20 rounded-full bg-lime-400/20 blur-md animate-pulse"></div>

        {/* Core dot */}
        <div className="w-10 h-10 rounded-full bg-lime-500 shadow-lg shadow-lime-400/50"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
