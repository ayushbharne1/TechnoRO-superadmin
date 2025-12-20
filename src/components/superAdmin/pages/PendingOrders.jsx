import { useState } from "react";
import PageHeader from "./PageHeader";
import PendingOrderDecision from "./PendingOrderDecision";
import PendingOrderPrev from "./PendingOrderPrev";

const PendingOrders = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleComponentChange = (component, order) => {
    setActiveComponent(component);
    setSelectedOrder(order);
  };

  const handleBack = () => {
    setActiveComponent(null);
    setSelectedOrder(null);
  };

  // Expanded dummy data with all fields
  const tableItem = [
    {
      id: 1,
      orderId: 6019,
      orderDate: "01-02-2026",
      partnerName: "Anurag Singh",
      status: "Pending",
      hireType: "Full-Time",
      creditRequired: 100,
    },
    {
      id: 2,
      orderId: 6020,
      orderDate: "02-02-2026",
      partnerName: "D. N. Patel",
      status: "Pending",
      hireType: "Part-Time",
      creditRequired: 50,
    },
    {
      id: 3,
      orderId: 6018,
      orderDate: "01-02-2026",
      partnerName: "Aarti Dev",
      status: "Pending",
      hireType: "Contract",
      creditRequired: 0,
    },
    {
      id: 4,
      orderId: 6016,
      orderDate: "01-02-2026",
      partnerName: "Anurag Singh",
      status: "Pending",
      hireType: "Full-Time",
      creditRequired: 200,
    },
    {
      id: 5,
      orderId: 6017,
      orderDate: "01-02-2026",
      partnerName: "D. N. Patel",
      status: "Pending",
      hireType: "Part-Time",
      creditRequired: 75,
    },
    {
      id: 6,
      orderId: 6016,
      orderDate: "01-02-2026",
      partnerName: "Aarti Dev",
      status: "Pending",
      hireType: "Contract",
      creditRequired: 0,
    },
    {
      id: 7,
      orderId: 6015,
      orderDate: "01-02-2026",
      partnerName: "Anurag Singh",
      status: "Pending",
      hireType: "Full-Time",
      creditRequired: 150,
    },
    {
      id: 8,
      orderId: 6014,
      orderDate: "31-01-2026",
      partnerName: "D. N. Patel",
      status: "Pending",
      hireType: "Part-Time",
      creditRequired: 50,
    },
    {
      id: 9,
      orderId: 6013,
      orderDate: "31-01-2026",
      partnerName: "Aarti Dev",
      status: "Pending",
      hireType: "Contract",
      creditRequired: 0,
    },
    {
      id: 10,
      orderId: 6012,
      orderDate: "31-01-2026",
      partnerName: "Anurag Singh",
      status: "Pending",
      hireType: "Full-Time",
      creditRequired: 120,
    },
    {
      id: 11,
      orderId: 6011,
      orderDate: "31-01-2026",
      partnerName: "Aarti Dev",
      status: "Pending",
      hireType: "Contract",
      creditRequired: 0,
    },
  ];

  const filteredItems = tableItem.filter((item) =>
    item.partnerName.toLowerCase().includes(search.toLowerCase())
  );

  const entriesPerPage = 10; // Fixed for pagination
const totalPages = Math.ceil(filteredItems.length / entriesPerPage);
const safeCurrentPage = currentPage > totalPages ? totalPages : currentPage;
const startIndex = (safeCurrentPage - 1) * entriesPerPage;
const endIndex = startIndex + entriesPerPage;
const currentItems = filteredItems.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  return (
    <>
      {!activeComponent && (
        <div className="space-y-4 min-h-screen font-[Poppins] px-2 sm:px-4">
          {/* Header */}
          <section className="w-full flex text-sm justify-between p-3 bg-white rounded-xs">
         <PageHeader
  entries={entries}
  setEntries={(value) => {
    setEntries(value);
    setCurrentPage(1); // Reset page on dropdown change
  }}
  search={search}
  setSearch={(value) => {
    setSearch(value);
    setCurrentPage(1); // Reset page on search change
  }}
/>

          </section>

          {/* Table */}
          <section className="bg-white rounded-xs shadow mb-1 p-4 overflow-x-auto space-y-4">
            <table className="border w-full text-base border-collapse bg-white shadow-md rounded-lg border-[#D9D9D9] min-w-[900px]">
              <thead className="bg-[#D9D9D9] text-left text-lg">
                <tr>
                  {[
                    "Sr. No.",
                    "Order Id",
                    "Order Date",
                    "Service Partner Name",
                    "Current Status",
                    "Hire Type",
                    "Credit Required?",
                    "Preview Data",
                    "Action",
                  ].map((head, idx) => (
                    <th key={idx} className="px-4 py-3">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item) => (
                    <tr key={item.id} className="even:bg-white odd:bg-gray-100">
                      <td className="px-4 py-3">{item.id}</td>
                      <td className="px-4 py-3">{item.orderId}</td>
                      <td className="px-4 py-3">{item.orderDate}</td>
                      <td className="px-4 py-3">{item.partnerName}</td>
                      <td className="px-4 py-3 text-[#25803D] font-medium">
                        {item.status}
                      </td>
                      <td className="px-4 py-3">{item.hireType}</td>
                      <td className="px-4 py-3 text-center align-middle">
                        {item.creditRequired}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleComponentChange("preview", item)}
                          className="cursor-pointer hover:bg-[#25803D] bg-[#7EC1B1] px-4 py-2 text-sm text-white rounded-3xl transition"
                        >
                          Preview
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() =>
                            handleComponentChange("decision", item)
                          }
                          className="cursor-pointer hover:bg-[#25803D] bg-[#7EC1B1] px-4 py-2 text-sm text-white rounded-3xl transition"
                        >
                          Decision
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-gray-500">
                      No matching records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>


            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm mt-4">
              <p>
                Showing {startIndex + 1} to {Math.min(endIndex, filteredItems.length)} of{" "}
                {filteredItems.length} Entries
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
          </section>
        </div>
      )}

      {activeComponent === "preview" && (
        <PendingOrderPrev order={selectedOrder} onBack={handleBack} />
      )}
      {activeComponent === "decision" && (
        <PendingOrderDecision order={selectedOrder} onBack={handleBack} />
      )}
    </>
  );
};

export default PendingOrders;