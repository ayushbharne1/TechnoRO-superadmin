
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Header2 from "../../../components/superAdmin/header/Header2";
// import { GoEye } from "react-icons/go";
// import { FaRegEdit } from "react-icons/fa";
// import { RiDeleteBinLine } from "react-icons/ri";
// import { FiSearch } from "react-icons/fi";

// const Engineer = () => {
//   const [rows] = useState([
//     { id: 1, name: "Ajay Kumar", skill: "Web Developer", phone: "9876543210", assignedArea: "Chennai" },
//     { id: 2, name: "Ravi Singh", skill: "SEO Specialist", phone: "9988776655", assignedArea: "Hyderabad" },
//     { id: 3, name: "Pooja Sharma", skill: "Graphic Designer", phone: "8765432109", assignedArea: "Bangalore" },
//     { id: 4, name: "Arun Raj", skill: "Digital Marketer", phone: "9988223344", assignedArea: "Delhi" },
//     { id: 5, name: "Divya R", skill: "App Developer", phone: "8899776655", assignedArea: "Mumbai" },
//     { id: 6, name: "Rahul Kumar", skill: "Content Writer", phone: "7766554433", assignedArea: "Pune" },
//     { id: 7, name: "Sneha Iyer", skill: "UI/UX Designer", phone: "7788996655", assignedArea: "Kolkata" },
//     { id: 8, name: "Vikram Das", skill: "Email Marketer", phone: "8899442211", assignedArea: "Chennai" },
//   ]);

//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(6);
//   const [search, setSearch] = useState("");

//   const navigate = useNavigate();

//   const handleRowsPerPage = (e) => {
//     setRowsPerPage(Number(e.target.value));
//     setPage(1);
//   };

//   const filteredRows = rows.filter((row) =>
//     row.name.toLowerCase().includes(search.toLowerCase())
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
//     <div className="bg-gray-100 p-4 min-h-screen flex flex-col gap-6">
//       <Header2 />

//       {/* Top Controls */}
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
//         {/* Left: Show Entries */}
//         <div className="flex items-center gap-2 flex-wrap">
//           <span className="font-poppins text-[16px]">Show</span>
//           <select
//             value={rowsPerPage}
//             onChange={handleRowsPerPage}
//             className="p-2 border rounded w-[50px]"
//           >
//             {[...Array(7)].map((_, i) => (
//               <option key={i} value={i + 1}>
//                 {i + 1}
//               </option>
//             ))}
//           </select>
//           <span className="font-poppins text-[16px]">Entries</span>
//         </div>

//         {/* Center: Search Bar */}
//       <div className="flex-1 flex justify-center w-full sm:w-auto mt-2 sm:mt-0">
//   <div className="relative w-full max-w-[300px]">
//     <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
//     <input
//       type="text"
//       placeholder="Search name"
//       value={search}
//       onChange={(e) => setSearch(e.target.value)}
//       className="w-full p-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
//     />
//   </div>
// </div>

        

//         {/* Right: Add Button */}
//         <button
//           type="button"
//           onClick={() => navigate("/service-engineer/add-engineer")}
//           className="w-full sm:w-[200px] h-[40px] bg-[#7EC1B1] text-white rounded-lg font-poppins text-[16px] mt-2 sm:mt-0"
//         >
//           Add Service Engineer
//         </button>
//       </div>

//       {/* Responsive Table */}
//       <div className="bg-white p-3 sm:p-5 rounded-lg shadow flex flex-col gap-4 overflow-x-auto">
//         <table className="table-auto w-full border border-gray-400 min-w-[600px]">
//           <thead>
//             <tr className="bg-[#CACACA] text-center">
//               <th className="p-3 font-poppins font-medium text-[18px]">Serial No.</th>
//               <th className="p-3 font-poppins font-medium text-[18px]">Name</th>
//               <th className="p-3 font-poppins font-medium text-[18px]">Skill</th>
//               <th className="p-3 font-poppins font-medium text-[18px]">Phone Number</th>
//               <th className="p-3 font-poppins font-medium text-[18px]">Assigned Area</th>
//               <th className="p-3 font-poppins font-medium text-[18px]">Action</th>
//             </tr>
//           </thead>
//           <tbody className="text-center">
//             {paginatedRows.map((row, index) => (
//               <tr
//                 key={row.id}
//                 className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} text-[#000]`}
//               >
//                 <td className="p-3 font-poppins font-normal">{row.id}</td>
//                 <td className="p-3 font-poppins font-normal capitalize">{row.name}</td>
//                 <td className="p-3 font-poppins font-normal capitalize">{row.skill}</td>
//                 <td className="p-3 font-poppins font-normal">{row.phone}</td>
//                 <td className="p-3 font-poppins font-normal">{row.assignedArea}</td>
//                 <td className="p-3 flex justify-center gap-2 flex-wrap">
//                   <button
//                     className="h-[32px] w-[32px] sm:h-[36px] sm:w-[36px] flex items-center justify-center rounded cursor-pointer"
//                     onClick={() => navigate(`/service-engineer/view/${row.id}`, { state: { engineer: row } })}
//                   >
//                     <GoEye className="text-[#0088FF] w-6 h-6" />
//                   </button>

//                   <button
//                     className="h-[32px] w-[32px] sm:h-[36px] sm:w-[36px] flex items-center justify-center rounded cursor-pointer"
//                     onClick={() => navigate(`/service-engineer/edit/${row.id}`, { state: { engineer: row } })}
//                   >
//                     <FaRegEdit className="text-[#0088FF] w-6 h-6" />
//                   </button>

