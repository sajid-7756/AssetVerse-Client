import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const [transactionId, setTransactionId] = useState("");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    axiosSecure
      .post("/payment-success", { sessionId })
      .then((res) => {
        console.log(res.data.transitionId);
        setTransactionId(res.data?.transitionId);
      })
      .catch((err) => console.error(err));
  }, [axiosSecure, sessionId]);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-xl p-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h3 className="text-3xl font-bold text-green-700 mb-2">
          Payment Successful
        </h3>
        <p className="text-gray-600 ">transaction ID : {transactionId}</p>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your transaction has been completed.
        </p>

        {/* CTA */}
        <button className="btn btn-success btn-block">Go to Dashboard</button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
