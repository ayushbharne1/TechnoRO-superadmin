

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PreviewIcon from "../../../assets/preview1.svg";
import SearchIcon from "../../../assets/search.png";
import Header2 from '../../../components/superAdmin/header/Header2';

const Product = () => {
  const [rows, setRows] = useState([
    { id: 1, category: "Water Purifier", product: "KENT ACE Plus- B 8 L RO + UV + UF + Alkaline + Copper + TDS Control + UV LED Water Purifier .0001 Micron RO Membrane | Auto Flush | 8L | 20LPH | (Black)", price: "₹24999.00", warranty: "2 Years", discount: "10%", status: "Approved" },
    { id: 2, category: "Water Ionizer", product: "Kent Grand Plus RO", price: "₹24999.00", warranty: "2 Years", discount: "5%", status: "Approved" },
    { id: 3, category: "Water Softner", product: "KENT ACE Plus- B 8 L RO + UV + UF + Alkaline + Copper + TDS Control + UV LED Water Purifier .0001 Micron RO Membrane | Auto Flush | 8L | 20LPH | (Black)", price: "₹24999.00", warranty: "2 Years", discount: "15%", status: "Rejected" },
    { id: 4, category: "RO Plants", product: "Kent Grand Plus RO", price: "₹24999.00", warranty: "2 Years", discount: "8%", status: "Pending" },
    { id: 5, category: "Spare Parts", product: "KENT ACE Plus- B 8 L RO + UV + UF + Alkaline + Copper + TDS Control + UV LED Water Purifier .0001 Micron RO Membrane | Auto Flush | 8L | 20LPH | (Black)", price: "₹24999.00", warranty: "2 Years", discount: "12%", status: "Rejected" },
    { id: 6, category: "Water Softner", product: "Kent Grand Plus RO", price: "₹24999.00", warranty: "2 Years", discount: "7%", status: "Approved" },
    { id: 7, category: "Water Purifier", product: "KENT ACE Plus- B 8 L RO + UV + UF + Alkaline + Copper + TDS Control + UV LED Water Purifier .0001 Micron RO Membrane | Auto Flush | 8L | 20LPH | (Black)", price: "₹24999.00", warranty: "2 Years", discount: "6%", status: "Pending" },
    { id: 8, category: "Water Ionizer", product: "Kent Grand Plus RO", price: "₹24999.00", warranty: "2 Years", discount: "10%", status: "Pending" },
    { id: 9, category: "RO Plants", product: "KENT ACE Plus- B 8 L RO + UV + UF + Alkaline + Copper + TDS Control + UV LED Water Purifier .0001 Micron RO Membrane | Auto Flush | 8L | 20LPH | (Black)", price: "₹24999.00", warranty: "2 Years", discount: "10%", status: "Approved" },
    { id: 10, category: "Spare Parts", product: "Kent Grand Plus RO", price: "₹24999.00", warranty: "2 Years", discount: "10%", status: "Rejected" },
  ]);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const navigate = useNavigate();

  const handleRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  const filteredRows = rows
    .filter((row) => row.product.toLowerCase().includes(search.toLowerCase()))
    .filter((row) => (statusFilter ? row.category === statusFilter : true));

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const paginatedRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div className="bg-gray-100 p-2 md:p-4 h-full overflow-y-auto flex flex-col gap-2">
      <Header2 />

      {/* Table Container */}
      <div className="bg-[#FFFFFF] p-3 md:p-4 w-full rounded-lg shadow overflow-x-auto">

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 md:p-4 text-gray-600 font-semibold gap-4 flex-wrap">
          <div className="flex flex-wrap items-center gap-4 md:gap-10 w-full md:w-auto">
            <div className="flex items-center gap-2 flex-wrap text-sm md:text-base">
              <span>Show</span>
              <select
                value={rowsPerPage}
                onChange={handleRowsPerPage}
                className=" bg-gray-100 p-1 md:p-2 border rounded w-[60px]"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <span>Entries</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-sm md:text-base">
              <div className="relative w-full max-w-[200px]">
                <img
                  src={SearchIcon}
                  alt="Search"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5"
                />
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-gray-100 p-1 pl-8 md:p-2 md:pl-9 border rounded w-full text-sm md:text-base"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className= "bg-gray-100 p-1 md:p-2 border rounded w-full md:w-[150px] text-sm md:text-base"
            >
              <option value="">Select Category</option>
              <option value="Spare Parts">Spare Parts</option>
              <option value="Water Purifier">Water Purifier</option>
              <option value="Water Softner">Water Softner</option>
              <option value="RO Plant">RO Plant</option>
              <option value="Water Ionizer">Water Ionizer</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full min-w-[600px] border border-gray-[#CACACA] md:min-w-full">
            <thead className="hidden md:table-header-group">
              <tr className="bg-[#F5F5F5] text-center text-sm md:text-lg">
                <th className="h-[50px] md:h-[80px] font-poppins font-medium">Sr. No.</th>
                <th className="p-2 md:p-3 font-poppins font-medium">Category</th>
                <th className="p-2 md:p-3 font-poppins font-medium">Product Name</th>
                <th className="p-2 md:p-3 font-poppins font-medium">Price</th>
                <th className="p-2 md:p-3 font-poppins font-medium">Warranty</th>
                <th className="p-2 md:p-3 font-poppins font-medium">Discount</th>
                <th className="p-2 md:p-3 font-poppins font-medium">Status</th>
                <th className="p-2 md:p-3 font-poppins font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-center text-sm md:text-base">
              {paginatedRows.map((row) => (
                <tr key={row.id} className="bg-white text-black block sm:table-row mb-4 md:mb-0 p-2 md:p-0 rounded-lg shadow md:shadow-none">
                  <td className="p-2 md:p-3 block md:table-cell text-left md:text-center">
                    <span className="md:hidden font-semibold">Sr. No.: </span>{row.id}
                  </td>
                  <td className="p-2 md:p-3 block md:table-cell text-left md:text-center">
                    <span className="md:hidden font-semibold">Category: </span>{row.category}
                  </td>
                  <td className="p-2 md:p-3 block md:table-cell text-left md:text-center max-w-full sm:truncate md:max-w-[200px]" title={row.product}>
                    <span className="md:hidden font-semibold">Product: </span>{row.product}
                  </td>
                  <td className="p-2 md:p-3 block md:table-cell text-left md:text-center">
                    <span className="md:hidden font-semibold">Price: </span>{row.price}
                  </td>
                  <td className="p-2 md:p-3 block md:table-cell text-left md:text-center">
                    <span className="md:hidden font-semibold">Warranty: </span>{row.warranty}
                  </td>
                  <td className="p-2 md:p-3 block md:table-cell text-left md:text-center">
                    <span className="md:hidden font-semibold">Discount: </span>{row.discount}
                  </td>
                  <td className="p-2 md:p-3 block md:table-cell text-left md:text-center">
                    <span className="md:hidden font-semibold">Status: </span>
                    <span className={row.status === "Approved" ? "text-[#34C759]" : row.status === "Pending" ? "text-[#FFCC00]" : "text-[#FF383C]"}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-2 md:p-3 flex gap-2 justify-start md:justify-center flex-wrap">
                    <span className="md:hidden font-semibold">Action: </span>
                    <div className="h-[30px] w-[30px] md:h-[36px] md:w-[36px] p-1 md:p-2 rounded">
                      <img
                        src={PreviewIcon}
                        alt="Preview"
                        className="w-4 h-4 md:w-5 md:h-5 cursor-pointer"
                        onClick={() => navigate("/product/product-details", { state: row })}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2 flex-wrap font-semibold text-gray-700 text-sm md:text-base">
          <span>
            Showing {Math.min((page - 1) * rowsPerPage + 1, filteredRows.length)} to {Math.min(page * rowsPerPage, filteredRows.length)} of {filteredRows.length} entries
          </span>
          <div className="flex flex-wrap gap-2 text-[#7EC1B1] justify-center">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 md:px-4 md:py-2 border border-[#7EC1B1] rounded-lg"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`p-1 md:p-2 border rounded-lg border-[#7EC1B1] ${page === idx + 1 ? "bg-[#7EC1B1] text-white" : ""} w-[30px] md:w-[36px]`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 md:px-4 md:py-2 border border-[#7EC1B1] rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;


