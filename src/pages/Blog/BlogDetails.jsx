import { motion } from "motion/react";
import { FaCalendarAlt, FaUser, FaTag } from "react-icons/fa";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

const BlogDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();

  const { data: blog = {}, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/blogs/${id}`);
      return res.data;
    },
  });

  console.log(blog)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-lime-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-block mb-6 font-bold text-lime-600 hover:underline"
        >
          ← Back to Blog
        </Link>

        {/* Blog Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-base-100 rounded-[2.5rem] shadow-xl overflow-hidden border border-base-300"
        >
          {/* Image */}
          <div className="relative h-[420px] overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-6 left-6 badge bg-lime-500 border-none text-white py-4 px-6 font-bold shadow-lg">
              <FaTag className="mr-1" /> {blog.category}
            </span>
          </div>

          {/* Content */}
          <div className="p-10">
            {/* Meta */}
            <div className="flex flex-wrap gap-6 text-sm font-bold text-base-content/50 uppercase tracking-widest mb-6">
              <span className="flex items-center gap-2">
                <FaCalendarAlt /> {blog.date}
              </span>
              <span className="flex items-center gap-2">
                <FaUser /> {blog.author}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-black mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Details */}
            <div className="text-base-content/70 text-lg leading-relaxed space-y-6 font-medium">
              {blog.details.split("\n").map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetails;
