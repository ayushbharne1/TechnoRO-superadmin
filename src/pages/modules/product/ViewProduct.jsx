import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchProductDetails, 
  updateProductStatus, 
  clearSelectedProduct, 
  clearSuccessMessage, 
  clearProductError 
} from "../../../redux/slices/productSlice"; 
import Header2 from "../../../components/superAdmin/header/Header2";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import sampleImage from "../../../assets/sample img.jpg"; 

const ViewProduct = () => {
  const { productid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { selectedProduct, loading, error, successMessage } = useSelector((state) => state.products);
  
  // Local state for active image in gallery
  const [activeImg, setActiveImg] = useState(null);

  // Use Passed State or Redux Data
  const product = selectedProduct || location.state;

  // Fetch if missing or ID changed
  useEffect(() => {
    if (productid) {
        dispatch(fetchProductDetails(productid));
    }
    return () => { dispatch(clearSelectedProduct()); };
  }, [dispatch, productid]);

  // Handle Toasts
  useEffect(() => {
    if (successMessage) {
        toast.success(successMessage);
        dispatch(clearSuccessMessage());
        if(productid) dispatch(fetchProductDetails(productid));
    }
    if (error) {
        toast.error(error);
        dispatch(clearProductError());
    }
  }, [successMessage, error, dispatch, productid]);

  // Set initial active image
  useEffect(() => {
    if (product?.images?.length > 0) {
        setActiveImg(product.images[0]);
    } else {
        setActiveImg(sampleImage);
    }
  }, [product]);

  const handleAction = (actionName) => {
    if (!product?._id) return toast.error("Invalid Product ID");
    dispatch(updateProductStatus({ id: product._id, action: actionName }));
  };

  // UI States
  if (loading && !product) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin w-10 h-10 text-[#7EC1B1]"/></div>;
  if (!product) return <div className="p-8 text-center">Product Not Found <button onClick={() => navigate(-1)} className="text-blue-500 ml-2">Go Back</button></div>;

  const status = product.status?.toLowerCase() || 'pending';

  return (
    <div className="bg-white min-h-screen p-6 font-poppins">
      <Header2 title="Product Details" />
      
      <div className="max-w-6xl mx-auto mt-6">
        
        {/* Main Card */}
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* LEFT: Image Gallery */}
          <div className="w-full lg:w-[40%]">
             <div className="relative border border-gray-200 rounded-xl overflow-hidden bg-gray-50 h-[400px] flex items-center justify-center mb-4">
                {product.discountPercent > 0 && (
                    <div className="absolute top-0 left-0 bg-[#00A3FF] text-white px-4 py-2 text-sm font-bold rounded-br-xl z-10">
                        {product.discountPercent}% <br/> OFF
                    </div>
                )}
                <img 
                    src={activeImg} 
                    alt={product.name} 
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => e.target.src = sampleImage} 
                />
             </div>
             
             {/* Thumbnails */}
             {product.images && product.images.length > 0 && (
                 <div className="flex gap-4 overflow-x-auto pb-2">
                    {product.images.map((img, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => setActiveImg(img)}
                            className={`w-24 h-24 border rounded-lg overflow-hidden cursor-pointer flex-shrink-0 flex items-center justify-center bg-gray-50 ${activeImg === img ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200'}`}
                        >
                            <img src={img} alt={`thumb-${idx}`} className="h-full w-full object-cover" />
                        </div>
                    ))}
                 </div>
             )}
          </div>

          {/* RIGHT: Details */}
          <div className="flex-1">
             <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-snug">{product.name}</h2>
             
             <div className="flex items-center gap-2 mb-4 text-lg">
                <span className="text-[#28C76F] font-bold">₹{product.discountedPrice || product.price}</span>
                <span className="text-gray-400">•</span>
                <span className="text-[#28C76F]">Warranty: {product.warrantyPeriod} Years</span>
             </div>

             <div className="text-gray-600 mb-6">
                <span className="font-semibold text-gray-800">Product Add by: </span> 
                {product.addedBy?.name || 'Unknown'}
             </div>

             <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <div className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
                    {product.description ? (
                        <ul className="list-disc pl-5 space-y-1">
                            {/* Attempt to split by newline for bullet points if description is plain text */}
                            {product.description.split('\n').map((line, i) => (
                                line.trim() && <li key={i}>{line}</li>
                            ))}
                        </ul>
                    ) : "No description available."}
                </div>
             </div>

             {/* Action Buttons - Matches Screenshot Bottom Center Style */}
             {status === 'pending' ? (
                 <div className="flex gap-4 justify-center mt-10">
                    <button 
                        onClick={() => handleAction('reject')} 
                        disabled={loading}
                        className="px-10 py-2.5 rounded-md font-medium text-white bg-[#C67E7E] hover:bg-[#b06a6a] transition shadow-sm min-w-[140px]"
                    >
                        {loading ? '...' : 'Reject'}
                    </button>
                    <button 
                        onClick={() => handleAction('accept')} 
                        disabled={loading}
                        className="px-10 py-2.5 rounded-md font-medium text-white bg-[#4CAF50] hover:bg-[#43a047] transition shadow-sm min-w-[140px]"
                    >
                        {loading ? '...' : 'Approve'}
                    </button>
                 </div>
             ) : (
                 <div className={`mt-8 inline-block px-4 py-2 rounded font-semibold text-white ${status === 'approved' ? 'bg-[#4CAF50]' : 'bg-[#C67E7E]'}`}>
                     Status: {status.charAt(0).toUpperCase() + status.slice(1)}
                 </div>
             )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;