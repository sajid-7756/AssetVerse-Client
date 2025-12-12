import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaCheckCircle, FaCopy, FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .post("/payment-success", { sessionId })
        .then((res) => {
          setTransactionId(res.data?.transitionId || "");
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
          toast.error("Failed to verify payment. Please contact support.");
        });
    } else {
      setLoading(false);
    }
  }, [axiosSecure, sessionId]);

  const handleCopyTransactionId = () => {
    if (transactionId) {
      navigator.clipboard.writeText(transactionId);
      setCopied(true);
      toast.success("Transaction ID copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-lime-50 via-white to-green-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-lime-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Verifying payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden px-4">
      {/* Success Card */}
      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-lime-100 p-8 md:p-12 text-center animate-scale-in">
          {/* Animated Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Outer Ring Animation */}
              <div className="absolute inset-0 w-24 h-24 rounded-full bg-linear-to-r from-lime-400 to-green-500 animate-ping opacity-20"></div>

              {/* Main Icon Container */}
              <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-linear-to-br from-lime-100 to-green-100 shadow-lg animate-bounce-in">
                <FaCheckCircle className="w-14 h-14 text-green-600 animate-check" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-3 animate-fade-in">
            <span className="bg-linear-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
              Payment Successful!
            </span>
          </h1>

          <p className="text-lg text-gray-700 mb-8 animate-fade-in-delay">
            Thank you for your purchase! Your subscription has been activated.
          </p>

          {/* Transaction ID Badge */}
          {transactionId && (
            <div className="mb-8 animate-fade-in-delay-2">
              <p className="text-sm text-gray-600 mb-2 font-semibold">
                Transaction ID
              </p>
              <div className="flex items-center justify-center gap-2 bg-lime-50 border-2 border-lime-200 rounded-xl p-4">
                <code className="text-sm md:text-base font-mono text-gray-800 break-all">
                  {transactionId}
                </code>
                <button
                  onClick={handleCopyTransactionId}
                  className="shrink-0 p-2 hover:bg-lime-100 rounded-lg transition-colors duration-200"
                  title="Copy transaction ID"
                >
                  {copied ? (
                    <FaCheck className="w-5 h-5 text-green-600" />
                  ) : (
                    <FaCopy className="w-5 h-5 text-lime-600" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Success Message */}
          <div className="bg-linear-to-r from-lime-50 to-green-50 border border-lime-200 rounded-xl p-4 mb-8 animate-fade-in-delay-3">
            <p className="text-gray-700 text-sm leading-relaxed">
              🎉 Your account has been upgraded successfully. You can now enjoy
              all the premium features and manage your team efficiently.
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleGoToDashboard}
            className="btn btn-lg w-full bg-linear-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-delay-4"
          >
            Go to Dashboard
          </button>

          {/* Support Link */}
          <p className="text-sm text-gray-500 mt-6 animate-fade-in-delay-5">
            Need help?{" "}
            <a
              href="mailto:devsajid56@gmail.com"
              className="text-lime-600 hover:text-lime-700 font-semibold"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes scale-in {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes check {
          0% {
            transform: scale(0) rotate(-45deg);
          }
          50% {
            transform: scale(1.2) rotate(0deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: confetti-fall linear infinite;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .animate-check {
          animation: check 0.6s ease-out 0.3s both;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out 0.4s both;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.5s ease-out 0.6s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.5s ease-out 0.8s both;
        }

        .animate-fade-in-delay-3 {
          animation: fade-in 0.5s ease-out 1s both;
        }

        .animate-fade-in-delay-4 {
          animation: fade-in 0.5s ease-out 1.2s both;
        }

        .animate-fade-in-delay-5 {
          animation: fade-in 0.5s ease-out 1.4s both;
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;
