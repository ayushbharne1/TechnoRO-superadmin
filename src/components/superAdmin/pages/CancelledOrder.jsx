import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "./PageHeader";

const CancelledOrder = () => {
  const navigate = useNavigate();

  const gotoPreview = (order) => {
    navigate("/CancelledOrderPreview", { state: { order } });
  };

  // Dummy orders data
  const orders = [
    { id: 6010, date: "01-02-2026", status: "Cancelled", hireType: "Random" },
    { id: 6008, date: "01-02-2026", status: "Cancelled", hireType: "Random" },
    { id: 6007, date: "01-02-2026", status: "Cancelled", hireType: "Random" },
    { id: 6006, date: "01-02-2026", status: "Cancelled", hireType: "Random" },
    { id: 6005, date: "01-02-2026", status: "Cancelled", hireType: "Random" },
    { id: 6004, date: "01-02-2026", status: "Cancelled", hireType: "Random" },
    { id: 6003, date: "31-01-2026", status: "Cancelled", hireType: "Random" },
    { id: 6002, date: "31-01-2026", status: "Cancelled", hireType: "Random" },
    { id: 6001, date: "31-01-2026", status: "Cancelled", hireType: "Random" },
  ];

  const [entries, setEntries] = useState(10); // Dropdown, not for actual pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination calculation (always 10 per page)
  const totalPages = Math.ceil(orders.length / 10);
  const safeCurrentPage = Math.min(currentPage, totalPages === 0 ? 1 : totalPages);
  const startIndex = (safeCurrentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const currentOrders = orders.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="space-y-4 min-h-screen font-[Poppins] px-2 sm:px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full p-4 bg-white rounded-md shadow">
        <PageHeader
          entries={entries}
          setEntries={(value) => {
            setEntries(value);
            setCurrentPage(1);
          }}
          search={""} // No search implemented yet
          setSearch={() => {}}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-md shadow p-4 overflow-x-auto">
        <table className="min-w-[900px] w-full border border-gray-300 text-base border-collapse">
          <thead className="bg-gray-200 text-left text-lg">
            <tr>
              {["Sr. No.", "Order Id", "Order Date", "Status", "Hire Type", "Preview Data"].map((head, idx) => (
                <th key={idx} className="px-4 py-3 ">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr key={order.id} className="even:bg-white odd:bg-gray-100 text-gray-700">
                <td className="px-4 py-3 ">{startIndex + index + 1}</td>
                <td className="px-4 py-3 ">{order.id}</td>
                <td className="px-4 py-3 ">{order.date}</td>
                <td className="px-4 py-3 ">{order.status}</td>
                <td className="px-4 py-3 ">{order.hireType}</td>
                <td className="px-4 py-3 ">
                  <button
                    onClick={() => gotoPreview(order)}
                    className="bg-teal-400 text-white px-3 py-1 rounded-xl hover:bg-teal-500 transition"
                  >
                    Preview
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm mt-4">
        <p>
          Showing {startIndex + 1} to {Math.min(endIndex, orders.length)} of {orders.length} Entries
        </p>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => handlePageChange(safeCurrentPage - 1)}
            className="bg-white border border-[#7EC1B1] px-4 py-2 text-[#7EC1B1] rounded-2xl disabled:opacity-50"
            disabled={safeCurrentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded-xl ${
                safeCurrentPage === i + 1
                  ? "bg-[#7EC1B1] text-white"
                  : "bg-white border border-[#7EC1B1] text-[#7EC1B1]"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(safeCurrentPage + 1)}
            className="bg-white border border-[#7EC1B1] px-4 py-2 text-[#7EC1B1] rounded-2xl disabled:opacity-50"
            disabled={safeCurrentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelledOrder;
