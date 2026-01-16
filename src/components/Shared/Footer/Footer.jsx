import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaArrowAltCircleUp,
} from "react-icons/fa";
import { Link } from "react-router";
import Container from "../Container";

const Footer = () => {
  const handleUpBtn = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative">
      <Container className="py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/favicon.png"
                alt="AssetVerse Logo"
                className="w-8 h-8"
              />
              <h3 className="text-2xl font-bold bg-linear-to-r from-lime-400 to-green-500 bg-clip-text text-transparent">
                AssetVerse
              </h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Simplifying asset management for modern teams. Track, assign, and
              manage your company assets effortlessly.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/sajid7756"
                className="w-10 h-10 bg-gray-800 hover:bg-lime-500 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaFacebookF className="text-sm" />
              </a>
              <a
                href="https://x.com/_____Sajid_____"
                className="w-10 h-10 bg-gray-800 hover:bg-lime-500 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaTwitter className="text-sm" />
              </a>
              <a
                href="https://www.linkedin.com/in/sajidos/"
                className="w-10 h-10 bg-gray-800 hover:bg-lime-500 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaLinkedinIn className="text-sm" />
              </a>
              <a
                href="https://www.instagram.com/sajid_0330/"
                className="w-10 h-10 bg-gray-800 hover:bg-lime-500 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaInstagram className="text-sm" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-lime-400 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/explore"
                  className="text-gray-400 hover:text-lime-400 transition-colors duration-300"
                >
                  Explore Assets
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-lime-400 transition-colors duration-300"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/join-as-hr"
                  className="text-gray-400 hover:text-lime-400 transition-colors duration-300"
                >
                  Partner with Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/support"
                  className="text-gray-400 hover:text-lime-400 transition-colors duration-300"
                >
                  Support Center
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-terms"
                  className="text-gray-400 hover:text-lime-400 transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-terms"
                  className="text-gray-400 hover:text-lime-400 transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-lime-400 transition-colors duration-300"
                >
                  Cookie Settings
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates and tips.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="input input-bordered flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-lime-500"
              />
              <button className="btn bg-lime-500 hover:bg-lime-600 text-white border-0">
                <FaEnvelope />
              </button>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <Container className="py-6 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} AssetVerse. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                to="/privacy-terms"
                className="text-gray-400 hover:text-lime-400 transition-colors duration-300"
              >
                Privacy
              </Link>
              <Link
                to="/privacy-terms"
                className="text-gray-400 hover:text-lime-400 transition-colors duration-300"
              >
                Terms
              </Link>
              <a
                href="#"
                className="text-gray-400 hover:text-lime-400 transition-colors duration-300"
              >
                Cookies
              </a>
            </div>
          </div>
          <div
            onClick={handleUpBtn}
            className="absolute right-10
           bottom-30 cursor-pointer"
          >
            <FaArrowAltCircleUp size={50} color="green" />
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
