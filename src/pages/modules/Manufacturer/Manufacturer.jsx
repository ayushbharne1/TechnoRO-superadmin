import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchManufacturers,
  deleteManufacturer,
} from "../../../redux/slices/manufacturerSlice";
import { GoEye } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Header2 from "../../../components/superAdmin/header/Header2";
import searchIcon from "../../../assets/search.png";

const Manufacturer = () => {
  const dispatch = useDispatch();
  const { list: rows, loading: isLoading } = useSelector((s) => s.manufacturer);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const load = useCallback(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/");
      return;
    }
    dispatch(fetchManufacturers({ search, limit: 10000 }));
  }, [dispatch, navigate, search]);

  useEffect(() => {
    load();
  }, [load]);

  const handleAdd = () => navigate("/manufacturer/addmanufacturer");
  const handleEdit = (row) =>
    navigate(`/manufacturer/editmanufacturer/${row._id}`);
  const handleView = (row) =>
    navigate(`/manufacturer/viewmanufacturer/${row._id}`);

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to permanently delete this manufacturer? This action cannot be undone."
      )
    ) {
      return;
    }
    try {
      await dispatch(deleteManufacturer(id)).unwrap();
      alert("Manufacturer deleted successfully!");
      load();
    } catch (error) {
      console.error("Failed to delete manufacturer:", error);
      alert(error?.message || "Failed to delete manufacturer.");
    }
  };

  const handleRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const paginatedRows = rows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div className="bg-white p-4 h-full overflow-y-auto flex flex-col gap-2">
      <Header2 />
      <div className="flex flex-col md:flex-row justify-between items-center p-2 md:p-4 gap-2 md:gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span>Show</span>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPage}
            className="bg-gray-100 p-2 border rounded w-[60px] md:w-[80px] text-sm"
          >
            {[5, 10, 15, 20, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span>Entries</span>
        </div>
        <div className="flex-1 flex justify-center w-full md:w-auto mb-2 md:mb-0">
          <div className="relative w-full max-w-[320px]">
            <img
              src={searchIcon}
              alt="Search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-10 border rounded-md w-full bg-[#F5F5F5] border-[#263138] text-[14px] md:text-[16px] text-[#606060] font-poppins"
            />
          </div>
        </div>
        <div className="w-full md:w-auto flex justify-end">
          <button
            onClick={handleAdd}
            className="bg-[#7EC1B1] w-full md:w-[200px] text-white p-2 rounded-lg hover:bg-[#65a89d] transition"
          >
            Add Manufacturer
          </button>
        </div>
      </div>
      <div className="bg-white p-4 w-full rounded-lg shadow overflow-x-auto">
        <div className="relative max-h-[600px] overflow-y-auto border border-gray-400 rounded-lg">
          <table className="table-auto w-full min-w-[600px] sm:min-w-[800px]">
          <thead>
            <tr className="bg-[#F3F4F6] text-center text-base sm:text-xl">
              <th className="h-[60px] font-poppins font-medium text-[14px] sm:text-[18px] text-black">
                Sr.No.
              </th>
              <th className="p-3 font-poppins font-medium text-[14px] sm:text-[18px] text-black">
                Manufacturer Name
              </th>
              <th className="p-3 font-poppins font-medium text-[14px] sm:text-[18px] text-black">
                Phone No.
              </th>
              <th className="p-3 font-poppins font-medium text-[14px] sm:text-[18px] text-black hidden sm:table-cell">
                Email
              </th>
              <th className="p-3 font-poppins font-medium text-[14px] sm:text-[18px] text-black hidden md:table-cell">
                Account Status
              </th>
              <th className="p-3 font-poppins font-medium text-[14px] sm:text-[18px] text-black hidden lg:table-cell">
                Address
              </th>
              <th className="p-3 font-poppins font-medium text-[14px] sm:text-[18px] text-black">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {isLoading ? (
              <tr>
                <td colSpan="7" className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              paginatedRows.map((row, index) => (
                <tr
                  key={row._id}
                  className="text-black font-poppins text-[14px] sm:text-[16px]"
                >
                  <td className="p-3">
                    {(page - 1) * rowsPerPage + index + 1}
                  </td>
                  <td className="p-3">{row.name}</td>
                  <td className="p-3">{row.phone}</td>
                  <td className="p-3 hidden sm:table-cell">{row.email}</td>
                  <td className="p-3 hidden md:table-cell">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        row.verificationStatus === "verified"
                          ? "bg-green-100 text-green-700"
                          : row.verificationStatus === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {row.verificationStatus === "verified" ? "Verified" : row.verificationStatus === "pending" ? "Pending" : "Unverified"}
                    </span>
                  </td>
                  <td className="p-3 hidden lg:table-cell">{row.address}</td>
                  <td className="p-3 flex gap-2 justify-center flex-wrap">
                    <button
                      onClick={() => handleView(row)}
                      title="View"
                      className="cursor-pointer"
                    >
                      <GoEye className="text-[#0088FF] w-6 h-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(row)}
                      title="Edit"
                      className="cursor-pointer"
                    >
                      <FaRegEdit className="text-[#0088FF] w-6 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(row._id)}
                      title="Delete"
                      className="cursor-pointer"
                    >
                      <RiDeleteBinLine className="text-[#FF383C] w-6 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
            {!isLoading && paginatedRows.length === 0 && (
              <tr>
                <td colSpan="7" className="p-6 text-center">
                  No manufacturers found.
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2 flex-wrap font-semibold text-gray-700 text-sm">
          <span>
            {rows.length === 0
              ? "Showing 0 to 0 of 0 entries"
              : `Showing ${Math.min(
                  (page - 1) * rowsPerPage + 1,
                  rows.length
                )} to ${Math.min(page * rowsPerPage, rows.length)} of ${
                  rows.length
                } entries`}
          </span>
          <div className="flex flex-wrap gap-2 text-[#7EC1B1] justify-center bg-white overflow-x-auto">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border border-[#7EC1B1] rounded-lg text-sm"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`p-2 border rounded-lg border-[#7EC1B1] ${
                  page === idx + 1 ? "bg-[#7EC1B1] text-white" : ""
                } w-[36px] text-sm`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 border border-[#7EC1B1] rounded-lg text-sm"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manufacturer;