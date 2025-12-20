// import { useState } from "react";
// import { FiSearch, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
// import Header2 from "../../../components/superAdmin/header/Header2";
// import { useNavigate } from "react-router-dom";

// const RolesAndPermissions = () => {
//   const navigate = useNavigate();

//   const tableData = [
//     { id: 1, name: "John Doe", role: "Sub Admin", phone: "+91 98765 43210", email: "john@example.com", password: "******" },
//     { id: 2, name: "Jane Smith", role: "Sub Admin", phone: "+91 91234 56789", email: "jane@example.com", password: "******" },
//     { id: 3, name: "Alex Ray", role: "Sub Admin", phone: "+91 99887 65432", email: "alex@example.com", password: "******" },
//     { id: 4, name: "Michael Brown", role: "Sub Admin", phone: "+91 90011 22334", email: "michael@example.com", password: "******" },
//     { id: 5, name: "Emily Davis", role: "Sub Admin", phone: "+91 81234 56780", email: "emily@example.com", password: "******" },
//     { id: 6, name: "Chris Wilson", role: "Sub Admin", phone: "+91 76543 21987", email: "chris@example.com", password: "******" },
//     { id: 7, name: "Sophia Johnson", role: "Sub Admin", phone: "+91 78965 43210", email: "sophia@example.com", password: "******" },
//     { id: 8, name: "Daniel Lee", role: "Sub Admin", phone: "+91 84567 12345", email: "daniel@example.com", password: "******" },
//     { id: 9, name: "Olivia Martin", role: "Sub Admin", phone: "+91 81245 96325", email: "olivia@example.com", password: "******" },
//     { id: 10, name: "William Taylor", role: "Sub Admin", phone: "+91 79999 88888", email: "william@example.com", password: "******" },
//   ];

//   const [entriesPerPage, setEntriesPerPage] = useState(8);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [search, setSearch] = useState("");

//   const filteredRows = tableData.filter((row) =>
//     row.name.toLowerCase().includes(search.toLowerCase()) ||
//     row.email.toLowerCase().includes(search.toLowerCase()) ||
//     row.phone.toLowerCase().includes(search.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredRows.length / entriesPerPage);
//   const indexOfLastItem = currentPage * entriesPerPage;
//   const indexOfFirstItem = indexOfLastItem - entriesPerPage;
//   const currentItems = filteredRows.slice(indexOfFirstItem, indexOfLastItem);

//   const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
//   const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
//   const handlePageChange = (page) => setCurrentPage(page);

//   return (
//     <div className="bg-gray-100 p-4 h-full overflow-y-auto flex flex-col gap-6 font-poppins">

      
//       <Header2 title="Roles & Permissions" />

//       {/* Top Controls */}
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow flex flex-wrap items-center justify-between gap-6">
        
//         {/* Show Entries */}
//         <div className="flex items-center gap-2">
//           <span className="text-[16px]">Show</span>
//           <select
//             value={entriesPerPage}
//             onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//             className="p-2 border rounded w-[80px] bg-[#F5F5F5]"
//           >
//             {[8, 15, 25].map((num) => (
//               <option key={num} value={num}>
//                 {num}
//               </option>
//             ))}
//           </select>
//           <span className="text-[16px]">Entries</span>
//         </div>

//         {/* Search */}
//         <div className="flex-1 flex justify-center w-full sm:w-auto">
//           <div className="relative w-full max-w-[260px]">
//             <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
//             <input
//               type="text"
//               placeholder="Search"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full p-2 pl-10 border rounded focus:outline-none bg-[#F5F5F5]"
//             />
//           </div>
//         </div>

//         {/* Role Filter */}
//         <select className="p-2 border rounded bg-[#F5F5F5]">
//                     <option>Select Role</option>

//           <option>Sub Admin</option>
//           <option>Admin</option>
//           <option>Manager</option>
//         </select>

//         {/* Create Sub Admin Button */}
//         <button
//           onClick={() => navigate("/roles-permission/create-sub-admin")}
//           className="bg-[#7EC1B1] hover:bg-[#68a697] text-white px-6 py-2 rounded-lg font-medium transition"
//         >
//           Create Sub Admin
//         </button>
//       </div>

