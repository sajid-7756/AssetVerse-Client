import { Link } from "react-router";
import { FaArrowRight, FaBox, FaUsers, FaChartLine } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import Container from "../../Shared/Container";
import { motion } from "motion/react";

const Banner = () => {
  const { user } = useAuth();

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-72 md:w-96 h-72 md:h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-72 md:w-96 h-72 md:h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <Container className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center md:text-left"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 bg-lime-100 text-lime-700 rounded-full text-sm font-semibold shadow-sm">
              ✨ Asset Management Made Simple
            </span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 md:mb-6">
            Manage Your{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-500 to-green-600">
              Assets Effortlessly
            </span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base md:text-lg lg:text-xl text-gray-700 max-w-2xl mb-6 md:mb-8 leading-relaxed"
          >
            AssetVerse is your complete solution for managing company assets and
            employee assignments. Track inventory, allocate resources efficiently,
            and streamline your asset lifecycle with our intuitive platform.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-3 gap-4 md:gap-6 my-6 md:my-8"
          >
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-1 md:mb-2 justify-center md:justify-start">
                <FaBox className="text-lime-500 text-lg md:text-2xl" />
                <p className="text-xl md:text-3xl font-bold text-gray-900">
                  1000+
                </p>
              </div>
              <p className="text-gray-600 text-xs md:text-sm">Assets Tracked</p>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-1 md:mb-2 justify-center md:justify-start">
                <FaUsers className="text-lime-500 text-lg md:text-2xl" />
                <p className="text-xl md:text-3xl font-bold text-gray-900">
                  500+
                </p>
              </div>
              <p className="text-gray-600 text-xs md:text-sm">Active Users</p>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-1 md:mb-2 justify-center md:justify-start">
                <FaChartLine className="text-lime-500 text-lg md:text-2xl" />
                <p className="text-xl md:text-3xl font-bold text-gray-900">
                  99%
                </p>
              </div>
              <p className="text-gray-600 text-xs md:text-sm">
                Uptime Guarantee
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start"
          >
            <Link to="/join-as-hr">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn bg-lime-500 hover:bg-lime-600 text-white border-0 rounded-lg font-semibold text-sm md:text-base w-full sm:w-auto"
              >
                Start Managing <FaArrowRight className="ml-2" />
              </motion.button>
            </Link>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline border-2 border-gray-300 text-gray-800 hover:border-lime-500 hover:text-lime-500 rounded-lg font-semibold text-sm md:text-base w-full sm:w-auto"
              >
                Explore Features
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right - Illustration/Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {/* Image Card */}
            <div className="relative bg-white p-2 rounded-2xl transform shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60"
                alt="Asset Management Hero"
                className="rounded-xl w-full max-w-xs md:max-w-md object-cover"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="hidden md:block absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg w-48 border border-gray-100"
              >
                <p className="text-sm font-semibold text-gray-900">
                  Smart Asset Tracking
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Real-time inventory management and allocation
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Bottom CTA Bar */}
      {!user && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-10 md:mt-16 relative z-10"
        >
          <div className="bg-gradient-to-r from-lime-500 to-green-600 rounded-xl md:rounded-2xl p-6 md:p-8 text-center text-white mx-4 md:mx-6 shadow-xl">
            <h3 className="text-lg md:text-2xl font-bold mb-2">
              Ready to Transform Your Asset Management?
            </h3>
            <p className="mb-4 md:mb-6 opacity-90 text-sm md:text-base">
              Join hundreds of companies already using AssetVerse
            </p>
            <Link to="/join-as-employee">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn bg-white text-lime-600 border-0 hover:bg-gray-100 text-sm md:text-base shadow-lg"
              >
                Get Started Today
              </motion.button>
            </Link>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Banner;
