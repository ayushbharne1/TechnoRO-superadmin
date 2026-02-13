// saumya
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { Eye } from "lucide-react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import Header2 from "../../../components/superAdmin/header/Header2";
import { fetchPopularCities,deletePopularCity } from "../../../redux/slices/popularCitiesSlice";

/* ==============================
   Delete Popup Component
============================== */
const DeletePopup = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
      <div className="bg-white rounded-2xl shadow-2xl w-[95%] max-w-2xl p-10 text-center border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Confirm Deletion
        </h2>

        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          Are you sure you want to delete this? <br />
          <span className="text-gray-500">This action cannot be undone.</span>
        </p>

        <div className="flex justify-center gap-6">
          <button
            onClick={onClose}
            className="min-w-[150px] px-6 py-3 rounded-xl border-2 border-[#7EC1B1] text-[#7EC1B1] font-semibold text-lg bg-white"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="min-w-[150px] px-6 py-3 rounded-xl bg-[#7EC1B1] text-white font-semibold text-lg"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

/* ==============================
   Main Component
============================== */
const PopularCities = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    rows,
    totalCities = 0,
    totalPages: serverTotalPages = 1,
    currentPage: serverCurrentPage = 1,
    loading = false,
  } = useSelector((state) => state.popularCities || {});

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  // Fetch data: server-side pagination when not searching, otherwise fetch all to allow client-side search
  useEffect(() => {
    if (search && search.trim() !== "") {
      // fetch all items so we can search across whole dataset
      dispatch(fetchPopularCities({ page: 1, limit: 1000 }));
      setPage(1);
    } else {
      dispatch(fetchPopularCities({ page, limit: rowsPerPage }));
    }
  }, [dispatch, page, rowsPerPage, search]);

  // Ensure local page reflects server page when performing server-side pagination
  useEffect(() => {
    setPage(serverCurrentPage || 1);
  }, [serverCurrentPage]);

  // filter rows (if search active, rows contains all items; if not, rows contains current page only)
  const filteredRows = (rows || []).filter((row) =>
    String(row.cityName || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalEntries = search ? filteredRows.length : totalCities;
  // Use server's totalPages when not searching (server-side pagination)
  const totalPages = search
    ? Math.max(1, Math.ceil(totalEntries / rowsPerPage))
    : Math.max(1, serverTotalPages || Math.ceil(totalEntries / rowsPerPage));

  // When not searching, `rows` already contains the current server page items.
  // Only slice when we have the full dataset (search active)
  let paginatedRows = [];
  if (search && search.trim() !== "") {
    paginatedRows = filteredRows.slice(
      (page - 1) * rowsPerPage,
      page * rowsPerPage
    );
  } else {
    paginatedRows = rows || [];
  }

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      // If not searching, fetch server page data
      if (!search || search.trim() === "") {
        dispatch(fetchPopularCities({ page: newPage, limit: rowsPerPage }));
      }
    }
  };

  // 
  // const handleConfirmDelete = () => {
  //   setShowDeletePopup(false);
  // };
  // 

  // handle delete 
  const handleConfirmDelete = () => {
  if (!selectedCity?.id) return;

  dispatch(deletePopularCity(selectedCity.id)); //API + Redux delete

  setShowDeletePopup(false);
  setSelectedCity(null);
};


  // 

  return (
    <div className="bg-white p-2 min-h-screen h-full flex flex-col gap-4">
      <Header2 title="City List" />

      <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-4">
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPage}
              disabled={loading}
              className={`bg-gray-100 p-2 border rounded w-[70px] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {[5, 10, 15, 30, 45].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <span>Entries</span>
          </div>

          <div className="relative w-full max-w-[300px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search city name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={loading}
              className={`pl-10 h-10 border rounded-md w-full bg-[#F5F5F5] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>

          <button
            onClick={() => navigate("/popular-cities/add-new-city")}
            disabled={loading}
            className={`bg-[#7EC1B1] w-[200px] text-white p-2 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Add New City
          </button>
        </div>

        {/* Table */}
        <div className="relative max-h-[600px] overflow-y-auto border border-gray-400">
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-20">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-[#7EC1B1] border-gray-200"></div>
                <span className="text-gray-700 font-medium">Loading...</span>
              </div>
            </div>
          )}

          <table className={`table-auto w-full border-collapse ${loading ? 'opacity-60' : ''}`}>
            <thead className="bg-[#F3F4F6] sticky top-0 z-10">
              <tr className="text-center">
                <th className="p-3">Sr. No.</th>
                <th className="p-3">City Name</th>
                <th className="p-3">Contact No.</th>
                <th className="p-3">WhatsApp Link</th>
                <th className="p-3">Contact Email</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {paginatedRows.map((row, idx) => (
                <tr
                  key={row.id}
                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="p-3">
                    {(page - 1) * rowsPerPage + idx + 1}
                  </td>

                  <td className="p-3 capitalize">
                    {String(row.cityName || "")}
                  </td>

                  <td className="p-3">
                    {String(row.contactNumber || "")}
                  </td>

                  <td className="p-3 max-w-[220px] truncate  text-black no-underline">
                    <a
                      href={String(row.whatsappLink || "")}
                      target="_blank"
                      rel="noreferrer"
                      
                      
                    >
                      {String(row.whatsappLink || "")}
                    </a>
                  </td>

                  <td className="p-3">
                    {String(row.contactEmail || "")}
                  </td>

                  <td className="p-3 flex justify-center gap-3">
                    <Eye
                      size={22}
                      className="text-[#0088FF] cursor-pointer"
                      onClick={() =>
                        navigate(`/popular-cities/view-city/${row.id}`, {
                          state: { city: row },
                        })
                      }
                    />
                    <FaRegEdit
                      size={22}
                      className="text-[#0088FF] cursor-pointer"
                      onClick={() =>
                        navigate(`/popular-cities/edit-city/${row.id}`, {
                          state: { city: row },
                        })
                      }
                    />
                    <RiDeleteBinLine
                      size={22}
                      className="text-[#FF383C] cursor-pointer"
                      onClick={() => {
                        setSelectedCity(row);
                        setShowDeletePopup(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center">
          <span>
            Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, totalEntries)} of {totalEntries} entries
          </span>

          <div className="flex gap-2">
            <button
              disabled={loading || page === 1}
              onClick={() => handlePageChange(page - 1)}
              className={`px-3 py-1 border rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={`page-${i + 1}`}
                onClick={() => handlePageChange(i + 1)}
                disabled={loading}
                className={`px-3 py-1 border rounded ${
                  page === i + 1 ? "bg-[#7EC1B1] text-white" : ""
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={loading || page === totalPages}
              onClick={() => handlePageChange(page + 1)}
              className={`px-3 py-1 border rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <DeletePopup
        isOpen={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default PopularCities;

