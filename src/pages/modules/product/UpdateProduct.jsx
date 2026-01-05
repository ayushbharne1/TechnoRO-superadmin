import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, updateProduct, clearSelectedProduct, clearSuccessMessage, clearProductError } from "../../../redux/slices/productSlice";
import Header2 from "../../../components/superAdmin/header/Header2";
import { Trash2, Upload, Loader2, Plus, X } from "lucide-react";
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
  const [offers, setOffers] = useState([""]);

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
        warrantyPeriod: selectedProduct.warrantyPeriod || 0,
        discountPercent: selectedProduct.discountPercent || "",
        description: selectedProduct.description || "",
        brand: selectedProduct.brand || "",
        stock: selectedProduct.stock || 0,
        color: selectedProduct.color || "",
        material: selectedProduct.material || "",
      });
      setExistingImages(selectedProduct.images || []);
      setOffers(selectedProduct.offers && selectedProduct.offers.length > 0 ? selectedProduct.offers : [""]);
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

  const handleOfferChange = (index, value) => {
    const newOffers = [...offers];
    newOffers[index] = value;
    setOffers(newOffers);
  };

  const addOffer = () => {
    setOffers([...offers, ""]);
  };

  const removeOffer = (index) => {
    if (offers.length > 1) {
      const newOffers = offers.filter((_, i) => i !== index);
      setOffers(newOffers);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.category) return toast.error("Category is required");
    if (!formData.name) return toast.error("Product Name is required");
    if (!formData.price || Number(formData.price) < 0) return toast.error("Price must be valid");
    
    // ✅ FIXED: Check if stock is empty string or undefined, and if it's a valid number >= 0
    if (formData.stock === "" || formData.stock === null || formData.stock === undefined) {
      return toast.error("Stock quantity is required");
    }
    if (Number(formData.stock) < 0) {
      return toast.error("Stock must be a positive number or zero");
    }
    
    if (!formData.color) return toast.error("Color is required");
    if (!formData.material) return toast.error("Material is required");
    
    // Dispatch Redux Action
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    newImages.forEach((image) => data.append("images", image));
    data.append("existingImages", JSON.stringify(existingImages));

    // Add offers as array (filter out empty ones)
    const validOffers = offers.filter(offer => offer.trim() !== "");
    if (validOffers.length > 0) {
      validOffers.forEach((offer) => {
        data.append("offers[]", offer);
      });
    }

    dispatch(updateProduct({ id: productid, productData: data }));
  };

  if (fetchLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin w-10 h-10 text-[#7EC1B1]" /></div>;

  return (
    <div className="bg-white min-h-screen p-6 font-poppins">
      
      {/* Header - Matches Screenshot Style */}
      <Header2 title="Edit Product" />
      
      <div className="max-w-full mx-auto mt-6">

        <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: Category & Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-base font-semibold text-gray-800 mb-2">
                        Category <span className="text-red-500">*</span>
                    </label>
                    <select 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange} 
                        required
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
                    <label className="block text-base font-semibold text-gray-800 mb-2">
                        Product Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Enter Product Name"
                        required
                        className="w-full border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100"
                    />
                </div>
            </div>

            {/* Row 2: Price & Warranty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-base font-semibold text-gray-800 mb-2">
                        Price <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="number" 
                        name="price" 
                        value={formData.price} 
                        onChange={handleChange} 
                        placeholder="₹ Enter Price"
                        min="0" 
                        required
                        className="w-full border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100" 
                    />
                </div>
                <div>
                    <label className="block text-base font-semibold text-gray-800 mb-2">Warranty (Years)</label>
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
                    <label className="block text-base font-semibold text-gray-800 mb-2">
                        Stock Quantity <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="number" 
                        name="stock" 
                        value={formData.stock} 
                        onChange={handleChange} 
                        placeholder="Enter Stock"
                        min="0" 
                        required
                        className="w-full border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100" 
                    />
                </div>
            </div>

            {/* Row 4: Color & Material */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-base font-semibold text-gray-800 mb-2">
                        Color <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="text" 
                        name="color" 
                        value={formData.color} 
                        onChange={handleChange} 
                        placeholder="Enter Color"
                        required
                        className="w-full border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100" 
                    />
                </div>
                <div>
                    <label className="block text-base font-semibold text-gray-800 mb-2">
                        Material <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="text" 
                        name="material" 
                        value={formData.material} 
                        onChange={handleChange} 
                        placeholder="Enter Material"
                        required
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

            {/* Offers Section */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="block text-base font-semibold text-gray-800">Offers</label>
                    <button
                        type="button"
                        onClick={addOffer}
                        className="flex items-center gap-2 text-[#66BFA8] hover:text-[#56a892] font-medium text-sm transition"
                    >
                        <Plus className="w-4 h-4" />
                        Add Offer
                    </button>
                </div>
                
                <div className="space-y-3">
                    {offers.map((offer, index) => (
                        <div key={index} className="flex gap-3 items-center">
                            <input
                                type="text"
                                value={offer}
                                onChange={(e) => handleOfferChange(index, e.target.value)}
                                placeholder={`Enter Offer ${index + 1}`}
                                className="flex-1 border border-black px-4 py-3 text-gray-600 focus:outline-none focus:border-[#7EC1B1] bg-gray-100"
                            />
                            {offers.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeOffer(index)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded transition"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Images Section - Matches Screenshot Style */}
            <div>
                <label className="block text-base font-semibold text-gray-800 mb-2">Product Image</label>
                
                {/* Upload Box */}
                <div className="border border-black p-6 flex flex-col items-center justify-center bg-gray-100 cursor-pointer relative mb-6">
                    <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    />
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload images (Max 5 total)</p>
                </div>

                {/* Image Previews */}
                {(existingImages.length > 0 || newPreviews.length > 0) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {/* Existing Images */}
                        {existingImages.map((src, index) => (
                            <div key={`exist-${index}`} className="relative h-48 rounded-lg overflow-hidden border border-gray-200 group">
                                <img src={src} alt="Existing" className="w-full h-full object-cover" />
                                <button 
                                    type="button" 
                                    onClick={() => removeExistingImage(index)} 
                                    className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:bg-red-50 text-[#EA5455] transition"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        {/* New Images */}
                        {newPreviews.map((src, index) => (
                            <div key={`new-${index}`} className="relative h-48 rounded-lg overflow-hidden border border-gray-200 group">
                                <img src={src} alt="New" className="w-full h-full object-cover" />
                                <button 
                                    type="button" 
                                    onClick={() => removeNewImage(index)} 
                                    className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:bg-red-50 text-[#EA5455] transition"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Update Button */}
            <div className="flex justify-center pt-4">
                <button 
                    type="submit" 
                    disabled={submitting} 
                    className="bg-[#66BFA8] hover:bg-[#56a892] text-white px-10 py-3 rounded font-medium shadow-sm flex items-center gap-2 disabled:opacity-70 transition"
                >
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