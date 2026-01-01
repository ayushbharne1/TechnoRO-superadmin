import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Header2 from "../../../components/superAdmin/header/Header2";
import { addPopularCity } from "../../../redux/slices/popularCitiesSlice";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-pro-react";
import Faq from "./Faq";
import ReviewManager from "./ReviewManager";
import RecentlyServedManager from "./RecentlyServedManager";
import { Store } from "lucide-react";
import StoreLocationManager from "./StoreLocationManager";

const AddCity = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cityName, setCityName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  
  // Separate state for each editor
  const [overview, setOverview] = useState("");
  const [features, setFeatures] = useState("");
  const [installation, setInstallation] = useState("");
  
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

  const handleAdd = () => {
    dispatch(
      addPopularCity({
        cityName,
        contactNumber,
        whatsappLink,
        contactEmail,
        overview,
        features,
        installation,
      })
    );

    // Reset form fields
    setCityName("");
    setContactNumber("");
    setWhatsappLink("");
    setContactEmail("");
    setOverview("");
    setFeatures("");
    setInstallation("");

    // Show success message
    alert("City added successfully!");

    // Navigate back to the previous page
    navigate("/popular-cities");
  };

  return (
    <div className="bg-white p-4 min-h-screen flex flex-col">
      {/* Header with Title */}
      <Header2 title="Add New City" />

      {/* Form Section */}
      <div className="bg-white mt-5 flex flex-col gap-8 w-full h-full">
        {/* Row 1: City Name & Contact Number */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* City Name Field */}
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">
              City Name
            </label>
            <input
              type="text"
              placeholder="Enter City Name"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
              required
            />
          </div>

          {/* Contact Number Field */}
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">
              Contact Number
            </label>
            <input
              type="text"
              placeholder="Enter Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
              required
            />
          </div>
        </div>

        {/* Row 2: WhatsApp Link & Contact Email */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* WhatsApp Link Field */}
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

          {/* Contact Email Field */}
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">
              Contact Email
            </label>
            <input
              type="email"
              placeholder="Enter Contact Email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
              required
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
              ref={overviewRef}
              value={overview}
              config={editorConfig}
              tabIndex={1}
              onChange={(newContent) => {
                setOverview(newContent);
              }}
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
              value={features}
              config={editorConfig}
              tabIndex={2}
              onChange={(newContent) => {
                setFeatures(newContent);
              }}
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
              value={installation}
              config={editorConfig}
              tabIndex={3}
              onChange={(newContent) => {
                setInstallation(newContent);
              }}
            />
          </div>
        </div>

        <Faq />
        <ReviewManager />
        <RecentlyServedManager />
        <StoreLocationManager />
        {/* Add Button */}
        <div className="flex justify-center w-full mt-6">
          <button
            onClick={handleAdd}
            className="bg-[#7EC1B1] text-white font-poppins font-semibold px-6 py-3 rounded-lg hover:bg-[#65a89d] transition w-full md:w-1/4"
          >
            Add City
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCity;