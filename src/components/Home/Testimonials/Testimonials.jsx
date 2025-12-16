import React from "react";
import { FaStar, FaBuilding, FaUsers, FaChartLine } from "react-icons/fa";
import Container from "../../Shared/Container";
import ScrollAnimationWrapper from "../../Shared/ScrollAnimationWrapper";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "AssetVerse has transformed how we manage our company assets. The approval workflow is seamless, and our employees love the transparency.",
      name: "Sarah Johnson",
      title: "HR Director",
      company: "TechCorp Solutions",
      rating: 5,
    },
    {
      quote:
        "We've reduced asset tracking errors by 95% since implementing AssetVerse. The analytics dashboard gives us insights we never had before.",
      name: "Michael Chen",
      title: "Operations Manager",
      company: "Global Innovations Inc.",
      rating: 5,
    },
    {
      quote:
        "The best investment we've made in operational efficiency. AssetVerse pays for itself in time saved and improved accountability.",
      name: "Emily Rodriguez",
      title: "Asset Manager",
      company: "Enterprise Systems Ltd.",
      rating: 5,
    },
    {
      quote:
        "Exceptional platform with outstanding support. Our team was up and running in days, not weeks. Highly recommend for any growing organization.",
      name: "James Thompson",
      title: "VP of Operations",
      company: "Digital Ventures",
      rating: 5,
    },
  ];

  const stats = [
    {
      icon: <FaBuilding className="text-3xl" />,
      value: "500+",
      label: "Companies Trust Us",
    },
    {
      icon: <FaUsers className="text-3xl" />,
      value: "10,000+",
      label: "Active Users",
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      value: "99.9%",
      label: "Uptime SLA",
    },
  ];

  return (
    <div className="bg-linear-to-br py-16 md:py-24 px-4 overflow-hidden">
      <Container className="max-w-7xl mx-auto">
        {/* Header Section */}
        <ScrollAnimationWrapper className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-lime-100 text-lime-700 rounded-full font-bold text-sm mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Trusted by{" "}
            <span className="bg-linear-to-r from-lime-500 to-green-600 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            See what our customers have to say about their experience with
            AssetVerse.
          </p>
        </ScrollAnimationWrapper>

        {/* Statistics Bar */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <ScrollAnimationWrapper
              key={index}
              delay={index * 0.15}
              direction="up"
              className="bg-white hover:shadow-xl transition-all duration-300 hover:border-lime-200 hover:-translate-y-1 rounded-2xl p-8 shadow-lg text-center border border-lime-100"
            >
              <div className="inline-flex p-4 bg-lime-100 rounded-full text-lime-600 mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </ScrollAnimationWrapper>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollAnimationWrapper
              key={index}
              delay={index * 0.1}
              scale={0.95}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-lime-200 hover:-translate-y-1"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-lg" />
                ))}
              </div>

              {/* Quote */}
              <div className="mb-6">
                <svg
                  className="w-8 h-8 text-lime-200 mb-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 bg-linear-to-br from-lime-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">
                    {testimonial.title} at {testimonial.company}
                  </p>
                </div>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <ScrollAnimationWrapper
            delay={0.5}
            className="flex justify-center items-center gap-2 text-lime-600"
          >
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <span className="ml-2 text-gray-700 font-semibold">
              4.9/5 Average Rating
            </span>
          </ScrollAnimationWrapper>
        </div>
      </Container>
    </div>
  );
};

export default Testimonials;
