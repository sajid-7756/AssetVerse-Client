import { motion } from "motion/react";
import CountUp from "react-countup";
import { FaBox, FaUsers, FaBuilding, FaGlobe } from "react-icons/fa";

const stats = [
  { id: 1, label: "Total Assets", value: 15400, icon: <FaBox />, color: "bg-blue-500" },
  { id: 2, label: "Active Users", value: 8200, icon: <FaUsers />, color: "bg-green-500" },
  { id: 3, label: "Companies", value: 1250, icon: <FaBuilding />, color: "bg-amber-500" },
  { id: 4, label: "Global Reach", value: 45, icon: <FaGlobe />, color: "bg-purple-500" },
];

const Stats = () => {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className={`w-14 h-14 rounded-full ${stat.color} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                {stat.icon}
              </div>
              <div className="text-4xl font-black mb-2 tracking-tight">
                <CountUp end={stat.value} duration={2.5} separator="," suffix={stat.id === 4 ? "+" : ""} />
              </div>
              <p className="text-sm font-semibold uppercase tracking-widest opacity-70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
