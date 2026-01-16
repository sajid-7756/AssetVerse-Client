import { motion } from "motion/react";
import { Link } from "react-router";
import { FaArrowRight, FaCalendarAlt, FaUser } from "react-icons/fa";

const blogs = [
  {
    id: 1,
    title: "The Future of AI in Asset Management",
    excerpt: "Discover how artificial intelligence is revolutionizing the way companies track and maintain their physical and digital assets.",
    author: "Alex Rivera",
    date: "Jan 15, 2026",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    category: "Technology"
  },
  {
    id: 2,
    title: "5 Tips for Optimizing Your Office Inventory",
    excerpt: "Learn practical strategies to minimize waste and ensure your team always has the equipment they need to succeed.",
    author: "Sarah Chen",
    date: "Jan 12, 2026",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    category: "Operations"
  },
  {
    id: 3,
    title: "Sustainability: The New Asset Metric",
    excerpt: "Why tracking the environmental impact of your corporate assets is no longer optional in 2026 and beyond.",
    author: "Marcus Thorne",
    date: "Jan 10, 2026",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
    category: "Environment"
  }
];

const RecentBlogs = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">Latest <span className="text-lime-600">Insights</span></h2>
            <p className="text-base-content/70">Stay updated with the latest trends in management and technology.</p>
          </div>
          <Link to="/blog" className="btn bg-lime-500 hover:bg-lime-600 border-none text-white hidden md:flex items-center gap-2">
            View All News <FaArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300 group"
            >
              <figure className="relative overflow-hidden aspect-video">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="badge bg-lime-500 border-none text-white font-semibold">{blog.category}</span>
                </div>
              </figure>
              <div className="card-body">
                <div className="flex items-center gap-4 text-xs text-base-content/60 mb-3">
                  <span className="flex items-center gap-1"><FaUser /> {blog.author}</span>
                  <span className="flex items-center gap-1"><FaCalendarAlt /> {blog.date}</span>
                </div>
                <h3 className="card-title text-xl mb-3 group-hover:text-lime-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-base-content/70 text-sm line-clamp-3 mb-4">
                  {blog.excerpt}
                </p>
                <div className="card-actions justify-end">
                  <Link to={`/blog/${blog.id}`} className="btn btn-ghost btn-sm gap-2 hover:bg-lime-500 hover:text-white transition-all font-bold">
                    Read More <FaArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link to="/blog" className="btn bg-lime-500 hover:bg-lime-600 border-none text-white w-full">
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentBlogs;
