import React, { useState } from "react";
import { FaRegClock } from "react-icons/fa";
import Header2 from "../../../components/superAdmin/header/Header2";

const AssignLead = () => {
  const [leadAssignedTo, setLeadAssignedTo] = useState("");
  const [vendor, setVendor] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleAssign = () => {
    console.log({ leadAssignedTo, vendor, serviceDate, startTime, endTime });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header2 />

      {/* Grey Line */}
      <div className="border-b border-gray-300 my-4"></div>

      {/* Main Container */}
      <div className="w-[100%] mx-auto bg-white p-8 rounded-lg shadow-md">
        {/* First Row */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          {/* Lead Assigned To */}
          <div className="w-full md:w-[48%]">
            <label className="block text-gray-700 mb-2 font-medium">
              Lead Assigned To
            </label>
            <select
              value={leadAssignedTo}
              onChange={(e) => setLeadAssignedTo(e.target.value)}
              className="w-full border border-[#606060]  bg-[#F5F5F5] px-3 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option value="">Select</option>
              <option value="Venodr">Vendor</option>
              <option value="Service Engineer">Service Engineer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Select Nearest Vendor */}
          <div className="w-full md:w-[48%]">
            <label className="block text-gray-700 mb-2 font-medium">
              Select Nearest Vendor
            </label>
            <select
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              className="w-full border border-[#606060]  bg-[#F5F5F5] px-3 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
            > 
              <option value="">Select</option>
              <option value="Vendor 1">Vendor 1</option>
              <option value="Vendor 2">Vendor 2</option>
              <option value="Vendor 3">Vendor 3</option>
            </select>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          {/* Service Date */}
          <div className="w-full md:w-[48%]">
            <label className="block text-gray-700 mb-2 font-medium">
              Service Date
            </label>
            <input
              type="date"
              value={serviceDate}
              onChange={(e) => setServiceDate(e.target.value)}
              className="w-full border border-[#606060]  bg-[#F5F5F5] px-3 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          {/* Service Time 1 & 2 (half width each) */}
          <div className="w-full md:w-[48%] flex flex-col md:flex-row gap-4">
            {/* Time 1 */}
            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 mb-2 font-medium">
                Service Time 1
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full border border-[#606060]  bg-[#F5F5F5] px-3 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>
            </div>

            {/* Time 2 */}
            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 mb-2 font-medium">
                Service Time 2
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full border border-[#606060]  bg-[#F5F5F5] px-3 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Assign Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleAssign}
            className="bg-[#7EC1B1] text-white px-12 py-1 cursor-pointer rounded-lg font-semibold hover:bg-[#67b09b] transition"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignLead;
