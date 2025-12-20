

// import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import Header2 from "../../../components/superAdmin/header/Header2";
// import { GoEye } from "react-icons/go";

// import { IoLocationSharp } from "react-icons/io5"; // Location
// import { PiBuildingOfficeLight } from "react-icons/pi"; // Skill
// import { FiPhone } from "react-icons/fi"; // Phone

// const ViewEngineer = () => {
//   const location = useLocation();
//   const engineer = location.state?.engineer;

//   const successRate = 75;
//   const [active, setActive] = useState(engineer?.isActive ?? true);
//   // const assignedLeads = engineer?.assignedLeads || [];

//   const assignedLeads = [
//     {
//       id: "L001",
//       customerName: "Ajay Kumar",
//       serviceType: "Repair",
//       productModel: "Model A",
//       orderDate: "2025-10-10",
//       status: "Assigned",
//     },
//     {
//       id: "L002",
//       customerName: "Ramesh Sharma",
//       serviceType: "Installation",
//       productModel: "Model B",
//       orderDate: "2025-10-11",
//       status: "In Progress",
//     },
//     {
//       id: "L003",
//       customerName: "Sita Devi",
//       serviceType: "Maintenance",
//       productModel: "Model C",
//       orderDate: "2025-10-12",
//       status: "Completed",
//     },
//     {
//       id: "L004",
//       customerName: "Vijay Singh",
//       serviceType: "Repair",
//       productModel: "Model D",
//       orderDate: "2025-10-13",
//       status: "Accepted",
//     },
//     {
//       id: "L005",
//       customerName: "Anita Rao",
//       serviceType: "Installation",
//       productModel: "Model E",
//       orderDate: "2025-10-14",
//       status: "Assigned",
//     },
//     {
//       id: "L006",
//       customerName: "Rahul Verma",
//       serviceType: "Maintenance",
//       productModel: "Model F",
//       orderDate: "2025-10-15",
//       status: "In Progress",
//     },
//     {
//       id: "L007",
//       customerName: "Priya Singh",
//       serviceType: "Repair",
//       productModel: "Model G",
//       orderDate: "2025-10-16",
//       status: "Completed",
//     },
//     {
//       id: "L008",
//       customerName: "Karan Patel",
//       serviceType: "Installation",
//       productModel: "Model H",
//       orderDate: "2025-10-17",
//       status: "Accepted",
//     },
//   ];

//   const totalLeads = assignedLeads.length;
//   const ongoingLeads = assignedLeads.filter(
//     (l) => l.status === "Assigned"
//   ).length;
//   const leadsRejected = assignedLeads.filter(
//     (l) => l.status === "Rejected"
//   ).length;
//   // const successRate = totalLeads === 0 ? 0 : Math.round(((totalLeads - leadsRejected) / totalLeads) * 100);

//   if (!engineer) return <div className="p-6">No engineer data available.</div>;

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col p-4 sm:p-6 gap-6">
//       <Header2 />

//       {/* Engineer Info */}
//       <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg flex flex-col gap-6">
//         {/* Header Section */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           {/* Left Side - Name + Badge */}
//           <div className="flex items-center gap-3 flex-wrap">
//             <h2 className="text-2xl sm:text-[32px] font-600 font-semibold font-poppins">
//               {engineer.name}
//             </h2>
//             <span
//               className={`text-white text-sm font-semibold px-3 py-1 rounded-full ${
//                 active ? "bg-[#3A953A]" : "bg-red-600 text-white"
//               }`}
//             >
//               {active ? "Available" : "Inactive"}
//             </span>
//           </div>

//           {/* Right Side - Active Toggle */}
//           <div className="flex items-center gap-3">
//             <span className="font-medium text-base">Active Status</span>
//             <label className="relative inline-flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={active}
//                 onChange={() => setActive(!active)}
//                 className="sr-only peer"
//               />
//               <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition duration-300"></div>
//               <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition duration-300"></div>
//             </label>
//           </div>
//         </div>

//         {/* Assigned Area Below Name */}
//         <div className="flex gap-3 flex-wrap">
//           <IoLocationSharp className="w-6 h-6 text-[#7EC1B1] mt-1" />
//           <div className="flex flex-col">
//             <span className="font-medium text-lg text-black">
//               Assigned Area:
//             </span>
//             <p className="text-xl font-400 text-[#7EC1B1]">
//               {engineer.assignedArea}
//             </p>
//           </div>
//         </div>

//         {/* Map and Details Section */}
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Map */}
//           <div className="w-full md:w-1/2 rounded-lg overflow-hidden border shadow">
//             <iframe
//               title="Location Map"
//               width="100%"
//               height="300"
//               frameBorder="0"
//               style={{ border: 0 }}
//               src={`https://maps.google.com/maps?q=${encodeURIComponent(
//                 engineer.assignedArea
//               )}&z=15&output=embed`}
//               allowFullScreen
//               aria-hidden="false"
//             />
//           </div>

//           {/* Right Side Info */}
//           <div className="w-full md:w-1/2 flex flex-col gap-4">
//             {/* Skill */}
//             <div className="flex items-start gap-3">
//               <PiBuildingOfficeLight className="w-6 h-6 text-[#7EC1B1] mt-1" />
//               <div>
//                 <span className="font-medium text-lg text-black">Skill:</span>
//                 <p className="text-xl font-400 text-[#7EC1B1]">
//                   {engineer.skill}
//                 </p>
//               </div>
//             </div>

//             {/* Phone Number */}
//             <div className="flex items-start gap-3">
//               <FiPhone className="w-6 h-6 text-[#7EC1B1] mt-1" />
//               <div>
//                 <span className="font-medium text-lg text-black">
//                   Phone No.:
//                 </span>
//                 <p className="text-xl font-400 text-[#7EC1B1]">
//                   {engineer.phone}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4">
//           {/* Total Leads */}
//           <div className="bg-[#F5F5F5] rounded-xl p-1 shadow">
//             <div className="bg-[#F5F5F5] p-5 rounded-lg flex justify-between items-center">
//               <div className="flex flex-col gap-1">
//                 <span className="text-lg font-semibold text-gray-600">
//                   Total Leads Handled
//                 </span>
//                 <span className="text-2xl font-bold text-gray-900">
//                   {totalLeads}
//                 </span>
//               </div>
//               <div className="bg-[#624AD940] p-2 rounded-lg shadow flex items-center justify-center">
//                 <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#624AD9]">
//                   <svg
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     className="text-white w-6 h-6"
//                   >
//                     <path d="M16.707 5.293a1 1 0 0 0-1.414 0L8 12.586 4.707 9.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l8-8a1 1 0 0 0 0-1.414z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Ongoing Leads */}
//           <div className="bg-[#F5F5F5] rounded-xl p-1 shadow">
//             <div className="bg-[#F5F5F5] p-5 rounded-lg flex justify-between items-center">
//               <div className="flex flex-col gap-1">
//                 <span className="text-lg font-semibold text-gray-600">
//                   Ongoing Leads
//                 </span>
//                 <span className="text-2xl font-bold text-gray-900">
//                   {ongoingLeads}
//                 </span>
//               </div>
//               <div className="bg-[#FEC53D40] p-2 rounded-lg shadow flex items-center justify-center">
//                 <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FEC53D]">
//                   <svg
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                     className="text-white w-6 h-6"
//                   >
//                     <circle cx="6" cy="12" r="2" />
//                     <circle cx="12" cy="12" r="2" />
//                     <circle cx="18" cy="12" r="2" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Leads Rejected */}
//           <div className="bg-[#F5F5F5] rounded-xl p-1 shadow">
//             <div className="bg-[#F5F5F5] p-5 rounded-lg flex justify-between items-center">
//               <div className="flex flex-col gap-1">
//                 <span className="text-lg font-semibold text-gray-600">
//                   Leads Rejected
//                 </span>
//                 <span className="text-2xl font-bold text-gray-900">
//                   {leadsRejected}
//                 </span>
//               </div>
//               <div className="bg-[#FE3D3D40] p-2 rounded-lg shadow flex items-center justify-center">
//                 <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FE3D3D]">
//                   <svg
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     className="text-white w-6 h-6"
//                   >
//                     <path d="M10 8.586l4.95-4.95a1 1 0 0 1 1.414 1.414L11.414 10l4.95 4.95a1 1 0 0 1-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 0 1-1.414-1.414L8.586 10l-4.95-4.95a1 1 0 0 1 1.414-1.414z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Success Rate */}
//           <div className="bg-[#F5F5F5] rounded-xl p-1 shadow">
//             <div className="bg-[#F5F5F5] p-5 rounded-lg flex justify-between items-center">
//               <div className="flex flex-col gap-1">
//                 <span className="text-lg font-semibold text-gray-600">
//                   Success Rate
//                 </span>
//                 <span className="text-2xl font-bold text-gray-900">
//                   {successRate}%
//                 </span>
//               </div>
//               <div className="bg-green-50 rounded-xl p-1 shadow">
//                 <div className="bg-[#4AD99140] rounded-full w-16 h-16 flex items-center justify-center">
//                   <div className="w-14 h-14 relative">
//                     <svg
//                       className="w-14 h-14 transform -rotate-90"
//                       viewBox="0 0 36 36"
//                     >
//                       <circle
//                         cx="18"
//                         cy="18"
//                         r="16"
//                         strokeWidth="4"
//                         stroke="#d1fae5"
//                         fill="none"
//                       />
//                       <circle
//                         cx="18"
//                         cy="18"
//                         r="16"
//                         strokeWidth="4"
//                         stroke="#10b981"
//                         fill="none"
//                         strokeDasharray={`${successRate}, 100`}
//                         strokeLinecap="round"
//                       />
//                     </svg>
//                     <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-700">
//                       {successRate}%
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Assigned Leads Section */}
//         <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-6">
//           <h2 className="text-2xl font-bold text-gray-800">Assigned Leads</h2>

