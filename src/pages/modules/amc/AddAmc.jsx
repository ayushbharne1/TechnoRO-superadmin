import React, { useState } from "react";
import Header2 from "../../../components/superAdmin/header/Header2";
import { useNavigate } from "react-router-dom";

const AddAmc = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    planName: "",
    planPrice: "",
    duration: "",
    discount: "",
    description: "",
    features: [""],
    planImages: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle feature input change
  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData({
      ...formData,
      features: updatedFeatures,
    });
  };

  // Add new feature field
  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ""],
    });
  };

  // Remove feature field
  const removeFeature = (index) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      features: updatedFeatures.length > 0 ? updatedFeatures : [""],
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Create previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
    
    // Update form data
    setFormData({
      ...formData,
      planImages: [...formData.planImages, ...files],
    });
  };

  // Remove image
  const removeImage = (index) => {
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    const updatedImages = formData.planImages.filter((_, i) => i !== index);
    
    setImagePreviews(updatedPreviews);
    setFormData({
      ...formData,
      planImages: updatedImages,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add your API call or form submission logic here
    toast.warn("AMC Plan added successfully!");
  };

  // Handle cancel
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="bg-white p-4 h-full overflow-y-auto flex flex-col gap-6">
      <Header2 />

      <div className="bg-white">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 font-poppins">
          Add AMC Plan
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Plan Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm md:text-base font-medium text-gray-700 font-poppins">
              Plan Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="planName"
              value={formData.planName}
              onChange={handleInputChange}
              placeholder="Enter plan name"
              required
              className="p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] bg-gray-50"
            />
          </div>

          {/* Plan Price and Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm md:text-base font-medium text-gray-700 font-poppins">
                Plan Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="planPrice"
                value={formData.planPrice}
                onChange={handleInputChange}
                placeholder="Enter price"
                required
                min="0"
                className="p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] bg-gray-50"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm md:text-base font-medium text-gray-700 font-poppins">
                Duration <span className="text-red-500">*</span>
              </label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                required
                className="p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] bg-gray-50"
              >
                <option value="">Select duration</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="12 Months">12 Months</option>
                <option value="24 Months">24 Months</option>
              </select>
            </div>
          </div>

          {/* Discount */}
          <div className="flex flex-col gap-2">
            <label className="text-sm md:text-base font-medium text-gray-700 font-poppins">
              Discount (%)
            </label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              placeholder="Enter discount percentage"
              min="0"
              max="100"
              className="p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] bg-gray-50"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm md:text-base font-medium text-gray-700 font-poppins">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter plan description"
              required
              rows="4"
              className="p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] bg-gray-50 resize-none"
            />
          </div>

          {/* Features */}
          <div className="flex flex-col gap-2">
            <label className="text-sm md:text-base font-medium text-gray-700 font-poppins">
              Features <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                    required
                    className="flex-1 p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] bg-gray-50"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="px-3 py-2 md:px-4 md:py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-[#7EC1B1] text-white rounded-lg hover:bg-[#6db09f] transition-colors text-sm md:text-base"
              >
                + Add Feature
              </button>
            </div>
          </div>

          {/* Plan Images */}
          <div className="flex flex-col gap-2">
            <label className="text-sm md:text-base font-medium text-gray-700 font-poppins">
              Plan Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#7EC1B1] file:text-white file:cursor-pointer hover:file:bg-[#6db09f]"
            />
            
            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-[#7EC1B1] text-white rounded-lg font-poppins text-base hover:bg-[#6db09f] transition-colors"
            >
              Add AMC Plan
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full md:w-auto px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-poppins text-base hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAmc;