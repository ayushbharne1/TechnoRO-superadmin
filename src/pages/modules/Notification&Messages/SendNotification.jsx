import React, { useState } from "react";
import Header2 from "../../../components/superAdmin/header/Header2";

const SendNotification = () => {
  const [userType, setUserType] = useState("");
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    console.log("Notification Sent:", { userType, user, message });
  };

  return (
    <div className="w-full h-screen bg-[#F9FAFB] flex flex-col">
      {/* Header */}
      <Header2 />

      {/* Horizontal line below header */}
      <hr className="border border-gray-300" />

      {/* Form Container */}
      <div className="w-full flex-1 p-6 md:p-10">
        {/* Select Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
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
              <option value="customer">Customer</option>
              <option value="engineer">Engineer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-bold  text-md">
              Select User
            </label>
            <select
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full h-14 border border-[#606060] px-3 bg-[#F5F5F5]  focus:outline-none focus:ring-1 focus:ring-[#0B3366]"
            >
              <option value="">Select User</option>
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
            </select>
          </div>
        </div>

        {/* Message Box */}
        <div className="flex flex-col mb-5">
          <label className="mb-1 text-gray-700 font-bold  text-md">
            Message
          </label>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message..."

            rows="5"
            className="w-full h-[140px] border border-[#606060] p-3 focus:outline-none bg-[#F5F5F5] focus:ring-1 focus:ring-[#0B3366]"
          />
        </div>

        {/* Center Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSend}
            className="bg-[#7EC1B1] border rounded-md text-white px-16 py-3 text-xl hover:bg-[##7EC1B1] transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendNotification;
