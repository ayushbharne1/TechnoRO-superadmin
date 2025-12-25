import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// ✅ Import updateProduct
import { fetchProductDetails, updateProduct, clearSelectedProduct, clearSuccessMessage, clearProductError } from "../../../redux/slices/productSlice";
import Header2 from "../../../components/superAdmin/header/Header2";
import { Trash2, Upload, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const { productid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Get state from Redux
  const { selectedProduct, loading, error, successMessage } = useSelector((state) => state.products);

  // Form State
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

  const [existingImages, setExistingImages] = useState([]); 
  const [newImages, setNewImages] = useState([]); 
  const [newPreviews, setNewPreviews] = useState([]); 

  // 1. Fetch Data
  useEffect(() => {
    if (productid) {
      dispatch(fetchProductDetails(productid));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, productid]);

  // 2. Populate Form
  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        category: selectedProduct.category || "",
        name: selectedProduct.name || "",
        price: selectedProduct.price || "",
        warrantyPeriod: selectedProduct.warrantyPeriod || "",
        discountPercent: selectedProduct.discountPercent || "",
        description: selectedProduct.description || "",
        brand: selectedProduct.brand || "",
        stock: selectedProduct.stock || "",
        color: selectedProduct.color || "",
        material: selectedProduct.material || "",
      });
      setExistingImages(selectedProduct.images || []);
    }
  }, [selectedProduct]);

  // ✅ Handle Redux Side Effects (Success/Error)
  useEffect(() => {
    if (successMessage === "Product updated successfully!") { // Check specific message if needed
        toast.success(successMessage);
        dispatch(clearSuccessMessage());
        navigate("/product");
    }
    if (error) {
        toast.error(error);
        dispatch(clearProductError());
    }
  }, [successMessage, error, dispatch, navigate]);

  // ... (handleChange, handleImageChange, removeExistingImage, removeNewImage stay the same) ...
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = existingImages.length + newImages.length + files.length;
    if (totalImages > 5) return toast.error("You can only have up to 5 images total");

    const previews = files.map((file) => URL.createObjectURL(file));
    setNewImages([...newImages, ...files]);
    setNewPreviews([...newPreviews, ...previews]);
  };

  const removeExistingImage = (index) => setExistingImages(existingImages.filter((_, i) => i !== index));
  const removeNewImage = (index) => {
    setNewImages(newImages.filter((_, i) => i !== index));
    setNewPreviews(newPreviews.filter((_, i) => i !== index));
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.category) return toast.error("Category is required");
    if (!formData.name) return toast.error("Product Name is required");
    if (!formData.price || Number(formData.price) < 0) return toast.error("Price must be valid");
    if (!formData.stock || Number(formData.stock) < 0) return toast.error("Stock must be valid");
    if (!formData.color) return toast.error("Color is required");
    if (!formData.material) return toast.error("Material is required");

    // Prepare Data
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));

    newImages.forEach((image) => data.append("images", image));
    
    // Handle existing images
    data.append("existingImages", JSON.stringify(existingImages));

    // ✅ Dispatch Redux Action
    dispatch(updateProduct({ id: productid, productData: data }));
  };

  // Use loading state from Redux for the initial fetch or the update
  if (loading && !selectedProduct && !formData.name) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin w-10 h-10 text-[#7EC1B1]" /></div>;

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      <Header2 />
      <div className="max-w-5xl mx-auto mt-6">
        
        <div className="flex items-center gap-2 mb-6">
            <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-black">
                <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Edit Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 md:p-8 space-y-6">
            
            {/* ... (Your existing form fields go here, no changes needed to JSX) ... */}
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full border rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-[#7EC1B1]">
                        <option value="">Select Category</option>
                        <option value="Spare Parts">Spare Parts</option>
                        <option value="Water Purifier">Water Purifier</option>
                        <option value="Water Softener">Water Softener</option>
                        <option value="RO Plant">RO Plant</option>
                        <option value="Water Ionizer">Water Ionizer</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-[#7EC1B1]" />
                </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} min="0" className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-[#7EC1B1]" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Warranty (Years)</label>
                    <input type="number" name="warrantyPeriod" value={formData.warrantyPeriod} onChange={handleChange} min="0" className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-[#7EC1B1]" />
                </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Discount (%)</label>
                    <input type="number" name="discountPercent" value={formData.discountPercent} onChange={handleChange} min="0" max="100" className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-[#7EC1B1]" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Stock</label>
                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} min="0" className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-[#7EC1B1]" />
                </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
                    <input type="text" name="color" value={formData.color} onChange={handleChange} className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-[#7EC1B1]" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Material</label>
                    <input type="text" name="material" value={formData.material} onChange={handleChange} className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-[#7EC1B1]" />
                </div>
            </div>

            {/* Brand & Desc */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleChange} className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-[#7EC1B1]" />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-[#7EC1B1]"></textarea>
            </div>

            {/* Images */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center bg-gray-50 cursor-pointer relative mb-4">
                    <input type="file" multiple accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <Upload className="w-6 h-6 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-500">Upload New Images</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {existingImages.map((src, index) => (
                        <div key={`exist-${index}`} className="relative h-20 rounded border group">
                            <img src={src} alt="Old" className="w-full h-full object-cover" />
                            <button type="button" onClick={() => removeExistingImage(index)} className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full shadow"><Trash2 className="w-3 h-3"/></button>
                        </div>
                    ))}
                    {newPreviews.map((src, index) => (
                        <div key={`new-${index}`} className="relative h-20 rounded border group border-green-300">
                            <img src={src} alt="New" className="w-full h-full object-cover" />
                            <button type="button" onClick={() => removeNewImage(index)} className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full shadow"><Trash2 className="w-3 h-3"/></button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button type="submit" disabled={loading} className="bg-[#7EC1B1] text-white px-8 py-3 rounded-lg font-semibold shadow-md flex gap-2 hover:bg-[#6db0a0] transition">
                    {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                    {loading ? "Updating..." : "Update Product"}
                </button>
            </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;