import React, { useEffect } from "react";
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
        // Refresh data to show new status
        if(productid) dispatch(fetchProductDetails(productid));
    }
    if (error) {
        toast.error(error);
        dispatch(clearProductError());
    }
  }, [successMessage, error, dispatch, productid]);

  const handleAction = (actionName) => {
    if (!product?._id) return toast.error("Invalid Product ID");
    dispatch(updateProductStatus({ id: product._id, action: actionName }));
  };

  // UI States
  if (loading && !product) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin w-10 h-10 text-[#7EC1B1]"/></div>;
  if (!product) return <div className="p-8 text-center">Product Not Found <button onClick={() => navigate(-1)} className="text-blue-500 ml-2">Go Back</button></div>;

  const mainImage = (product.images && product.images.length > 0) ? product.images[0] : sampleImage;
  const status = product.status?.toLowerCase() || 'pending';

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      <Header2 />
      <div className="max-w-6xl mx-auto mt-6">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-black mb-4">
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </button>

        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 flex flex-col md:flex-row gap-8">
          
          {/* IMAGE */}
          <div className="w-full md:w-1/3 relative flex justify-center">
             {product.discountPercent > 0 && (
                <div className="absolute top-2 left-2 bg-[#008ECC] text-white px-3 py-1 rounded text-sm font-bold shadow-md z-10">
                    {product.discountPercent}% OFF
                </div>
             )}
             <div className="w-full h-[400px] border border-gray-100 rounded-lg overflow-hidden flex items-center justify-center bg-white">
                <img 
                    src={mainImage} 
                    alt={product.name} 
                    className="w-full h-full object-contain"
                    onError={(e) => e.target.src = sampleImage} 
                />
             </div>
          </div>

          {/* DETAILS */}
          <div className="flex-1">
             <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    status === 'approved' ? 'bg-green-100 text-green-700' : 
                    status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                    {status}
                </span>
             </div>
             <p className="text-gray-500 text-sm mb-4">{product.category} | {product.brand}</p>

             <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-[#7EC1B1]">₹{product.discountedPrice || product.price}</span>
                {product.discountedPrice < product.price && (
                    <span className="text-gray-400 line-through text-lg">₹{product.price}</span>
                )}
                <div className="bg-gray-100 px-3 py-1 rounded text-sm font-medium text-gray-600">
                    Warranty: <span className="text-[#34C759]">{product.warrantyPeriod} Years</span>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500">Added By</p>
                    <p className="font-semibold text-gray-900">{product.addedBy?.name || 'Unknown'}</p>
                    <p className="text-xs text-gray-400">{product.addedByModel}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500">Stock</p>
                    <p className={`font-semibold ${product.stockStatus === 'In Stock' ? 'text-green-600' : 'text-red-500'}`}>
                        {product.stockStatus || (product.stock > 0 ? 'In Stock' : 'Out of Stock')}
                    </p>
                    <p className="text-xs text-gray-400">{product.stock} units</p>
                </div>
             </div>

             <div className="mb-6">
                <h3 className="font-semibold border-b pb-2 mb-2 text-gray-800">Description</h3>
                <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">
                    {product.description || "No description available."}
                </p>
             </div>

             {product.offers && product.offers.length > 0 && (
                <div className="mb-8">
                    <h3 className="font-semibold border-b pb-2 mb-2 text-gray-800">Offers</h3>
                    <ul className="list-disc ml-5 text-gray-600 text-sm">
                        {product.offers.map((offer, idx) => <li key={idx}>{offer}</li>)}
                    </ul>
                </div>
             )}

             {/* BUTTONS */}
             {status === 'pending' && (
                 <div className="flex gap-4 pt-4 border-t">
                    <button 
                        onClick={() => handleAction('reject')} 
                        disabled={loading}
                        className="flex-1 bg-[#C17E7F] hover:bg-[#a36263] text-white py-3 rounded-lg font-bold transition shadow-sm disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Reject'}
                    </button>
                    <button 
                        onClick={() => handleAction('accept')} 
                        disabled={loading}
                        className="flex-1 bg-[#3A953A] hover:bg-[#2e7d2e] text-white py-3 rounded-lg font-bold transition shadow-sm disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Approve'}
                    </button>
                 </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;