//       {/* Table */}
//       <div className="bg-white p-3 sm:p-5 rounded-lg shadow flex flex-col gap-4 overflow-x-auto">
//         <table className="table-auto w-full border border-[#CACACA] min-w-[900px]">
//           <thead>
//             <tr className="bg-[#F5F5F5] text-center">
//               {["S.No", "Sub Admin Name", "Role", "Phone Number", "Email", "Password", "Action"].map((header, idx) => (
//                 <th key={idx} className="p-3 font-medium text-[18px]">
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody className="text-center">
//             {currentItems.length > 0 ? (
//               currentItems.map((row) => (
//                 <tr key={row.id} className="bg-white text-[#263138]">
//                   <td className="p-3">{row.id}</td>
//                   <td className="p-3 capitalize">{row.name}</td>
//                   <td className="p-3">{row.role}</td>
//                   <td className="p-3">{row.phone}</td>
//                   <td className="p-3">{row.email}</td>
//                   <td className="p-3">{row.password}</td>
//                   <td className="p-3 flex justify-center items-center gap-4">
//                     <FiEye
//                       className="text-blue-600 w-5 h-5 cursor-pointer hover:scale-110 transition"
//                       onClick={() =>
//                         navigate(`/roles-permission/view-sub-admin/${row.id}`, { state: { user: row } })
//                       }
//                     />
//                     <FiEdit
//                       className="text-green-600 w-5 h-5 cursor-pointer hover:scale-110 transition"
//                       onClick={() =>
//                         navigate(`/roles-permission/edit-sub-admin/${row.id}`, { state: { user: row } })
//                       }
//                     />
//                     <FiTrash2 className="text-red-600 w-5 h-5 cursor-pointer hover:scale-110 transition" />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="p-4 text-gray-500">
//                   No Sub Admins Found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3 font-400 text-[#263138]">
//           <span>
//             Showing {Math.min(indexOfFirstItem + 1, filteredRows.length)} to{" "}
//             {Math.min(indexOfLastItem, filteredRows.length)} of {filteredRows.length} entries
//           </span>

//           <div className="flex flex-wrap gap-2 text-[#7EC1B1] justify-center">
//             <button
//               onClick={handlePrevPage}
//               disabled={currentPage === 1}
//               className="px-3 py-1 border border-[#7EC1B1] rounded-lg disabled:opacity-50"
//             >
//               Previous
//             </button>

//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
//               <button
//                 key={num}
//                 onClick={() => handlePageChange(num)}
//                 className={`p-2 border rounded-lg border-[#7EC1B1] w-[36px] ${
//                   currentPage === num ? "bg-[#7EC1B1] text-white" : ""
//                 }`}
//               >
//                 {num}
//               </button>
//             ))}

//             <button
//               onClick={handleNextPage}
//               disabled={currentPage === totalPages}
//               className="px-3 py-1 border border-[#7EC1B1] rounded-lg disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RolesAndPermissions;

