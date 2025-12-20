

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header2 from "../../../components/superAdmin/header/Header2";
import { GoEye } from "react-icons/go";
import searchIcon from "../../../assets/search.png";

const Order = () => {
  const navigate = useNavigate();
  const [orders] = useState([
    { id: 1, orderId: "OD54487", customerName: "Ajay Kumar", product: "Kent Grand Plus RO", orderDate: "21-10-2025", status: "New" },
    { id: 2, orderId: "OD54488", customerName: "Ravi Singh", product: "Kent Grand Plus RO", orderDate: "21-10-2025", status: "New" },
    { id: 3, orderId: "OD54489", customerName: "Priya Sharma", product: "Kent Grand Plus RO", orderDate: "21-10-2025", status: "In-progress" },
    { id: 4, orderId: "OD54490", customerName: "Suresh Reddy", product: "Kent Grand Plus RO", orderDate: "21-10-2025", status: "In-progress" },
    { id: 5, orderId: "OD54491", customerName: "Anita Verma", product: "Kent Grand Plus RO", orderDate: "21-10-2025", status: "In-progress" },
    { id: 6, orderId: "OD54492", customerName: "Vikram Patil", product: "Kent Grand Plus RO", orderDate: "21-10-2025", status: "Delivered" },
    { id: 7, orderId: "OD54493", customerName: "Sunita Joshi", product: "Kent Grand Plus RO", orderDate: "21-10-2025", status: "Delivered" },
    { id: 8, orderId: "OD54494", customerName: "Rahul Mehta", product: "Kent Grand Plus RO", orderDate: "21-10-2025", status: "Delivered" },
    { id: 9, orderId: "OD54495", customerName: "Ajay Kumar", product: "Kent Grand Plus RO", orderDate: "21-10-2025", status: "Delivered" },
    { id: 10, orderId: "OD54496", customerName: "Ravi Singh", product: "Kent Grand Plus RO", orderDate: "21-10-2025", status: "Delivered" },
  ]);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const ordersFiltered = orders.filter((o) => {
    const matchesSearch =
      o.orderId.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase()) ||
      o.orderDate.toLowerCase().includes(search.toLowerCase()) ||
      o.status.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? o.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const totalOrderPages = Math.max(1, Math.ceil(ordersFiltered.length / rowsPerPage));
  const ordersPaginated = ordersFiltered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const statusBadgeClass = (status) =>
    status === "New"
      ? "text-yellow-500"
      
      : status === "In-progress"
      ? "text-blue-500"
      : "text-green-600";

  return (
    <div className="min-h-screen w-full bg-gray-50 font-[Poppins] overflow-x-hidden">
      <Header2 />

      {/* Full Width Section */}
      <div className="w-full bg-white rounded-none shadow-sm p-4 sm:p-6 md:p-8">
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 w-full">
          {/* Left - Show Entries */}
          <div className="flex items-center gap-2 text-sm md:text-base">
            <span>Show</span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(+e.target.value)}
              className="p-2 border rounded-lg bg-[#F3F4F6] focus:outline-none"
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span>Entries</span>
          </div>

          {/* Center - Search */}
          <div className="w-full sm:w-[360px] relative">
            <img
              src={searchIcon}
              alt="Search"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 pointer-events-none"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="pl-12 pr-4 h-10 w-60 border rounded-sm bg-gray-100  placeholder-gray-500 text-[15px] "
            />
          </div>

          {/* Right - Status Filter */}
          <div className="flex items-center gap-2 text-sm md:text-base">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="p-2 border rounded-lg bg-[#F3F4F6] focus:outline-none"
            >
              <option value="">Select Status</option>
              <option value="New">New</option>
           
              <option value="In-progress">In-progress</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>

        {/* Table */}
        {/* Desktop / Tablet Table (visible from sm and up) */}
        <div className="sm:block hidden">
          <div className="overflow-x-auto border-gray-500  border w-full">
            <table className="w-full border-collapse min-w-[500px] text-center">
              <thead>
                <tr className="bg-[#F3F4F6] text-gray-700">
                  {["Sr.No.", "Order ID", "Customer Name", "Product Ordered", "Order Date", "Status", "Action"].map((h) => (
                    <th key={h} className="p-3 font-semibold text-sm md:text-[15px] border-b text-center">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ordersPaginated.map((o, idx) => (
                  <tr key={o.id} className="border-t border-gray-300  transition-all duration-200">
                    <td className="p-3 align-middle">{(page - 1) * rowsPerPage + idx + 1}</td>
                    <td className="p-3 align-middle">{o.orderId}</td>
                    <td className="p-3 align-middle">{o.customerName}</td>
                    <td className="p-3 align-middle">{o.product}</td>
                    <td className="p-3 align-middle">{o.orderDate}</td>
                    <td className="p-3 align-middle">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadgeClass(
                          o.status
                        )}`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3 align-middle">
                      <div className="flex justify-center items-center">
                        <button
                          className="text-[#0088FF] hover:text-blue-700 flex items-center justify-center"
                          onClick={() => navigate("/order-management/view/", { state: o })}
                        >
                          <GoEye className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {ordersPaginated.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-gray-500 text-sm">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card List (visible below sm) */}
        <div className="sm:hidden space-y-4">
          {ordersPaginated.map((o, idx) => (
            <div key={o.id} className="bg-white border rounded-lg p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{o.orderId}</div>
                  <div className="text-xs text-gray-500">#{(page - 1) * rowsPerPage + idx + 1}</div>
                </div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${statusBadgeClass(o.status)}`}>
                    {o.status}
                  </span>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-700">
                <div className="mb-1"><span className="font-medium">Customer:</span> {o.customerName}</div>
                <div className="mb-1"><span className="font-medium">Product:</span> {o.product}</div>
                <div className="mb-1"><span className="font-medium">Order Date:</span> {o.orderDate}</div>
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  className="text-[#0088FF] hover:text-blue-700 flex items-center gap-2"
                  onClick={() => navigate(`/order-management/view/`, { state: o })}
                >
                  <GoEye className="text-lg" />
                  <span className="text-sm">View</span>
                </button>
              </div>
            </div>
          ))}
          {ordersPaginated.length === 0 && (
            <div className="p-4 text-center text-gray-500 text-sm">No orders found.</div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-gray-700 text-sm md:text-base gap-3 w-full">
          <span>
            Showing{" "}
            {ordersFiltered.length === 0 ? 0 : (page - 1) * rowsPerPage + 1} to{" "}
            {Math.min(page * rowsPerPage, ordersFiltered.length)} of{" "}
            {ordersFiltered.length} entries
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-2 border border-[#7EC1B1] rounded-lg disabled:opacity-50 hover:bg-[#7EC1B1] hover:text-white transition"
            >
              Previous
            </button>
            {[...Array(totalOrderPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-2 border rounded-lg border-[#7EC1B1] w-[36px] text-center ${
                  page === i + 1
                    ? "bg-[#7EC1B1] text-white"
                    : "hover:bg-[#7EC1B1] hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={page === totalOrderPages}
              onClick={() => setPage((p) => Math.min(totalOrderPages, p + 1))}
              className="px-3 py-2 border border-[#7EC1B1] rounded-lg disabled:opacity-50 hover:bg-[#7EC1B1] hover:text-white transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
