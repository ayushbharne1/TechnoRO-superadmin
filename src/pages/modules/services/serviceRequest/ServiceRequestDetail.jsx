import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header2 from "../../../../components/superAdmin/header/Header2";
import { IoArrowBack } from "react-icons/io5";
import { 
  getServiceRequestById, 
  updateServiceRequestStatus,
  clearError,
  clearSuccess,
  clearCurrentRequest
} from "../../../../redux/slices/serviceRequestSlice"; // Adjust path as needed

const ServiceRequestDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  // Redux state
  const { 
    currentRequest, 
    detailLoading, 
    updateLoading,
    error,
    updateSuccess 
  } = useSelector((state) => state.serviceRequest);

  // Local state
  const [activeTab, setActiveTab] = useState("details");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  // Fetch service request details on mount
  useEffect(() => {
    if (id) {
      dispatch(getServiceRequestById(id));
    }

    // Cleanup on unmount
    return () => {
      dispatch(clearCurrentRequest());
      dispatch(clearError());
      dispatch(clearSuccess());
    };
  }, [dispatch, id]);

  // Handle successful status update
  useEffect(() => {
    if (updateSuccess) {
      setShowStatusModal(false);
      setSelectedStatus("");
      // Optionally show success message
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 3000);
    }
  }, [updateSuccess, dispatch]);

  // Set initial status when request loads
  useEffect(() => {
    if (currentRequest?.status) {
      setSelectedStatus(currentRequest.status);
    }
  }, [currentRequest]);

  // Handle status update
  const handleStatusUpdate = () => {
    if (id && selectedStatus && selectedStatus !== currentRequest?.status) {
      dispatch(updateServiceRequestStatus({ 
        id, 
        status: selectedStatus 
      }));
    }
  };

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

  const getRequestId = (item) => {
    const id = item?.requestId || item?.orderId;
    return id || "N/A";
  };

  // Loading state
  if (detailLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header2 />
        <div className="p-6">
          <div className="flex items-center justify-center h-96">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7EC1B1]"></div>
              <p className="text-gray-500">Loading service request details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !currentRequest) {
    return (
      <div className="min-h-screen bg-white">
        <Header2 />
        <div className="p-6">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <p className="text-red-600 text-lg mb-4">{error}</p>
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-[#7EC1B1] text-white rounded-lg hover:bg-[#6db09f] transition"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!currentRequest) {
    return (
      <div className="min-h-screen bg-white">
        <Header2 />
        <div className="p-6">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <p className="text-gray-500 text-lg mb-4">Service request not found</p>
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-[#7EC1B1] text-white rounded-lg hover:bg-[#6db09f] transition"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const requestData = currentRequest;

  return (
    <div className="min-h-screen bg-white">
      <Header2 />

      <div className="p-6">
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
            <p className="text-sm text-gray-500">Request ID: {getRequestId(requestData)}</p>
          </div>
        </div>

        {/* Success Message */}
        {updateSuccess && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm">Status updated successfully!</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

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
                    <p className="text-gray-900 font-medium">{getRequestId(requestData)}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Service Type</label>
                    <p className="text-gray-900 font-medium">
                      {requestData.serviceType || requestData.service?.category || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Service Name</label>
                    <p className="text-gray-900 font-medium">
                      {requestData.serviceName || requestData.service?.name || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Request Date</label>
                    <p className="text-gray-900 font-medium">
                      {formatDate(requestData.requestDate || requestData.createdAt)}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Status</label>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(requestData.status)}`}>
                      {formatStatusText(requestData.status)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Customer Information Tab */}
            {activeTab === "customer" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Customer Name</label>
                    <p className="text-gray-900 font-medium">
                      {requestData.fullName || requestData.customer?.name || "Unknown"}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Email Address</label>
                    <p className="text-gray-900 font-medium">
                      {requestData.email || requestData.customer?.email || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Phone Number</label>
                    <p className="text-gray-900 font-medium">
                      {requestData.phoneNumber || requestData.customer?.phone || "N/A"}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-500 block mb-2">Address</label>
                    {requestData.addressDetails || requestData.customer?.address ? (
                      <div className="space-y-1">
                        <p className="text-gray-900">
                          <span className="text-sm text-gray-600">State: </span>
                          {requestData.state || requestData.addressDetails?.state || requestData.customer?.address?.state || "N/A"}
                        </p>
                        <p className="text-gray-900">
                          <span className="text-sm text-gray-600">City: </span>
                          {requestData.city || requestData.addressDetails?.city || requestData.customer?.address?.city || "N/A"}
                        </p>
                        <p className="text-gray-900">
                          <span className="text-sm text-gray-600">Area: </span>
                          {requestData.addressDetails?.roadName || requestData.addressDetails?.nearByPlace || requestData.customer?.address?.area || "N/A"}
                        </p>
                        <p className="text-gray-900">
                          <span className="text-sm text-gray-600">House No: </span>
                          {requestData.addressDetails?.houseNo || requestData.customer?.address?.houseNo || "N/A"}
                        </p>
                        <p className="text-gray-900">
                          <span className="text-sm text-gray-600">Pincode: </span>
                          {requestData.pinCode || requestData.addressDetails?.pinCode || requestData.customer?.address?.pincode || "N/A"}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-900">N/A</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button 
            onClick={() => setShowStatusModal(true)}
            disabled={updateLoading}
            className="px-6 py-2 bg-[#7EC1B1] text-white rounded-lg hover:bg-[#6db09f] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updateLoading ? "Updating..." : "Update Status"}
          </button>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Update Request Status</h2>
            
            <div className="mb-6">
              <label className="text-sm text-gray-700 block mb-2">Select Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
                disabled={updateLoading}
              >
                <option value="">Select status...</option>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleStatusUpdate}
                disabled={updateLoading || !selectedStatus || selectedStatus === currentRequest?.status}
                className="flex-1 px-4 py-2 bg-[#7EC1B1] text-white rounded-lg hover:bg-[#6db09f] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateLoading ? "Updating..." : "Update"}
              </button>
              <button
                onClick={() => {
                  setShowStatusModal(false);
                  setSelectedStatus(currentRequest?.status || "");
                }}
                disabled={updateLoading}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceRequestDetail;