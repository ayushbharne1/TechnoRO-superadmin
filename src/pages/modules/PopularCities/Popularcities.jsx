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

  const rows = useSelector((state) => state.popularCities.rows || []);

  useEffect(() => {
    dispatch(fetchPopularCities());
  }, [dispatch]);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  const filteredRows = rows.filter((row) =>
    String(row.cityName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const paginatedRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) setPage(newPage);
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
              className="bg-gray-100 p-2 border rounded w-[70px]"
            >
              {[5, 10, 15].map((num) => (
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
              className="pl-10 h-10 border rounded-md w-full bg-[#F5F5F5]"
            />
          </div>

          <button
            onClick={() => navigate("/popular-cities/add-new-city")}
            className="bg-[#7EC1B1] w-[200px] text-white p-2 rounded-lg"
          >
            Add New City
          </button>
        </div>

        {/* Table */}
        <div className="max-h-[600px] overflow-y-auto border border-gray-400">
          <table className="table-auto w-full border-collapse">
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
            Showing {(page - 1) * rowsPerPage + 1} to{" "}
            {Math.min(page * rowsPerPage, filteredRows.length)} of{" "}
            {filteredRows.length} entries
          </span>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
              className="px-3 py-1 border rounded"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                // key={i}
                key={`page-${i + 1}`}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 border rounded ${
                  page === i + 1 ? "bg-[#7EC1B1] text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
              className="px-3 py-1 border rounded"
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


// sir 1
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiSearch } from "react-icons/fi";
// import { FaRegEdit } from "react-icons/fa";
// import { RiDeleteBinLine } from "react-icons/ri";
// import { GoEye } from "react-icons/go";
// import Header2 from "../../../components/superAdmin/header/Header2";

// const PopularCities = () => {
//   const navigate = useNavigate();

//   const [rows] = useState([
//     {
//       id: 1,
//       cityName: "Chennai",
//       contactNumber: "9876543210",
//       whatsappLink: "https://wa.me/9876543210",
//       contactEmail: "chennai@roservice.com",
//     },
//     {
//       id: 2,
//       cityName: "Bangalore",
//       contactNumber: "9988776655",
//       whatsappLink: "https://wa.me/9988776655",
//       contactEmail: "bangalore@roservice.com",
//     },
//     {
//       id: 3,
//       cityName: "Hyderabad",
//       contactNumber: "8765432109",
//       whatsappLink: "https://wa.me/8765432109",
//       contactEmail: "hyderabad@roservice.com",
//     },
//     {
//       id: 4,
//       cityName: "Mumbai",
//       contactNumber: "9988223344",
//       whatsappLink: "https://wa.me/9988223344",
//       contactEmail: "mumbai@roservice.com",
//     },
//   ]);

//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(8);
//   const [search, setSearch] = useState("");

//   const handleRowsPerPage = (e) => {
//     setRowsPerPage(Number(e.target.value));
//     setPage(1);
//   };

//   const filteredRows = rows.filter((row) =>
//     row.cityName.toLowerCase().includes(search.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
//   const paginatedRows = filteredRows.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) setPage(newPage);
//   };

//   return (
//     <div className="p-4 h-full flex flex-col gap-4">
//           <Header2 title="City List" />


//       {/* Main Container */}
//       <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-4">

//         {/* Top Controls */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
//           {/* Left: Show Entries */}
//           <div className="flex items-center gap-2 flex-wrap">
//             <span>Show</span>
//             <select
//               value={rowsPerPage}
//               onChange={handleRowsPerPage}
//               className="bg-gray-100 p-2 border rounded w-[60px] md:w-[80px]"
//             >
//               {[5, 10, 15].map((num) => (
//                 <option key={num} value={num}>
//                   {num}
//                 </option>
//               ))}
//             </select>
//             <span>Entries</span>
//           </div>

//           {/* Center: Search */}
//           <div className="flex-1 flex justify-center w-full md:w-auto">
//             <div className="relative w-full max-w-[300px]">
//               <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
//               <input
//                 type="text"
//                 placeholder="Search city name"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="pl-10 h-10 border rounded-md w-full bg-[#F5F5F5] text-sm md:text-base"
//               />
//             </div>
//           </div>

//           {/* Right: Add City Button */}
//           <div className="w-full md:w-auto flex justify-end">
//             <button
//               onClick={() => navigate("/popular-cities/add-new-city")}
//               className="bg-[#7EC1B1] w-full md:w-[200px] text-white p-2 rounded-lg hover:bg-[#65a89d] transition"
//             >
//               Add New City
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="max-h-[600px] overflow-y-auto border border-gray-500">
//           <table className="table-auto w-full border-collapse">
//             <thead className="bg-[#F3F4F6] sticky top-0 z-10">
//               <tr className="text-center">
//                 <th className="p-3 font-medium text-sm md:text-base">Sr. No.</th>
//                 <th className="p-3 font-medium text-sm md:text-base">City Name</th>
//                 <th className="p-3 font-medium text-sm md:text-base">Contact Number</th>
//                 <th className="p-3 font-medium text-sm md:text-base">WhatsApp Link</th>
//                 <th className="p-3 font-medium text-sm md:text-base">Contact Email</th>
//                 <th className="p-3 font-medium text-sm md:text-base">Action</th>
//               </tr>
//             </thead>
//             <tbody className="text-center">
//               {paginatedRows.map((row, idx) => (
//                 <tr
//                   key={row.id}
//                   className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
//                 >
//                   <td className="p-3">{row.id}</td>
//                   <td className="p-3 capitalize">{row.cityName}</td>
//                   <td className="p-3">{row.contactNumber}</td>
//                   <td className="p-3  cursor-pointer">
//                     {row.whatsappLink}
//                   </td>
//                   <td className="p-3">{row.contactEmail}</td>
//                   <td className="p-3 flex justify-center gap-2 flex-wrap">
                
//                     <div
//                       onClick={() => navigate(`/popular-cities/edit-city/${row.id}`, { state: { city: row } })}
//                       className="cursor-pointer"
//                       title="Edit"
//                     >
//                       <FaRegEdit className="text-[#0088FF] w-5 h-5" />
//                     </div>
//                     <div className="cursor-pointer" title="Delete">
//                       <RiDeleteBinLine className="text-[#FF383C] w-5 h-5" />
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 mt-2">
//           <span>
//             Showing {Math.min((page - 1) * rowsPerPage + 1, filteredRows.length)} to{" "}
//             {Math.min(page * rowsPerPage, filteredRows.length)} of {filteredRows.length} entries
//           </span>
//           <div className="flex flex-wrap gap-2 justify-center">
//             <button
//               onClick={() => handlePageChange(page - 1)}
//               disabled={page === 1}
//               className="px-3 py-1 border border-[#7EC1B1] rounded-lg"
//             >
//               Previous
//             </button>
//             {[...Array(totalPages)].map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => handlePageChange(idx + 1)}
//                 className={`p-2 border rounded-lg border-[#7EC1B1] w-[36px] ${
//                   page === idx + 1 ? "bg-[#7EC1B1] text-white" : ""
//                 }`}
//               >
//                 {idx + 1}
//               </button>
//             ))}
//             <button
//               onClick={() => handlePageChange(page + 1)}
//               disabled={page === totalPages}
//               className="px-3 py-1 border border-[#7EC1B1] rounded-lg"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PopularCities;

//  sir 2
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiSearch } from "react-icons/fi";
// import { FaRegEdit } from "react-icons/fa";
// import { RiDeleteBinLine } from "react-icons/ri";
// import Header2 from "../../../components/superAdmin/header/Header2";

// /* ==============================
//    Delete Popup Component
// ============================== */
// const DeletePopup = ({ isOpen, onClose, onConfirm }) => {
//   if (!isOpen) return null;

//   return (
//     // Light grey overlay for subtle background (no dark tint)
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5F5F5] bg-opacity-80">
//       <div className="bg-white rounded-2xl shadow-2xl w-[95%] max-w-2xl p-10 text-center border border-gray-200">
//         {/* Title */}
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">
//           Confirm Deletion
//         </h2>

//         {/* Message */}
//         <p className="text-lg text-gray-600 mb-10 leading-relaxed">
//           Are you sure you want to delete this? <br />
//           <span className="text-gray-500">This action cannot be undone.</span>
//         </p>

//         {/* Buttons */}
//         <div className="flex justify-center gap-6">
//           {/* Cancel Button */}
//           <button
//             onClick={onClose}
//             className="min-w-[150px] px-6 py-3 rounded-xl border-2 border-[#7EC1B1] text-[#7EC1B1] font-semibold text-lg bg-white hover:bg-gray-50 transition duration-200"
//           >
//             Cancel
//           </button>

//           {/* Confirm Button */}
//           <button
//             onClick={onConfirm}
//             className="min-w-[150px] px-6 py-3 rounded-xl bg-[#7EC1B1] text-white font-semibold text-lg hover:bg-[#65a89d] transition duration-200"
//           >
//             Yes, Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// /* ==============================
//    Main Component
// ============================== */
// const PopularCities = () => {
//   const navigate = useNavigate();

//   const [rows, setRows] = useState([
//     {
//       id: 1,
//       cityName: "Chennai",
//       contactNumber: "9876543210",
//       whatsappLink: "https://wa.me/9876543210",
//       contactEmail: "chennai@roservice.com",
//     },
//     {
//       id: 2,
//       cityName: "Bangalore",
//       contactNumber: "9988776655",
//       whatsappLink: "https://wa.me/9988776655",
//       contactEmail: "bangalore@roservice.com",
//     },
//     {
//       id: 3,
//       cityName: "Hyderabad",
//       contactNumber: "8765432109",
//       whatsappLink: "https://wa.me/8765432109",
//       contactEmail: "hyderabad@roservice.com",
//     },
//     {
//       id: 4,
//       cityName: "Mumbai",
//       contactNumber: "9988223344",
//       whatsappLink: "https://wa.me/9988223344",
//       contactEmail: "mumbai@roservice.com",
//     },
//   ]);

//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(8);
//   const [search, setSearch] = useState("");
//   const [showDeletePopup, setShowDeletePopup] = useState(false);
//   const [selectedCity, setSelectedCity] = useState(null);

//   const handleRowsPerPage = (e) => {
//     setRowsPerPage(Number(e.target.value));
//     setPage(1);
//   };

//   const filteredRows = rows.filter((row) =>
//     row.cityName.toLowerCase().includes(search.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
//   const paginatedRows = filteredRows.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) setPage(newPage);
//   };

//   // Handle Confirm Delete
//   const handleConfirmDelete = () => {
//     setRows(rows.filter((r) => r.id !== selectedCity.id));
//     setShowDeletePopup(false);
//   };

//   return (
//     <div className="p-4 h-full flex flex-col gap-4">
//       <Header2 title="City List" />

//       {/* Main Container */}
//       <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-4">
//         {/* Top Controls */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
//           {/* Left: Show Entries */}
//           <div className="flex items-center gap-2 flex-wrap">
//             <span>Show</span>
//             <select
//               value={rowsPerPage}
//               onChange={handleRowsPerPage}
//               className="bg-gray-100 p-2 border rounded w-[60px] md:w-[80px]"
//             >
//               {[5, 10, 15].map((num) => (
//                 <option key={num} value={num}>
//                   {num}
//                 </option>
//               ))}
//             </select>
//             <span>Entries</span>
//           </div>

//           {/* Center: Search */}
//           <div className="flex-1 flex justify-center w-full md:w-auto">
//             <div className="relative w-full max-w-[300px]">
//               <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
//               <input
//                 type="text"
//                 placeholder="Search city name"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="pl-10 h-10 border rounded-md w-full bg-[#F5F5F5] text-sm md:text-base"
//               />
//             </div>
//           </div>

//           {/* Right: Add City Button */}
//           <div className="w-full md:w-auto flex justify-end">
//             <button
//               onClick={() => navigate("/popular-cities/add-new-city")}
//               className="bg-[#7EC1B1] w-full md:w-[200px] text-white p-2 rounded-lg hover:bg-[#65a89d] transition"
//             >
//               Add New City
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="max-h-[600px] overflow-y-auto border border-gray-500">
//           <table className="table-auto w-full border-collapse">
//             <thead className="bg-[#F3F4F6] sticky top-0 z-10">
//               <tr className="text-center">
//                 <th className="p-3 font-medium text-sm md:text-base">Sr. No.</th>
//                 <th className="p-3 font-medium text-sm md:text-base">City Name</th>
//                 <th className="p-3 font-medium text-sm md:text-base">Contact Number</th>
//                 <th className="p-3 font-medium text-sm md:text-base">WhatsApp Link</th>
//                 <th className="p-3 font-medium text-sm md:text-base">Contact Email</th>
//                 <th className="p-3 font-medium text-sm md:text-base">Action</th>
//               </tr>
//             </thead>
//             <tbody className="text-center">
//               {paginatedRows.map((row, idx) => (
//                 <tr
//                   key={row.id}
//                   className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
//                 >
//                   <td className="p-3">{row.id}</td>
//                   <td className="p-3 capitalize">{row.cityName}</td>
//                   <td className="p-3">{row.contactNumber}</td>
//                   <td className="p-3 cursor-pointer">
//                    {row.whatsappLink} 
                  
//                   </td>
//                   <td className="p-3">{row.contactEmail}</td>
//                   <td className="p-3 flex justify-center gap-2 flex-wrap">
//                     <div
//                       onClick={() =>
//                         navigate(`/popular-cities/edit-city/${row.id}`, {
//                           state: { city: row },
//                         })
//                       }
//                       className="cursor-pointer"
//                       title="Edit"
//                     >
//                       <FaRegEdit className="text-[#0088FF] w-5 h-5" />
//                     </div>

//                     <div
//                       onClick={() => {
//                         setSelectedCity(row);
//                         setShowDeletePopup(true);
//                       }}
//                       className="cursor-pointer"
//                       title="Delete"
//                     >
//                       <RiDeleteBinLine className="text-[#FF383C] w-5 h-5" />
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 mt-2">
//           <span>
//             Showing {Math.min((page - 1) * rowsPerPage + 1, filteredRows.length)} to{" "}
//             {Math.min(page * rowsPerPage, filteredRows.length)} of {filteredRows.length} entries
//           </span>
//           <div className="flex flex-wrap gap-2 justify-center">
//             <button
//               onClick={() => handlePageChange(page - 1)}
//               disabled={page === 1}
//               className="px-3 py-1 border border-[#7EC1B1] rounded-lg"
//             >
//               Previous
//             </button>
//             {[...Array(totalPages)].map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => handlePageChange(idx + 1)}
//                 className={`p-2 border rounded-lg border-[#7EC1B1] w-[36px] ${
//                   page === idx + 1 ? "bg-[#7EC1B1] text-white" : ""
//                 }`}
//               >
//                 {idx + 1}
//               </button>
//             ))}
//             <button
//               onClick={() => handlePageChange(page + 1)}
//               disabled={page === totalPages}
//               className="px-3 py-1 border border-[#7EC1B1] rounded-lg"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Delete Popup Modal */}
//       <DeletePopup
//         isOpen={showDeletePopup}
//         onClose={() => setShowDeletePopup(false)}
//         onConfirm={handleConfirmDelete}
//       />
//     </div>
//   );
// };

// export default PopularCities;
