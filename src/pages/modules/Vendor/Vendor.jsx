// src/pages/vendor/Vendor.jsx - VERIFIED AND CORRECTED

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendors } from "../../../redux/slices/vendorSlice";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { GoEye } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import Header2 from "../../../components/superAdmin/header/Header2";

const Vendor = () => {
  const dispatch = useDispatch();
  const { list: rows, loading: isLoading } = useSelector((s) => s.vendor);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const load = useCallback(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/");
      return;
    }
    dispatch(fetchVendors({ search }));
  }, [dispatch, navigate, search]);

  useEffect(() => {
    load();
  }, [load]);
  
  const handleAdd = () => navigate("/vendors/addvendor");
  const handleView = (row) => navigate(`/vendors/viewvendor/${row._id}`);
  const handleEdit = (row) => navigate(`/vendors/editvendor/${row._id}`);

  // CORRECTED: This function now informs the user that delete is not available.
  const handleDeleteClick = () => {
    alert("As per the API documentation, a delete function is not available for vendors.");
  };

  const handleRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const paginatedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div className="bg-gray-100 p-4 min-h-screen flex flex-col gap-6">
      <Header2 />
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-poppins text-[16px]">Show</span>
          <select value={rowsPerPage} onChange={handleRowsPerPage} className="p-2 border rounded w-[60px]">
            {[6, 10, 25, 50].map((num) => (<option key={num} value={num}>{num}</option>))}
          </select>
          <span className="font-poppins text-[16px]">Entries</span>
        </div>
        <div className="flex-1 flex justify-center w-full sm:w-auto mt-2 sm:mt-0">
          <div className="relative w-full max-w-[300px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Search name or company"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
            />
          </div>
        </div>
        <button type="button" onClick={handleAdd} className="w-full sm:w-[200px] h-[40px] bg-[#7EC1B1] text-white rounded-lg font-poppins text-[16px] mt-2 sm:mt-0">
          Add Vendor
        </button>
      </div>
      <div className="bg-white p-3 sm:p-5 rounded-lg shadow flex flex-col gap-4 overflow-x-auto">
        <div className="hidden sm:block">
          <table className="table-auto w-full border border-gray-400 min-w-[700px]">
            <thead>
              <tr className="bg-[#CACACA] text-center">
                <th className="p-3 font-poppins font-medium text-[18px]">Sr. No.</th>
                <th className="p-3 font-poppins font-medium text-[18px]">Name</th>
                <th className="p-3 font-poppins font-medium text-[18px]">Company</th>
                <th className="p-3 font-poppins font-medium text-[18px]">Phone Number</th>
                <th className="p-3 font-poppins font-medium text-[18px]">Address</th>
                <th className="p-3 font-poppins font-medium text-[18px]">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {isLoading ? (<tr><td colSpan="6" className="p-6">Loading...</td></tr>) : paginatedRows.map((row, index) => (
                <tr key={row._id} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} text-[#000]`}>
                  <td className="p-3 font-poppins font-normal">{(page - 1) * rowsPerPage + index + 1}</td>
                  <td className="p-3 font-poppins font-normal capitalize">{row.name}</td>
                  <td className="p-3 font-poppins font-normal">{row.companyName}</td>
                  <td className="p-3 font-poppins font-normal">{row.mobile || row.phone}</td>
                  <td className="p-3 font-poppins font-normal">{row.address}</td>
                  <td className="p-3 flex justify-center gap-2 flex-wrap">
                    <button onClick={() => handleView(row)} title="View" className="h-[36px] w-[36px] flex items-center justify-center rounded cursor-pointer"><GoEye className="text-[#0088FF] w-6 h-6" /></button>
                    <button onClick={() => handleEdit(row)} title="Edit" className="h-[36px] w-[36px] flex items-center justify-center rounded cursor-pointer"><FaRegEdit className="text-[#0088FF] w-6 h-6" /></button>
                    {/* CORRECTED: This button now calls the new function and has a gray color */}
                    <button onClick={handleDeleteClick} title="Delete Not Available" className="h-[36px] w-[36px] flex items-center justify-center rounded cursor-pointer">
                        <RiDeleteBinLine className="text-gray-400 w-6 h-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile cards view... */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3 flex-wrap font-semibold text-gray-700">
          <span>
            Showing {paginatedRows.length > 0 ? (page - 1) * rowsPerPage + 1 : 0} to {Math.min(page * rowsPerPage, rows.length)} of {rows.length} entries
          </span>
          <div className="flex flex-wrap gap-2 text-[#7EC1B1] justify-center">
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="px-3 py-1 border border-[#7EC1B1] rounded-lg">Previous</button>
            {[...Array(totalPages)].map((_, idx) => (
              <button key={idx} onClick={() => handlePageChange(idx + 1)} className={`p-2 border rounded-lg border-[#7EC1B1] ${page === idx + 1 ? "bg-[#7EC1B1] text-white" : ""} w-[36px]`}>{idx + 1}</button>
            ))}
            <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} className="px-3 py-1 border border-[#7EC1B1] rounded-lg">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vendor;