//                   <button className="h-[32px] w-[32px] sm:h-[36px] sm:w-[36px] flex items-center justify-center rounded cursor-pointer">
//                     <RiDeleteBinLine className="text-[#FF383C] w-6 h-6" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3 flex-wrap font-semibold text-gray-700">
//           <span>
//             Showing {Math.min((page - 1) * rowsPerPage + 1, filteredRows.length)} to{" "}
//             {Math.min(page * rowsPerPage, filteredRows.length)} of {filteredRows.length} entries
//           </span>
//           <div className="flex flex-wrap gap-2 text-[#7EC1B1] justify-center">
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
//                 className={`p-2 border rounded-lg border-[#7EC1B1] ${page === idx + 1 ? "bg-[#7EC1B1] text-white" : ""} w-[36px]`}
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

// export default Engineer;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoEye } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Header2 from "../../../components/superAdmin/header/Header2";
import { FiSearch } from "react-icons/fi";

const Engineer = () => {
  const [rows] = useState([
    { id: 1, name: "Ajay Kumar", skill: "Web Developer", phone: "9876543210", assignedArea: "Chennai" },
    { id: 2, name: "Ravi Singh", skill: "SEO Specialist", phone: "9988776655", assignedArea: "Hyderabad" },
    { id: 3, name: "Pooja Sharma", skill: "Graphic Designer", phone: "8765432109", assignedArea: "Bangalore" },
    { id: 4, name: "Arun Raj", skill: "Digital Marketer", phone: "9988223344", assignedArea: "Delhi" },
    { id: 5, name: "Divya R", skill: "App Developer", phone: "8899776655", assignedArea: "Mumbai" },
    { id: 6, name: "Rahul Kumar", skill: "Content Writer", phone: "7766554433", assignedArea: "Pune" },
    { id: 7, name: "Sneha Iyer", skill: "UI/UX Designer", phone: "7788996655", assignedArea: "Kolkata" },
    { id: 8, name: "Vikram Das", skill: "Email Marketer", phone: "8899442211", assignedArea: "Chennai" },
  ]);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
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
    <div className="p-4 h-full flex flex-col gap-4">
      <Header2 />

      {/* Combined Controls + Table */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-4">

        {/* Top Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
          {/* Left: Show Entries */}
          <div className="flex items-center gap-2 flex-wrap">
            <span>Show</span>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPage}
              className="bg-gray-100 p-2 border rounded w-[60px] md:w-[80px]"
            >
              {[5, 10, 15].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <span>Entries</span>
          </div>

          {/* Center: Search */}
          <div className="flex-1 flex justify-center w-full md:w-auto">
            <div className="relative w-full max-w-[300px]">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
              <input
                type="text"
                placeholder="Search name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-10 border rounded-md w-full bg-[#F5F5F5] text-sm md:text-base"
              />
            </div>
          </div>

          {/* Right: Add Button */}
          <div className="w-full md:w-auto flex justify-end">
            <button
              onClick={() => navigate("/service-engineer/add-engineer")}
              className="bg-[#7EC1B1] w-full md:w-[200px] text-white p-2 rounded-lg hover:bg-[#65a89d] transition"
            >
              Add Service Engineer
            </button>
          </div>
        </div>

        {/* Table with vertical scroll */}
        <div className="max-h-[600px] overflow-y-auto border border-gray-500">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-[#F3F4F6] sticky top-0 z-10">
              <tr className="text-center">
                <th className="p-3 font-medium text-sm md:text-base">Sr. No.</th>
                <th className="p-3 font-medium text-sm md:text-base">Name</th>
                <th className="p-3 font-medium text-sm md:text-base">Skill</th>
                <th className="p-3 font-medium text-sm md:text-base">Phone</th>
                <th className="p-3 font-medium text-sm md:text-base">Assigned Area</th>
                <th className="p-3 font-medium text-sm md:text-base">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {paginatedRows.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="p-3">{row.id}</td>
                  <td className="p-3 capitalize">{row.name}</td>
                  <td className="p-3 capitalize">{row.skill}</td>
                  <td className="p-3">{row.phone}</td>
                  <td className="p-3">{row.assignedArea}</td>
                  <td className="p-3 flex justify-center gap-2 flex-wrap">
                    <div
                      onClick={() => navigate(`/service-engineer/view/${row.id}`, { state: { engineer: row } })}
                      className="cursor-pointer"
                      title="View"
                    >
                      <GoEye className="text-[#0088FF] w-5 h-5" />
                    </div>
                    <div
                      onClick={() => navigate(`/service-engineer/edit/${row.id}`, { state: { engineer: row } })}
                      className="cursor-pointer"
                      title="Edit"
                    >
                      <FaRegEdit className="text-[#0088FF] w-5 h-5" />
                    </div>
                    <div className="cursor-pointer" title="Delete">
                      <RiDeleteBinLine className="text-[#FF383C] w-5 h-5" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 mt-2">
          <span>
            Showing {Math.min((page - 1) * rowsPerPage + 1, filteredRows.length)} to{" "}
            {Math.min(page * rowsPerPage, filteredRows.length)} of {filteredRows.length} entries
          </span>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border border-[#7EC1B1] rounded-lg"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`p-2 border rounded-lg border-[#7EC1B1] w-[36px] ${
                  page === idx + 1 ? "bg-[#7EC1B1] text-white" : ""
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 border border-[#7EC1B1] rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Engineer;
