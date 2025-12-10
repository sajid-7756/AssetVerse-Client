import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const UpgradePackage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: packages = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });

  const handlePayment = async (p) => {
    const paymentInfo = {
      packageId: p._id,
      name: p.name,
      employeeLimit: p.employeeLimit,
      price: p.price,
      customer: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };
    const { data } = await axiosSecure.post(
      "/create-checkout-session",
      paymentInfo
    );
    console.log(data.url);
    // eslint-disable-next-line react-hooks/immutability
    window.location.href = data.url;
  };

  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold text-center mb-8">Upgrade Package</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {packages.map((p, index) => (
          <div
            key={index}
            className="card w-96 bg-base-100 shadow-lg hover:shadow-xl transition rounded-xl border border-gray-200"
          >
            <div className="card-body">
              {/* Badge */}
              <span className="badge badge-warning badge-sm self-start mb-2">
                Employee Limit: {p.employeeLimit}
              </span>

              {/* Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800">{p.name}</h2>
                <span className="text-xl font-semibold">${p.price}/mo</span>
              </div>

              {/* Features */}
              <ul className="mt-6 flex flex-col gap-2 text-sm">
                {p.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 mr-2 text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-6">
                <button
                  onClick={() => handlePayment(p)}
                  className="btn btn-primary btn-block"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpgradePackage;
