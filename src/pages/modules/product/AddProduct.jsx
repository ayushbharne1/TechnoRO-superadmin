import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // ✅ Using Redux hooks
// ✅ Import the Thunk and Clear Actions
import { createProduct, clearSuccessMessage, clearProductError } from "../../../redux/slices/productSlice"; 
import Header2 from "../../../components/superAdmin/header/Header2";
import { Trash2, Upload, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Read Loading & Success/Error State from Redux
  const { loading, error, successMessage } = useSelector((state) => state.products);

  // Form State (Local state is fine for form inputs)
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    price: "",
    warrantyPeriod: "",
    discountPercent: "",
    description: "",
    brand: "", 
    stock: "",
    color: "",
    material: "",
  });

  const [images, setImages] = useState([]); 
  const [imagePreviews, setImagePreviews] = useState([]);

  // ... (handleChange, handleImageChange, removeImage functions stay the same) ...
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      return toast.error("You can only upload up to 5 images");
    }
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...files]);
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  // ✅ Handle Redux Side Effects (Success/Error)
  useEffect(() => {
    if (successMessage) {
        toast.success(successMessage);
        dispatch(clearSuccessMessage()); // Reset message
        navigate("/product"); // Navigate away
    }
    if (error) {
        toast.error(error);
        dispatch(clearProductError()); // Reset error
    }
  }, [successMessage, error, dispatch, navigate]);

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Client-Side Validation
    if (images.length === 0) return toast.error("Please upload at least one product image.");
    if (!formData.category) return toast.error("Category is required");
    if (!formData.name) return toast.error("Product Name is required");
    
    if (!formData.price || Number(formData.price) < 0) return toast.error("Price must be a positive number");
    if (!formData.stock || Number(formData.stock) < 0) return toast.error("Stock must be a positive number");
    if (formData.warrantyPeriod && Number(formData.warrantyPeriod) < 0) return toast.error("Warranty period cannot be negative");
    if (formData.discountPercent && (Number(formData.discountPercent) < 0 || Number(formData.discountPercent) > 100)) return toast.error("Discount must be between 0 and 100");

    if (!formData.color) return toast.error("Color is required");
    if (!formData.material) return toast.error("Material is required");

    // 2. Prepare Form Data
    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("price", Number(formData.price)); 
    data.append("stock", Number(formData.stock)); 
    data.append("color", formData.color);
    data.append("material", formData.material);
    
    // Optional fields
    if (formData.warrantyPeriod) data.append("warrantyPeriod", Number(formData.warrantyPeriod));
    if (formData.discountPercent) data.append("discountPercent", Number(formData.discountPercent));
    if (formData.description) data.append("description", formData.description);
    if (formData.brand) data.append("brand", formData.brand);

    images.forEach((image) => {
      data.append("images", image);
    });

    // ✅ 3. Dispatch Redux Action
    dispatch(createProduct(data));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      <Header2 />
      
      <div className="max-w-5xl mx-auto mt-6">
        <div className="flex items-center gap-2 mb-6">
            <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-black transition">
                <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Add Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 md:p-8 space-y-6">
            
            {/* ... (Rest of your form JSX stays EXACTLY the same) ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:border-[#7EC1B1] outline-none"
                    >
                        <option value="">Select Category</option>
                        <option value="Spare Parts">Spare Parts</option>
                        <option value="Water Purifier">Water Purifier</option>
                        <option value="Water Softener">Water Softener</option>
                        <option value="RO Plant">RO Plant</option>
                        <option value="Water Ionizer">Water Ionizer</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter Product Name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-[#7EC1B1] outline-none"
                    />
                </div>
            </div>

            {/* Row 2: Price & Warranty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹) *</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter Price"
                        min="0"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-[#7EC1B1] outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Warranty (Years)</label>
                    <input
                        type="number"
                        name="warrantyPeriod"
                        value={formData.warrantyPeriod}
                        onChange={handleChange}
                        placeholder="Enter Warranty Period"
                        min="0"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-[#7EC1B1] outline-none"
                    />
                </div>
            </div>

            {/* Row 3: Discount & Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Discount (%)</label>
                    <input
                        type="number"
                        name="discountPercent"
                        value={formData.discountPercent}
                        onChange={handleChange}
                        placeholder="Enter Discount"
                        min="0"
                        max="100"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-[#7EC1B1] outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity *</label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        placeholder="Enter Stock"
                        min="0"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-[#7EC1B1] outline-none"
                    />
                </div>
            </div>

            {/* Row 4: Color & Material */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Color *</label>
                    <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        placeholder="e.g. White, Black, Blue"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-[#7EC1B1] outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Material *</label>
                    <input
                        type="text"
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
                        placeholder="e.g. Plastic, Steel, Fiber"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-[#7EC1B1] outline-none"
                    />
                </div>
            </div>

            {/* Brand */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
                <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="Enter Brand Name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-[#7EC1B1] outline-none"
                />
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter Description"
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-[#7EC1B1] outline-none"
                ></textarea>
            </div>

            {/* Image Upload */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Images *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer relative">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload images (Max 5)</p>
                </div>

                {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {imagePreviews.map((src, index) => (
                            <div key={index} className="relative h-24 rounded-lg overflow-hidden border border-gray-200 group">
                                <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 bg-white p-1 rounded-full shadow hover:bg-red-50 text-red-500"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={loading} // Controlled by Redux
                    className="bg-[#7EC1B1] hover:bg-[#6db0a0] text-white px-8 py-3 rounded-lg font-semibold shadow-md flex items-center gap-2 disabled:opacity-70"
                >
                    {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                    {loading ? "Creating..." : "Create Product"}
                </button>
            </div>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;