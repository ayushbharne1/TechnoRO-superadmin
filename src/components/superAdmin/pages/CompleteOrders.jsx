

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "./PageHeader";

const CompleteOrders = () => {
  const navigate = useNavigate();

  const gotoPreview = (order) => {
    navigate("/CompleteOrdersPreview", { state: { order } });
  };

  const orders = [
    { id: 6010, date: "01-02-2026", partner: "Anurag Singh", status: "Completed", hireType: "Random", credit: 0 },
    { id: 6008, date: "01-02-2026", partner: "D. N. Patel", status: "Completed", hireType: "Random", credit: 0 },
    { id: 6007, date: "01-02-2026", partner: "Aarti Dev", status: "Completed", hireType: "Random", credit: 0 },
    { id: 6006, date: "01-02-2026", partner: "Anurag Singh", status: "Completed", hireType: "Random", credit: 0 },
    { id: 6005, date: "01-02-2026", partner: "D. N. Patel", status: "Completed", hireType: "Random", credit: 0 },
    { id: 6004, date: "01-02-2026", partner: "Aarti Dev", status: "Completed", hireType: "Random", credit: 0 },
    { id: 6003, date: "31-01-2026", partner: "Anurag Singh", status: "Completed", hireType: "Random", credit: 0 },
    { id: 6002, date: "31-01-2026", partner: "D. N. Patel", status: "Completed", hireType: "Random", credit: 0 },
    { id: 6001, date: "31-01-2026", partner: "Aarti Dev", status: "Completed", hireType: "Random", credit: 0 },
    { id: 6000, date: "31-01-2026", partner: "Anurag Singh", status: "Completed", hireType: "Random", credit: 0 },
    { id: 5999, date: "30-01-2026", partner: "D. N. Patel", status: "Completed", hireType: "Random", credit: 0 },
  ];

  const [entries, setEntries] = useState(10); // dropdown display only
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter based on search
  const filteredOrders = orders.filter((order) =>
    order.partner.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination (always 10 per page)
  const totalPages = Math.ceil(filteredOrders.length / 10);
  const safeCurrentPage = Math.min(currentPage, totalPages === 0 ? 1 : totalPages);
  const startIndex = (safeCurrentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="space-y-4 min-h-screen font-[Poppins] px-2 sm:px-4">
      {/* Page Header */}
      <PageHeader
        entries={entries}
        setEntries={(value) => {
          setEntries(value); // dropdown display
        }}
        search={search}
        setSearch={setSearch}
      />

      {/* Table */}
      <div className="bg-white rounded-md shadow p-4 overflow-x-auto">
        <table className="min-w-[900px] w-full border border-gray-300 text-base border-collapse">
          <thead className="bg-gray-200 text-left text-lg">
            <tr>
              {["Sr. No.", "Order Id", "Order Date", "Service Partner Name", "Status", "Hire Type", "Credit Required?", "Preview Data"].map((head, idx) => (
                <th key={idx} className="px-4 py-3 ">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentOrders.length > 0 ? (
              currentOrders.map((order, index) => (
                <tr key={order.id} className="even:bg-white odd:bg-gray-100 text-gray-700">
                  <td className="px-4 py-3 ">{startIndex + index + 1}</td>
                  <td className="px-4 py-3 ">{order.id}</td>
                  <td className="px-4 py-3 ">{order.date}</td>
                  <td className="px-4 py-3 ">{order.partner}</td>
                  <td className="px-4 py-3 ">{order.status}</td>
                  <td className="px-4 py-3 ">{order.hireType}</td>
                  <td className="px-4 py-3  text-center">{order.credit}</td>
                  <td className="px-4 py-3 ">
                    <button
                      onClick={() => gotoPreview(order)}
                      className="bg-[#7EC1B1] text-white px-3 py-1 rounded-2xl hover:bg-[#7EC1B1]"
                    >
                      Preview
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No matching records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm mt-4">
        <p>
          Showing {startIndex + 1} to {Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} Entries
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
                safeCurrentPage === i + 1 ? "bg-[#7EC1B1] text-white" : "bg-white border border-[#7EC1B1] text-[#7EC1B1]"
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

export default CompleteOrders;
