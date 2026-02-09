import React, { useState, useEffect } from "react";
import Header2 from "../../../components/superAdmin/header/Header2";
import { useNavigate, useLocation } from "react-router-dom";

const ViewAmc = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const amcData = location.state; // Get data passed from previous page

  const [planDetails, setPlanDetails] = useState({
    planName: "",
    planPrice: "",
    duration: "",
    discount: "",
    description: "",
    features: [],
    category: "",
    images: [],
  });

  // Load data when component mounts
  useEffect(() => {
    if (amcData) {
      setPlanDetails({
        planName: amcData.serviceAMC || "AMC Plan Name",
        planPrice: amcData.price || "₹0.00",
        duration: amcData.warrenty || "12 Months",
        discount: amcData.discount || "NA",
        category: amcData.category || "AMC Plan",
        description: amcData.description || "Complete annual maintenance with priority support and regular checkups for your appliances.",
        features: amcData.features || [
          "4 Free Service Visits",
          "Priority Customer Support",
          "Free Gas Top-up",
          "Genuine Spare Parts",
          "24/7 Emergency Support",
          "Annual Deep Cleaning"
        ],
        images: amcData.images || [
          "https://via.placeholder.com/400x300?text=AMC+Plan+Image+1",
          "https://via.placeholder.com/400x300?text=AMC+Plan+Image+2",
        ],
      });
    }
  }, [amcData]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    navigate("/amc/update/1234") 
  };

  return (
    <div className="bg-white p-4 h-full overflow-y-auto flex flex-col gap-6">
      <Header2 />

      <div className="bg-white ">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 font-poppins">
            AMC Plan Details
          </h2>
          <div className="flex gap-3">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-[#7EC1B1] text-white rounded-lg font-poppins text-sm md:text-base hover:bg-[#6db09f] transition-colors"
            >
              Edit Plan
            </button>
            
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          {/* Basic Information Card */}
          <div className="bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 font-poppins">
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Category</p>
                <p className="text-base md:text-lg font-medium text-gray-800">
                  {planDetails.category}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Plan Name</p>
                <p className="text-base md:text-lg font-medium text-gray-800">
                  {planDetails.planName}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Price</p>
                <p className="text-base md:text-lg font-semibold text-[#7EC1B1]">
                  {planDetails.planPrice}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Duration/Validity</p>
                <p className="text-base md:text-lg font-medium text-gray-800">
                  {planDetails.duration}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Discount</p>
                <p className="text-base md:text-lg font-medium text-gray-800">
                  {planDetails.discount}
                </p>
              </div>
            </div>
          </div>

          {/* Description Card */}
          <div className="bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 font-poppins">
              Description
            </h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              {planDetails.description}
            </p>
          </div>

          {/* Features Card */}
          <div className="bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 font-poppins">
              Features
            </h3>
            <ul className="space-y-3">
              {planDetails.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm md:text-base text-gray-700"
                >
                  <span className="text-[#7EC1B1] text-xl mt-0.5">✓</span>
                  <span className="flex-1">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Images Card */}
          {planDetails.images.length > 0 && (
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 font-poppins">
                Plan Images
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {planDetails.images.map((image, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden border border-gray-300 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={image}
                      alt={`Plan image ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing Summary Card */}
          <div className="bg-gradient-to-br from-[#7EC1B1] to-[#6db09f] p-4 md:p-6 rounded-lg text-white">
            <h3 className="text-lg md:text-xl font-semibold mb-4 font-poppins">
              Pricing Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm md:text-base">Original Price:</span>
                <span className="text-base md:text-lg font-semibold">
                  {planDetails.planPrice}
                </span>
              </div>
              {planDetails.discount !== "NA" && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base">Discount:</span>
                    <span className="text-base md:text-lg font-semibold">
                      {planDetails.discount}
                    </span>
                  </div>
                  <div className="border-t border-white/30 pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-base md:text-lg font-bold">
                        Final Price:
                      </span>
                      <span className="text-xl md:text-2xl font-bold">
                        {planDetails.planPrice}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAmc;