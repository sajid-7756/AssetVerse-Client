import React from "react";
import { Disclosure } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import Container from "../../Shared/Container";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I assign an asset?",
      answer:
        "Navigate to the asset list, select an asset, and click 'Assign to Employee.' The process is quick and intuitive.",
    },
    {
      question: "Can employees request assets?",
      answer:
        "Yes, employees can submit asset requests through their dashboard for HR approval. Requests are tracked and managed efficiently.",
    },
    {
      question: "Is there a limit to assets?",
      answer:
        "Asset limits depend on your subscription plan. Upgrade to our premium plan for unlimited assets and advanced features.",
    },
    {
      question: "How do I track asset returns?",
      answer:
        "View return dates and status in the asset tracking dashboard with automated reminders. Never miss a return deadline again.",
    },
    {
      question: "Can I export asset reports?",
      answer:
        "Yes, generate and export detailed reports in PDF or CSV format anytime. Perfect for audits and compliance.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use enterprise-grade encryption and comply with industry security standards to protect your data.",
    },
  ];

  return (
    <div className="py-16 md:py-24 px-4">
      <Container className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-lime-100 text-lime-700 rounded-full font-bold text-sm mb-4">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Frequently Asked{" "}
            <span className="bg-linear-to-r from-lime-500 to-green-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Find answers to common questions about AssetVerse and how it can
            help your organization.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-arrow border border-base-300 bg-white rounded-xl shadow-md"
            >
              <input type="checkbox" />
              <div className="collapse-title text-lg font-bold text-gray-900">
                {faq.question}
              </div>
              <div className="collapse-content text-gray-600 leading-relaxed">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="btn bg-linear-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white border-0 shadow-lg hover:shadow-green-500/30 transition-all duration-300">
            Contact Support
          </button>
        </div>
      </Container>
    </div>
  );
};

export default FAQ;
