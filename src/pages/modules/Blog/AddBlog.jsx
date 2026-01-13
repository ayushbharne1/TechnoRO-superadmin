import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header2 from "../../../components/superAdmin/header/Header2";

const AddBlog = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    image: "",
    status: "Draft",
  });

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

  const handleAdd = async (e) => {
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
      // await dispatch(addBlog(formData)).unwrap();
      
      alert("Blog added successfully!");
      navigate("/blog");
    } catch (err) {
      setError(err.message || "Failed to add blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 min-h-screen flex flex-col gap-6">
      <Header2 title="Add New Blog" />

      <div className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto w-full">
        <form onSubmit={handleAdd} className="space-y-6">
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
              {loading ? "Adding..." : "Add Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
