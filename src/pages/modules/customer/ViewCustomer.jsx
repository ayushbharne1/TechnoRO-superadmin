

// import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import Header2 from "../../../components/superAdmin/header/Header2";
// import { IoLocationSharp } from "react-icons/io5"; // Location
// import { FiPhone } from "react-icons/fi"; // Phone
// import { FaVenusMars } from "react-icons/fa"; // Gender
// import { LuCalendar } from "react-icons/lu"; // Date

// const ViewCustomer = () => {
//   const location = useLocation();
//   const customer = location.state?.customer;

//   if (!customer) return <div className="p-6">No customer data available.</div>;

//   const [active, setActive] = useState(customer?.status === "Active");
//   const [selectedTab, setSelectedTab] = useState(null);

//   const tabs = [
//     { id: "product", label: "Product Installed", value: customer.productInstall },
//     { id: "amc", label: "Active AMC Plan", value: customer.activeAMCPlan },
//     { id: "service", label: "Service Ordered", value: customer.serviceOrdered },
//     { id: "order", label: "Product Ordered", value: customer.productOrdered },
//   ];

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col p-6 gap-6">
//       <Header2 />

//       {/* Customer Info */}
//       <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-8">
//         {/* Header Section */}
//         <div className="flex justify-between items-center">
//           {/* Left Side - Name + Badge */}
//           <div className="flex items-center gap-3">
//             <h2 className="text-[32px] font-semibold font-poppins">{customer.name}</h2>
//             <span
//               className={`text-white text-sm font-semibold px-3 py-1 rounded-full ${
//                 active ? "bg-[#3A953A]" : "bg-red-100 text-red-700"
//               }`}
//             >
//               {active ? "Active" : "Blocked"}
//             </span>
//           </div>

//           {/* Right Side - Active Toggle */}
//           <div className="flex items-center gap-3">
//             <span className="font-medium text-base">Status</span>
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

//         {/* Address Above Map */}
//         <div className="flex items-start gap-3">
//           <IoLocationSharp className="w-6 h-6 text-[#7EC1B1] mt-1" />
//           <div>
//             <span className="font-medium text-lg text-black">Address:</span>
//             <p className="text-xl font-400 text-[#7EC1B1]">{customer.address}</p>
//           </div>
//         </div>

//         {/* Customer Details Section */}
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Map */}
//           <div className="w-full md:w-1/2 rounded-lg overflow-hidden border shadow">
//             <iframe
//               title="Customer Location"
//               width="100%"
//               height="300"
//               frameBorder="0"
//               style={{ border: 0 }}
//               src={`https://maps.google.com/maps?q=${encodeURIComponent(
//                 customer.address
//               )}&z=15&output=embed`}
//               allowFullScreen
//               aria-hidden="false"
//             />
//           </div>

//           {/* Details */}
//           <div className="w-full md:w-1/2 flex flex-col gap-4">
//             {/* Phone */}
//             <div className="flex items-start gap-3">
//               <FiPhone className="w-6 h-6 text-[#7EC1B1] mt-1" />
//               <div>
//                 <span className="font-medium text-lg text-black">Phone:</span>
//                 <p className="text-xl font-400 text-[#7EC1B1]">{customer.phone}</p>
//               </div>
//             </div>

//             {/* Gender */}
//             <div className="flex items-start gap-3">
//               <FaVenusMars className="w-6 h-6 text-[#7EC1B1] mt-1" />
//               <div>
//                 <span className="font-medium text-lg text-black">Gender:</span>
//                 <p className="text-xl font-400 text-[#7EC1B1]">{customer.gender}</p>
//               </div>
//             </div>

//             {/* Registered Date */}
//             <div className="flex items-start gap-3">
//               <LuCalendar className="w-6 h-6 text-[#7EC1B1] mt-1" />
//               <div>
//                 <span className="font-medium text-lg text-black">Registered Date:</span>
//                 <p className="text-xl font-400 text-[#7EC1B1]">{customer.registeredDate}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* 4 Tabs Section */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-0 mt-4 border border-gray-300 rounded-lg overflow-hidden">
//           {tabs.map((tab, index) => (
//             <div
//               key={tab.id}
//               onClick={() => setSelectedTab(tab.id)}
//               className={`cursor-pointer p-3 text-center font-semibold border-r border-gray-300 transition ${
//                 selectedTab === tab.id
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 text-gray-700 hover:bg-blue-100"
//               } ${index === tabs.length - 1 ? "border-r-0" : ""}`}
//             >
//               {tab.label}
//             </div>
//           ))}
//         </div>

//         {/* Selected Tab Content */}
//         {selectedTab && (
//           <div className="border border-gray-300 rounded-lg mt-2 p-4 bg-white col-span-4">
//             {selectedTab === "product" && (
//               <div>
//                 <h3 className="text-lg font-semibold mb-2">Product Installed</h3>
//                 <p>{customer.productInstall || "No data available"}</p>
//               </div>
//             )}
//             {selectedTab === "amc" && (
//               <div>
//                 <h3 className="text-lg font-semibold mb-2">Active AMC Plan</h3>
//                 <p>{customer.activeAMCPlan || "No data available"}</p>
//               </div>
//             )}
//             {selectedTab === "service" && (
//               <div>
//                 <h3 className="text-lg font-semibold mb-2">Service Ordered</h3>
//                 <p>{customer.serviceOrdered || "No data available"}</p>
//               </div>
//             )}
//             {selectedTab === "order" && (
//               <div>
//                 <h3 className="text-lg font-semibold mb-2">Product Ordered</h3>
//                 <p>{customer.productOrdered || "No data available"}</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewCustomer;


