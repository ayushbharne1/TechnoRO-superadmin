import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Header2 from "../../../components/superAdmin/header/Header2";

// Dummy Blog Data (same as Blog.jsx and EditBlog.jsx)
const DUMMY_BLOGS = [
  {
    _id: "1",
    title: "RO Water Purifier Selection Guide",
    author: "Manoj Sharma",
    date: "2024-12-24",
    views: 124,
    status: "Published",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80",
    content: "Choosing the right RO water purifier is essential for clean drinking water. Here's a comprehensive guide to help you select the best RO purifier for your home. Consider factors like water quality, TDS levels, and family size when making your selection. A good RO system should have multiple filtration stages including pre-filters, RO membrane, and post-carbon filter. Look for certifications from recognized organizations and check the warranty period. Regular maintenance and timely filter replacement are crucial for optimal performance.",
  },
  {
    _id: "2",
    title: "Professional RO Service & Maintenance Tips",
    author: "Deepak Sharma",
    date: "2024-12-18",
    views: 98,
    status: "Published",
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=400&q=80",
    content: "Regular maintenance is crucial for optimal RO performance. Follow these professional tips to keep your RO system running efficiently. Schedule regular filter replacements every 6-12 months depending on water quality. Clean the storage tank periodically to prevent bacterial growth. Check for leaks and unusual sounds that might indicate problems. Monitor water pressure and flow rate to ensure consistent performance. Keep the exterior clean and free from dust. Professional annual servicing is recommended for thorough inspection.",
  },
  {
    _id: "3",
    title: "Why RO Water Is Safer for Health",
    author: "Veer Jain",
    date: "2024-12-12",
    views: 150,
    status: "Draft",
    image: "https://picsum.photos/400/300?random=1",
    content: "RO water offers multiple health benefits by removing harmful contaminants. Learn why RO purification is one of the safest water treatment methods. RO technology effectively removes dissolved solids, heavy metals, bacteria, and viruses. It significantly reduces TDS levels, making water safer for consumption. The multi-stage filtration process ensures removal of chlorine, pesticides, and other chemicals. RO water is especially beneficial for people with compromised immune systems. It provides peace of mind knowing your family is drinking clean, safe water.",
  },
  {
    _id: "4",
    title: "Common RO Problems & Solutions",
    author: "Ram Sharma",
    date: "2024-12-05",
    views: 128,
    status: "Published",
    image: "https://picsum.photos/400/300?random=2",
    content: "Facing issues with your RO purifier? Here are the most common problems and their quick solutions. Slow water flow often indicates clogged filters or low water pressure. Taste and odor issues suggest filter replacement is needed. Continuous water drainage might be due to a faulty check valve. Unusual noises could indicate air trapped in the system. Water leaks require immediate attention to prevent damage. Most issues can be resolved with basic troubleshooting, but complex problems require professional help.",
  },
  {
    _id: "5",
    title: "How Often Should You Change RO Filters?",
    author: "Manoj Sharma",
    date: "2024-12-01",
    views: 125,
    status: "Published",
    image: "https://picsum.photos/400/300?random=3",
    content: "Filter replacement is key to maintaining water quality. Here's a complete guide on when and how to change your RO filters. Pre-filters should be replaced every 6-9 months to remove sediment and chlorine. The RO membrane typically lasts 2-3 years with proper maintenance. Post-carbon filters need replacement every 9-12 months for taste and odor control. Set reminders for regular replacement to ensure consistent water quality. Using genuine replacement filters ensures optimal performance and longevity. Consider water quality and usage when determining replacement schedules.",
  },
];

const ViewBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Find blog by ID
    const foundBlog = DUMMY_BLOGS.find((b) => b._id === id);
    if (foundBlog) {
      setBlog(foundBlog);
    }
  }, [id]);

  if (!blog) {
    return (
      <div className="bg-white p-4 min-h-screen flex flex-col gap-6">
        <Header2 title="Blog Details" />
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">Blog not found</p>
          <button
            onClick={() => navigate("/blog")}
            className="mt-4 px-6 py-2 bg-[#7EC1B1] text-white rounded-lg"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 min-h-screen flex flex-col gap-6">
      <Header2 title="Blog Details" />

      <div className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto w-full">
        {/* Back Button */}
        <button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 text-[#7EC1B1] hover:text-[#6db09f] mb-6"
        >
          <ArrowLeft size={20} />
          <span className="font-poppins">Back to Blogs</span>
        </button>

        {/* Blog Image */}
        <div className="mb-6">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 sm:h-96 object-cover rounded-lg"
          />
        </div>

        {/* Blog Title */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{blog.title}</h1>

        {/* Blog Meta Info */}
        <div className="flex flex-wrap gap-4 sm:gap-6 text-gray-600 mb-6 pb-6 border-b">
          <div className="flex items-center gap-2">
            <User size={18} />
            <span className="font-poppins text-sm">{blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span className="font-poppins text-sm">{blog.date}</span>
          </div>
        </div>

        {/* Blog Content */}
        <div className="prose max-w-none mb-8">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
            {blog.content}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end pt-6 border-t">
          <button
            onClick={() => navigate("/blog")}
            className="px-6 py-3 border border-gray-300 rounded-lg font-poppins text-[16px] hover:bg-gray-50"
          >
            Back to List
          </button>
          <button
            onClick={() => navigate(`/blog/edit/${blog._id}`)}
            className="px-6 py-3 bg-[#7EC1B1] text-white rounded-lg font-poppins text-[16px] hover:bg-[#6db09f]"
          >
            Edit Blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;
