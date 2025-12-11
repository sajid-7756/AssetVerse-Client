import React from "react";
import { FaPlus, FaUserPlus, FaChartLine, FaArrowRight } from "react-icons/fa";
import Container from "../../Shared/Container";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: <FaPlus className="text-3xl" />,
      title: "Asset Added",
      description: "Add company assets to the dashboard.",
    },
    {
      number: 2,
      icon: <FaUserPlus className="text-3xl" />,
      title: "Assign",
      description: "Assign assets to employees in one click.",
    },
    {
      number: 3,
      icon: <FaChartLine className="text-3xl" />,
      title: "Track",
      description: "Track status, maintenance, and return dates.",
    },
  ];

  return (
    <div className=" py-16 md:py-24 px-4">
      <Container className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-lime-100 text-lime-700 rounded-full font-bold text-sm mb-4">
            How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Get Started in{" "}
            <span className="bg-linear-to-r from-lime-500 to-green-600 bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            AssetVerse makes asset management effortless. Follow these simple
            steps to streamline your workflow.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-lime-200 -z-10">
            <div className="absolute inset-0 bg-linear-to-r from-lime-400 to-green-500 w-2/3"></div>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="bg-white rounded-2xl h-64 p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-lime-200 hover:-translate-y-2 text-center">
                  {/* Step Number Badge */}
                  <div className="relative inline-block mb-6">
                    <div className="w-16 h-16 bg-linear-to-br from-lime-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {step.number}
                    </div>
                    {/* Icon Badge */}
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-lime-600 shadow-md border-2 border-lime-100">
                      {step.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow Between Steps (Desktop Only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-6 text-lime-400">
                    <FaArrowRight className="text-3xl" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Ready to transform your asset management?
          </p>
          <button className="btn bg-linear-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white border-0 btn-lg shadow-lg hover:shadow-green-500/30 transition-all duration-300">
            Get Started Now
          </button>
        </div>
      </Container>
    </div>
  );
};

export default HowItWorks;
