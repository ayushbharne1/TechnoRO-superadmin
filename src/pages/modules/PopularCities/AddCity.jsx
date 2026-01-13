import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Header2 from "../../../components/superAdmin/header/Header2";
import { addPopularCity } from "../../../redux/slices/popularCitiesSlice";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-pro-react";
import Faq from "./Faq";
import ReviewManager from "./ReviewManager";
import RecentlyServedManager from "./RecentlyServedManager";
import StoreLocationManager from "./StoreLocationManager";
import { State, City } from "country-state-city";

const AddCity = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [stateCode, setStateCode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  // const [whatsappLink, setWhatsappLink] = useState("");

  // Separate state for each editor
  const [overview, setOverview] = useState("");
  const [features, setFeatures] = useState("");
  const [installation, setInstallation] = useState("");

  // State for child components data
  const [servedCustomers, setServedCustomers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [storeLocations, setStoreLocations] = useState([]);

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Separate refs for each editor
  const overviewRef = React.useRef(null);
  const featuresRef = React.useRef(null);
  const installationRef = React.useRef(null);

  const states = State.getStatesOfCountry("IN");
  const cities = stateCode ? City.getCitiesOfState("IN", stateCode) : [];

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

  const handleAdd = async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await dispatch(
        addPopularCity({
          city: city || "",
          state: state || "",
          mobile,
          email,
          // whatsappLink,
          overview,
          features,
          installation,
          servedCustomers,
          reviews,
          faqs,
          storeLocations,
        })
      );

      if (result.type === addPopularCity.fulfilled.type) {
        // Reset form fields
        setStateCode("");
        setState("");
        setCity("");
        setMobile("");
        setEmail("");
        // setWhatsappLink("");
        setOverview("");
        setFeatures("");
        setInstallation("");
        setServedCustomers([]);
        setReviews([]);
        setFaqs([]);
        setStoreLocations([]);

        // Show success message
        alert("City added successfully!");

        // Navigate back to the previous page
        navigate("/popular-cities");
      } else if (result.type === addPopularCity.rejected.type) {
        setError(
          result.payload?.message || "Failed to add city. Please try again."
        );
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
      <Header2 title="Add New City" />

      {/* Form Section */}
      <div className="bg-white mt-5 flex flex-col gap-8 w-full h-full">
        {/* Row 1: State & City */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* State Dropdown */}
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">
              State
            </label>
            <select
              value={stateCode}
              onChange={(e) => {
                const selectedCode = e.target.value;
                const selectedState = states.find(
                  (s) => s.isoCode === selectedCode
                );
                setStateCode(selectedCode);
                setState(selectedState?.name || "");
                setCity("");
              }}
              className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] cursor-pointer"
              required
            >
              <option value="">Select State</option>
              {states.map((s) => (
                <option key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: City & Mobile */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* City Dropdown */}
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">
              City
            </label>
            <select
              value={city}
              onChange={(e) => {
                const selectedName = e.target.value;
                setCity(selectedName);
              }}
              className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              required
              disabled={!stateCode}
            >
              <option value="">Select City</option>
              {cities.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

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
        </div>

        {/* Row 3: Email */}
        <div className="flex flex-col w-full">
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
        {/* <div className="flex flex-col w-full">
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
              required
            />
          </div>
        </div> */}

        {/* Overview Editor */}
        <div className="flex flex-col gap-3">
          <label className="font-poppins font-semibold text-gray-700 text-[16px]">
            Overview
          </label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <JoditEditor
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
        <RecentlyServedManager
          servedCustomers={servedCustomers}
          setServedCustomers={setServedCustomers}
        />
        <StoreLocationManager
          storeLocations={storeLocations}
          setStoreLocations={setStoreLocations}
        />

        {/* Error Message */}
        {error && (
          <div className="w-full p-4 bg-red-50 border border-red-300 rounded-lg">
            <p className="text-red-600 font-poppins text-sm">{error}</p>
          </div>
        )}

        {/* Add Button */}
        <div className="flex justify-center w-full mt-6">
          <button
            onClick={handleAdd}
            disabled={isLoading}
            className="bg-[#7EC1B1] text-white font-poppins font-semibold px-6 py-3 rounded-lg hover:bg-[#65a89d] transition w-full md:w-1/4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Adding..." : "Add City"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCity;
