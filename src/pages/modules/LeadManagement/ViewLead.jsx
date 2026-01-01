import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeadDetails, clearSelectedLead, updateLead } from "../../../redux/slices/leadSlice"; 
import Header2 from "../../../components/superAdmin/header/Header2";
import { 
  MapPin, Phone, Calendar, Info, Wrench, FileText, UserCheck, Loader2, CheckCircle 
} from "lucide-react";

import LeadTimeline from "./LeadTimeline"; 

const ViewLead = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedLead, loading } = useSelector((state) => state.leads);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchLeadDetails(id));
    }
    return () => {
      dispatch(clearSelectedLead());
    };
  }, [dispatch, id]);

  const handleMarkCompleted = async () => {
    const confirm = window.confirm("Are you sure you want to mark this job as COMPLETED?");
    if (!confirm) return;
    setIsUpdating(true);
    await dispatch(updateLead({ id: selectedLead._id, data: { status: "completed" } }));
    dispatch(fetchLeadDetails(id)); 
    setIsUpdating(false);
  };

  // ... (Keep existing helper functions: formatDate, getStatusColor, formatStatusText, shouldHidePriceDetails) ...
  // For brevity, assuming helpers are here as per previous file
  
  // Re-paste helper functions if you need the full file again, otherwise just keep them.
  const formatDate = (dateString) => {
    if (!dateString) return "NA";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
  };
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "new": return "bg-[#FFC107] text-white"; 
      case "progress": case "in-progress": case "inprogress": return "bg-[#0088FF] text-white"; 
      case "completed": return "bg-[#10B981] text-white";  
      case "cancelled": return "bg-[#EF4444] text-white"; 
      default: return "bg-gray-200 text-gray-700";
    }
  };
  const formatStatusText = (status) => {
    if (!status) return "";
    const lower = status.toLowerCase();
    if (lower === "progress" || lower === "inprogress") return "In-progress";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };
  const shouldHidePriceDetails = (status) => {
    const s = status?.toLowerCase();
    return s === 'progress' || s === 'in-progress' || s === 'inprogress' || s === 'completed';
  };

  if (loading || !selectedLead) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-[#7EC1B1]" />
      </div>
    );
  }

  const { customer = {}, service = {}, assignedVendorId } = selectedLead || {};
  const leadAddress = selectedLead.customerAddress || customer?.addresses?.[0]?.street || "NA";

  return (
    <div className="w-full min-h-screen bg-gray-50 font-[Poppins] pb-10 overflow-x-hidden p-4">
      <div className=" pb-0">
        <Header2 title="Lead Details" />
        
      </div>

      <div className="max-w-full  sm:pt-4 md:pt-4 mt-2">
        <div className="bg-white ">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start  pb-6 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 capitalize">{customer.name || "Unknown Customer"}</h1>
                    <p className="text-gray-500 text-sm mt-1 font-medium">Lead ID: <span className="text-black">{selectedLead.orderId ? selectedLead.orderId.split('-')[1] : 'N/A'}</span></p>
                </div>
                <span className={`px-6 py-2 rounded-full text-sm font-bold capitalize tracking-wide mt-4 md:mt-0 ${getStatusColor(selectedLead.status)}`}>
                    {formatStatusText(selectedLead.status || "NEW")}
                </span>
            </div>

            {/* Grid Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8">
                {/* Left */}
                <div className="flex flex-col gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-gray-600 mb-1"><MapPin className="text-[#7EC1B1]" size={20} /><span className="font-medium text-lg text-gray-800">Service Address</span></div>
                        <p className="text-[#7EC1B1] text-base ">{leadAddress}</p>
                    </div>
                    <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                         <iframe title="Location" width="100%" height="100%" frameBorder="0" style={{ border: 0 }} src={`https://maps.google.com/maps?q=${encodeURIComponent(leadAddress)}&t=&z=13&ie=UTF8&iwloc=&output=embed`} allowFullScreen />
                    </div>
                </div>
                {/* Right */}
                <div className="grid grid-cols-1 gap-6">
                    <div><div className="flex items-center gap-2 text-gray-600 mb-1"><Phone className="text-[#7EC1B1]" size={18} /><span className="font-medium text-gray-800">Phone No.</span></div><p className="text-[#7EC1B1] text-lg font-medium ">{customer.phone || "NA"}</p></div>
                    <div><div className="flex items-center gap-2 text-gray-600 mb-1"><Wrench className="text-[#7EC1B1]" size={18} /><span className="font-medium text-gray-800">Service Ordered</span></div><p className="text-[#7EC1B1] text-lg font-medium ">{service.name || "NA"}</p></div>
                    <div><div className="flex items-center gap-2 text-gray-600 mb-1"><FileText className="text-[#7EC1B1]" size={18} /><span className="font-medium text-gray-800">Service Type</span></div><p className="text-[#7EC1B1] text-lg font-medium ">{service.category || "Paid Service"}</p></div>
                    <div><div className="flex items-center gap-2 text-gray-600 mb-1"><Calendar className="text-[#7EC1B1]" size={18} /><span className="font-medium text-gray-800">Service Date & Time</span></div><p className="text-[#7EC1B1] text-lg font-medium ">{selectedLead.serviceDate ? formatDate(selectedLead.serviceDate).split(',')[0] : "NA"} {selectedLead.serviceTime ? `, ${selectedLead.serviceTime}` : ""}</p></div>
                </div>
            </div>

            {/* Problem Desc */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-gray-600 mb-2"><Info className="text-[#7EC1B1]" size={20} /><span className="font-medium text-lg text-gray-800">Problem Description</span></div>
                <p className="text-[#7EC1B1] text-base leading-relaxed ">{selectedLead.remarks || "No description provided."}</p>
            </div>

            {/* ✅ 2. LEAD ASSIGNED & MODULAR TIMELINE */}
            {assignedVendorId && (
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <UserCheck className="text-[#7EC1B1]" size={20} />
                        <span className="font-medium text-lg text-gray-800">Lead Assigned To</span>
                    </div>
                    <p className="text-[#7EC1B1] text-lg font-medium  mb-6 capitalize">
                        {assignedVendorId.name} <span className="text-[#7EC1B1] text-sm">(Vendor)</span>
                    </p>

                    {/* ✅ USE THE NEW COMPONENT HERE */}
                    <LeadTimeline lead={selectedLead} />
                </div>
            )}

            {/* Price Details */}
            {!shouldHidePriceDetails(selectedLead.status) && (
                <div className="border border-gray-300 rounded-md p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Price Details</h3>
                    <div className="space-y-3 text-sm md:text-base text-gray-600">
                        <div className="flex justify-between"><span>Price (1 Items)</span><span className="font-medium text-gray-900">₹{selectedLead.subtotal || 0}</span></div>
                        <div className="flex justify-between"><span>Discount</span><span className="text-green-500 font-medium">-₹{ (Number(selectedLead.subtotal || 0) - Number(selectedLead.totalAmount || 0)).toFixed(0) }</span></div>
                        <div className="flex justify-between"><span>Platform Fee</span><span className="font-medium text-gray-900">₹{selectedLead.taxesAndFees || 0}</span></div>
                        <div className="flex justify-between"><span>Delivery Charges</span><span className="text-green-500 font-medium">Free</span></div>
                    </div>
                    <div className="border-t border-gray-300 border-dashed my-4"></div>
                    <div className="flex justify-between text-lg font-bold text-gray-900"><span>Total Amount</span><span>₹{selectedLead.totalAmount || 0}</span></div>
                </div>
            )}

            {/* Actions */}
            {(!selectedLead.status || selectedLead.status?.toLowerCase() === 'new') && (
                <div className="mt-8 flex justify-end">
                    <button onClick={() => navigate("/lead-management/view/assign-lead", { state: { lead: selectedLead } })} className="bg-[#3A953A] text-white px-8 py-3 rounded-lg text-sm font-semibold shadow hover:bg-green-700 transition">ASSIGN LEAD</button>
                </div>
            )}

            {['progress', 'in-progress', 'inprogress'].includes(selectedLead.status?.toLowerCase()) && (
                <div className="mt-8 flex justify-end">
                    <button onClick={handleMarkCompleted} disabled={isUpdating} className="bg-[#0088FF] text-white px-8 py-3 rounded-lg text-sm font-semibold shadow hover:bg-blue-700 transition flex items-center gap-2">
                        {isUpdating ? <Loader2 className="animate-spin w-4 h-4" /> : <CheckCircle className="w-4 h-4" />} MARK AS COMPLETED
                    </button>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default ViewLead;