import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header2 from "../../../components/superAdmin/header/Header2";
import { IoLocationSharp } from "react-icons/io5"; // Location
import { FiPhone } from "react-icons/fi"; // Phone
import { FaVenusMars } from "react-icons/fa"; // Gender
import { LuCalendar } from "react-icons/lu"; // Date

const ViewCustomer = () => {
  const location = useLocation();
  const customer = location.state?.customer;

  if (!customer) return <div className="p-6">No customer data available.</div>;

  const [active, setActive] = useState(customer?.status === "Active");
  const [selectedTab, setSelectedTab] = useState(null);

  const tabs = [
    { id: "product", label: "Product Installed", value: customer.productInstall },
    { id: "amc", label: "Active AMC Plan", value: customer.activeAMCPlan },
    { id: "service", label: "Service Ordered", value: customer.serviceOrdered },
    { id: "order", label: "Product Ordered", value: customer.productOrdered },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col p-6 gap-6">
      <Header2 />

      {/* Customer Info */}
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          {/* Left Side - Name + Badge */}
          <div className="flex items-center gap-3">
            <h2 className="text-2xl md:text-[32px] font-semibold font-poppins">
              {customer.name}
            </h2>
            <span
              className={`text-white text-sm font-semibold px-3 py-1 rounded-full ${
                active ? "bg-[#3A953A]" : "bg-red-100 text-red-700"
              }`}
            >
              {active ? "Active" : "Blocked"}
            </span>
          </div>

          {/* Right Side - Active Toggle */}
          <div className="flex items-center gap-3">
            <span className="font-medium text-base">Status</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={active}
                onChange={() => setActive(!active)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition duration-300"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition duration-300"></div>
            </label>
          </div>
        </div>

        {/* Address Above Map */}
        <div className="flex items-start gap-3 flex-wrap">
          <IoLocationSharp className="w-6 h-6 text-[#7EC1B1] mt-1" />
          <div>
            <span className="font-medium text-lg text-black">Address:</span>
            <p className="text-xl font-400 text-[#7EC1B1]">{customer.address}</p>
          </div>
        </div>

        {/* Customer Details Section */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Map */}
          <div className="w-full md:w-1/2 rounded-lg overflow-hidden border shadow">
            <iframe
              title="Customer Location"
              width="100%"
              height="300"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                customer.address
              )}&z=15&output=embed`}
              allowFullScreen
              aria-hidden="false"
            />
          </div>

          {/* Details */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            {/* Phone */}
            <div className="flex items-start gap-3">
              <FiPhone className="w-6 h-6 text-[#7EC1B1] mt-1" />
              <div>
                <span className="font-medium text-lg text-black">Phone:</span>
                <p className="text-xl font-400 text-[#7EC1B1]">{customer.phone}</p>
              </div>
            </div>

            {/* Gender */}
            <div className="flex items-start gap-3">
              <FaVenusMars className="w-6 h-6 text-[#7EC1B1] mt-1" />
              <div>
                <span className="font-medium text-lg text-black">Gender:</span>
                <p className="text-xl font-400 text-[#7EC1B1]">{customer.gender}</p>
              </div>
            </div>

            {/* Registered Date */}
            <div className="flex items-start gap-3">
              <LuCalendar className="w-6 h-6 text-[#7EC1B1] mt-1" />
              <div>
                <span className="font-medium text-lg text-black">Registered Date:</span>
                <p className="text-xl font-400 text-[#7EC1B1]">
                  {customer.registeredDate}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Tabs Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-0 mt-4 border border-gray-300 rounded-lg overflow-hidden">
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`cursor-pointer p-3 text-center font-semibold border-r border-gray-300 transition ${
                selectedTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-100"
              } 
              ${index === tabs.length - 1 ? "border-r-0" : ""}`}
            >
              {tab.label}
            </div>
          ))}
        </div>

        {/* Selected Tab Content */}
        {selectedTab && (
          <div className="border border-gray-300 rounded-lg mt-2 p-4 bg-white col-span-4 min-h-[100px]">
            {selectedTab === "product" && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Product Installed</h3>
                <p>{customer.productInstall || "No data available"}</p>
              </div>
            )}
            {selectedTab === "amc" && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Active AMC Plan</h3>
                <p>{customer.activeAMCPlan || "No data available"}</p>
              </div>
            )}
            {selectedTab === "service" && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Service Ordered</h3>
                <p>{customer.serviceOrdered || "No data available"}</p>
              </div>
            )}
            {selectedTab === "order" && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Product Ordered</h3>
                <p>{customer.productOrdered || "No data available"}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCustomer;
