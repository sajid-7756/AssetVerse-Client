import { motion } from "motion/react";
import { FaShieldAlt, FaFileContract, FaLock, FaUserSecret } from "react-icons/fa";

const PrivacyTerms = () => {
  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl font-black mb-4 tracking-tight"
          >
            Privacy & <span className="text-lime-600 italic font-serif">Terms</span>
          </motion.h1>
          <p className="text-base-content/50 font-medium">Last updated: January 16, 2026</p>
        </div>

        <div className="flex flex-col gap-12">
          {/* Section 1: Privacy Policy */}
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-base-100 p-10 rounded-[2.5rem] shadow-xl border border-base-300"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-lime-50 text-lime-600 flex items-center justify-center text-2xl">
                <FaLock />
              </div>
              <h2 className="text-3xl font-black">Privacy Policy</h2>
            </div>
            
            <div className="space-y-6 text-base-content/70 font-medium leading-relaxed">
              <p>
                At <span className="text-lime-600 font-black">AssetVerse</span>, we take your corporate data security seriously. This policy outlines how we collect, use, and protect your information when you use our platform.
              </p>
              
              <h3 className="text-xl font-bold text-base-content italic mt-8 border-l-4 border-lime-500 pl-4">1. Information Collection</h3>
              <p>
                We collect information provided during registration (Email, Name, Company Logo) and data related to asset management. We do not sell your personal or corporate data to third parties.
              </p>

              <h3 className="text-xl font-bold text-base-content italic mt-8 border-l-4 border-lime-500 pl-4">2. Data Usage</h3>
              <p>
                Data is used exclusively to provide asset tracking services, manage employee affiliations, and process payments via our secure partner, Stripe.
              </p>

              <div className="bg-lime-50 p-6 rounded-2xl border-l-8 border-lime-500 italic">
                "Your company's inventory data is encrypted and accessible only by authorized HR managers within your organization."
              </div>

              <h3 className="text-xl font-bold text-base-content italic mt-8 border-l-4 border-lime-500 pl-4">3. Cookies & Tracking</h3>
              <p>
                We use essential cookies for authentication and performance optimization. We do not use third-party tracking pixels for advertising purposes.
              </p>
            </div>
          </motion.section>

          {/* Section 2: Terms of Service */}
          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-base-100 p-10 rounded-[2.5rem] shadow-xl border border-base-300"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center text-2xl">
                <FaFileContract />
              </div>
              <h2 className="text-3xl font-black">Terms of Service</h2>
            </div>

            <div className="space-y-6 text-base-content/70 font-medium leading-relaxed">
              <p>
                By using AssetVerse, you agree to comply with our corporate usage guidelines and respect the integrity of the platform.
              </p>

              <h3 className="text-xl font-bold text-base-content italic mt-8 border-l-4 border-green-500 pl-4">1. Account Responsibility</h3>
              <p>
                HR Managers are responsible for the accuracy of their inventory and the management of their employee lists. AssetVerse is not responsible for missing physical equipment.
              </p>

              <h3 className="text-xl font-bold text-base-content italic mt-8 border-l-4 border-green-500 pl-4">2. Subscription & Payments</h3>
              <p>
                Subscriptions are billed monthly or annually. Failure to pay may result in restricted access to dashboard features, although data will be preserved for 30 days.
              </p>

              <h3 className="text-xl font-bold text-base-content italic mt-8 border-l-4 border-green-500 pl-4">3. Termination</h3>
              <p>
                Either party may terminate the agreement at any time. Upon termination, HR managers should export their data if needed, as it may be purged after the grace period.
              </p>
            </div>
          </motion.section>

          {/* Summary Footer */}
          <div className="text-center py-10 opacity-60">
            <p className="font-bold">Questions about these terms? Reach out to our legal team.</p>
            <p className="text-sm">legal@assetverse.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyTerms;
