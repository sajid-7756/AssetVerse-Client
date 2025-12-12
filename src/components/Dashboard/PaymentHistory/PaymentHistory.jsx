import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaReceipt, FaCheckCircle, FaCreditCard } from "react-icons/fa";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: paymentHistory = [], isLoading } = useQuery({
    queryKey: ["payment-history", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });

  // Calculate stats
  const totalPayments = paymentHistory.length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-lime-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">
            Loading payment history...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-lime-500 rounded-lg flex items-center justify-center">
              <FaReceipt className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Payment History
              </h1>
              <p className="text-gray-600">
                View all your payment transactions
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="bg-lime-50 rounded-xl p-4 border-2 border-lime-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-lime-500 rounded-lg flex items-center justify-center">
                <FaReceipt className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">
                  Total Payments
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalPayments}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="bg-lime-500 text-white">
              <tr>
                <th className="text-white">#</th>
                <th className="text-white">Transaction ID</th>
                <th className="text-white">Package</th>
                <th className="text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={payment._id} className="hover">
                  <td className="font-semibold">{index + 1}</td>
                  <td>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {payment.transitionId || "N/A"}
                    </code>
                  </td>
                  <td className="font-semibold">
                    <div className="flex items-center gap-2">
                      <FaCreditCard className="text-lime-500" />
                      {payment.packageName || "N/A"}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-success gap-2">
                      <FaCheckCircle />
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
