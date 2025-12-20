import { useState } from "react";

export default function Banner() {
  const [bannerCategory, setBannerCategory] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerStatus, setBannerStatus] = useState("Publish");

  const handleImageUpload = (event) => {
    setBannerImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      bannerCategory,
      bannerImage,
      bannerStatus,
    });
  };

  return (
    <div
      className="absolute bg-white shadow-md rounded-lg"
      style={{
        width: "1092px",
        height: "905px",
        top: "96px",
        left: "324px",
        padding: "24px",
        gap: "24px",
      }}
    >
      <h3 className="text-xl font-semibold mb-4">Banner Category</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Banner Category */}
        <div>
          {/* <label className="block text-sm font-medium mb-2">
            Banner Category
          </label> */}
          <select
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
            value={bannerCategory}
            onChange={(e) => setBannerCategory(e.target.value)}
          >
            <option value="">Select</option>
            <option value="promotion">Promotion</option>
            <option value="advertisement">Advertisement</option>
          </select>
        </div>

        {/* Banner Image */}
        <div>
        <h3 className="text-xl font-semibold mb-4">Banner Category</h3>
          <div className="relative w-full border border-gray-300 rounded-md p-2 flex items-center">
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleImageUpload}
            />
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
            >
              Choose File
            </button>
            <span className="ml-2 text-gray-500 text-sm">
              {bannerImage ? bannerImage.name : "No File Uploaded"}
            </span>
          </div>
        </div>

        {/* Banner Status */}
        <div>
        <h3 className="text-xl font-semibold mb-4">Banner Category</h3>
          <select
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
            value={bannerStatus}
            onChange={(e) => setBannerStatus(e.target.value)}
          >
            <option value="Publish">Publish</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-50 p-3 bg-cyan-400 text-white rounded-md"
        >
          Add Banner
        </button>
      </form>
    </div>
  );
}
