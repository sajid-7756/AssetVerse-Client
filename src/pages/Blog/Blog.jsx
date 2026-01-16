import { motion } from "motion/react";
import { FaCalendarAlt, FaUser, FaTag, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const blogs = [
  {
    id: 1,
    title: "Optimizing Resource Allocation with AI",
    date: "Jan 16, 2026",
    author: "Jane Doe",
    excerpt: "Learn how the latest AI models are helping HR managers predict asset needs and reduce waste by up to 40%.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    category: "Management"
  },
  {
    id: 2,
    title: "The Shift to Hybrid Work Assets",
    date: "Jan 14, 2026",
    author: "John Smith",
    excerpt: "Why traditional office desks are being replaced by high-performance mobile kits for the distributed workforce.",
    image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&w=800&q=80",
    category: "Future of Work"
  },
  {
    id: 3,
    title: "Cybersecurity for Physical Assets",
    date: "Jan 10, 2026",
    author: "Mike Johnson",
    excerpt: "Everything you need to know about tracking IoT-enabled office equipment without compromising network security.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    category: "Security"
  },
  {
    id: 4,
    title: "Sustainable Asset Decommissioning",
    date: "Jan 05, 2026",
    author: "Alice Green",
    excerpt: "How to responsibly recycle old tech and furniture while staying compliant with ESG requirements.",
    image: "https://images.unsplash.com/photo-1532033375034-a29004e79301?auto=format&fit=crop&w=800&q=80",
    category: "Sustainability"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        {/* Blog Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl font-black mb-4"
          >
            Our <span className="text-lime-600">Blog</span>
          </motion.h1>
          <p className="text-base-content/60 max-w-2xl mx-auto text-lg font-medium">
            Discover articles, news, and insights from the AssetVerse team.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-base-100 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300"
            >
              <div className="flex flex-col lg:flex-row h-full">
                <div className="lg:w-2/5 relative overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 min-h-[250px]"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="badge bg-lime-500 border-none text-white py-4 px-6 font-bold text-sm shadow-lg">{blog.category}</span>
                  </div>
                </div>
                <div className="lg:w-3/5 p-8 flex flex-col justify-center">
                  <div className="flex gap-4 text-xs font-bold text-base-content/40 mb-4 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><FaCalendarAlt /> {blog.date}</span>
                    <span className="flex items-center gap-1"><FaUser /> {blog.author}</span>
                  </div>
                  <h2 className="text-2xl font-black mb-4 group-hover:text-lime-600 transition-colors leading-tight">
                    {blog.title}
                  </h2>
                  <p className="text-base-content/60 mb-6 font-medium">
                    {blog.excerpt}
                  </p>
                  <Link to={`/blog/${blog.id}`} className="flex items-center gap-2 font-black text-lime-600 hover:gap-4 transition-all uppercase text-sm tracking-widest">
                    Read Story <FaArrowRight />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Placeholder */}
        <div className="flex justify-center mt-20">
          <div className="join bg-base-100 shadow-lg p-2 rounded-2xl border border-base-300">
            <button className="join-item btn btn-ghost text-xl">«</button>
            <button className="join-item btn bg-lime-500 hover:bg-lime-600 border-none text-white px-6 rounded-xl">Page 1</button>
            <button className="join-item btn btn-ghost px-6 rounded-xl">Page 2</button>
            <button className="join-item btn btn-ghost px-6 rounded-xl">Page 3</button>
            <button className="join-item btn btn-ghost text-xl">»</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
