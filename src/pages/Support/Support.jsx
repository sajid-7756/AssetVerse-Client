import { motion } from "motion/react";
import { FaQuestionCircle, FaEnvelope, FaHeadset, FaBook } from "react-icons/fa";

const Support = () => {
  return (
    <div className="min-h-screen bg-base-100 py-12 font-sans">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black mb-4"
          >
            Help & <span className="text-lime-600">Support</span>
          </motion.h1>
          <p className="text-base-content/60 max-w-2xl mx-auto text-lg">
            We're here to help you manage your assets efficiently. Find answers to common questions or reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="card bg-base-200 p-8 rounded-[2rem] border border-base-300 hover:border-lime-500 transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-lime-50 text-lime-600 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
              <FaQuestionCircle />
            </div>
            <h3 className="text-2xl font-bold mb-4">Knowledge Base</h3>
            <p className="text-base-content/60 mb-6 font-medium">Detailed guides and documentation for HR managers and employees.</p>
            <button className="btn bg-lime-500 hover:bg-lime-600 border-none text-white rounded-xl w-full font-bold">Visit Docs</button>
          </div>

          <div className="card bg-base-200 p-8 rounded-[2rem] border border-base-300 hover:border-green-500 transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
              <FaHeadset />
            </div>
            <h3 className="text-2xl font-bold mb-4">Live Support</h3>
            <p className="text-base-content/60 mb-6 font-medium">Chat with our support specialists for immediate assistance with your account.</p>
            <button className="btn bg-green-600 hover:bg-green-700 border-none text-white rounded-xl w-full font-bold">Start Chat</button>
          </div>

          <div className="card bg-base-200 p-8 rounded-[2rem] border border-base-300 hover:border-amber-500 transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
              <FaEnvelope />
            </div>
            <h3 className="text-2xl font-bold mb-4">Email Ticketing</h3>
            <p className="text-base-content/60 mb-6 font-medium">Open a support ticket for complex issues and get a response within 24 hours.</p>
            <button className="btn bg-amber-600 hover:bg-amber-700 border-none text-white rounded-xl w-full font-bold">Open Ticket</button>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="bg-lime-50 rounded-[3rem] p-12 mb-20">
          <h2 className="text-3xl font-black mb-10 text-center">Frequently Asked <span className="text-lime-600">Questions</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { q: "How do I upgrade my employee limit?", a: "Go to Dashboard > Upgrade Package and choose the plan that fits your needs. Payment is processed via Stripe." },
              { q: "Can I track digital subscriptions?", a: "Yes, you can add digital services as assets and categorize them as 'Non-Returnable' for tracking." },
              { q: "What happens if an employee leaves?", a: "The HR manager can mark assets as 'Returned' and remove the employee from the company list to free up slots." },
              { q: "Is my corporate data secure?", a: "We use enterprise-grade encryption and Firebase authentication to ensure your data remains private and secure." }
            ].map((faq, i) => (
              <div key={i} className="collapse collapse-plus bg-base-100 border border-base-300 rounded-2xl">
                <input type="radio" name="my-accordion-3" /> 
                <div className="collapse-title text-xl font-bold p-6">
                  {faq.q}
                </div>
                <div className="collapse-content p-6 pt-0 text-base-content/60 font-medium"> 
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black mb-4 italic">Still Need Help?</h2>
            <p className="text-base-content/60 font-medium">Send us a message and we'll get back to you shortly.</p>
          </div>
          <div className="card bg-base-100 shadow-2xl p-10 rounded-[2.5rem] border border-base-300">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label font-bold text-sm uppercase tracking-widest text-base-content/40">Name</label>
                <input type="text" placeholder="Your Name" className="input input-bordered h-14 rounded-xl bg-base-200 border-none focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all" />
              </div>
              <div className="form-control">
                <label className="label font-bold text-sm uppercase tracking-widest text-base-content/40">Email</label>
                <input type="email" placeholder="Your Email" className="input input-bordered h-14 rounded-xl bg-base-200 border-none focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all" />
              </div>
              <div className="form-control md:col-span-2">
                <label className="label font-bold text-sm uppercase tracking-widest text-base-content/40">Subject</label>
                <select className="select select-bordered h-14 rounded-xl bg-base-200 border-none focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all">
                  <option disabled selected>Select Subject</option>
                  <option>Technical Issue</option>
                  <option>Billing Question</option>
                  <option>Feature Request</option>
                  <option>Bug Report</option>
                </select>
              </div>
              <div className="form-control md:col-span-2">
                <label className="label font-bold text-sm uppercase tracking-widest text-base-content/40">Message</label>
                <textarea className="textarea textarea-bordered h-40 rounded-xl bg-base-200 border-none focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all" placeholder="How can we help?"></textarea>
              </div>
              <div className="md:col-span-2">
                <button className="btn bg-lime-500 hover:bg-lime-600 border-none text-white h-14 w-full rounded-xl text-lg font-black shadow-lg shadow-lime-500/20">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
