import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header2 from "../../../../components/superAdmin/header/Header2";
import { GoEye } from "react-icons/go";
import { FiSearch } from "react-icons/fi";

const ServiceRequest = () => {
  const navigate = useNavigate();

  // --- Local State ---
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  // --- Dummy Data ---
  const dummyRequests = [
    {
      _id: "1",
      orderId: "SR-001",
      customer: { 
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+91 9876543210",
        address: "123 Main Street, Mumbai, Maharashtra, 400001"
      },
      service: { 
        type: "Service", 
        name: "RO Repair",
        description: "RO water purifier not working properly, need urgent repair"
      },
      createdAt: "2025-01-15",
      status: "new",
      assignedTo: "Rajesh Kumar",
      priority: "High",
      scheduledDate: "2025-02-15",
      notes: "Customer prefers morning slot between 9 AM to 12 PM"
    },
    {
      _id: "2",
      orderId: "SR-002",
      customer: { 
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+91 9876543211",
        address: "456 Park Avenue, Delhi, 110001"
      },
      service: { 
        type: "Service", 
        name: "Filter Repair",
        description: "Water filter needs replacement and cleaning"
      },
      createdAt: "2025-01-20",
      status: "in-progress",
      assignedTo: "Amit Sharma",
      priority: "Medium",
      scheduledDate: "2025-02-18",
      notes: "Customer available after 2 PM"
    },
    {
      _id: "3",
      orderId: "SR-003",
      customer: { 
        name: "Mike Johnson",
        email: "mike.j@example.com",
        phone: "+91 9876543212",
        address: "789 Lake View, Bangalore, 560001"
      },
      service: { 
        type: "Service", 
        name: "RO Cleaning",
        description: "Regular maintenance and deep cleaning required"
      },
      createdAt: "2025-01-25",
      status: "completed",
      assignedTo: "Priya Verma",
      priority: "Low",
      scheduledDate: "2025-02-10",
      notes: "Completed successfully"
    },
    {
      _id: "4",
      orderId: "SR-004",
      customer: { 
        name: "Sarah Williams",
        email: "sarah.w@example.com",
        phone: "+91 9876543213",
        address: "321 Garden Street, Pune, 411001"
      },
      service: { 
        type: "Service", 
        name: "RO Repair",
        description: "Emergency repair needed"
      },
      createdAt: "2025-01-28",
      status: "cancelled",
      assignedTo: "Not Assigned",
      priority: "High",
      scheduledDate: "2025-02-20",
      notes: "Customer cancelled due to relocation"
    },
    {
      _id: "5",
      orderId: "SR-005",
      customer: { 
        name: "Robert Williams",
        email: "robert.w@example.com",
        phone: "+91 9876543214",
        address: "555 Mountain View, Hyderabad, 500001"
      },
      service: { 
        type: "AMC", 
        name: "3 Months Plan",
        description: "Annual maintenance contract for 3 months"
      },
      createdAt: "2025-01-28",
      status: "new",
      assignedTo: "Suresh Reddy",
      priority: "Normal",
      scheduledDate: "2025-03-01",
      notes: "AMC plan starting from March"
    },
  ];

  // --- Filtering Logic ---
  const filteredRequests = dummyRequests.filter((item) => {
    const matchesStatus =
      statusFilter === "All" || item.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch =
      search === "" ||
      item.customer?.name.toLowerCase().includes(search.toLowerCase()) ||
      item.orderId.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // --- Pagination Logic ---
  const total = filteredRequests.length;
  const totalPages = total > 0 ? Math.ceil(total / entries) : 1;
  const startIndex = (currentPage - 1) * entries;
  const endIndex = startIndex + entries;
  const paginatedRequests = filteredRequests.slice(startIndex, endIndex);

  // --- Handlers ---
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
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

  const getRequestId = (orderId) => {
    return orderId ? (orderId.includes("-") ? orderId.split("-")[1] : orderId) : "N/A";
  };

  const getProductModel = (service) => {
    return service?.name || "N/A";
  };

  const getVisiblePages = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header2 />

      <div className="p-6 pt-5">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Service Request Management</h1>

        {/* --- Controls: Entries | Search | Status --- */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          {/* Entries */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Show</span>
            <select
              value={entries}
              onChange={(e) => {
                setEntries(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="p-2 border border-gray-300 bg-white rounded-lg w-[70px] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
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
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2.5 pl-10 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="p-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] min-w-[160px]"
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
                {paginatedRequests.length > 0 ? (
                  paginatedRequests.map((item, index) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                        {(currentPage - 1) * entries + index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{getRequestId(item.orderId)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.customer?.name || "Unknown"}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.service?.type || "Service"}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{getProductModel(item.service)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{formatDate(item.createdAt)}</td>
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
        {total > 0 && (
          <div className="flex items-center justify-between mt-6 bg-white px-6 py-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium text-gray-900">{Math.min((currentPage - 1) * entries + 1, total)}</span> to{" "}
              <span className="font-medium text-gray-900">{Math.min(currentPage * entries, total)}</span> of{" "}
              <span className="font-medium text-gray-900">{total}</span> entries
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors font-medium text-sm text-gray-700"
              >
                Previous
              </button>

              {getVisiblePages().map((num) => (
                <button
                  key={num}
                  onClick={() => handlePageChange(num)}
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
                disabled={currentPage >= totalPages}
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