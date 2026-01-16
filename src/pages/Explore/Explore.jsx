import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaSearch, FaFilter, FaSortAmountDown, FaThLarge, FaList, FaStar, FaMapMarkerAlt, FaRegClock } from "react-icons/fa";
import { Link } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const mockAssets = [
  { id: 1, title: "Premium Desk Setup", description: "Complete ergonomic workspace including standing desk and 4K monitor.", price: 1200, category: "Furniture", rating: 4.8, location: "New York", date: "2026-01-10", image: "https://images.unsplash.com/photo-1518455027359-f3f816b1a238?auto=format&fit=crop&w=500&q=60" },
  { id: 2, title: "MacBook Pro 16\"", description: "M3 Max chip, 64GB RAM, 2TB SSD for high-performance development.", price: 3499, category: "Electronics", rating: 4.9, location: "San Francisco", date: "2026-01-12", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=60" },
  { id: 3, title: "Cloud Server Instance", description: "Scalable cloud resources for enterprise-level applications.", price: 50, category: "Digital", rating: 4.5, location: "Remote", date: "2026-01-05", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&w=500&q=60" },
  { id: 4, title: "Herman Miller Aeron", description: "The gold standard in ergonomic office seating.", price: 1400, category: "Furniture", rating: 5.0, location: "Chicago", date: "2026-01-14", image: "https://images.unsplash.com/photo-1505797149-43b0ad766207?auto=format&fit=crop&w=500&q=60" },
  { id: 5, title: "Fiber Optic Router", description: "High-speed networking gear for low-latency connections.", price: 299, category: "Electronics", rating: 4.2, location: "Austin", date: "2026-01-08", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=500&q=60" },
  { id: 6, title: "Project Management Suite", description: "Annual license for advanced collaboration tools.", price: 999, category: "Digital", rating: 4.7, location: "Global", date: "2026-01-15", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=60" },
  { id: 7, title: "Canon EOS R5", description: "Professional mirrorless camera for corporate media production.", price: 3899, category: "Electronics", rating: 4.9, location: "Los Angeles", date: "2026-01-11", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=60" },
  { id: 8, title: "Conference Room Kit", description: "Video conferencing hardware for hybrid meeting spaces.", price: 2500, category: "Furniture", rating: 4.4, location: "Seattle", date: "2026-01-09", image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=500&q=60" },
];

const Explore = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [view, setView] = useState("grid");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredAssets = mockAssets
    .filter(asset => 
      (category === "All" || asset.category === category) &&
      (asset.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       asset.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return new Date(b.date) - new Date(a.date);
    });

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Explore <span className="text-lime-600">Inventory</span>
          </motion.h1>
          <p className="text-base-content/60 max-w-2xl mx-auto">
            Browse through our wide range of corporate assets, electronics, and digital services available for your team.
          </p>
        </div>

        {/* Controls Section */}
        <div className="bg-base-100 p-6 rounded-2xl shadow-lg mb-8 border border-base-300">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
              <input 
                type="text" 
                placeholder="Search assets or services..." 
                className="input input-bordered w-full pl-12 h-14 rounded-xl focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center w-full lg:w-auto">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <FaFilter className="text-lime-500" />
                <select 
                  className="select select-bordered rounded-xl h-14"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Digital">Digital</option>
                </select>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <FaSortAmountDown className="text-lime-500" />
                <select 
                  className="select select-bordered rounded-xl h-14"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="join hidden sm:flex">
                <button 
                  onClick={() => setView("grid")}
                  className={`btn join-item h-14 w-14 ${view === "grid" ? "bg-lime-500 text-white border-none" : "btn-ghost bg-base-200"}`}
                >
                  <FaThLarge />
                </button>
                <button 
                  onClick={() => setView("list")}
                  className={`btn join-item h-14 w-14 ${view === "list" ? "bg-lime-500 text-white border-none" : "btn-ghost bg-base-200"}`}
                >
                  <FaList />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="card bg-base-100 shadow-xl overflow-hidden">
                <Skeleton height={200} />
                <div className="p-5">
                  <Skeleton count={3} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`grid ${view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"} gap-8`}>
            <AnimatePresence mode="popLayout">
              {filteredAssets.map((asset) => (
                <motion.div
                  layout
                  key={asset.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300 group ${view === "list" ? "card-side" : ""}`}
                >
                  <figure className={`relative overflow-hidden ${view === "list" ? "w-1/3" : "h-52"}`}>
                    <img 
                      src={asset.image} 
                      alt={asset.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-base-100/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-base-300">
                      {asset.category}
                    </div>
                  </figure>
                  <div className="card-body p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="card-title text-xl font-bold group-hover:text-lime-600 transition-colors">
                        {asset.title}
                      </h2>
                      <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                        <FaStar /> {asset.rating}
                      </div>
                    </div>
                    
                    <p className="text-sm text-base-content/70 line-clamp-2 mb-4">
                      {asset.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-xs text-base-content/50 mb-6">
                      <span className="flex items-center gap-1"><FaMapMarkerAlt /> {asset.location}</span>
                      <span className="flex items-center gap-1"><FaRegClock /> {new Date(asset.date).toLocaleDateString()}</span>
                    </div>

                    <div className="card-actions justify-between items-center mt-auto">
                      <div className="text-2xl font-black text-lime-600">
                        ${asset.price.toLocaleString()}
                        <span className="text-xs font-normal text-base-content/50 ml-1">
                          {asset.category === "Digital" ? "/mo" : "one-time"}
                        </span>
                      </div>
                      <Link to={`/explore/${asset.id}`} className="btn bg-lime-500 hover:bg-lime-600 text-white border-none rounded-xl px-6">
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredAssets.length === 0 && (
          <div className="text-center py-20 bg-base-100 rounded-3xl border-2 border-dashed border-base-300">
            <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6 text-base-content/30">
              <FaSearch size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-2">No assets found</h3>
            <p className="text-base-content/50">Try adjusting your filters or search terms.</p>
            <button 
              onClick={() => {setSearchTerm(""); setCategory("All");}} 
              className="btn bg-lime-500 hover:bg-lime-600 text-white border-none mt-8 rounded-xl"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
