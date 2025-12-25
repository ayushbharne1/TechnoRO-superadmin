import { React, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header2 from "../../../components/superAdmin/header/Header2";
import sampleImage from "../../../assets/water-purifier.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceById } from "../../../redux/slices/serviceSlice";

const ServiceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServiceById(location.state._id));
  }, [dispatch]);

  const { current, loading } = useSelector((state) => state.service);

  const service = current || location.state;

  if (!service) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold">No service data found.</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      <Header2 />
      <div className="bg-white rounded-xl font-poppins shadow-md p-4 md:p-8 max-w-6xl mx-auto mt-6">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          {/* Service Product Image */}
          <div className="relative w-full md:w-1/3 flex justify-center md:justify-start">
            <div className="absolute  bg-[#008ECC] text-white px-4 py-6 md:px-4 md:py-3 rounded text-lg md:text-lg font-semibold">
              {service.discount} OFF
            </div>
            <img
              src={sampleImage}
              alt={service.serviceAmc}
              className="rounded-lg w-full max-w-[200px] md:max-w-none md:h-[350px] md:w-[350px] object-cover"
            />
          </div>

          {/* Service Details */}
          <div className="flex-1 w-full">
            <h2 className="text-lg md:text-xl font-poppins mb-2">
              {service.serviceAMC}
            </h2>
            <div className="flex flex-wrap items-center gap-1 md:gap-2 text-base md:text-lg font-semibold text-[#7EC1B1] mb-1">
              {service.price}
              <span className="text-gray-500 text-sm md:text-base font-normal">
                • Warrenty:{" "}
                <span className="text-[#34C759] font-semibold">
                  {service.warrenty}
                </span>
              </span>
            </div>
            <p className="text-gray-700 mb-4 text-sm md:text-base">
              Service Add by:{" "}
              <span className="font-semibold text-black">Techno RO.</span>
            </p>

            <h3 className="text-base md:text-lg font-semibold border-b border-gray-200 pb-2 mb-3">
              Description
            </h3>

            <ul className="text-gray-600 list-disc ml-5 space-y-2 text-sm md:text-base">
              {service.description || "No description available."}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
