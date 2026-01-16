import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { FaStar, FaMapMarkerAlt, FaRegCalendarAlt, FaShieldAlt, FaTruck, FaRedo, FaArrowLeft, FaHeart, FaShareAlt } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

const mockAssets = [
  { id: 1, title: "Premium Desk Setup", description: "Complete ergonomic workspace including standing desk and 4K monitor. Designed for maximum productivity and long-term health. The standing desk features a dual-motor system for smooth height adjustments, while the 4K monitor provides crisp visuals for the most demanding tasks.", price: 1200, category: "Furniture", rating: 4.8, reviews: 124, location: "New York", date: "2026-01-10", images: ["https://images.unsplash.com/photo-1518455027359-f3f816b1a238?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1000&q=80"] },
  // ... more can be added if needed, for now I'll just use one for the details demo
];

const AssetDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [asset, setAsset] = useState(null);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundAsset = mockAssets.find(a => a.id === parseInt(id)) || mockAssets[0];
      setAsset(foundAsset);
      setActiveImage(foundAsset.images[0]);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2"><Skeleton height={500} /></div>
          <div className="lg:w-1/2"><Skeleton count={10} /></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs / Back */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/explore" className="btn btn-ghost gap-2 rounded-xl text-base-content/60 hover:text-lime-600">
            <FaArrowLeft /> Back to Explore
          </Link>
          <div className="flex gap-2">
            <button className="btn btn-ghost btn-circle border border-base-300"><FaHeart /></button>
            <button className="btn btn-ghost btn-circle border border-base-300"><FaShareAlt /></button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Image Gallery */}
          <div className="lg:w-1/2 space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-3xl overflow-hidden border border-base-300 shadow-2xl"
            >
              <img src={activeImage} alt={asset.title} className="w-full h-full object-cover" />
            </motion.div>
            <div className="flex gap-4">
              {asset.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${activeImage === img ? "border-lime-500 scale-105 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"}`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Asset Info */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="badge border-lime-500 text-lime-600 bg-lime-50 font-bold mb-4 px-4 py-3">{asset.category}</div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">{asset.title}</h1>
              
              <div className="flex items-center gap-6 mb-8 text-base-content/70">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <FaStar /> {asset.rating} <span className="text-base-content/40 font-normal">({asset.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2"><FaMapMarkerAlt /> {asset.location}</div>
                <div className="flex items-center gap-2"><FaRegCalendarAlt /> Added {new Date(asset.date).toLocaleDateString()}</div>
              </div>

              <div className="text-3xl font-black text-lime-600 mb-8">
                ${asset.price.toLocaleString()}
                <span className="text-lg font-medium text-base-content/40 ml-2">Estimated Value</span>
              </div>

              <div className="divider"></div>

              <div className="space-y-6 mb-12">
                <h3 className="text-xl font-bold">Description</h3>
                <p className="text-lg leading-relaxed text-base-content/70">{asset.description}</p>
              </div>

              {/* Specifications / Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                <div className="p-4 rounded-2xl bg-base-200 border border-base-300 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-lime-50 text-lime-600 flex items-center justify-center text-xl"><FaShieldAlt /></div>
                  <div>
                    <h4 className="font-bold">5-Year Warranty</h4>
                    <p className="text-xs text-base-content/50">Full coverage included</p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-base-200 border border-base-300 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-xl"><FaTruck /></div>
                  <div>
                    <h4 className="font-bold">Complimentary Setup</h4>
                    <p className="text-xs text-base-content/50">Elite white-glove delivery</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn bg-lime-500 hover:bg-lime-600 border-none text-white btn-lg flex-1 h-16 rounded-2xl text-xl shadow-xl shadow-lime-500/20">
                  Request This Asset
                </button>
                <button className="btn btn-outline btn-lg sm:px-10 h-16 rounded-2xl hover:bg-base-200 hover:text-base-content">
                  Inquiry
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Separated Section */}
        <div className="mt-24">
          <div className="tabs tabs-lifted">
            <input type="radio" name="my_tabs_2" className="tab font-bold text-lg" aria-label="Specifications" defaultChecked />
            <div className="tab-content bg-base-100 border-base-300 rounded-box p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {[
                  ["Manufacturer", "ErgoWorld Global"],
                  ["Model Number", "EW-2026-PREM"],
                  ["Materials", "Steel, Oak, Glass"],
                  ["Weight Capacity", "250 lbs"],
                  ["Dimensions", "60\" W x 30\" D"],
                  ["Power Source", "110V AC Adapter"]
                ].map(([label, value], i) => (
                  <div key={i} className="flex justify-between border-b border-base-200 py-3">
                    <span className="font-bold text-base-content/60">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <input type="radio" name="my_tabs_2" className="tab font-bold text-lg" aria-label="Return Policy" />
            <div className="tab-content bg-base-100 border-base-300 rounded-box p-8">
              <p className="text-lg text-base-content/70">
                This asset follows our <span className="text-lime-600 font-bold">Standard Corporate Return Policy</span>. Employees are expected to return assets in original condition within 5 working days of resignation or termination of affiliation. Failure to return assets may result in legal action or deduction from final settlement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetails;