import { useState } from "react";
import { FiSearch, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import Header2 from "../../../components/superAdmin/header/Header2";
import { useNavigate } from "react-router-dom";

const RolesAndPermissions = () => {
  const navigate = useNavigate();

  const tableData = [
    { id: 1, name: "John Doe", role: "Sub Admin", phone: "+91 98765 43210", email: "john@example.com", password: "******" },
    { id: 2, name: "Jane Smith", role: "Sub Admin", phone: "+91 91234 56789", email: "jane@example.com", password: "******" },
    { id: 3, name: "Alex Ray", role: "Sub Admin", phone: "+91 99887 65432", email: "alex@example.com", password: "******" },
    { id: 4, name: "Michael Brown", role: "Sub Admin", phone: "+91 90011 22334", email: "michael@example.com", password: "******" },
    { id: 5, name: "Emily Davis", role: "Sub Admin", phone: "+91 81234 56780", email: "emily@example.com", password: "******" },
    { id: 6, name: "Chris Wilson", role: "Sub Admin", phone: "+91 76543 21987", email: "chris@example.com", password: "******" },
    { id: 7, name: "Sophia Johnson", role: "Sub Admin", phone: "+91 78965 43210", email: "sophia@example.com", password: "******" },
    { id: 8, name: "Daniel Lee", role: "Sub Admin", phone: "+91 84567 12345", email: "daniel@example.com", password: "******" },
    { id: 9, name: "Olivia Martin", role: "Sub Admin", phone: "+91 81245 96325", email: "olivia@example.com", password: "******" },
    { id: 10, name: "William Taylor", role: "Sub Admin", phone: "+91 79999 88888", email: "william@example.com", password: "******" },
  ];

  const [entriesPerPage, setEntriesPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const filteredRows = tableData.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase()) ||
    row.email.toLowerCase().includes(search.toLowerCase()) ||
    row.phone.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRows.length / entriesPerPage);
  const indexOfLastItem = currentPage * entriesPerPage;
  const indexOfFirstItem = indexOfLastItem - entriesPerPage;
  const currentItems = filteredRows.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="bg-gray-100 p-4 h-full overflow-y-auto font-poppins">
      <div className="bg-white p-5 md:p-8 rounded-lg shadow flex flex-col gap-6">

        <Header2 title="Roles & Permissions" />

        {/* Top Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 w-full">

          {/* Entries */}
          <div className="flex items-center gap-2">
            <span className="text-[16px]">Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="p-2 border rounded w-[80px] bg-[#F5F5F5]"
            >
              {[8, 15, 25].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            <span className="text-[16px]">Entries</span>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-[260px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 pl-10 border rounded bg-[#F5F5F5]"
            />
          </div>

          {/* Filter */}
          <select className="p-2 border rounded bg-[#F5F5F5]">
            <option>Select Role</option>
            <option>Sub Admin</option>
            <option>Admin</option>
            <option>Manager</option>
          </select>

          {/* Button */}
          <button
            onClick={() => navigate("/roles-permission/create-sub-admin")}
            className="bg-[#7EC1B1] hover:bg-[#68a697] text-white px-6 py-2 rounded-lg font-medium"
          >
            Create Sub Admin
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-[#CACACA] min-w-[950px] rounded-lg">
            <thead>
              <tr className="bg-[#F5F5F5] text-center">
                {["S.No", "Sub Admin Name", "Role", "Phone", "Email", "Password", "Action"].map(
                  (head, i) => (
                    <th key={i} className="p-3 font-medium text-[18px]">{head}</th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="text-center">
              {currentItems.length > 0 ? (
                currentItems.map((row) => (
                  <tr key={row.id}>
                    <td className="p-3">{row.id}</td>
                    <td className="p-3 capitalize">{row.name}</td>
                    <td className="p-3">{row.role}</td>
                    <td className="p-3">{row.phone}</td>
                    <td className="p-3">{row.email}</td>
                    <td className="p-3">{row.password}</td>
                    <td className="p-3 flex justify-center gap-3">
                      <FiEye
                        className="text-blue-600 w-5 h-5 cursor-pointer"
                        onClick={() => navigate(`/roles-permission/view-sub-admin/${row.id}`, { state: { user: row } })}
                      />
                      <FiEdit
                        className="text-green-600 w-5 h-5 cursor-pointer"
                        onClick={() => navigate(`/roles-permission/edit-sub-admin/${row.id}`, { state: { user: row } })}
                      />
                      <FiTrash2 className="text-red-600 w-5 h-5 cursor-pointer" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-4 text-gray-500">No Sub Admins Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-between items-center mt-2 gap-3">
          <span>
            Showing {Math.min(indexOfFirstItem + 1, filteredRows.length)} to{" "}
            {Math.min(indexOfLastItem, filteredRows.length)} of {filteredRows.length} entries
          </span>

          <div className="flex flex-wrap gap-2 text-[#7EC1B1]">
            <button
              disabled={currentPage === 1}
              onClick={handlePrevPage}
              className="px-3 py-1 border border-[#7EC1B1] rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => handlePageChange(n)}
                className={`px-2 py-1 border border-[#7EC1B1] rounded-lg ${
                  currentPage === n ? "bg-[#7EC1B1] text-white" : ""
                }`}
              >
                {n}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
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

export default RolesAndPermissions;
