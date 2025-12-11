import React from "react";
import {
  FaBoxes,
  FaClipboardCheck,
  FaUsers,
  FaChartBar,
  FaShieldAlt,
  FaMobileAlt,
} from "react-icons/fa";
import Container from "../../Shared/Container";

const Features = () => {
  const features = [
    {
      icon: <FaBoxes className="text-3xl" />,
      title: "Asset Tracking",
      description:
        "Real-time inventory management with complete visibility of all company assets, from allocation to return.",
    },
    {
      icon: <FaClipboardCheck className="text-3xl" />,
      title: "Request Management",
      description:
        "Streamlined approval workflows that automate asset requests and reduce processing time significantly.",
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Team Collaboration",
      description:
        "Seamless coordination between HR and employees with transparent communication and status updates.",
    },
    {
      icon: <FaChartBar className="text-3xl" />,
      title: "Analytics & Reports",
      description:
        "Data-driven insights with comprehensive reports to optimize asset allocation and reduce costs.",
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Secure & Compliant",
      description:
        "Enterprise-grade security with role-based access control and full compliance with industry standards.",
    },
    {
      icon: <FaMobileAlt className="text-3xl" />,
      title: "Multi-Device Access",
      description:
        "Work from anywhere with responsive design that adapts seamlessly to desktop, tablet, and mobile.",
    },
  ];

  return (
    <div className="py-16 md:py-24 px-4">
      <Container className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-lime-100 text-lime-700 rounded-full font-bold text-sm mb-4">
            Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Everything You Need to{" "}
            <span className="bg-linear-to-r from-lime-500 to-green-600 bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Powerful features designed to simplify asset management and boost
            productivity across your organization.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-lime-200 hover:-translate-y-1 group"
            >
              <div className="mb-4">
                <div className="inline-flex p-4 bg-lime-100 rounded-xl text-lime-600">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Features;
