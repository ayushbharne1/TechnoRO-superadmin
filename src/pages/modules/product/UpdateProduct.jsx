import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, updateProduct, clearSelectedProduct, clearSuccessMessage, clearProductError } from "../../../redux/slices/productSlice";
import Header2 from "../../../components/superAdmin/header/Header2";
import { Trash2, Upload, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const { productid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedProduct, loading: fetchLoading, successMessage, error } = useSelector((state) => state.products);
  const [submitting, setSubmitting] = useState(false);

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

  // Handle Redux Success
  useEffect(() => {
    if (successMessage === "Product updated successfully!") {
        toast.success(successMessage);
        dispatch(clearSuccessMessage());
        navigate("/product");
    }
    if (error) {
        toast.error(error);
        dispatch(clearProductError());
    }
  }, [successMessage, error, dispatch, navigate]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.category) return toast.error("Category is required");
    if (!formData.name) return toast.error("Product Name is required");
    if (!formData.price || Number(formData.price) < 0) return toast.error("Price must be valid");
    
    // Dispatch Redux Action
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    newImages.forEach((image) => data.append("images", image));
    data.append("existingImages", JSON.stringify(existingImages));

    dispatch(updateProduct({ id: productid, productData: data }));
  };

  if (fetchLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin w-10 h-10 text-[#7EC1B1]" /></div>;

  return (
    <div className="bg-white min-h-screen p-6 font-poppins">
      
      {/* Header - Matches Screenshot Style */}
      <Header2 title="Edit Product" />
      
      <div className="max-w-full mx-auto mt-6">

        <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-base font-semibold text-gray-800 mb-2">Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100">
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
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100"  />
                </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-base font-semibold text-gray-800 mb-2">Price</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} min="0" className="w-full border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100" />
                </div>
                <div>
                    <label className="block text-base font-semibold text-gray-800 mb-2">Warranty</label>
                    <input type="number" name="warrantyPeriod" value={formData.warrantyPeriod} onChange={handleChange} min="0" className="w-full border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100" />
                </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-base font-semibold text-gray-800 mb-2">Discount (%)</label>
                    <input type="number" name="discountPercent" value={formData.discountPercent} onChange={handleChange} min="0" max="100" className="w-full border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100" />
                </div>
                <div>
                    <label className="block text-base font-semibold text-gray-800 mb-2">Stock</label>
                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} min="0" className="w-full border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100" />
                </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-base font-semibold text-gray-800 mb-2">Color</label>
                    <input type="text" name="color" value={formData.color} onChange={handleChange} className="w-full border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100" />
                </div>
                <div>
                    <label className="block text-base font-semibold text-gray-800 mb-2">Material</label>
                    <input type="text" name="material" value={formData.material} onChange={handleChange} className="w-full border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100" />
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-base font-semibold text-gray-800 mb-2">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="5" className="w-full border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100"></textarea>
            </div>

            {/* Images Section - Matches Screenshot Style */}
            <div>
                <label className="block text-base font-semibold text-gray-800 mb-2">Product Image</label>
                
                {/* Upload Box */}
                <div className="border border-black p-4 flex flex-col items-center justify-center bg-gray-100 cursor-pointer relative mb-6">
                    <input type="file" multiple accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <Upload className="w-6 h-6 text-gray-400 mb-1 "  />
                    <span className="text-sm text-gray-500">Upload New Images</span>
                </div>

                {/* Image Previews */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Existing Images */}
                    {existingImages.map((src, index) => (
                        <div key={`exist-${index}`} className="relative h-48 rounded-lg overflow-hidden border border-gray-200 group">
                            <img src={src} alt="Old" className="w-full h-full object-cover" />
                            <button type="button" onClick={() => removeExistingImage(index)} className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:bg-red-50 text-[#EA5455] transition">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    {/* New Images */}
                    {newPreviews.map((src, index) => (
                        <div key={`new-${index}`} className="relative h-48 rounded-lg overflow-hidden border border-gray-200 group">
                            <img src={src} alt="New" className="w-full h-full object-cover" />
                            <button type="button" onClick={() => removeNewImage(index)} className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:bg-red-50 text-[#EA5455] transition">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Update Button */}
            <div className="flex justify-center pt-4">
                <button type="submit" disabled={submitting} className="bg-[#66BFA8] hover:bg-[#56a892] text-white px-10 py-3 rounded font-medium shadow-sm flex items-center gap-2 disabled:opacity-70 transition">
                    {submitting && <Loader2 className="w-5 h-5 animate-spin" />}
                    {submitting ? "Updating..." : "Update Product"}
                </button>
            </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;