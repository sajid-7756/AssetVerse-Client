import { motion } from "motion/react";
import { FaPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2";

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      Swal.fire({
        title: "Success!",
        text: "Thank you for subscribing to our newsletter!",
        icon: "success",
        confirmButtonColor: "#84cc16",
      });
      e.target.reset();
    }
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-lime-200 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-green-200 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-base-100 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-base-300">
          <div className="md:w-1/2 p-8 md:p-12 bg-linear-to-br from-lime-500 to-green-600 text-white flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Ahead of the <span className="text-white underline decoration-white underline-offset-8">Curve</span></h2>
              <p className="opacity-90 mb-8 leading-relaxed">
                Join 5,000+ managers who receive our weekly insights on asset optimization, team efficiency, and corporate technology.
              </p>
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img key={i} className="w-10 h-10 rounded-full border-2 border-white object-cover" src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                  ))}
                </div>
                <span>Trusted by 5k+ professionals</span>
              </div>
            </motion.div>
          </div>

          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4">Subscribe Now</h3>
              <p className="text-base-content/70 mb-8">No spam. Only high-quality assets and management tips.</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="your@email.com" 
                    className="input input-bordered w-full h-14 rounded-xl focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all bg-base-200 border-base-300" 
                    required 
                  />
                </div>
                <button type="submit" className="btn bg-lime-500 hover:bg-lime-600 border-none text-white w-full h-14 rounded-xl text-lg gap-3">
                  Join Newsletter <FaPaperPlane />
                </button>
                <p className="text-[10px] text-center text-base-content/50">
                  By subscribing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
