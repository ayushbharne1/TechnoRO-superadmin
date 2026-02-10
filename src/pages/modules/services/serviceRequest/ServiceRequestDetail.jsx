import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Header2 from "../../../../components/superAdmin/header/Header2";
import { IoArrowBack } from "react-icons/io5";

const ServiceRequestDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  
  // Get request data from navigation state or use dummy data
//   const requestData = location.state?.request || {
  const requestData =  {
    _id: id,
    orderId: "SR-001",
    customer: { 
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+91 9876543210",
    //   address: "123 Main Street, Mumbai, Maharashtra, 400001"
    address: {
        state: "Maharashtra",
        city: "Mumbai",
        pincode: "400001",
        area: "Andheri West",
        houseNo: "123 Main Street",
    }
    },
    service: { 
      category: "Repair",
      name: "AC Repair",
      description: "Split AC not cooling properly"
    },
    createdAt: "2025-01-15",
    status: "new",
    assignedTo: "Technician Name",
    priority: "High",
    scheduledDate: "2025-02-15",
    notes: "Customer prefers morning slot"
  };

  const [activeTab, setActiveTab] = useState("details");

  // --- Helpers ---
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "new":
        return "bg-yellow-100 text-yellow-600";
      case "in-progress":
      case "inprogress":
      case "progress":
      case "active":
        return "bg-blue-100 text-blue-600";
      case "completed":
        return "bg-green-100 text-green-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatStatusText = (status) => {
    if (!status) return "New";
    if (["progress", "inprogress", "in-progress"].includes(status.toLowerCase()))
      return "In Progress";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const getRequestId = (orderId) => {
    return orderId ? (orderId.includes("-") ? orderId.split("-")[1] : orderId) : "N/A";
  };

  return (
    <div className="min-h-screen bg-white">
      <Header2 />

      <div className="p-6 ">
        {/* Back Button & Title */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-200 rounded-full transition"
          >
            <IoArrowBack size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-semibold">Service Request Details</h1>
            <p className="text-sm text-gray-500">Request ID: {getRequestId(requestData.orderId)}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(requestData.status)}`}>
            {formatStatusText(requestData.status)}
          </span>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b">
            <div className="flex gap-8 px-6">
              <button
                onClick={() => setActiveTab("details")}
                className={`py-4 font-medium border-b-2 transition ${
                  activeTab === "details"
                    ? "border-[#7EC1B1] text-[#7EC1B1]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Request Details
              </button>
              <button
                onClick={() => setActiveTab("customer")}
                className={`py-4 font-medium border-b-2 transition ${
                  activeTab === "customer"
                    ? "border-[#7EC1B1] text-[#7EC1B1]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Customer Information
              </button>
              {/* <button
                onClick={() => setActiveTab("timeline")}
                className={`py-4 font-medium border-b-2 transition ${
                  activeTab === "timeline"
                    ? "border-[#7EC1B1] text-[#7EC1B1]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Timeline
              </button> */}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Request Details Tab */}
            {activeTab === "details" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Request ID</label>
                    <p className="text-gray-900 font-medium">{getRequestId(requestData.orderId)}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Service Type</label>
                    <p className="text-gray-900 font-medium">{requestData.service?.category || "N/A"}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Service Name</label>
                    <p className="text-gray-900 font-medium">{requestData.service?.name || "N/A"}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Request Date</label>
                    <p className="text-gray-900 font-medium">{formatDate(requestData.createdAt)}</p>
                  </div>

                  {/* <div>
                    <label className="text-sm text-gray-500 block mb-1">Scheduled Date</label>
                    <p className="text-gray-900 font-medium">{formatDate(requestData.scheduledDate)}</p>
                  </div> */}

                  {/* <div>
                    <label className="text-sm text-gray-500 block mb-1">Priority</label>
                    <p className="text-gray-900 font-medium">{requestData.priority || "Normal"}</p>
                  </div> */}

                  {/* <div>
                    <label className="text-sm text-gray-500 block mb-1">Assigned To</label>
                    <p className="text-gray-900 font-medium">{requestData.assignedTo || "Not Assigned"}</p>
                  </div> */}

                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Status</label>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(requestData.status)}`}>
                      {formatStatusText(requestData.status)}
                    </span>
                  </div>
                </div>

                {/* <div>
                  <label className="text-sm text-gray-500 block mb-1">Service Description</label>
                  <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">
                    {requestData.service?.description || "No description provided"}
                  </p>
                </div> */}

                {/* <div>
                  <label className="text-sm text-gray-500 block mb-1">Notes</label>
                  <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">
                    {requestData.notes || "No additional notes"}
                  </p>
                </div> */}
              </div>
            )}

            {/* Customer Information Tab */}
            {activeTab === "customer" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Customer Name</label>
                    <p className="text-gray-900 font-medium">{requestData.customer?.name || "Unknown"}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Email Address</label>
                    <p className="text-gray-900 font-medium">{requestData.customer?.email || "N/A"}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Phone Number</label>
                    <p className="text-gray-900 font-medium">{requestData.customer?.phone || "N/A"}</p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-500 block mb-1">Address</label>
                    <p className="text-gray-900 "> <span className="font-sm text-gray-600">state:</span> {requestData.customer?.address?.state || "N/A"} </p>
                    <p className="text-gray-900 "> <span className="font-sm text-gray-600">city:</span> {requestData.customer?.address?.city || "N/A"} </p>
                    <p className="text-gray-900 "> <span className="font-sm text-gray-600">area:</span> {requestData.customer?.address?.area || "N/A"} </p>
                    <p className="text-gray-900 "> <span className="font-sm text-gray-600">houseNo:</span> {requestData.customer?.address?.houseNo || "N/A"} </p>  
                    <p className="text-gray-900 "> <span className="font-sm text-gray-600">pincode:</span> {requestData.customer?.address?.pincode || "N/A"} </p>  

                  </div>
                </div>
              </div>
            )}

            {/* Timeline Tab */}
            {/* {activeTab === "timeline" && (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-[#7EC1B1] rounded-full"></div>
                    <div className="w-0.5 h-full bg-gray-300"></div>
                  </div>
                  <div className="pb-8">
                    <p className="font-medium text-gray-900">Request Created</p>
                    <p className="text-sm text-gray-500">{formatDate(requestData.createdAt)}</p>
                    <p className="text-sm text-gray-600 mt-1">Service request was submitted by customer</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-[#7EC1B1] rounded-full"></div>
                    <div className="w-0.5 h-full bg-gray-300"></div>
                  </div>
                  <div className="pb-8">
                    <p className="font-medium text-gray-900">Request Assigned</p>
                    <p className="text-sm text-gray-500">{formatDate(requestData.createdAt)}</p>
                    <p className="text-sm text-gray-600 mt-1">Assigned to {requestData.assignedTo}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Scheduled for Service</p>
                    <p className="text-sm text-gray-500">{formatDate(requestData.scheduledDate)}</p>
                    <p className="text-sm text-gray-600 mt-1">Technician visit scheduled</p>
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="px-6 py-2 bg-[#7EC1B1] text-white rounded-lg hover:bg-[#6db09f] transition">
            Update Status
          </button>
          {/* <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
            Assign Technician
          </button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
            Add Notes
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestDetail;