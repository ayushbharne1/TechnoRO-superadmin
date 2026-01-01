import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// ✅ Import updateLead
import { updateLead, clearLeadSuccess, clearLeadError } from "../../../redux/slices/leadSlice"; 
import Header2 from "../../../components/superAdmin/header/Header2";
import { Loader2 } from "lucide-react";

const AssignLead = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const leadData = location.state?.lead;
  const { loading, error, successMessage } = useSelector((state) => state.leads);

  const [leadAssignedTo, setLeadAssignedTo] = useState("Vendor");
  const [vendor, setVendor] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const dummyVendors = [
    { id: "68ff5cd2f357bf48dc48b949", name: "Pushpendra Patel" }, 
  ];

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearLeadSuccess());
        navigate("/lead-management"); 
      }, 2000);
      return () => clearTimeout(timer);
    }
    dispatch(clearLeadError());
  }, [successMessage, navigate, dispatch]);

  // ✅ Format: "14:30" -> "2pm"
  const formatToBackendTime = (time24) => {
    if (!time24) return "";
    const [hours] = time24.split(":"); 
    let h = parseInt(hours, 10);
    const ampm = h >= 12 ? "pm" : "am";
    h = h % 12 || 12; 
    return `${h}${ampm}`; 
  };

  const handleAssign = () => {
    if (!leadData?._id) return alert("Error: No Lead Selected");
    if (!vendor) return alert("Please select a vendor");
    if (!serviceDate) return alert("Please select a date");
    if (!startTime || !endTime) return alert("Please select time slots");

    // 1. Format Time: "10am-11am" (No Spaces)
    const startStr = formatToBackendTime(startTime);
    const endStr = formatToBackendTime(endTime);
    const finalServiceTime = `${startStr}-${endStr}`;

    // 2. Format Date: YYYY-MM-DD -> DD/MM/YYYY
    // This is CRITICAL. The backend crashes if sent as YYYY-MM-DD
    const [year, month, day] = serviceDate.split("-");
    const formattedDate = `${day}/${month}/${year}`;

    // 3. Construct Payload (Matches Postman EXACTLY)
    const payload = {
      assignedVendorId: vendor, 
      serviceDate: formattedDate, // "23/05/2026"
      serviceTime: finalServiceTime, // "10am-11am"
      // ❌ STATUS REMOVED: Postman worked without it. Sending it caused validation errors.
    };

    console.log("🚀 Sending Exact Postman Payload:", payload); 

    dispatch(updateLead({ id: leadData._id, data: payload }));
  };

  if (!leadData) {
      return <div className="p-10 text-center">No lead selected. Please go back.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-[Poppins]">
      <Header2 title="Assign Lead" />
      <div className="border-b border-gray-300 my-4"></div>

      <div className="w-[100%] mx-auto bg-white p-8 rounded-lg shadow-md">
        
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">{error}</div>}
        {successMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded border border-green-200">Success! Redirecting...</div>}

        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          <div className="w-full md:w-[48%]">
            <label className="block text-gray-700 mb-2 font-medium">Lead Assigned To</label>
            <select
              value={leadAssignedTo}
              onChange={(e) => setLeadAssignedTo(e.target.value)}
              className="w-full border border-[#606060] bg-[#F5F5F5] px-3 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option value="Vendor">Vendor</option>
            </select>
          </div>

          <div className="w-full md:w-[48%]">
            <label className="block text-gray-700 mb-2 font-medium">Select Nearest Vendor</label>
            <select
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              className="w-full border border-[#606060] bg-[#F5F5F5] px-3 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
            > 
              <option value="">Select Vendor</option>
              {dummyVendors.map((v) => (
                  <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          <div className="w-full md:w-[48%]">
            <label className="block text-gray-700 mb-2 font-medium">Service Date</label>
            <input
              type="date"
              value={serviceDate}
              onChange={(e) => setServiceDate(e.target.value)}
              className="w-full border border-[#606060] bg-[#F5F5F5] px-3 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          <div className="w-full md:w-[48%] flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 mb-2 font-medium">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border border-[#606060] bg-[#F5F5F5] px-3 py-3 pr-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>

            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 mb-2 font-medium">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full border border-[#606060] bg-[#F5F5F5] px-3 py-3 pr-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleAssign}
            disabled={loading}
            className="bg-[#7EC1B1] text-white px-12 py-2 cursor-pointer rounded-lg font-semibold hover:bg-[#67b09b] transition flex items-center gap-2 disabled:opacity-50"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? "Assigning..." : "Assign"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignLead;