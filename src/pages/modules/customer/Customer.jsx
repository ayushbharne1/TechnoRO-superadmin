

import { useState, useRef } from "react";
import Header2 from "../../../components/superAdmin/header/Header2";
import { FiTrash2 } from "react-icons/fi";
import { GoEye } from "react-icons/go";
import { LuCalendar } from "react-icons/lu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const Customer = () => {
  const [entries, setEntries] = useState(8);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [startDate, endDate] = dateRange;
  const navigate = useNavigate();

  // 🧾 Sample customers
  const customers = [
    {
      id: 1,
      name: "Ajay Kumar",
      phone: "9876543210",
      email: "ajay@example.com",
      registeredDate: "20-12-2025",
      status: "Active",
      address: "123 MG Road, Bengaluru, Karnataka",
      gender: "Male",
    },
    {
      id: 2,
      name: "Ravi Singh",
      phone: "9123456780",
      email: "ravi@example.com",
      registeredDate: "20-12-2025",
      status: "Block",
      address: "45 Park Street, Kolkata, West Bengal",
      gender: "Male",
    },
    {
      id: 3,
      name: "Neha Sharma",
      phone: "9988776655",
      email: "neha@example.com",
      registeredDate: "20-12-2025",
      status: "Active",
      address: "12 MG Road, Pune, Maharashtra",
      gender: "Female",
    },
    {
      id: 4,
      name: "Suresh Yadav",
      phone: "9871122334",
      email: "suresh@example.com",
      registeredDate: "20-12-2025",
      status: "Active",
      address: "5 Brigade Road, Bengaluru, Karnataka",
      gender: "Male",
    },
    {
      id: 5,
      name: "Pooja Verma",
      phone: "9122334455",
      email: "pooja@example.com",
      registeredDate: "20-12-2025",
      status: "Block",
      address: "77 Connaught Place, Delhi",
      gender: "Female",
    },
    {
      id: 6,
      name: "Anil Kumar",
      phone: "9876655443",
      email: "anil@example.com",
      registeredDate: "21-12-2025",
      status: "Active",
      address: "22 Marine Drive, Mumbai, Maharashtra",
      gender: "Male",
    },
     {
      id: 7,
      name: "Suresh Yadav",
      phone: "9871122334",
      email: "suresh@example.com",
      registeredDate: "20-12-2025",
      status: "Active",
      address: "5 Brigade Road, Bengaluru, Karnataka",
      gender: "Male",
    },
    {
      id: 8,
      name: "Pooja Verma",
      phone: "9122334455",
      email: "pooja@example.com",
      registeredDate: "20-12-2025",
      status: "Block",
      address: "77 Connaught Place, Delhi",
      gender: "Female",
    },
    {
      id: 9,
      name: "Anil Kumar",
      phone: "9876655443",
      email: "anil@example.com",
      registeredDate: "21-12-2025",
      status: "Active",
      address: "22 Marine Drive, Mumbai, Maharashtra",
      gender: "Male",
    },
  ];

  // Format date
  const formatToDDMMYYYY = (dateStr) => {
    const [day, month, year] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  // Filters
  const filteredCustomers = customers.filter((cust) => {
    const matchesStatus = statusFilter ? cust.status === statusFilter : true;
    const matchesSearch =
      cust.name.toLowerCase().includes(search.toLowerCase()) ||
      cust.email.toLowerCase().includes(search.toLowerCase());

    let matchesDate = true;
    if (startDate && endDate) {
      const [d, m, y] = cust.registeredDate.split("-");
      const regDate = new Date(`${y}-${m}-${d}`);
      matchesDate = regDate >= startDate && regDate <= endDate;
    }

    return matchesStatus && matchesSearch && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const paginatedCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + entries
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Quick date selects
  const handleQuickSelect = (type) => {
    const today = new Date();
    let start, end;

    switch (type) {
      case "Today":
        start = end = new Date();
        break;
      case "Yesterday":
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        start = end = yesterday;
        break;
      case "This Week":
        const firstDay = new Date();
        firstDay.setDate(today.getDate() - today.getDay());
        start = firstDay;
        end = new Date(firstDay);
        end.setDate(firstDay.getDate() + 6);
        break;
      case "This Month":
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      default:
        return;
    }

    setDateRange([start, end]);
    setShowDatePicker(false);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <Header2 />

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mt-6">

        {/* Filters */}
        <div className="flex flex-col lg:flex-row flex-wrap gap-4 mb-4 justify-between">
          {/* Show entries */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="font-medium text-gray-700">Show</label>
            <select
              className="p-2 border border-[#263138] rounded-md focus:ring-2 focus:ring-[#7EC1B1]"
              value={entries}
              onChange={(e) => {
                setEntries(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="font-medium text-gray-700">entries</span>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="font-medium text-gray-700">Search:</label>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 border border-[#263138] rounded-md focus:ring-2 focus:ring-[#7EC1B1] w-full sm:w-60"
            />
          </div>

          {/* Date Picker */}
          <div className="relative flex items-center gap-2 w-full sm:w-auto">
            <label className="font-medium text-gray-700">Date:</label>
            <div className="relative flex items-center w-full sm:w-64">
              <input
                type="text"
                readOnly
                value={
                  startDate && endDate
                    ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                    : ""
                }
                placeholder="Select date range"
                className="p-2 border border-[#263138] rounded-md w-full pr-10 focus:ring-2 focus:ring-[#7EC1B1] cursor-pointer"
              />
              <LuCalendar
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowDatePicker(!showDatePicker)}
              />
            </div>

            {showDatePicker && (
              <div className="absolute z-50 top-full left-0 mt-2 bg-white shadow-lg rounded-md p-4 flex flex-col sm:flex-row gap-4">
                {/* Quick selects */}
                <div className="flex flex-col justify-between sm:pr-4">
                  <div className="flex flex-col gap-2">
                    {["Today", "Yesterday", "This Week", "This Month"].map(
                      (item) => (
                        <button
                          key={item}
                          className="text-left text-gray-700 hover:text-blue-600 transition"
                          onClick={() => handleQuickSelect(item)}
                        >
                          {item}
                        </button>
                      )
                    )}
                  </div>
                  <button
                    className="text-left text-blue-600 mt-4 hover:underline"
                    onClick={() => setShowDatePicker(false)}
                  >
                    Cancel
                  </button>
                </div>

                {/* Calendar */}
                <div>
                  <DatePicker
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => setDateRange(update)}
                    inline
                  />
                </div>
              </div>
            )}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="font-medium text-gray-700">Status:</label>
            <select
              className="p-2 border border-[#263138] rounded-md focus:ring-2 focus:ring-[#7EC1B1]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="Active">Active</option>
              <option value="Block">Block</option>
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="max-h-[600px] overflow-y-auto border border-gray-500 ">

          <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
            <thead className="bg-[#CACACA] text-gray-700 text-base">
              <tr>
                {[
                  "Sr. No.",
                  "Name",
                  "Phone",
                  "Email",
                  "Address",
                  "Gender",
                  "Registered Date",
                  "Status",
                  "Action",
                ].map((head) => (
                  <th key={head} className="p-3 font-semibold">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-center">
              {paginatedCustomers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-6 text-gray-400">
                    No data available
                  </td>
                </tr>
              ) : (
                paginatedCustomers.map((cust, idx) => (
                  <tr
                    key={cust.id}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="p-3">{startIndex + idx + 1}</td>
                    <td className="p-3">{cust.name}</td>
                    <td className="p-3">{cust.phone}</td>
                    <td className="p-3">{cust.email}</td>
                    <td className="p-3">{cust.address}</td>
                    <td className="p-3">{cust.gender}</td>
                    <td className="p-3">
                      {formatToDDMMYYYY(cust.registeredDate)}
                    </td>
                    <td
                      className={`p-3 font-bold ${
                        cust.status === "Active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {cust.status}
                    </td>
                    <td className="p-3 flex justify-center gap-2">
                      <GoEye
                        className="text-blue-600 w-5 h-5 cursor-pointer"
                        onClick={() =>
                          navigate(`/customers/view-customer/${cust.id}`, {
                            state: { customer: cust },
                          })
                        }
                      />
                      <FiTrash2 className="text-red-600 w-5 h-5 cursor-pointer" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden flex flex-col gap-4">
          {paginatedCustomers.length === 0 ? (
            <div className="text-center p-6 text-gray-400">
              No data available
            </div>
          ) : (
            paginatedCustomers.map((cust) => (
              <div
                key={cust.id}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
              >
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="font-semibold">Name:</span>
                  <span>{cust.name}</span>
                  <span className="font-semibold">Phone:</span>
                  <span>{cust.phone}</span>
                  <span className="font-semibold">Email:</span>
                  <span>{cust.email}</span>
                  <span className="font-semibold">Address:</span>
                  <span>{cust.address}</span>
                  <span className="font-semibold">Gender:</span>
                  <span>{cust.gender}</span>
                  <span className="font-semibold">Registered:</span>
                  <span>{formatToDDMMYYYY(cust.registeredDate)}</span>
                  <span className="font-semibold">Status:</span>
                  <span
                    className={`font-bold ${
                      cust.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {cust.status}
                  </span>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <GoEye
                    className="text-blue-600 w-5 h-5 cursor-pointer"
                    onClick={() =>
                      navigate(`/customers/view-customer/${cust.id}`, {
                        state: { customer: cust },
                      })
                    }
                  />
                  <FiTrash2 className="text-red-600 w-5 h-5 cursor-pointer" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2 text-sm">
            <div className="text-gray-700">
              Showing {startIndex + 1}–{startIndex + paginatedCustomers.length}{" "}
              of {filteredCustomers.length} entries
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === i + 1 ? "bg-[#7EC1B1] text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
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

export default Customer;
