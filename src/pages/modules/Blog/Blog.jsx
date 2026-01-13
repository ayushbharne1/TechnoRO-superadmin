import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { GoEye } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import Header2 from "../../../components/superAdmin/header/Header2";

// Dummy Blog Data
const DUMMY_BLOGS = [
  {
    _id: "1",
    title: "RO Water Purifier Selection Guide",
    author: "Manoj Sharma",
    date: "2024-12-24",
    views: 124,
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80",
  },
  {
    _id: "2",
    title: "Professional RO Service & Maintenance Tips",
    author: "Deepak Sharma",
    date: "2024-12-18",
    views: 98,
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=400&q=80",
  },
  {
    _id: "3",
    title: "Why RO Water Is Safer for Health",
    author: "Veer Jain",
    date: "2024-12-12",
    views: 150,
    status: "Draft",
    image: "https://picsum.photos/400/300?random=1",
  },
  {
    _id: "4",
    title: "Common RO Problems & Solutions",
    author: "Ram Sharma",
    date: "2024-12-05",
    views: 128,
    status: "Published",
    image: "https://picsum.photos/400/300?random=2",
  },
  {
    _id: "5",
    title: "How Often Should You Change RO Filters?",
    author: "Manoj Sharma",
    date: "2024-12-01",
    views: 125,
    status: "Published",
    image: "https://picsum.photos/400/300?random=3",
  }
];

const Blog = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState(DUMMY_BLOGS);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const handleAdd = () => navigate("/blog/add");
  const handleView = (row) => navigate(`/blog/view/${row._id}`);
  const handleEdit = (row) => navigate(`/blog/edit/${row._id}`);

  const handleDelete = (row) => {
    if (window.confirm(`Are you sure you want to delete "${row.title}"?`)) {
      setRows((prev) => prev.filter((item) => item._id !== row._id));
      alert("Blog deleted successfully!");
    }
  };

  const handleRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  const filteredRows = rows.filter(
    (row) =>
      row.title.toLowerCase().includes(search.toLowerCase()) ||
      row.author.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const paginatedRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div className="bg-white p-4 min-h-screen flex flex-col gap-6">
      <Header2 title="Blog Management" />

      {/* Controls */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-poppins text-[16px]">Show</span>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPage}
            className="p-2 border rounded w-[60px]"
          >
            {[5, 10, 15, 20].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span className="font-poppins text-[16px]">Entries</span>
        </div>

        <div className="flex-1 flex justify-center w-full sm:w-auto mt-2 sm:mt-0">
          <div className="relative w-full max-w-[300px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Search blog or author"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="w-full sm:w-[200px] h-[40px] bg-[#7EC1B1] text-white rounded-lg font-poppins text-[16px] mt-2 sm:mt-0"
        >
          Add New Blog
        </button>
      </div>

      {/* Table */}
      <div className="bg-white p-3 sm:p-5 rounded-lg shadow flex flex-col gap-4 overflow-x-auto">
        <div className="hidden sm:block">
          <table className="table-auto w-full border border-gray-400 min-w-[900px]">
            <thead>
              <tr className="bg-[#CACACA] text-center">
                <th className="p-3 font-poppins font-medium text-[18px]">
                  Sr. No.
                </th>
                <th className="p-3 font-poppins font-medium text-[18px]">
                  Title
                </th>
                <th className="p-3 font-poppins font-medium text-[18px]">
                  Author
                </th>
                <th className="p-3 font-poppins font-medium text-[18px]">
                  Date
                </th>
                <th className="p-3 font-poppins font-medium text-[18px]">
                  Views
                </th>
                <th className="p-3 font-poppins font-medium text-[18px]">
                  Status
                </th>
                <th className="p-3 font-poppins font-medium text-[18px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {paginatedRows.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-6">
                    No blogs found
                  </td>
                </tr>
              ) : (
                paginatedRows.map((row, index) => (
                  <tr
                    key={row._id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } text-[#000]`}
                  >
                    <td className="p-3 font-poppins font-normal">
                      {(page - 1) * rowsPerPage + index + 1}
                    </td>
                    <td className="p-3 font-poppins font-normal text-left">
                      {row.title}
                    </td>
                    <td className="p-3 font-poppins font-normal">
                      {row.author}
                    </td>
                    <td className="p-3 font-poppins font-normal">{row.date}</td>
                    <td className="p-3 font-poppins font-normal">
                      {row.views}
                    </td>
                    <td
                      className={`p-3 font-poppins font-normal ${
                        row.status === "Published"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {row.status}
                    </td>
                    <td className="p-3 flex justify-center gap-2 flex-wrap">
                      <button
                        onClick={() => handleView(row)}
                        title="View"
                        className="h-[36px] w-[36px] flex items-center justify-center rounded cursor-pointer"
                      >
                        <GoEye className="text-[#0088FF] w-6 h-6" />
                      </button>
                      <button
                        onClick={() => handleEdit(row)}
                        title="Edit"
                        className="h-[36px] w-[36px] flex items-center justify-center rounded cursor-pointer"
                      >
                        <FaRegEdit className="text-[#0088FF] w-6 h-6" />
                      </button>
                      <button
                        onClick={() => handleDelete(row)}
                        title="Delete"
                        className="h-[36px] w-[36px] flex items-center justify-center rounded cursor-pointer"
                      >
                        <RiDeleteBinLine className="text-red-500 w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="block sm:hidden space-y-4">
          {paginatedRows.map((row) => (
            <div
              key={row._id}
              className="border rounded-lg p-4 bg-gray-50 shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-base">{row.title}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    row.status === "Published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {row.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">Author: {row.author}</p>
              <p className="text-sm text-gray-600 mb-1">Date: {row.date}</p>
              <p className="text-sm text-gray-600 mb-3">Views: {row.views}</p>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => handleView(row)}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  View
                </button>
                <button
                  onClick={() => handleEdit(row)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(row)}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3 flex-wrap font-semibold text-gray-700">
          <span>
            Showing{" "}
            {paginatedRows.length > 0 ? (page - 1) * rowsPerPage + 1 : 0} to{" "}
            {Math.min(page * rowsPerPage, filteredRows.length)} of{" "}
            {filteredRows.length} entries
          </span>
          <div className="flex flex-wrap gap-2 text-[#7EC1B1] justify-center">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border border-[#7EC1B1] rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`p-2 border rounded-lg border-[#7EC1B1] ${
                  page === idx + 1 ? "bg-[#7EC1B1] text-white" : ""
                } w-[36px]`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 border border-[#7EC1B1] rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
