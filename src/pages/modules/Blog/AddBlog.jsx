import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header2 from "../../../components/superAdmin/header/Header2";
import JoditEditor from "jodit-pro-react";
import { toast } from "react-toastify";

const AddBlog = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const contentRef = React.useRef(null);

  const editorConfig = React.useMemo(
    () => ({
      readonly: false,
      minHeight: 400,
      placeholder: "Start typing your blog content here...",
      enter: "P",
      list: {
        autoIndent: true,
      },
      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "outdent",
        "indent",
        "|",
        "undo",
        "redo",
        "|",
        "link",
        "table",
        "|",
        "hr",
        "fullsize",
      ],
      toolbarAdaptive: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      useNativeTooltip: false,
    }),
    []
  );

  const validate = () => {
    const errors = [];
    if (!formData.title.trim()) errors.push("Title is required");
    if (!formData.author.trim()) errors.push("Author name is required");
    if (!formData.content.trim()) errors.push("Content is required");
    if (!imageFile && !formData.image) errors.push("Image is required");
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData((prev) => ({ ...prev, image: file.name }));
      setError("");
    }
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
      
      toast.success("Blog added successfully!");
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
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <JoditEditor
                ref={contentRef}
                defaultValue={formData.content}
                config={editorConfig}
                tabIndex={1}
                onBlur={(newContent) => setFormData((prev) => ({ ...prev, content: newContent }))}
                onChange={() => {}}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-poppins text-[16px] font-medium mb-2">
              Upload Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#7EC1B1] file:text-white hover:file:bg-[#6DB0A0] file:cursor-pointer"
            />
            {imagePreview && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-w-md h-48 object-cover rounded-lg border"
                />
              </div>
            )}
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
