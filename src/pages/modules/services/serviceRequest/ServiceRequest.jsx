import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header2 from "../../../../components/superAdmin/header/Header2";
import { GoEye } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { 
  getAllServiceRequests, 
  clearError 
} from "../../../../redux/slices/serviceRequestSlice"; // Adjust path as needed

const ServiceRequest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const { 
    serviceRequests, 
    totalRequests, 
    totalPages: apiTotalPages,
    loading, 
    error 
  } = useSelector((state) => state.serviceRequest);

  // --- Local State ---
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch service requests when filters change
  useEffect(() => {
    dispatch(getAllServiceRequests({
      limit: entries,
      page: currentPage,
      search: debouncedSearch,
      status: statusFilter
    }));
  }, [dispatch, entries, currentPage, debouncedSearch, statusFilter]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // --- Pagination Logic ---
  const total = totalRequests;
  const totalPages = apiTotalPages || 1;

  // --- Handlers ---
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleEntriesChange = (newEntries) => {
    setEntries(newEntries);
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  // --- Helpers ---
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "new":
        return "text-yellow-600";
      case "in-progress":
      case "inprogress":
      case "progress":
      case "active":
        return "text-blue-600";
      case "completed":
        return "text-green-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
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
    // Handle both orderId and requestId fields
    const id = item.requestId || item.orderId;
    return id || "N/A";
  };

  const getServiceName = (item) => {
    return item.serviceName || item.service?.name || "N/A";
  };

  const getServiceType = (item) => {
    return item.serviceType || item.service?.type || "Service";
  };

  const getCustomerName = (item) => {
    return item.customerName || item.customer?.name || "Unknown";
  };

  const getVisiblePages = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const calculateStartIndex = () => {
    return (currentPage - 1) * entries + 1;
  };

  const calculateEndIndex = () => {
    return Math.min(currentPage * entries, total);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header2 />

      <div className="p-6 pt-5">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Service Request Management</h1>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* --- Controls: Entries | Search | Status --- */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          {/* Entries */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Show</span>
            <select
              value={entries}
              onChange={(e) => handleEntriesChange(Number(e.target.value))}
              className="p-2 border border-gray-300 bg-white rounded-lg w-[70px] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
              disabled={loading}
            >
              {[5, 10, 20, 50].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <span className="text-sm font-medium text-gray-600">Entries</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by customer name or request ID..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full p-2.5 pl-10 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent"
              disabled={loading}
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="p-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] min-w-[160px]"
              disabled={loading}
            >
              <option value="All">All Status</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* --- Table --- */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Sr.No</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Request ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Customer Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Service Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Service Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Request Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#7EC1B1]"></div>
                        <p className="text-gray-500 text-sm">Loading service requests...</p>
                      </div>
                    </td>
                  </tr>
                ) : serviceRequests && serviceRequests.length > 0 ? (
                  serviceRequests.map((item, index) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                        {(currentPage - 1) * entries + index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{getRequestId(item)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{getCustomerName(item)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{getServiceType(item)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{getServiceName(item)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{formatDate(item.requestDate || item.createdAt)}</td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-semibold ${getStatusColor(item.status)}`}>
                          {formatStatusText(item.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <GoEye
                          size={20}
                          className="cursor-pointer text-gray-500 hover:text-[#7EC1B1] transition-colors"
                          onClick={() =>
                            navigate(`/service-request/view/${item._id}`, {
                              state: { request: item },
                            })
                          }
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-12 text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <FiSearch size={40} className="text-gray-300" />
                        <p className="text-base font-medium">No service requests found</p>
                        <p className="text-sm text-gray-400">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Pagination --- */}
        {total > 0 && !loading && (
          <div className="flex items-center justify-between mt-6 bg-white px-6 py-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium text-gray-900">{calculateStartIndex()}</span> to{" "}
              <span className="font-medium text-gray-900">{calculateEndIndex()}</span> of{" "}
              <span className="font-medium text-gray-900">{total}</span> entries
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors font-medium text-sm text-gray-700"
              >
                Previous
              </button>

              {getVisiblePages().map((num) => (
                <button
                  key={num}
                  onClick={() => handlePageChange(num)}
                  disabled={loading}
                  className={`px-4 py-2 border rounded-lg w-[42px] font-medium text-sm transition-colors ${
                    currentPage === num 
                      ? "bg-[#7EC1B1] text-white border-[#7EC1B1]" 
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages || loading}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors font-medium text-sm text-gray-700"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceRequest;