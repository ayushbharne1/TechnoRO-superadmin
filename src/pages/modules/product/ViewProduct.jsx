import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  updateProductStatus,
  clearSelectedProduct,
  clearSuccessMessage,
  clearProductError,
} from "../../../redux/slices/productSlice";
import Header2 from "../../../components/superAdmin/header/Header2";
import { Loader2, ArrowLeft, Package, Star, BadgePercent } from "lucide-react";
import { toast } from "react-toastify";
import sampleImage from "../../../assets/sample img.jpg";

const ViewProduct = () => {
  const { productid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { selectedProduct, loading, error, successMessage } = useSelector(
    (state) => state.products
  );

  const [activeImg, setActiveImg] = useState(null);

  const product = selectedProduct || location.state;

  useEffect(() => {
    if (productid) {
      dispatch(fetchProductDetails(productid));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, productid]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearSuccessMessage());
      if (productid) dispatch(fetchProductDetails(productid));
    }
    if (error) {
      toast.error(error);
      dispatch(clearProductError());
    }
  }, [successMessage, error, dispatch, productid]);

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

  if (loading && !product)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-10 h-10 text-[#7EC1B1]" />
      </div>
    );
  if (!product)
    return (
      <div className="p-8 text-center">
        Product Not Found{" "}
        <button onClick={() => navigate(-1)} className="text-blue-500 ml-2">
          Go Back
        </button>
      </div>
    );

  const status = product.status?.toLowerCase() || "pending";

  return (
    <div className="bg-white min-h-screen p-6 font-poppins">
      <Header2 title="Product Details" />

      <div className="max-w-7xl mx-auto mt-6">
        {/* Main Card */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT: Image Gallery */}
          <div className="w-full lg:w-[40%]">
            <div className="relative border border-gray-200 rounded-xl overflow-hidden bg-gray-50 h-[400px] flex items-center justify-center mb-4">
              {product.discountPercent > 0 && (
                <div className="absolute top-0 left-0 bg-[#00A3FF] text-white px-4 py-2 text-sm font-bold rounded-br-xl z-10">
                  {product.discountPercent}% <br /> OFF
                </div>
              )}
              <img
                src={activeImg}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
                onError={(e) => (e.target.src = sampleImage)}
              />
            </div>

            {product.images && product.images.length > 0 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImg(img)}
                    className={`w-24 h-24 border rounded-lg overflow-hidden cursor-pointer flex-shrink-0 flex items-center justify-center bg-gray-50 ${
                      activeImg === img
                        ? "border-blue-500 ring-1 ring-blue-500"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`thumb-${idx}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Details */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-snug">
              {product.name}
            </h2>

            {/* Price and Warranty Row */}
            <div className="flex items-center gap-2 mb-4 text-lg flex-wrap">
              <span className="text-[#28C76F] font-bold text-xl">
                ₹{product.discountedPrice || product.price}
              </span>
              {product.discountedPrice &&
                product.price !== product.discountedPrice && (
                  <span className="text-gray-500 font-medium line-through">
                    ₹{product.price}
                  </span>
                )}
            </div>
            {/* Offers Section */}
            {product.offers && product.offers.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                  Available Offers
                </h3>
                <div className="space-y-2">
                  {product.offers.map((offer, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800"
                    >
                      <BadgePercent className="w-4 h-4 inline-block mr-2" />{" "}
                      {offer}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {product.warrantyPeriod > 0 && (
              <>
                
                <span className="text-gray-800 pb-3">
                  Warranty: {product.warrantyPeriod}{" "}
                  {product.warrantyPeriod === 1 ? "Year" : "Years"}
                </span>
              </>
            )}
            {/* Rating & Reviews */}
            {(product.rating > 0 || product.reviews > 0) && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-800">
                    {product.rating}
                  </span>
                </div>
                <span className="text-gray-500">
                  ({product.reviews} reviews)
                </span>
              </div>
            )}

            {/* Product Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <span className="text-gray-500 text-sm">Brand</span>
                <p className="font-semibold text-gray-900">
                  {product.brand || "N/A"}
                </p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Category</span>
                <p className="font-semibold text-gray-900">
                  {product.category || "N/A"}
                </p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Color</span>
                <p className="font-semibold text-gray-900">
                  {product.color || "Not Specified"}
                </p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Material</span>
                <p className="font-semibold text-gray-900">
                  {product.material || "Not Specified"}
                </p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Stock Status</span>
                <p
                  className={`font-semibold ${
                    product.stockStatus === "In Stock"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {product.stockStatus || "Unknown"}
                </p>
              </div>
              {/* <div>
                 <span className="text-gray-500 text-sm">Stock Quantity</span>
                 <p className="font-semibold text-gray-900">{product.stock}</p>
               </div> */}
              {product.isFeatured && (
                <div className="col-span-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    <Star className="w-4 h-4" /> Featured Product
                  </span>
                </div>
              )}
            </div>

            {/* Added By */}
            <div className="text-gray-600 mb-6 p-4 bg-blue-50 rounded-lg">
              <span className="font-semibold text-gray-800">
                Product Added by:{" "}
              </span>
              {product.addedBy?.name || "Unknown"}
              {product.addedBy?.email && (
                <span className="text-sm text-gray-500 ml-2">
                  ({product.addedBy.email})
                </span>
              )}
              <div className="text-sm text-gray-500 mt-1">
                Added on:{" "}
                {new Date(product.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              {product.updatedAt !== product.createdAt && (
                <div className="text-sm text-gray-500">
                  Last updated:{" "}
                  {new Date(product.updatedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                Description
              </h3>
              <div className="text-gray-600 text-sm leading-relaxed">
                {product.description ? (
                  <div className="space-y-2">
                    {product.description.split("\n").map((line, i) => {
                      const trimmedLine = line.trim();
                      if (!trimmedLine) return null;

                      // Check if line starts with bullet point indicators
                      if (
                        trimmedLine.startsWith("•") ||
                        trimmedLine.startsWith("-")
                      ) {
                        return (
                          <div key={i} className="flex gap-2">
                            <span className="text-gray-400 flex-shrink-0">
                              •
                            </span>
                            <span>{trimmedLine.replace(/^[•\-]\s*/, "")}</span>
                          </div>
                        );
                      }
                      return <p key={i}>{trimmedLine}</p>;
                    })}
                  </div>
                ) : (
                  <p className="text-gray-400 italic">
                    No description available.
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {status === "pending" ? (
              <div className="flex gap-4 justify-center mt-10">
                <button
                  onClick={() => handleAction("reject")}
                  disabled={loading}
                  className="px-10 py-2.5 rounded-md font-medium text-white bg-[#C67E7E] hover:bg-[#b06a6a] transition shadow-sm min-w-[140px] disabled:opacity-50"
                >
                  {loading ? "..." : "Reject"}
                </button>
                <button
                  onClick={() => handleAction("accept")}
                  disabled={loading}
                  className="px-10 py-2.5 rounded-md font-medium text-white bg-[#4CAF50] hover:bg-[#43a047] transition shadow-sm min-w-[140px] disabled:opacity-50"
                >
                  {loading ? "..." : "Approve"}
                </button>
              </div>
            ) : (
              <div
                className={`mt-8 inline-block px-6 py-3 rounded-lg font-semibold text-white text-center ${
                  status === "approved" || status === "active"
                    ? "bg-[#4CAF50]"
                    : "bg-[#C67E7E]"
                }`}
              >
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