//           {/* Top Controls */}
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 flex-wrap">
//             <div className="flex items-center gap-2">
//               <label className="font-medium text-gray-700">Show</label>
//               <select className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]">
//                 <option value={5}>5</option>
//                 <option value={10}>10</option>
//                 <option value={25}>25</option>
//                 <option value={50}>50</option>
//               </select>
//               <span className="font-medium text-gray-700">entries</span>
//             </div>

//             <div className="flex items-center gap-2 w-full sm:w-auto">
//               <label className="font-medium text-gray-700">Search:</label>
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="w-full sm:w-auto p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
//               />
//             </div>

//             <div className="flex items-center gap-2 w-full sm:w-auto">
//               <label className="font-medium text-gray-700">Status:</label>
//               <select className="w-full sm:w-auto p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]">
//                 <option value="" disabled hidden>
//                   All
//                 </option>
//                 <option value="Assigned">Assigned</option>
//                 <option value="Accepted">Accepted</option>
//                 <option value="Completed">Completed</option>
//                 <option value="In Progress">In Progress</option>
//               </select>
//             </div>
//           </div>

//           {/* Responsive Table */}
//           <div className="overflow-x-auto">
//             <table className="min-w-[700px] w-full border border-gray-300 rounded-lg overflow-hidden">
//               <thead className="bg-gray-200 text-gray-700 text-base">
//                 <tr>
//                   <th className="p-3 font-semibold">Sr.No.</th>
//                   <th className="p-3 font-semibold">Lead ID</th>
//                   <th className="p-3 font-semibold">Customer Name</th>
//                   <th className="p-3 font-semibold">Service Type</th>
//                   <th className="p-3 font-semibold">Product Model</th>
//                   <th className="p-3 font-semibold">Order Date</th>
//                   <th className="p-3 font-semibold">Status</th>
//                   <th className="p-3 font-semibold">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {totalLeads === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={8}
//                       className="text-center p-6 text-gray-400 align-middle"
//                     >
//                       No data available
//                     </td>
//                   </tr>
//                 ) : (
//                   assignedLeads.map((lead, idx) => (
//                     <tr
//                       key={lead.id}
//                       className="border-b bg-gray-50 hover:bg-blue-50 transition"
//                     >
//                       <td className="p-3 text-center align-middle">
//                         {idx + 1}
//                       </td>
//                       <td className="p-3 text-center align-middle">
//                         {lead.id}
//                       </td>
//                       <td className="p-3 text-center align-middle">
//                         {lead.customerName}
//                       </td>
//                       <td className="p-3 text-center align-middle">
//                         {lead.serviceType}
//                       </td>
//                       <td className="p-3 text-center align-middle">
//                         {lead.productModel}
//                       </td>
//                       <td className="p-3 text-center align-middle">
//                         {lead.orderDate}
//                       </td>
//                       <td
//                         className={`p-3 text-center font-bold align-middle ${
//                           lead.status === "Assigned"
//                             ? "text-yellow-600 px-2 py-1"
//                             : lead.status === "In Progress"
//                               ? "text-blue-600 px-2 py-1"
//                               : lead.status === "Completed"
//                                 ? "text-green-600 px-2 py-1"
//                                 : "text-purple-600 px-2 py-1"
//                         }`}
//                       >
//                         {lead.status}
//                       </td>
//                       <td className="p-3 align-middle">
//                         <div className="flex justify-center">
//                           <GoEye className="text-blue-600 cursor-pointer" />
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewEngineer;

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header2 from "../../../components/superAdmin/header/Header2";
import { GoEye } from "react-icons/go"; // Imported both Eye icons
import { IoLocationSharp } from "react-icons/io5"; // Location
import { PiBuildingOfficeLight } from "react-icons/pi"; // Skill
import { FiPhone } from "react-icons/fi"; // Phone
import { FiSearch } from "react-icons/fi"; // Search icon for consistency
import { HiOutlineLockClosed } from "react-icons/hi"; // Lock icon for password

