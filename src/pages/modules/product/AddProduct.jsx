import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { createProduct, clearSuccessMessage, clearProductError } from "../../../redux/slices/productSlice"; 
import Header2 from "../../../components/superAdmin/header/Header2";
import { Trash2, Upload, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, successMessage } = useSelector((state) => state.products);

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

  useEffect(() => {
    if (successMessage) {
        toast.success(successMessage);
        dispatch(clearSuccessMessage());
        navigate("/product");
    }
    if (error) {
        toast.error(error);
        dispatch(clearProductError());
    }
  }, [successMessage, error, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (images.length === 0) return toast.error("Please upload at least one product image.");
    if (!formData.category) return toast.error("Category is required");
    if (!formData.name) return toast.error("Product Name is required");
    
    if (!formData.price || Number(formData.price) < 0) return toast.error("Price must be a positive number");
    if (!formData.stock || Number(formData.stock) < 0) return toast.error("Stock must be a positive number");
    if (formData.warrantyPeriod && Number(formData.warrantyPeriod) < 0) return toast.error("Warranty period cannot be negative");
    if (formData.discountPercent && (Number(formData.discountPercent) < 0 || Number(formData.discountPercent) > 100)) return toast.error("Discount must be between 0 and 100");

    if (!formData.color) return toast.error("Color is required");
    if (!formData.material) return toast.error("Material is required");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("price", Number(formData.price)); 
    data.append("stock", Number(formData.stock)); 
    data.append("color", formData.color);
    data.append("material", formData.material);
    
    if (formData.warrantyPeriod) data.append("warrantyPeriod", Number(formData.warrantyPeriod));
    if (formData.discountPercent) data.append("discountPercent", Number(formData.discountPercent));
    if (formData.description) data.append("description", formData.description);
    if (formData.brand) data.append("brand", formData.brand);

    images.forEach((image) => {
      data.append("images", image);
    });

    dispatch(createProduct(data));
  };

  return (
    <div className="bg-white min-h-screen p-6 font-poppins">
      
      {/* Header - Matches Screenshot Style */}
      <Header2 title="Add Product" />
      
      <div className="max-w-full mx-auto mt-6">
        
        <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: Category & Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-base font-semibold text-gray-800 mb-2">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100"
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
                    <label className="block text-base font-semibold text-gray-800 mb-2">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter Product Name"
                        className="w-full border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100"
                    />
                </div>
            </div>

            {/* Row 2: Price & Warranty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-base font-semibold text-gray-800 mb-2">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="₹ Enter Price"
                        min="0"
                        className="w-full border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block text-base font-semibold text-gray-800 mb-2">Warranty</label>
                    <input
                        type="number"
                        name="warrantyPeriod"
                        value={formData.warrantyPeriod}
                        onChange={handleChange}
                        placeholder="Enter Warranty"
                        min="0"
                        className="w-full border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100"
                    />
                </div>
            </div>

            {/* Row 3: Discount & Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-base font-semibold text-gray-800 mb-2">Discount (%)</label>
                    <input
                        type="number"
                        name="discountPercent"
                        value={formData.discountPercent}
                        onChange={handleChange}
                        placeholder="Enter Discount"
                        min="0"
                        max="100"
                        className="w-full border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block text-base font-semibold text-gray-800 mb-2">Stock Quantity</label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        placeholder="Enter Stock"
                        min="0"
                        className="w-full border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100"
                    />
                </div>
            </div>

            {/* Row 4: Color & Material */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-base font-semibold text-gray-800 mb-2">Color</label>
                    <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        placeholder="Enter Color"
                        className="w-full border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block text-base font-semibold text-gray-800 mb-2">Material</label>
                    <input
                        type="text"
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
                        placeholder="Enter Material"
                        className="w-full border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100"
                    />
                </div>
            </div>

            {/* Brand */}
            <div>
                <label className="block text-base font-semibold text-gray-800 mb-2">Brand</label>
                <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="Enter Brand Name"
                    className="w-full border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100"
                />
            </div>

            {/* Description */}
            <div>
                <label className="block text-base font-semibold text-gray-800 mb-2">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter Description"
                    rows="5"
                    className="w-full border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100"
                ></textarea>
            </div>

            {/* Image Upload */}
            <div>
                <label className="block text-base font-semibold text-gray-800 mb-2 ">Product Image</label>
                
                <div className="border border-black p-6 flex flex-col items-center justify-center bg-gray-100 cursor-pointer relative mb-6 ">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer "
                    />
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 ">Click to upload images</p>
                </div>

                {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {imagePreviews.map((src, index) => (
                            <div key={index} className="relative h-48 rounded-lg overflow-hidden border border-gray-200 group">
                                <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:bg-red-50 text-[#EA5455] transition"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#66BFA8] hover:bg-[#56a892] text-white px-10 py-3 rounded font-medium shadow-sm flex items-center gap-2 disabled:opacity-70 transition"
                >
                    {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                    {loading ? "Creating..." : "Save Product"}
                </button>
            </div>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;