import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../../../redux/slices/leadSlice"; 
import Header2 from "../../../components/superAdmin/header/Header2";
import { GoEye } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { Loader2 } from "lucide-react";

const LeadManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // --- Local State ---
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  // --- Redux State ---
  const leadsState = useSelector((state) => state.leads || {});
  const leads = leadsState.leads || [];
  const loading = leadsState.loading || false;
  const pagination = leadsState.pagination || {};

  // --- Logic for Totals ---
  // If API 'total' is missing, use 'leads.length' fallback
  const total = pagination.total || pagination.totalRecords || leads.length || 0;
  // Calculate total pages manually to ensure accuracy
  const totalPages = total > 0 ? Math.ceil(total / entries) : 1;

  // --- Fetch Data Effect ---
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchLeads({ 
        page: currentPage, 
        limit: entries, 
        search: search, 
        status: statusFilter === "All" ? "" : statusFilter 
      }));
    }, 500);
    return () => clearTimeout(timer);
  }, [dispatch, currentPage, entries, search, statusFilter]);

  // --- Handlers ---
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // --- Helpers ---
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "new": return "text-yellow-500";
      case "in-progress": 
      case "inprogress": 
      case "progress": 
      case "active": return "text-blue-500"; 
      case "completed": return "text-green-600";
      case "cancelled": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const formatStatusText = (status) => {
    if (!status) return "New";
    // Normalize backend status strings to Readable text
    if (['progress', 'inprogress', 'in-progress'].includes(status.toLowerCase())) return "In Progress";
    // Capitalize first letter
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString('en-GB'); 
  };

  const getLeadId = (orderId) => {
      return orderId ? (orderId.includes('-') ? orderId.split('-')[1] : orderId) : 'N/A';
  }

  const getProductModel = (service) => {
    return service?.name || "N/A";
  };

  // Sliding Window for Page Numbers (Logic from Redux version, Style from Dummy)
  const getVisiblePages = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const handleClick = () => {
    navigate("/lead-management/add");
  }

  return (
    <div className="w-full max-w-full bg-white p-4 overflow-y-auto flex flex-col gap-6 font-[Poppins]">
      <Header2 title="Lead Management" />

      <div className="bg-white flex flex-col gap-5">

        {/* --- Controls: Entries | Search | Status --- */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
          
          {/* Entries */}
          <div className="flex items-center gap-2">
            <span className="font-poppins text-[16px]">Show</span>
            <select
              value={entries}
              onChange={(e) => {
                setEntries(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="p-2 border bg-gray-100 rounded w-[60px] focus:outline-none"
            >
              {[5, 10, 20, 50].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            <span className="font-poppins text-[16px]">Entries</span>
          </div>

          {/* Search */}
          <div className="flex-1 flex justify-center w-full sm:w-auto">
            <div className="relative w-full max-w-[300px]">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                }}
                className="w-full p-2 pl-10 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            
            <select
              value={statusFilter}
              onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
              }}
              className="p-2 border rounded bg-gray-100 focus:outline-none"
            >
              <option value="All">Select Status</option>
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <button
            onClick={handleClick}
            className="w-full sm:w-[200px] h-[40px] bg-[#7EC1B1] text-white rounded-lg font-poppins text-[16px]"
          >
            Add lead
          </button>
          </div>
        </div>

        {/* --- Table --- */}
        <div className="overflow-x-auto">
          <table className="table-auto  w-full border border-gray-300 min-w-[500px] sm:min-w-0">
            <thead className="bg-gray-100 border border-gray-300 hidden sm:table-header-group">
              <tr className="text-center">
                <th className="p-3 font-poppins font-medium text-[18px]">Sr.No</th>
                <th className="p-3 font-poppins font-medium text-[18px]">Lead ID</th>
                <th className="p-3 font-poppins font-medium text-[18px]">Customer Name</th>
                <th className="p-3 font-poppins font-medium text-[18px]">Service Type</th>
                <th className="p-3 font-poppins font-medium text-[18px]">Product Model</th>
                <th className="p-3 font-poppins font-medium text-[18px]">Order Date</th>
                <th className="p-3 font-poppins font-medium text-[18px]">Status</th>
                <th className="p-3 font-poppins font-medium text-[18px]">Action</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {loading ? (
                 <tr><td colSpan="8" className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-[#7EC1B1]" /></td></tr>
              ) : leads.length > 0 ? (
                leads.map((item, index) => (
                  <tr
                    key={item._id || index}
                    className="bg-white border border-gray-300 sm:table-row block mb-4 sm:mb-0 rounded-lg sm:rounded-none sm:border-0 sm:border-b"
                  >
                    <td className="p-2 sm:p-3 block sm:table-cell text-left sm:text-center">
                      <span className="font-semibold sm:hidden">S.No: </span>{(currentPage - 1) * entries + index + 1}
                    </td>
                    <td className="p-2 sm:p-3 block sm:table-cell text-left sm:text-center">
                      <span className="font-semibold sm:hidden">Lead ID: </span>{getLeadId(item.orderId)}
                    </td>
                    <td className="p-2 sm:p-3 block sm:table-cell text-left sm:text-center">
                      <span className="font-semibold sm:hidden">Customer: </span>{item.customer?.name || "Unknown"}
                    </td>
                    <td className="p-2 sm:p-3 block sm:table-cell text-left sm:text-center">
                      <span className="font-semibold sm:hidden">Service: </span>{item.service?.category || "Service"}
                    </td>
                    <td className="p-2 sm:p-3 block sm:table-cell text-left sm:text-center">
                      <span className="font-semibold sm:hidden">Model: </span>{getProductModel(item.service)}
                    </td>
                    <td className="p-2 sm:p-3 block sm:table-cell text-left sm:text-center">
                      <span className="font-semibold sm:hidden">Date: </span>{formatDate(item.createdAt)}
                    </td>
                    <td className={`p-2 sm:p-3 block sm:table-cell text-left sm:text-center font-medium ${getStatusColor(item.status)}`}>
                      <span className="font-semibold sm:hidden">Status: </span>{formatStatusText(item.status)}
                    </td>
                    <td className="p-2 sm:p-3 block sm:table-cell text-left sm:text-center">
                      <span className="font-semibold sm:hidden">Action: </span>
                      <GoEye
                        className="text-blue-600 w-5 h-5 cursor-pointer hover:scale-110 transition inline-block"
                        onClick={() => navigate(`/lead-management/view/${item._id}`, { state: { lead: item } })}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-4 text-gray-500 text-center font-poppins">
                    No leads found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* --- Pagination --- */}
        {(total > 0 || leads.length > 0) && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 flex-wrap border border-t-0 border-gray-300  text-black p-3">
            
            <span>
                Showing {Math.min((currentPage - 1) * entries + 1, total)} to {Math.min(currentPage * entries, total)} of {total} entries
            </span>

            <div className="flex flex-wrap gap-2 text-[#7EC1B1] justify-center">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-[#7EC1B1] rounded-lg disabled:opacity-100"
                >
                Previous
                </button>
                
                {getVisiblePages().map((num) => (
                    <button
                        key={num}
                        onClick={() => handlePageChange(num)}
                        className={`p-2 border rounded-lg border-[#7EC1B1] w-[36px] ${
                        currentPage === num ? "bg-[#7EC1B1] text-white" : ""
                        }`}
                    >
                        {num}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="px-3 py-1 border border-[#7EC1B1] rounded-lg disabled:opacity-100"
                >
                Next
                </button>
            </div>
            </div>
        )}
        </div>

       

      </div>
    </div>
  );
};

export default LeadManagement;