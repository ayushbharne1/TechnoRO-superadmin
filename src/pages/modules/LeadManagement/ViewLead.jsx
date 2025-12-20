
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header2 from "../../../components/superAdmin/header/Header2";
import { IoLocationSharp } from "react-icons/io5"; // Location
import { FiPhone } from "react-icons/fi"; // Phone
import { FaToolbox } from "react-icons/fa"; // Service Type
import { HiWrenchScrewdriver } from "react-icons/hi2"; // Service Ordered
import { MdOutlineDateRange } from "react-icons/md"; // Date & Time
import { LuInfo } from "react-icons/lu"; // Problem Description
import { MdPerson } from "react-icons/md"; // Lead Assigned To
import LeadTimeline from "./LeadTimeLine"

const LeadView = () => {
  const location = useLocation();
  const lead = location.state?.lead;
  const navigate = useNavigate();

  if (!lead) return <div className="p-6">No lead data available.</div>;

  const [selectedTab, setSelectedTab] = useState(null);

  // Dynamic badge color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "new":
        return "bg-[#FFCC00] text-white";
      case "in progress":
        return "bg-[#0088FF] text-white";
      case "completed":
        return "bg-[#34C759] text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col p-6 gap-6">
      <Header2 />

      {/* Lead Info */}
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h2 className="text-[32px] font-semibold font-poppins">
              {lead.customerName}
            </h2>
            <span className="text-gray-600 font-medium">
              Lead ID: <span className="text-[#7EC1B1] ml-1">{lead.leadId}</span>
            </span>
          </div>
          <span
            className={`px-7 py-2 rounded-full font-semibold text-sm mt-2 ${getStatusColor(
              lead.status
            )}`}
          >
            {lead.status || "NA"}
          </span>
        </div>

        {/* Service Address below Lead */}
        <div>
          <div className="flex items-center gap-2">
            <IoLocationSharp className="text-xl text-gray-700" />
            <p className="font-medium text-lg text-black">Service Address:</p>
          </div>
          <p className="text-[#7EC1B1] ml-6">{lead.serviceAddress || "NA"}</p>
        </div>

        {/* Map + Details */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Map */}
          <div className="w-full md:w-1/2 rounded-lg overflow-hidden border shadow">
            <iframe
              title="Lead Location"
              width="100%"
              height="300"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                lead.serviceAddress || ""
              )}&z=15&output=embed`}
              allowFullScreen
              aria-hidden="false"
            />
          </div>

          {/* Right Details */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            {/* Phone Number */}
            <div>
              <div className="flex items-center gap-2">
                <FiPhone className="text-xl text-gray-700" />
                <p className="font-medium text-lg text-black">Phone Number:</p>
              </div>
              <p className="text-[#7EC1B1] ml-6">{lead.phone || "NA"}</p>
            </div>

            {/* Service Ordered */}
            <div>
              <div className="flex items-center gap-2">
                <HiWrenchScrewdriver className="text-xl text-gray-700" />
                <p className="font-medium text-lg text-black">Service Ordered:</p>
              </div>
              <p className="text-[#7EC1B1] ml-6">
                {lead.serviceOrdered || "NA"}
              </p>
            </div>

            {/* Service Type */}
            <div>
              <div className="flex items-center gap-2">
                <FaToolbox className="text-xl text-gray-700" />
                <p className="font-medium text-lg text-black">Service Type:</p>
              </div>
              <p className="text-[#7EC1B1] ml-6">{lead.serviceType || "NA"}</p>
            </div>

            {/* Service Date & Time */}
            <div>
              <div className="flex items-center gap-2">
                <MdOutlineDateRange className="text-xl text-gray-700" />
                <p className="font-medium text-lg text-black">
                  Service Date & Time:
                </p>
              </div>
              <p className="text-[#7EC1B1] ml-6">{lead.orderDate || "NA"}</p>
            </div>
          </div>
        </div>

        {/* Problem Description */}
        <div className="border border-gray-300 rounded-lg p-4 bg-white mt-4">
          <div className="flex items-center gap-2 mb-2">
            <LuInfo className="text-xl text-gray-700" />
            <p className="font-medium text-lg text-black">Problem Description:</p>
          </div>
          <p className="text-[#7EC1B1] ml-6">
            {lead.problem || "No problem description provided"}
          </p>
        </div>


        {/* ✅ Lead Assigned To - Only for In Progress / Completed */}
        {(lead.status?.toLowerCase() === "in progress" ||
          lead.status?.toLowerCase() === "completed") && (
            <>
              <div className="border border-gray-300 rounded-lg p-4 bg-white mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <MdPerson className="text-xl text-gray-700" />
                  <p className="font-medium text-lg text-black">Lead Assigned To:</p>
                </div>
                <p className="text-[#7EC1B1] ml-6">{lead.assignedTo || "NA"}</p>
              </div>

              {/* ⏳ Timeline Box Below Lead Assigned To */}
              <LeadTimeline />
            </>
          )}


        {/* Price Details */}
        <div className="border border-gray-300 rounded-lg p-4 bg-white mt-4 flex flex-col gap-2">
          <p className="font-medium text-lg text-black mb-2">Price Details:</p>
          <div className="flex justify-between">
            <span>Price:</span>
            <span>{lead.priceDetails?.price || "0"}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount:</span>
            <span className="text-[#34C759]">{lead.priceDetails?.discount || "0"}</span>
          </div>
          <div className="flex justify-between">
            <span>Platform Fee:</span>
            <span>{lead.priceDetails?.platformFee || "0"}</span>
          </div>
          <div className="flex justify-between">
            <span>Debit Card Off:</span>
            <span className="text-[#34C759]">{lead.priceDetails?.debitcardoff || "0"}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charges:</span>
            <span>{lead.priceDetails?.deliveryCharges || "0"}</span>
          </div>

          {/* Dotted Total Amount */}
          <div className="border-t border-dotted border-gray-400 mt-2 pt-2 flex justify-between font-semibold">
            <span>Total Amount:</span>
            <span>{lead.priceDetails?.totalAmount || "0"}</span>
          </div>



          {/* Dynamic Offers & Payment Info */}
          <div className="border-t border-dotted border-gray-400 py-4 mt-3">
            {/* Total Saved */}
            <div className="text-md text-[#7EC1B1] mt-1">
              Total saved on this order: {lead.priceDetails?.totalSaved ? `₹${lead.priceDetails.totalSaved}` : "₹0"}
            </div>

            {/* Offers */}
            {lead.priceDetails?.offers?.length > 0 && (
              <div className="mt-4 p-3 flex items-start gap-3">
                {/* % Icon */}
                <div className="w-9 h-9 rounded-full bg-[#7EC1B1] flex items-center justify-center text-white">
                  <span className="text-base font-semibold">%</span>
                </div>

                {/* Offers List */}
                <div className="flex-1">
                  {lead.priceDetails.offers.map((offer, index) => (
                    <div key={index} className="mb-2">
                      <div className="font-semibold text-[#263138]">{offer.title}</div>
                      <div className="text-sm text-[#263138] pb-3 border-b border-dotted border-[#CACACA]">
                        {offer.amount ? `₹${offer.amount}` : "NA"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Mode */}
            <div className="mt-2 flex  text-[#263138] font-medium">
              <span>Payment Mode:</span>
              <span>{lead.priceDetails?.paymentMode || "Debit Card"}</span>
            </div>
          </div>
          {/* Customer Feedback Section */}
          <div className="border-t border-dotted border-gray-400 mt-6 pt-4">
            {/* ✅ Show Customer Feedback only when status is Completed */}
            {lead.status?.toLowerCase() === "completed" && (
              <div className="border-t border-dotted border-gray-400 mt-6 pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <LuInfo className="text-xl text-gray-700" />
                  <p className="font-medium text-lg text-black">Customer Feedback</p>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-4 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  {/* Customer Image */}
                  <img
                    src="https://i.pravatar.cc/50"
                    alt="Customer"
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  {/* Feedback Content */}
                  <div className="flex-1">
                    {/* Stars */}
                    <div className="flex items-center text-yellow-400 mb-1">
                      <span className="material-symbols-outlined text-base">star</span>
                      <span className="material-symbols-outlined text-base">star</span>
                      <span className="material-symbols-outlined text-base">star</span>
                      <span className="material-symbols-outlined text-base">star</span>
                      <span className="material-symbols-outlined text-base text-gray-300">star</span>
                    </div>

                    {/* Feedback Text */}
                    <p className="text-gray-700 leading-relaxed">
                      Lorem ipsum dolor sit amet consectetur. Sed lacus facilisi semper lacus
                      rhoncus cursus. Nisl ac lacus morbi pellentesque diam. Phasellus eget
                      vitae etiam mauris.
                    </p>

                    {/* Reply Button */}
                    <button className="mt-3 border border-[#7EC1B1] text-[#7EC1B1] rounded-md px-4 py-1 text-sm font-medium hover:bg-[#7EC1B1] hover:text-white transition">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>


      {/* Assign Lead Button */}
      <div className="flex justify-center mt-4">
        {lead.status?.toLowerCase() === "new" && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => navigate("/lead-management/view/assign-lead", { state: { lead } })}
              className="bg-[#3A953A] text-white font-semibold px-8 py-1 rounded-lg cursor-pointer transition"
            >
              Assign Lead
            </button>
          </div>
        )}

      </div>
    </div>
  
    
  );
};

export default LeadView;


