// import React, { useState, useEffect, useRef } from 'react';
// import { CiSearch } from "react-icons/ci";
// import { useLocation, useNavigate } from 'react-router-dom';
// import { LuBell } from "react-icons/lu";
// import user from "../../../assets/user.png";
// import { IoIosArrowDown } from 'react-icons/io';
// import {notifications} from "./Notification";

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const pageTitles = {
//     // Dashboard
//     "/dashboard": "Dashboard",

//     // City
//     "/city": "City",
//     "/addcity":"Add City",

//     // Services & Products
//     "/services": "Services",
//     "/addservice": "Add Services",
//     "/product": "Products",
//     "/add-product": "Add Product",

//     // Users
//     "/customers": "Customers",
//     "/technician": "Technicians",
//     "/partner": "Partners",

//     // Orders
//     "/pending-orders": "Pending Orders",
//     "/CompleteOrders": "Complete Orders",
//     "/CancelledOrder": "Cancelled Orders",
//     "/Offers": "Offers",
//     "/Banners": "Banners",
//     "/Testimonial": "Testimonial",
//     "/InventoryManagement": "Inventory Management",
//     "/PaymentGateway": "Payment Gateway",

//     // Technicians Activity
//     "/pendingServices": "Pending Services",
//     "/technicianActivity": "Technician Activity",
//     "/technicianMonitoring": "Technician Monitor",

//     // Partners Activity
//     "/service-list": "Service List",
//     "/client-list": "Existing Client List",
//     "/payout-list": "Partner Payout List"
//   };

//   const currentPage = pageTitles[location.pathname] || "Page Not Found";

//   const handleLogout = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     navigate("/"); // redirect to login page
//   };

//   return (
//     <div className='flex border-b-2 pr-5 border-gray-400 shadow-lg h-[70px] justify-between items-center'>
//       {/* Page Title */}
//       <div 
//         className='p-4 flex items-center' 
   
//       >
     
//       </div>

//       <div className='flex space-x-6 items-center'>
//         {/* Search */}
//         <div className='relative w-[300px] font-medium'>
//           <span className='absolute left-3 top-3 text-xl'><CiSearch /></span>
//           <input
//             type='text'
//             placeholder='Search'
//             className='focus:outline-none focus:ring-2 bg-[#EBF2F1] focus:ring-blue-200 border border-gray-400 md:px-9 md:py-2 md:w-[300px] rounded-full'
//           />
//         </div>

//         {/* Notifications */}
//         <div className='relative flex items-center justify-between'>
//             <button
//         onClick={() => navigate("/notifications")}
//         className="text-3xl px-4 border-l-2 border-r-2 border-gray-400 hover:text-teal-600 transition"
//       >
//         <LuBell />
//       </button>
//           {notifications.length > 0 && (
//           <span className="absolute top-0 right-0 -translate-x-1/3 -translate-y-1/3 z-10 text-[10px] bg-red-600 text-white rounded-full px-1.5 py-0.5">
//             {notifications.length}
//           </span>
//           )}  
//         </div>

//         {/* User Profile */}
//         <div className='flex items-center justify-between'>
//           <div>
//             <img src={user} className='w-10 h-10 rounded-full' alt='user-icon'/>
//           </div>
//           <div>
//             <p className='font-medium text-sm'>Kristin Watson</p>
//             <p className='text-xs'>Designation</p>
//           </div>

//           {/* Dropdown */}
//           <div className="relative inline-block" ref={dropdownRef}>
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="px-4 py-2 rounded-md flex items-center"
//             >
//               <IoIosArrowDown />
//             </button>

//             {isOpen && (
//               <div className="absolute right-4 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg">
//                 <ul className="text-gray-700">
//                   <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Account</li>
//                   <li 
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LuBell } from "react-icons/lu";
import user from "../../../assets/51a2667788ebcdbeeab9f107b69a80d1053e1aa1.jpg";
import { notifications } from "./Notification";

const Header = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className='flex justify-end border-b-2 pr-5 border-gray-400 shadow-lg h-[72px] items-center'>
      <div className='flex space-x-6 items-center ml-auto'>

        {/* Notifications */}
        <div className='relative flex items-center'>
          <button
            onClick={() => navigate("/notifications")}
            className="text-3xl px-4 border-l-2 border-r-2 border-gray-400 hover:text-teal-600 transition"
          >
            <LuBell />
          </button>

          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 -translate-x-1/3 -translate-y-1/3 z-10 text-[10px] bg-red-600 text-white rounded-full px-1.5 py-0.5">
              {notifications.length}
            </span>
          )}
        </div>

        {/* Profile */}
        <div
          onClick={handleProfileClick}
          className='flex items-center gap-2 cursor-pointer'
        >
          <img src={user} className='w-12 h-10 rounded-full' alt='user-icon' />
          <div>
            <p className='font-medium text-sm'>Albert Flores</p>
            <p className='text-xs'>Designation</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Header;
