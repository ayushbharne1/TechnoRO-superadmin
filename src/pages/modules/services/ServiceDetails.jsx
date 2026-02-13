import { React, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header2 from "../../../components/superAdmin/header/Header2";
import sampleImage from "../../../assets/water-purifier.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceById } from "../../../redux/slices/serviceSlice";
import { fetchAllCategories } from "../../../redux/slices/CategorySlice";
import Loader from "../../../components/loader/Loader";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { current, loading } = useSelector((state) => state.service);
  const { categories = [] } = useSelector((state) => state.category);

  useEffect(() => {
    if (id) {
      dispatch(fetchServiceById(id));
    }
    dispatch(fetchAllCategories());
  }, [dispatch, id]);

  const service = current;

  // Get category name from category ID
  const getCategoryName = () => {
    if (!service?.category) return "N/A";
    
    // If category is already a string name (from location.state)
    if (typeof service.category === 'string' && !service.category.match(/^[0-9a-fA-F]{24}$/)) {
      return service.category;
    }
    
    // If category is an ID, find the name
    const categoryObj = categories.find((cat) => cat._id === service.category);
    return categoryObj?.name || "N/A";
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get first image or fallback
  const getServiceImage = () => {
    if (service?.images && service.images.length > 0) {
      return service.images[0];
    }
    return sampleImage;
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen p-4 md:p-6">
        <Header2 />
        <div className="bg-white w-full h-full  p-8 max-w-6xl mx-auto mt-6">
          <Loader size="large"
          message="Loading service details..."
          submessage="Please wait while we fetch the data"
          fullScreen={false}  />
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="bg-gray-100 min-h-screen p-4 md:p-6">
        <Header2 />
        <div className="bg-white rounded-xl shadow-md p-8 max-w-6xl mx-auto mt-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">No service data found.</h2>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-[#7EC1B1] text-white rounded-lg hover:bg-[#68b1a0]"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen p-4 md:p-6">
      <Header2 />
      <div className="bg-white font-poppins max-w-6xl mx-auto mt-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 text-[#7EC1B1] hover:text-[#68b1a0] flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Services
        </button>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          {/* Service Product Images */}
          <div className="relative w-full md:w-1/3">
            {/* Discount Badge */}
            {service.discount > 0 && (
              <div className="absolute top-2 left-2 bg-[#008ECC] text-white px-4 py-2 rounded-lg text-sm md:text-base font-semibold z-10 shadow-lg">
                {service.discount}% OFF
              </div>
            )}

            {/* Main Image */}
            <div className="mb-4">
              <img
                src={getServiceImage()}
                alt={service.name || service.serviceAMC}
                className="rounded-lg w-full h-75 md:h-75 object-cover border border-gray-200"
              />
            </div>

            {/* Additional Images */}
            {service.images && service.images.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {service.images.slice(1).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${service.name} ${index + 2}`}
                    className="rounded-lg w-full h-24 object-cover border border-gray-200 cursor-pointer hover:opacity-80 transition"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Service Details */}
          <div className="flex-1 w-full">
            {/* Service Name */}
            <h2 className="text-2xl md:text-3xl font-semibold font-poppins mb-3 text-gray-800">
              {service.name || service.serviceAMC}
            </h2>

            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-[#7EC1B1] bg-opacity-10 text-white px-4 py-1 rounded-full text-sm font-medium">
                {getCategoryName()}
              </span>
            </div>

            {/* Price and Warranty */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="text-3xl md:text-4xl font-bold text-[#7EC1B1]">
                ₹{service.price}
              </div>
              {service.discount > 0 && (
                <div className="text-lg text-gray-400 line-through">
                  ₹{Math.round(service.price / (1 - service.discount / 100))}
                </div>
              )}
            </div>

            {/* Warranty */}
            {(service.warranty || service.warrenty) && (
              <div className="mb-4 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#34C759]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">
                  Warranty:{" "}
                  <span className="text-[#34C759] font-semibold">
                    {service.warranty || service.warrenty}
                  </span>
                </span>
              </div>
            )}

            {/* Rating */}
            {service.rating && (
              <div className="mb-4 flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${
                        index < service.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600">
                    ({service.rating}/5)
                  </span>
                </div>
              </div>
            )}

            {/* Service Provider */}
            <p className="text-gray-700 mb-6 text-sm md:text-base">
              Service provided by:{" "}
              <span className="font-semibold text-black">Techno RO</span>
            </p>

            {/* Description Section */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">
                Description
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {service.description || "No description available."}
              </p>
            </div>

            {/* Features Section */}
            {service.features && service.features.length > 0 && (
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">
                  Features
                </h3>
                <ul className="text-gray-600 space-y-2 text-sm md:text-base">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#7EC1B1] mt-0.5 shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">
                Additional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Created:</span>
                  <span className="ml-2 font-medium text-gray-800">
                    {formatDate(service.createdAt)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="ml-2 font-medium text-gray-800">
                    {formatDate(service.updatedAt)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Service ID:</span>
                  <span className="ml-2 font-mono text-xs text-gray-800">
                    {service._id}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <span className="ml-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        service.isDeleted
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {service.isDeleted ? "Deleted" : "Active"}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-4 justify-end">
          <button
            onClick={() => navigate(`/services/editservice/${service._id}`)}
            className="px-6 py-2 bg-[#7EC1B1] text-white rounded-lg hover:bg-[#68b1a0] transition font-medium"
          >
            Edit Service
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;