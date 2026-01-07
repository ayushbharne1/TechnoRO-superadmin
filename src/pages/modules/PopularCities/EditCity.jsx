import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header2 from "../../../components/superAdmin/header/Header2";
import { updatePopularCity } from "../../../redux/slices/popularCitiesSlice";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import JoditEditor from "jodit-pro-react";
import Faq from "./Faq";
import ReviewManager from "./ReviewManager";
import RecentlyServedManager from "./RecentlyServedManager";
import StoreLocationManager from "./StoreLocationManager";

const EditCity = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id: routeId } = useParams();
  const rows = useSelector((state) => state.popularCities?.rows || []);

  // Accept multiple possible state keys from navigation
  const routeCity = location.state?.cityData || location.state?.city || null;
  const storeCity = routeId ? rows.find((c) => c.id === routeId || c._id === routeId) : null;
  const prefill = routeCity || storeCity || null;

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");

  // Separate state for each editor
  const [overview, setOverview] = useState("");
  const [features, setFeatures] = useState("");
  const [installation, setInstallation] = useState("");

  // State for child components data
  const [servedCustomers, setServedCustomers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [storeLocations, setStoreLocations] = useState([]);

  // Selected document id for update
  const [selectedId, setSelectedId] = useState("");

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Separate refs for each editor
  const overviewRef = React.useRef(null);
  const featuresRef = React.useRef(null);
  const installationRef = React.useRef(null);

  const editorConfig = React.useMemo(
    () => ({
      readonly: false,
      minHeight: 400,
      placeholder: "Start typing your content here...",

      enter: "P",
      list: {
        autoIndent: true,
      },

      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "outdent",
        "indent",
        "|",
        "undo",
        "redo",
        "|",
        "link",
        "table",
        "|",
        "hr",
        "fullsize",
      ],

      toolbarAdaptive: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,

      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,

      useNativeTooltip: false,
    }),
    []
  );

  /* =========================
     Prefill form on mount
  ========================= */
  useEffect(() => {
    if (!prefill) return;

    // Normalize keys from different sources
    const normCity = prefill.city || prefill.cityName || "";
    const normState = prefill.state || "";
    const normMobile = prefill.mobile || prefill.contactNumber || "";
    const normEmail = prefill.email || prefill.contactEmail || "";
    const normWhatsapp = prefill.whatsappLink || prefill.whatsAppLink || "";

    setSelectedId(prefill.id || prefill._id || "");
    setCity(normCity);
    setState(normState);
    setMobile(normMobile);
    setEmail(normEmail);
    setWhatsappLink(normWhatsapp);
    setOverview(prefill.overview || "");
    setFeatures(prefill.features || "");
    setInstallation(prefill.installation || "");
    setServedCustomers(prefill.servedCustomers || []);
    setReviews(prefill.reviews || []);
    setFaqs(prefill.faqs || []);
    setStoreLocations(prefill.storeLocations || []);
  }, [prefill]);

  const handleUpdate = async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await dispatch(
        updatePopularCity({
          id: selectedId,
          city,
          state,
          mobile,
          email,
          whatsappLink,
          overview,
          features,
          installation,
          servedCustomers,
          reviews,
          faqs,
          storeLocations,
        })
      );

      if (result.type === updatePopularCity.fulfilled.type) {
        // Show success message
        alert("City updated successfully!");

        // Navigate back to the previous page
        navigate("/popular-cities");
      } else if (result.type === updatePopularCity.rejected.type) {
        setError(result.payload?.message || "Failed to update city. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 min-h-screen flex flex-col">
      {/* Header with Title */}
      <Header2 title="Edit City" />

      {/* Form Section */}
      <div className="bg-white mt-5 flex flex-col gap-8 w-full h-full">
        {/* Row 1: City Name & State */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* City Name Field */}
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">
              City Name
            </label>
            <input
              type="text"
              placeholder="Enter City Name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
              required
            />
          </div>

          {/* State Field */}
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">
              State
            </label>
            <input
              type="text"
              placeholder="Enter State Name"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
              required
            />
          </div>
        </div>

        {/* Row 2: Mobile & Email */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* Mobile Number Field */}
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">
              Mobile Number
            </label>
            <input
              type="tel"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
              required
            />
          </div>

          {/* Email Field */}
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
              required
            />
          </div>
        </div>

        {/* Row 3: WhatsApp Link */}
        <div className="flex flex-col w-full">
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">
              WhatsApp Link
            </label>
            <input
              type="url"
              placeholder="Enter WhatsApp Link (https://wa.me/...)"
              value={whatsappLink}
              onChange={(e) => setWhatsappLink(e.target.value)}
              className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
            />
          </div>
        </div>

        {/* Overview Editor */}
        <div className="flex flex-col gap-3">
          <label className="font-poppins font-semibold text-gray-700 text-[16px]">
            Overview
          </label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <JoditEditor
              key={(selectedId || "new") + "-overview"}
              ref={overviewRef}
              defaultValue={overview}
              config={editorConfig}
              tabIndex={1}
              onBlur={(newContent) => setOverview(newContent)}
              onChange={() => {}}
            />
          </div>
        </div>

        {/* Features Editor */}
        <div className="flex flex-col gap-3">
          <label className="font-poppins font-semibold text-gray-700 text-[16px]">
            Features
          </label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <JoditEditor
              key={(selectedId || "new") + "-features"}
              ref={featuresRef}
              defaultValue={features}
              config={editorConfig}
              tabIndex={2}
              onBlur={(newContent) => setFeatures(newContent)}
              onChange={() => {}}
            />
          </div>
        </div>

        {/* Installation Editor */}
        <div className="flex flex-col gap-3">
          <label className="font-poppins font-semibold text-gray-700 text-[16px]">
            Installation
          </label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <JoditEditor
              key={(selectedId || "new") + "-installation"}
              ref={installationRef}
              defaultValue={installation}
              config={editorConfig}
              tabIndex={3}
              onBlur={(newContent) => setInstallation(newContent)}
              onChange={() => {}}
            />
          </div>
        </div>

        <Faq faqs={faqs} setFaqs={setFaqs} />
        <ReviewManager reviews={reviews} setReviews={setReviews} />
        <RecentlyServedManager servedCustomers={servedCustomers} setServedCustomers={setServedCustomers} />
        <StoreLocationManager storeLocations={storeLocations} setStoreLocations={setStoreLocations} />

        {/* Error Message */}
        {error && (
          <div className="w-full p-4 bg-red-50 border border-red-300 rounded-lg">
            <p className="text-red-600 font-poppins text-sm">{error}</p>
          </div>
        )}

        {/* Update Button */}
        <div className="flex justify-center w-full mt-6">
          <button
            onClick={handleUpdate}
            disabled={isLoading}
            className="bg-[#7EC1B1] text-white font-poppins font-semibold px-6 py-3 rounded-lg hover:bg-[#65a89d] transition w-full md:w-1/4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Updating..." : "Update City"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCity;
