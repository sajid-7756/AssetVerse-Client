import React, { useState } from "react";
import {
  FaPaperPlane,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Container from "../../Shared/Container";
import toast from "react-hot-toast";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success("Thank you for contacting us! We'll get back to you soon.");
    // Reset form
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  return (
    <div className="py-16 md:py-24 px-4 bg-lime-50">
      <Container className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div>
            <div className="inline-block px-4 py-2 bg-lime-100 text-lime-700 rounded-full font-bold text-sm mb-4">
              Contact Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Need help or want a{" "}
              <span className="bg-linear-to-r from-lime-500 to-green-600 bg-clip-text text-transparent">
                demo?
              </span>
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Our team is ready to help you get started with AssetVerse. Fill
              out the form and we'll get back to you within 24 hours.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center text-lime-600">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-bold text-gray-900">
                    devsajid56@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center text-lime-600">
                  <FaPhone className="text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-bold text-gray-900">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center text-lime-600">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Office</p>
                  <p className="font-bold text-gray-900">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
            >
              {/* Name Field */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full focus:outline-lime-500"
                  placeholder="Your name"
                />
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full focus:outline-lime-500"
                  placeholder="your@email.com"
                />
              </div>

              {/* Company Field */}
              <div className="mb-4">
                <label
                  htmlFor="company"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="input input-bordered w-full focus:outline-lime-500"
                  placeholder="Your company (optional)"
                />
              </div>

              {/* Message Field */}
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="textarea textarea-bordered w-full focus:outline-lime-500"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-lg w-full bg-linear-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FaPaperPlane className="mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
