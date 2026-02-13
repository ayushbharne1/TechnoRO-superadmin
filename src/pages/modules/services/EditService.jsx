import React, { useState, useEffect } from "react";
import Header2 from "../../../components/superAdmin/header/Header2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServiceById,
  updateService,
} from "../../../redux/slices/serviceSlice";
import { fetchAllCategories } from "../../../redux/slices/CategorySlice";
import DeleteIcon from "../../../assets/delete.svg";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";
import NoData from "../../../components/loader/NoData";
import ButtonLoader from "../../../components/loader/ButtonLoader";

const EditService = () => {
  /* ===================== LOCAL STATE ===================== */
  const [category, setCategory] = useState("");
  const [service, setService] = useState("");
  const [price, setPrice] = useState("");
  const [warrenty, setWarrenty] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([""]);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  /* ===================== ROUTER ===================== */
  const { id: paramId } = useParams();
  const location = useLocation();
  const data = location.state;

  /* ===================== REDUX ===================== */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { current, loading } = useSelector((state) => state.service);

  /* ===================== FETCH ALL CATEGORIES ===================== */
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const { categories = [] } = useSelector((state) => state.category);

  /* ===================== FETCH SERVICE BY ID ===================== */
  useEffect(() => {
    const serviceId = paramId || data?._id;

    if (serviceId) {
      dispatch(fetchServiceById(serviceId));
    }
  }, [dispatch, paramId, data?._id]);

  /* ===================== PREFILL FORM ===================== */
  useEffect(() => {
    const source = current || data;
    if (!source) return;

    setCategory(source.category || source.categoryId || "");
    setService(source.name || source.serviceAMC || "");
    setPrice(source.price?.toString().replace(/[^0-9]/g, "") || "");
    setWarrenty(source.warranty || source.warrenty || "");
    setDiscount(source.discount?.toString() || "");
    setDescription(source.description || "");

    // Handle features - convert to array format
    if (Array.isArray(source.features) && source.features.length > 0) {
      setFeatures(source.features);
    } else if (source.features && typeof source.features === "string") {
      setFeatures([source.features]);
    } else {
      setFeatures([""]);
    }

    // Handle existing images
    if (Array.isArray(source.images)) {
      setExistingImages(source.images);
    }
  }, [current, data]);

  /* ================= FEATURE HANDLERS ================= */
  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };

  const handleRemoveFeature = (index) => {
    if (features.length > 1) {
      const updatedFeatures = features.filter((_, i) => i !== index);
      setFeatures(updatedFeatures);
    }
  };

  /* ===================== UPDATE SERVICE (PUT API) ===================== */
  const handleUpdate = async () => {
    // Validation
    if (!category) {
      toast.error("Please select a category");
      return;
    }
    if (!service.trim() || service.trim().length < 3) {
      toast.error("Service name must be at least 3 characters");
      return;
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    try {
      const id = paramId || current?._id || data?._id;
      if (!id) {
        toast.error("Service ID not found");
        return;
      }

      // Prepare FormData
      const formData = new FormData();
      formData.append("category", category);
      formData.append("name", service.trim());
      formData.append("price", price.toString());
      formData.append("discount", discount || "0");
      formData.append("description", description.trim());

      // Handle features - only add non-empty features
      const validFeatures = features.filter((f) => f.trim() !== "");
      validFeatures.forEach((feature) => {
        formData.append("features[]", feature.trim());
      });

      // Add new images
      images.forEach((img) => {
        formData.append("images", img);
      });

      // Keep track of existing images to retain
      existingImages.forEach((imgUrl) => {
        formData.append("existingImages[]", imgUrl);
      });

      await dispatch(
        updateService({
          id,
          data: formData,
        })
      ).unwrap();

      toast.success("Service updated successfully!");
      navigate("/services");
    } catch (error) {
      console.error("UPDATE ERROR:", error);
      const errorMessage =
        error?.message ||
        error?.errors?.[0]?.message ||
        "Failed to update service";
      toast.error(errorMessage);
    }
  };

  /* ===================== IMAGE HANDLERS ===================== */
  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const totalImages = images.length + existingImages.length;

    if (totalImages + selectedFiles.length > 3) {
      toast.warn("You can upload a maximum of 3 images.");
      return;
    }
    setImages([...images, ...selectedFiles]);
  };

  const handleDeleteNewImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  const handleDeleteExistingImage = (index) => {
    const updated = [...existingImages];
    updated.splice(index, 1);
    setExistingImages(updated);
  };

  // Loading state - Show full page loader while fetching data
  if (loading && !current && !data) {
    return (
      <div className="bg-[#F5F8F9] min-h-screen flex flex-col">
        <Header2 />
        <Loader
          size="large"
          message="Loading service details..."
          submessage="Please wait while we fetch the data"
          fullScreen={false}
        />
      </div>
    );
  }

  // No data state
  if (!loading && !current && !data) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Header2 />
        <NoData
          icon="notfound"
          title="Service Not Found"
          message="The service you're looking for doesn't exist or has been removed."
          onAction={() => navigate("/services")}
          actionText="Back to Services"
          fullScreen={true}
        />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col p-4">
      {/* Header */}
      <Header2 />

      {/* Form Container */}
      <div className="bg-white flex flex-col gap-8">
        

        {/* Category & Service Row */}
        <div className="grid md:grid-cols-2 gap-6 w-full mt-6">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700 text-[15px]">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 border border-gray-300 rounded bg-[#F9F9F9] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700 text-[15px]">
              Service <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Service/AMC Plan Name"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="p-3 border border-gray-300 rounded bg-[#F9F9F9] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
            />
          </div>
        </div>

        {/* Price & Warranty */}
        <div className="grid md:grid-cols-2 gap-6 w-full">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700 text-[15px]">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="₹ Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-3 border border-gray-300 rounded bg-[#F9F9F9] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700 text-[15px]">
              Warranty
            </label>
            <input
              type="text"
              placeholder="Enter Warranty/Validity"
              value={warrenty}
              onChange={(e) => setWarrenty(e.target.value)}
              className="p-3 border border-gray-300 rounded bg-[#F9F9F9] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
            />
          </div>
        </div>

        {/* Discount */}
        <div className="flex flex-col gap-2 md:w-1/2">
          <label className="font-medium text-gray-700 text-[15px]">
            Discount (%)
          </label>
          <input
            type="number"
            placeholder="Enter Discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="p-3 border border-gray-300 rounded bg-[#F9F9F9] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
          />
        </div>

        {/* Features - Multiple Inputs */}
        <div className="flex flex-col gap-2 w-full">
          <label className="font-medium text-gray-700 text-[15px]">
            Features
          </label>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder={`Feature ${index + 1}`}
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded bg-[#F9F9F9] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
                />
                {features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddFeature}
              className="text-[#7EC1B1] hover:text-[#68b1a0] font-medium text-sm flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Another Feature
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2 w-full">
          <label className="font-medium text-gray-700 text-[15px]">
            Description
          </label>
          <textarea
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 h-28 border border-gray-300 rounded bg-[#F9F9F9] resize-none focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
          ></textarea>
        </div>

        {/* Product Image Section */}
        <div className="flex flex-col gap-3 w-full">
          <label className="font-medium font-poppins text-gray-700 text-[15px]">
            Service Image
          </label>

          {/* Existing Images */}
          <div className="flex flex-wrap gap-4">
            {existingImages.map((imgUrl, index) => (
              <div
                key={`existing-${index}`}
                className="relative w-80 h-36 rounded-md overflow-hidden border border-gray-300 bg-[#F9F9F9] flex items-center justify-center"
              >
                <img
                  src={imgUrl}
                  alt="Existing"
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => handleDeleteExistingImage(index)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100"
                >
                  <img src={DeleteIcon} alt="Delete" className="w-4 h-4" />
                </button>
              </div>
            ))}

            {/* New Images */}
            {images.map((img, index) => (
              <div
                key={`new-${index}`}
                className="relative w-80 h-36 rounded-md overflow-hidden border border-gray-300 bg-[#F9F9F9] flex items-center justify-center"
              >
                <img
                  src={URL.createObjectURL(img)}
                  alt="New Upload"
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => handleDeleteNewImage(index)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100"
                >
                  <img src={DeleteIcon} alt="Delete" className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Upload Box */}
          {images.length + existingImages.length < 3 && (
            <div className="border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center p-6 cursor-pointer hover:border-[#7EC1B1] transition">
              <label
                htmlFor="upload"
                className="flex flex-col items-center cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 8l-4-4m4 4l4-4"
                  />
                </svg>
                <p className="text-gray-600 text-sm font-medium">Upload photo</p>
                <p className="text-gray-400 text-xs">
                  Upload clear photo of Product
                </p>
              </label>
              <input
                id="upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          )}

          {/* Add More Text */}
          <p className="text-center text-[#7EC1B1] text-sm mt-1">
            + Add More Image (Max 3)
          </p>
        </div>
      </div>

      <div className="flex justify-center w-full mb-8 gap-4">
        <button
          onClick={() => navigate("/services")}
          disabled={loading}
          className="bg-gray-200 text-gray-700 font-semibold px-8 py-2 rounded-md hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="bg-[#7EC1B1] text-white font-semibold px-8 py-2 rounded-md hover:bg-[#68b1a0] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading && <ButtonLoader size="medium" color="white" />}
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditService;