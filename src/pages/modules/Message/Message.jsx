
// import { useState } from "react";
// import Header2 from "../../../components/superAdmin/header/Header2";
// import { GoEye } from "react-icons/go";
// import { FiSearch } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// const Messages = () => {
//   const [entries, setEntries] = useState(7);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [userTypeFilter, setUserTypeFilter] = useState("All");
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   // Dummy data with id added
//   const data = [
//     { id: 1, userName: "John Doe", userType: "Admin", issueDetail: "Login issue", dateTime: "2025-10-20 10:30 AM" },
//     { id: 2, userName: "Jane Smith", userType: "Customer", issueDetail: "Payment failed", dateTime: "2025-10-20 11:00 AM" },
//     { id: 3, userName: "Robert Brown", userType: "Manufacturer", issueDetail: "Order not showing", dateTime: "2025-10-20 12:00 PM" },
//     { id: 4, userName: "David White", userType: "Admin", issueDetail: "App crash", dateTime: "2025-10-20 12:45 PM" },
//     { id: 5, userName: "Sophia Green", userType: "Customer", issueDetail: "Refund issue", dateTime: "2025-10-20 01:30 PM" },
//     { id: 6, userName: "Liam Davis", userType: "Manufacturer", issueDetail: "Stock missing", dateTime: "2025-10-20 02:00 PM" },
//     { id: 7, userName: "Emma Wilson", userType: "Customer", issueDetail: "Coupon error", dateTime: "2025-10-20 03:00 PM" },
//   ];

//   // 🔹 Filtering
//   const filteredData = data.filter((item) => {
//     const matchesUserType = userTypeFilter === "All" || item.userType === userTypeFilter;
//     const matchesSearch =
//       item.userName.toLowerCase().includes(search.toLowerCase()) ||
//       item.issueDetail.toLowerCase().includes(search.toLowerCase());
//     return matchesUserType && matchesSearch;
//   });

//   // 🔸 Pagination logic
//   const totalPages = Math.ceil(filteredData.length / entries);
//   const startIndex = (currentPage - 1) * entries;
//   const displayedData = filteredData.slice(startIndex, startIndex + entries);

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
//   };

//   // 🔹 Navigate to Chat Page
//   const handleViewChat = (item) => {
//     navigate("/message/newchat/chat", {
//       state: {
//         userType: item.userType,
//         user: item.userName,
//         id: item.id, 
//       },
//     });
//   };

//   return (
//     <div className="bg-white p-4 h-full overflow-y-auto flex flex-col gap-6 font-poppins">
//       <Header2 title="Messages" />

//       {/* 🔹 Top Controls */}
//    <div className="bg-white p-4 sm:p-6 rounded-lg shadow flex flex-wrap items-center justify-between gap-6">

//   {/* Show Entries */}
//   <div className="flex items-center gap-2">
//     <span className="text-[16px] ">Show</span>
//     <select
//       value={entries}
//       onChange={(e) => {
//         setEntries(Number(e.target.value));
//         setCurrentPage(1);
//       }}
//       className="p-2 border rounded w-[70px] bg-[#F5F5F5] "
//     >
//       {[10, 25].map((num) => (
//         <option key={num} value={num}>
//           {num}
//         </option>
//       ))}
//     </select>
//     <span className="text-[16px]">Entries</span>
//   </div>

//   {/* Search Bar */}
//   <div className="flex-1 flex justify-center w-full sm:w-auto">
//     <div className="relative w-full max-w-[260px]">
//       <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
//       <input
//         type="text"
//         placeholder="Search"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full p-2 pl-10 border rounded focus:outline-none bg-[#F5F5F5]"
//       />
//     </div>
//   </div>

//   {/* Select User Type */}
//   <div className="flex items-center gap-2">
//     <select
//       value={userTypeFilter}
//       onChange={(e) => setUserTypeFilter(e.target.value)}
//       className="p-2 border rounded bg-[#F5F5F5]"
//     >
//       <option value="All">Select User Type</option>
//       <option value="Admin">Admin</option>
//       <option value="Customer">Customer</option>
//       <option value="Manufacturer">Manufacturer</option>
//     </select>
//   </div>

//   {/* Start New Chat */}
//   <div>
//     <button
//       className="bg-[#7EC1B1] hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-medium transition"
//       onClick={() => navigate("/message/newchat")}
//     >
//       Start New Chat
//     </button>
//   </div>
// </div>


//       {/* 🔸 Table */}
//       <div className="bg-white p-3 sm:p-5 rounded-lg shadow flex flex-col gap-4 overflow-x-auto">
//         <table className="table-auto w-full border border-[#CACACA] min-w-[800px]">
//           <thead>
//             <tr className="bg-[#F5F5F5] text-center">
//               <th className="p-3 font-medium text-[18px]">S.No</th>
//               <th className="p-3 font-medium text-[18px]">User Name</th>
//               <th className="p-3 font-medium text-[18px]">User Type</th>
//               <th className="p-3 font-medium text-[18px]">Issue Detail</th>
//               <th className="p-3 font-medium text-[18px]">Date & Time</th>
//               <th className="p-3 font-medium text-[18px]">Action</th>
//             </tr>
//           </thead>
//           <tbody className="text-center">
//             {displayedData.length > 0 ? (
//               displayedData.map((item, index) => (
//                 <tr
//                   key={item.id} // use id as key
//                   className={`${index % 2 === 0 ? "bg-[#FFFFFF]" : "bg-[#FFFFFF]"} text-[#263138]`}
//                 >
//                   <td className="p-3">{item.id}</td>
//                   <td className="p-3 capitalize">{item.userName}</td>
//                   <td className="p-3">{item.userType}</td>
//                   <td className="p-3">{item.issueDetail}</td>
//                   <td className="p-3">{item.dateTime}</td>
//                   <td className="p-3 flex justify-center items-center">
//                     <GoEye
//                       className="text-blue-600 w-5 h-5 cursor-pointer hover:scale-110 transition"
//                       onClick={() => handleViewChat(item)}
//                     />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="p-4 text-gray-500 text-center">
//                   No messages found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3 flex-wrap font-400 text-[#263138]">
//           <span>
//             Showing {Math.min(startIndex + 1, filteredData.length)} to{" "}
//             {Math.min(startIndex + entries, filteredData.length)} of {filteredData.length} entries
//           </span>
//           <div className="flex flex-wrap gap-2 text-[#7EC1B1] justify-center">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="px-3 py-1 border border-[#7EC1B1] rounded-lg disabled:opacity-100"
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
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages || totalPages === 0}
//               className="px-3 py-1 border border-[#7EC1B1] rounded-lg disabled:opacity-100 "
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Messages;


import { useState } from "react";
import Header2 from "../../../components/superAdmin/header/Header2";
import { GoEye } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const [entries, setEntries] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [userTypeFilter, setUserTypeFilter] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const data = [
    { id: 1, userName: "John Doe", userType: "Admin", issueDetail: "Login issue", dateTime: "2025-10-20 10:30 AM" },
    { id: 2, userName: "Jane Smith", userType: "Customer", issueDetail: "Payment failed", dateTime: "2025-10-20 11:00 AM" },
    { id: 3, userName: "Robert Brown", userType: "Manufacturer", issueDetail: "Order not showing", dateTime: "2025-10-20 12:00 PM" },
    { id: 4, userName: "David White", userType: "Admin", issueDetail: "App crash", dateTime: "2025-10-20 12:45 PM" },
    { id: 5, userName: "Sophia Green", userType: "Customer", issueDetail: "Refund issue", dateTime: "2025-10-20 01:30 PM" },
    { id: 6, userName: "Liam Davis", userType: "Manufacturer", issueDetail: "Stock missing", dateTime: "2025-10-20 02:00 PM" },
    { id: 7, userName: "Emma Wilson", userType: "Customer", issueDetail: "Coupon error", dateTime: "2025-10-20 03:00 PM" },
    { id: 8, userName: "Robert Brown", userType: "Manufacturer", issueDetail: "Order not showing", dateTime: "2025-10-20 12:00 PM" },
    { id: 9, userName: "David White", userType: "Admin", issueDetail: "App crash", dateTime: "2025-10-20 12:45 PM" },
    { id: 10, userName: "Sophia Green", userType: "Customer", issueDetail: "Refund issue", dateTime: "2025-10-20 01:30 PM" },
  ];

  const filteredData = data.filter((item) => {
    const matchesUserType = userTypeFilter === "All" || item.userType === userTypeFilter;
    const matchesSearch =
      item.userName.toLowerCase().includes(search.toLowerCase()) ||
      item.issueDetail.toLowerCase().includes(search.toLowerCase());
    return matchesUserType && matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const displayedData = filteredData.slice(startIndex, startIndex + entries);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };

  const handleViewChat = (item) => {
    navigate("/message/newchat/chat", {
      state: {
        userType: item.userType,
        user: item.userName,
        id: item.id,
      },
    });
  };

  return (
    <div className="p-4 h-full flex flex-col gap-4">

      <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-6">

      <Header2 />

        {/* Top Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Show Entries */}
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={entries}
              onChange={(e) => {
                setEntries(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="p-2 border rounded bg-[#F5F5F5] w-[80px]"
            >
              {[10, 25].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            <span>Entries</span>
          </div>

          {/* Search */}
          <div className="relative w-full max-w-[260px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 pl-10 border rounded bg-[#F5F5F5]"
            />
          </div>

          {/* User Type Filter */}
          <select
            value={userTypeFilter}
            onChange={(e) => setUserTypeFilter(e.target.value)}
            className="p-2 border rounded bg-[#F5F5F5]"
          >
            <option value="All">Select User Type</option>
            <option value="Admin">Admin</option>
            <option value="Customer">Customer</option>
            <option value="Manufacturer">Manufacturer</option>
          </select>

          {/* Start New Chat */}
          <button
            className="bg-[#7EC1B1] text-white px-6 py-2 rounded-lg hover:bg-[#65a89d] transition"
            onClick={() => navigate("/message/newchat")}
          >
            Start New Chat
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-400 min-w-[800px]">
            <thead className="bg-[#F3F4F6] sticky top-0 z-10">
              <tr className="text-center">
                <th className="p-3">S.No</th>
                <th className="p-3">User Name</th>
                <th className="p-3">User Type</th>
                <th className="p-3">Issue Detail</th>
                <th className="p-3">Date & Time</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {displayedData.map((item) => (
                <tr key={item.id}>
                  <td className="p-3">{item.id}</td>
                  <td className="p-3 capitalize">{item.userName}</td>
                  <td className="p-3">{item.userType}</td>
                  <td className="p-3">{item.issueDetail}</td>
                  <td className="p-3">{item.dateTime}</td>
                 <td className="p-3 text-center">
  <button 
    className="flex justify-center items-center mx-auto" 
    onClick={() => handleViewChat(item)}
  >
    <GoEye className="text-blue-600 w-5 h-5" />
  </button>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-between items-center gap-3">
          <span>
            Showing {Math.min(startIndex + 1, filteredData.length)} to{" "}
            {Math.min(startIndex + entries, filteredData.length)} of {filteredData.length} entries
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-[#7EC1B1] rounded-lg"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`px-3 py-1 border rounded-lg border-[#7EC1B1] w-[36px] ${
                  currentPage === num ? "bg-[#7EC1B1] text-white" : ""
                }`}
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
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

export default Messages;
