import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header2 from "../../../components/superAdmin/header/Header2";

// Dummy Blog Data (same as Blog.jsx)
const DUMMY_BLOGS = [
  {
    _id: "1",
    title: "RO Water Purifier Selection Guide",
    author: "Manoj Sharma",
    date: "2024-12-24",
    views: 124,
    status: "Published",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80",
    content: "Choosing the right RO water purifier is essential for clean drinking water. Here's a comprehensive guide to help you select the best RO purifier for your home...",
  },
  {
    _id: "2",
    title: "Professional RO Service & Maintenance Tips",
    author: "Deepak Sharma",
    date: "2024-12-18",
    views: 98,
    status: "Published",
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=400&q=80",
    content: "Regular maintenance is crucial for optimal RO performance. Follow these professional tips to keep your RO system running efficiently...",
  },
  {
    _id: "3",
    title: "Why RO Water Is Safer for Health",
    author: "Veer Jain",
    date: "2024-12-12",
    views: 150,
    status: "Draft",
    image: "https://picsum.photos/400/300?random=1",
    content: "RO water offers multiple health benefits by removing harmful contaminants. Learn why RO purification is one of the safest water treatment methods...",
  },
  {
    _id: "4",
    title: "Common RO Problems & Solutions",
    author: "Ram Sharma",
    date: "2024-12-05",
    views: 128,
    status: "Published",
    image: "https://picsum.photos/400/300?random=2",
    content: "Facing issues with your RO purifier? Here are the most common problems and their quick solutions...",
  },
  {
    _id: "5",
    title: "How Often Should You Change RO Filters?",
    author: "Manoj Sharma",
    date: "2024-12-01",
    views: 125,
    status: "Published",
    image: "https://picsum.photos/400/300?random=3",
    content: "Filter replacement is key to maintaining water quality. Here's a complete guide on when and how to change your RO filters...",
  },
];

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    image: "",
    status: "Draft",
  });

  useEffect(() => {
    // Find blog by ID and prefill form
    const blog = DUMMY_BLOGS.find((b) => b._id === id);
    if (blog) {
      setFormData({
        title: blog.title,
        author: blog.author,
        content: blog.content,
        image: blog.image,
        status: blog.status,
      });
    } else {
      setError("Blog not found");
    }
  }, [id]);

  const validate = () => {
    const errors = [];
    if (!formData.title.trim()) errors.push("Title is required");
    if (!formData.author.trim()) errors.push("Author name is required");
    if (!formData.content.trim()) errors.push("Content is required");
    if (!formData.image.trim()) errors.push("Image URL is required");
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (errors.length > 0) {
      setError(errors.join("\n"));
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In real implementation, dispatch Redux action here
      // await dispatch(updateBlog({ id, data: formData })).unwrap();
      
      alert("Blog updated successfully!");
      navigate("/blog");
    } catch (err) {
      setError(err.message || "Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 min-h-screen flex flex-col gap-6">
      <Header2 title="Edit Blog" />

      <div className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto w-full">
        <form onSubmit={handleUpdate} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded whitespace-pre-line">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block font-poppins text-[16px] font-medium mb-2">
              Blog Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block font-poppins text-[16px] font-medium mb-2">
              Author Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block font-poppins text-[16px] font-medium mb-2">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Enter blog content"
              rows="10"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] resize-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-poppins text-[16px] font-medium mb-2">
              Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
            />
            {formData.image && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full max-w-md h-48 object-cover rounded-lg border"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block font-poppins text-[16px] font-medium mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => navigate("/blog")}
              className="px-6 py-3 border border-gray-300 rounded-lg font-poppins text-[16px] hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-[#7EC1B1] text-white rounded-lg font-poppins text-[16px] hover:bg-[#6db09f] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Update Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
