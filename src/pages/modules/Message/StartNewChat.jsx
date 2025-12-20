// import React, { useState } from "react";
// import Header2 from "../../../components/superAdmin/header/Header2";
// import { useNavigate } from "react-router-dom";

// const StartNewChat = () => {
//   const [userType, setUserType] = useState("");
//   const [user, setUser] = useState("");
//   const navigate = useNavigate();

//   const handleStartChat = () => {
//     if (userType && user) {
//       navigate("/chat", { state: { userType, user } });
//     } else {
//       alert("Please select both fields!");
//     }
//   };

//   return (
//     <div className="w-full h-screen bg-[#F9FAFB] flex flex-col">
//       {/* Header */}
//       <Header2 title="Start New Chat" />

//       {/* Horizontal line below header */}
//       <hr className="border border-[#606060]" />

//       {/* Form Container */}
//       <div className="w-full flex-1 p-6 md:p-10">
//         {/* Inputs Side by Side */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
//           <div className="flex flex-col">
//             <label className="mb-1 text-gray-700 font-bold text-md">
//               Select User Type
//             </label>
//             <select
//               value={userType}
//               onChange={(e) => setUserType(e.target.value)}
//               className="w-full h-14 border border-[#606060] bg-[#F5F5F5] px-3 focus:outline-none focus:ring-1 focus:ring-[#0B3366]"
//             >
//               <option value="">Select User Type</option>
//               <option value="Admin">Admin</option>
//               <option value="Customer">Customer</option>
//               <option value="Engineer">Engineer</option>
//             </select>
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-1 text-gray-700 font-bold text-md">
//               Select User
//             </label>
//             <input
//               type="text"
//               placeholder="Enter user name or ID"
//               value={user}
//               onChange={(e) => setUser(e.target.value)}
//               className="w-full h-14 border border-[#606060] px-3 bg-[#F5F5F5] focus:outline-none focus:ring-1 focus:ring-[#0B3366]"
//             />
//           </div>
//         </div>

//         {/* Centered Start Chat Button */}
//         <div className="flex justify-center">
//           <button
//             onClick={handleStartChat}
//             className="bg-[#7EC1B1] border rounded-md text-white px-8 py-2 text-sm hover:bg-[#6aafa0] transition"
//           >
//             Start Chat
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StartNewChat;


import React, { useState } from "react";
import Header2 from "../../../components/superAdmin/header/Header2";
import { useNavigate } from "react-router-dom";

const StartNewChat = () => {
  const [userType, setUserType] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const handleStartChat = () => {
    if (userType && user) {
      navigate("/message/newchat/chat", { state: { userType, user } });
    } else {
      alert("Please select both fields!");
    }
  };

  // Example users, you can replace with actual data
  const usersList = [
    { id: 1, name: "Albert Flores" },
    { id: 2, name: "Jenny Wilson" },
    { id: 3, name: "Brooklyn Simmons" },
    { id: 4, name: "Kristin Watson" },
  ];

  return (
    <div className="w-full h-screen bg-[#F9FAFB] flex flex-col">
      {/* Header */}
      <Header2 title="Start New Chat" />

      {/* Horizontal line below header */}
      <hr className="border border-[#606060]" />

      {/* Form Container */}
      <div className="w-full flex-1 p-6 md:p-10">
        {/* Inputs Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {/* User Type */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-bold text-md">
              Select User Type
            </label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full h-14 border border-[#606060] bg-[#F5F5F5] px-3 focus:outline-none focus:ring-1 focus:ring-[#0B3366]"
            >
              <option value="">Select User Type</option>
              <option value="Admin">Admin</option>
              <option value="Customer">Customer</option>
              <option value="Engineer">Engineer</option>
            </select>
          </div>

          {/* User Select */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-bold text-md">
              Select User
            </label>
            <select
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full h-14 border border-[#606060] bg-[#F5F5F5] px-3 focus:outline-none focus:ring-1 focus:ring-[#0B3366]"
            >
              <option value="">Select a user</option>
              {usersList.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Centered Start Chat Button */}
        <div className="flex justify-center">
          <button
            onClick={handleStartChat}
            className="bg-[#7EC1B1] border rounded-md text-white px-8 py-2 text-sm hover:bg-[#6aafa0] transition"
          >
            Start Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartNewChat;