const ViewEngineer = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Hook for navigation

    // Placeholder data structure for demonstration (Used for clean initial state if location.state is missing)
    const engineerPlaceholder = {
        id: "E001",
        name: "Abhishek Shinde",
        assignedArea: "Pune, Maharashtra, India",
        skill: "RO Repair & Installation",
        phone: "9876543210",
        // Added a placeholder password field
        password: "securepassword123", 
        isActive: true,
    };

    // Use actual engineer data or the placeholder if state is empty
    const engineer = location.state?.engineer || engineerPlaceholder;

    const assignedLeads = [
        { id: "L001", customerName: "Ajay Kumar", serviceType: "Repair", productModel: "Model A", orderDate: "2025-10-10", status: "Assigned" },
        { id: "L002", customerName: "Ramesh Sharma", serviceType: "Installation", productModel: "Model B", orderDate: "2025-10-11", status: "In Progress" },
        { id: "L003", customerName: "Sita Devi", serviceType: "Maintenance", productModel: "Model C", orderDate: "2025-10-12", status: "Completed" },
        { id: "L004", customerName: "Vijay Singh", serviceType: "Repair", productModel: "Model D", orderDate: "2025-10-13", status: "Accepted" },
        { id: "L005", customerName: "Anita Rao", serviceType: "Installation", productModel: "Model E", orderDate: "2025-10-14", status: "Assigned" },
        { id: "L006", customerName: "Rahul Verma", serviceType: "Maintenance", productModel: "Model F", orderDate: "2025-10-15", status: "In Progress" },
        { id: "L007", customerName: "Priya Singh", serviceType: "Repair", productModel: "Model G", orderDate: "2025-10-16", status: "Completed" },
        { id: "L008", customerName: "Karan Patel", serviceType: "Installation", productModel: "Model H", orderDate: "2025-10-17", status: "Accepted" },
    ];

    const [active, setActive] = useState(engineer.isActive ?? true);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    // New state for password visibility
    const [showPassword, setShowPassword] = useState(false); 

    const totalLeads = assignedLeads.length;
    const completedLeads = assignedLeads.filter(l => l.status === "Completed").length;
    const ongoingLeads = assignedLeads.filter(l => l.status === "Assigned" || l.status === "Accepted" || l.status === "In Progress").length;
    const leadsRejected = assignedLeads.filter(l => l.status === "Rejected").length;

    const successRate = totalLeads === 0 ? 0 : Math.round((completedLeads / totalLeads) * 100);

    // const successRate = totalLeads === 0 ? 0 : Math.round(((totalLeads - leadsRejected) / totalLeads) * 100); // Kept commented as per original

    
    const filteredLeads = assignedLeads.filter(
        (lead) =>
            (lead.customerName.toLowerCase().includes(search.toLowerCase()) ||
                lead.id.toLowerCase().includes(search.toLowerCase())) &&
            (statusFilter === "" || lead.status === statusFilter)
    );

    const paginatedLeads = filteredLeads.slice(0, rowsPerPage);


    // Helper function for status colors (matching the previous component's style)
    const getStatusColor = (status) => {
        switch (status) {
            case "Completed":
                return "text-green-700 bg-green-100 border-green-300";
            case "In Progress":
                return "text-blue-700 bg-blue-100 border-blue-300";
            case "Accepted":
                return "text-purple-700 bg-purple-100 border-purple-300";
            case "Assigned":
                return "text-yellow-700 bg-yellow-100 border-yellow-300";
            case "Rejected":
                return "text-red-700 bg-red-100 border-red-300";
            default:
                return "text-gray-600 bg-gray-100 border-gray-300";
        }
    };

    // Helper function for stat card icon colors
    const getStatColor = (title) => {
        switch (title) {
            case "Total Leads Handled": return { bg: "bg-[#624AD940]", circle: "bg-[#624AD9]" };
            case "Ongoing Leads": return { bg: "bg-[#FEC53D40]", circle: "bg-[#FEC53D]" };
            case "Leads Rejected": return { bg: "bg-[#FE3D3D40]", circle: "bg-[#FE3D3D]" };
            case "Success Rate": return { bg: "bg-green-50", circle: "bg-[#4AD99140]" };
            default: return { bg: "bg-gray-200", circle: "bg-gray-500" };
        }
    }

    if (!engineer) return <div className="p-6">No engineer data available.</div>;

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col p-4 sm:p-6 gap-6">
            <Header2 />

            {/* Engineer Info Card */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg flex flex-col gap-6">

                {/* Breadcrumb - Added for better UX */}
                <div className="flex items-center text-gray-600 text-sm font-medium">
                    <span
                        onClick={() => navigate("/engineers")}
                        className="text-[#263238] cursor-pointer hover:text-[#0088FF]"
                    >
                        Engineers
                    </span>
                    <span className="mx-2 text-gray-400">{'>'}</span>
                    <span className="text-[#0088FF]">View Engineer</span>
                </div>

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
                    {/* Left Side - Name + Badge */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3 flex-wrap">
                            <h2 className="text-2xl sm:text-[32px] font-semibold text-[#263138] font-poppins">
                                {engineer.name}
                            </h2>
                            <span
                                className={`text-white text-sm font-semibold px-3 py-1 rounded-full ${
                                    active ? "bg-[#5EC87E]" : "bg-red-600" 
                                }`}
                            >
                                {active ? "Available" : "Inactive"}
                            </span>
                        </div>
                        {/* Assigned Area Below Name */}
                        <div className="flex items-start gap-2 mt-2">
                            <IoLocationSharp className="w-5 h-5 text-[#7EC1B1] mt-1" />
                            <div className="flex flex-col">
                                <span className="font-medium text-base text-gray-700">Assigned Area:</span>
                                <p className="text-lg font-medium text-[#7EC1B1]">
                                    {engineer.assignedArea}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Active Toggle */}
                    <div className="flex items-center gap-3">
                        <span className="font-medium text-base text-gray-700">Active Status</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={active}
                                onChange={() => setActive(!active)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5EC87E]"></div>
                           
                        </label>
                    </div>
                </div>

                {/* Map and Details Section */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Map */}
                    <div className="w-full md:w-1/2 rounded-xl overflow-hidden border border-gray-300 shadow-md">
                        <iframe
                            title="Location Map"
                            width="100%"
                            height="300"
                            frameBorder="0"
                            style={{ border: 0 }}
                            src={`https://maps.google.com/maps?q=$?q=${encodeURIComponent(
                                engineer.assignedArea
                            )}&z=12&output=embed`}
                            allowFullScreen
                            aria-hidden="false"
                            loading="lazy"
                        />
                    </div>

                    {/* Right Side Info */}
                    <div className="w-full md:w-1/2 flex flex-col gap-6 p-4 border rounded-xl shadow-inner bg-gray-50">
                        {/* Skill */}
                        <div className="flex items-start gap-3">
                            <PiBuildingOfficeLight className="w-6 h-6 text-[#7EC1B1] mt-1" />
                            <div>
                                <span className="font-medium text-lg text-gray-700">Skill:</span>
                                <p className="text-xl font-semibold text-[#263138]">
                                    {engineer.skill}
                                </p>
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="flex items-start gap-3">
                            <FiPhone className="w-6 h-6 text-[#7EC1B1] mt-1" />
                            <div>
                                <span className="font-medium text-lg text-gray-700">Phone No.:</span>
                                <p className="text-xl font-semibold text-[#263138]">
                                    +91 {engineer.phone}
                                </p>
                            </div>
                        </div>

                        {/* Password Field (New Addition) */}
                        <div className="flex items-start gap-3">
                            <HiOutlineLockClosed className="w-6 h-6 text-[#7EC1B1] mt-1" />
                            <div>
                                <span className="font-medium text-lg text-gray-700">Password:</span>
                                <div className="flex items-center relative">
                                    <p className="text-xl font-semibold text-[#263138] pr-10">
                                        {showPassword ? engineer.password : "••••••••"}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-0 text-gray-500 hover:text-gray-700 p-1"
                                    
                                    >
                                       
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* End New Addition */}

                    </div>
                </div>

                {/* Stats Section - Refined for better alignment and padding */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-4">
                    {[
                        { title: "Total Leads Handled", value: totalLeads },
                        { title: "Ongoing Leads", value: ongoingLeads },
                        { title: "Leads Rejected", value: leadsRejected },
                        { title: "Success Rate", value: `${successRate}%` },
                    ].map((item, i) => {
                        const colors = getStatColor(item.title);
                        const isSuccessRate = item.title === "Success Rate";
                        return (
                            <div
                                key={i}
                                className={`bg-white rounded-xl shadow-md p-4 border border-gray-200 flex items-center justify-between gap-2`}
                            >
                                <div>
                                    <p className="text-sm font-medium text-gray-600 leading-snug">{item.title}</p>
                                    <p className="text-xl sm:text-2xl font-bold text-[#263138] mt-1">
                                        {item.value}
                                    </p>
                                </div>
                                <div className={`${colors.bg} p-2 rounded-xl shadow flex items-center justify-center min-w-[50px]`}>
                                    {isSuccessRate ? (
                                        <div className="w-12 h-12 relative">
                                            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                                                <circle cx="18" cy="18" r="16" strokeWidth="4" stroke="#d1fae5" fill="none" />
                                                <circle
                                                    cx="18" cy="18" r="16" strokeWidth="4" stroke="#10b981" fill="none"
                                                    strokeDasharray={`${successRate}, 100`} strokeLinecap="round"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">
                                                {successRate}%
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${colors.circle}`}>
                                            {/* Simplified icons for the others for consistency */}
                                            {item.title === "Total Leads Handled" && <svg fill="currentColor" viewBox="0 0 20 20" className="text-white w-5 h-5"><path d="M16.707 5.293a1 1 0 0 0-1.414 0L8 12.586 4.707 9.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l8-8a1 1 0 0 0 0-1.414z" /></svg>}
                                            {item.title === "Ongoing Leads" && <svg fill="currentColor" viewBox="0 0 24 24" className="text-white w-5 h-5"><circle cx="6" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="18" cy="12" r="2" /></svg>}
                                            {item.title === "Leads Rejected" && <svg fill="currentColor" viewBox="0 0 20 20" className="text-white w-5 h-5"><path d="M10 8.586l4.95-4.95a1 1 0 0 1 1.414 1.414L11.414 10l4.95 4.95a1 1 0 0 1-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 0 1-1.414-1.414L8.586 10l-4.95-4.95a1 1 0 0 1 1.414-1.414z" /></svg>}
                                        </div>
                                    )}
                                </div>
                                {/*
                                <div className="bg-[#F5F5F5] rounded-xl p-1 shadow">
                                    <div className="bg-[#F5F5F5] p-5 rounded-lg flex justify-between items-center">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-lg font-semibold text-gray-600">
                                                {item.title}
                                            </span>
                                            <span className="text-2xl font-bold text-gray-900">
                                                {item.value}
                                            </span>
                                        </div>
                                        <div className="bg-[#624AD940] p-2 rounded-lg shadow flex items-center justify-center">
                                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#624AD9]">
                                                <svg
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    className="text-white w-6 h-6"
                                                >
                                                    <path d="M16.707 5.293a1 1 0 0 0-1.414 0L8 12.586 4.707 9.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l8-8a1 1 0 0 0 0-1.414z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                */}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Assigned Leads Table Section */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg flex flex-col gap-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[#263138]">Assigned Leads</h2>

                {/* Top Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
                    {/* Show Entries */}
                    <div className="flex items-center gap-2">
                        <label className="font-medium text-gray-700">Show</label>
                        <select
                            value={rowsPerPage}
                            onChange={(e) => setRowsPerPage(Number(e.target.value))}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] w-[60px]"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                        <span className="font-medium text-gray-700">entries</span>
                    </div>

                    {/* Search and Status Filter */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        {/* Search Bar */}
                        <div className="relative w-full sm:w-auto min-w-[200px]">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                            <input
                                type="text"
                                placeholder="Search Lead ID/Name"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <label className="font-medium text-gray-700 whitespace-nowrap">Status:</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
                            >
                                <option value="">All</option>
                                <option value="Assigned">Assigned</option>
                                <option value="Accepted">Accepted</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Responsive Table */}
                {/* Desktop Table */}
                <div className="hidden sm:block w-full overflow-x-auto">
                    <table className="min-w-[900px] w-full border border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-[#CACACA] text-gray-700 text-base">
                            <tr>
                                <th className="p-3 font-semibold text-center">Sr.No.</th>
                                <th className="p-3 font-semibold text-center">Lead ID</th>
                                <th className="p-3 font-semibold text-center">Customer Name</th>
                                <th className="p-3 font-semibold text-center">Service Type</th>
                                <th className="p-3 font-semibold text-center">Product Model</th>
                                <th className="p-3 font-semibold text-center">Order Date</th>
                                <th className="p-3 font-semibold text-center">Status</th>
                                <th className="p-3 font-semibold text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedLeads.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center p-6 text-gray-500">
                                        No leads match your criteria.
                                    </td>
                                </tr>
                            ) : (
                                paginatedLeads.map((lead, idx) => (
                                    <tr
                                        key={lead.id}
                                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} text-gray-800 hover:bg-blue-50 transition`}
                                    >
                                        <td className="p-3 text-center align-middle">{idx + 1}</td>
                                        <td className="p-3 text-center align-middle">{lead.id}</td>
                                        <td className="p-3 text-center align-middle">{lead.customerName}</td>
                                        <td className="p-3 text-center align-middle">{lead.serviceType}</td>
                                        <td className="p-3 text-center align-middle">{lead.productModel}</td>
                                        <td className="p-3 text-center align-middle">{lead.orderDate}</td>
                                        <td className="p-3 text-center align-middle">
                                            <span
                                                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(lead.status)}`}
                                            >
                                                {lead.status}
                                            </span>
                                            {/*
                                            <span
                                                className={`p-3 text-center font-bold align-middle ${
                                                    lead.status === "Assigned"
                                                        ? "text-yellow-600 px-2 py-1"
                                                        : lead.status === "In Progress"
                                                            ? "text-blue-600 px-2 py-1"
                                                            : lead.status === "Completed"
                                                                ? "text-green-600 px-2 py-1"
                                                                : "text-purple-600 px-2 py-1"
                                                }`}
                                            >
                                                {lead.status}
                                            </span>
                                            */}
                                        </td>
                                        <td className="p-3 align-middle">
                                            <div className="flex justify-center">
                                                <GoEye className="text-blue-600 w-5 h-5 cursor-pointer hover:text-blue-800 transition"
                                                    onClick={() => console.log("View Lead Details:", lead.id)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards - Show on small screens */}
                <div className="sm:hidden flex flex-col gap-3">
                    {paginatedLeads.length === 0 ? (
                        <div className="text-center p-6 text-gray-500 bg-gray-50 rounded-lg shadow-inner">
                            No leads match your criteria.
                        </div>
                    ) : (
                        paginatedLeads.map((lead, idx) => (
                            <div key={lead.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-[#7EC1B1] space-y-2">
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="font-bold text-gray-800">Lead ID: {lead.id}</span>
                                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(lead.status)}`}>
                                        {lead.status}
                                    </span>
                                </div>
                                <p><span className="font-medium text-gray-600">Customer:</span> {lead.customerName}</p>
                                <p><span className="font-medium text-gray-600">Service:</span> {lead.serviceType}</p>
                                <p><span className="font-medium text-gray-600">Model:</span> {lead.productModel}</p>
                                <p><span className="font-medium text-gray-600">Date:</span> {lead.orderDate}</p>
                                <div className="flex justify-end pt-2 border-t mt-2">
                                    <GoEye className="text-blue-600 w-6 h-6 cursor-pointer hover:text-blue-800 transition"
                                        onClick={() => console.log("View Lead Details:", lead.id)}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
};

export default ViewEngineer;