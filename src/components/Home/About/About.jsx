import React from "react";
import {
  FaCheckCircle,
  FaShieldAlt,
  FaChartLine,
  FaClock,
} from "react-icons/fa";
import Container from "../../Shared/Container";
import aboutImg from "../../../assets/about-us.png";
import ScrollAnimationWrapper from "../../Shared/ScrollAnimationWrapper";

const About = () => {
  const benefits = [
    {
      icon: <FaCheckCircle className="text-2xl" />,
      title: "Complete Asset Tracking",
      description:
        "Real-time visibility of all company assets with detailed history and audit trails",
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Enhanced Security & Compliance",
      description:
        "Maintain compliance standards with secure asset handover and verification processes",
    },
    {
      icon: <FaChartLine className="text-2xl" />,
      title: "Data-Driven Insights",
      description:
        "Analytics and reporting to optimize asset allocation and reduce operational costs",
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: "Streamlined Workflows",
      description:
        "Automate request approvals and asset assignments to save time and reduce errors",
    },
  ];

  return (
    <div className="py-16 md:py-24 px-4 overflow-hidden">
      <Container>
        {/* Header Section */}
        <ScrollAnimationWrapper className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-lime-100 text-lime-700 rounded-full font-bold text-sm mb-4">
            About AssetVerse
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Asset Management{" "}
            <span className="bg-linear-to-r from-lime-500 to-green-600 bg-clip-text text-transparent">
              Reimagined
            </span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            AssetVerse empowers organizations to manage corporate assets
            efficiently, transparently, and securely—bridging the gap between HR
            and employees.
          </p>
        </ScrollAnimationWrapper>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <ScrollAnimationWrapper
              key={index}
              direction="up"
              delay={index * 0.1}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-lime-200 hover:-translate-y-1 group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-lime-100 rounded-lg text-lime-600 shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>

        {/* Stats and Image Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollAnimationWrapper direction="right">
            <img
              src={aboutImg}
              className="w-full max-w-md rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              alt="AssetVerse Platform"
            />
          </ScrollAnimationWrapper>
          <div className="space-y-8">
            <ScrollAnimationWrapper direction="left" delay={0.2}>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                Trusted by Leading Organizations
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                From startups to enterprises, organizations worldwide depend on
                AssetVerse to maintain control over their corporate assets while
                keeping employees informed and engaged.
              </p>
            </ScrollAnimationWrapper>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <ScrollAnimationWrapper
                delay={0.3}
                scale={0.9}
                className="bg-linear-to-br from-lime-50 to-lime-100 rounded-xl p-6 border border-lime-200"
              >
                <div className="text-3xl font-bold text-lime-600 mb-1">
                  10k+
                </div>
                <p className="text-sm text-gray-700">Assets Tracked</p>
              </ScrollAnimationWrapper>
              <ScrollAnimationWrapper
                delay={0.4}
                scale={0.9}
                className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200"
              >
                <div className="text-3xl font-bold text-green-600 mb-1">
                  500+
                </div>
                <p className="text-sm text-gray-700">Companies Trust Us</p>
              </ScrollAnimationWrapper>
              <ScrollAnimationWrapper
                delay={0.5}
                scale={0.9}
                className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200"
              >
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  99.9%
                </div>
                <p className="text-sm text-gray-700">Uptime SLA</p>
              </ScrollAnimationWrapper>
              <ScrollAnimationWrapper
                delay={0.6}
                scale={0.9}
                className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200"
              >
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  24/7
                </div>
                <p className="text-sm text-gray-700">Support Available</p>
              </ScrollAnimationWrapper>
            </div>

            <ScrollAnimationWrapper delay={0.7} direction="up">
              <button className="btn bg-linear-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white border-0 btn-lg shadow-lg hover:shadow-green-500/30 transition-all duration-300">
                Start Your Free Trial
              </button>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
