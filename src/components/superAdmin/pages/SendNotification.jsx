import React from 'react'

const SendNotification = () => {
  return (
    <div className="h-screen bg-white p-6 rounded-xl text-[#263138] shadow-sm">
      <label className="block font-semibold mb-1">Notification Title</label>
      <input
        type="text"
        placeholder="Enter Notification Title"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 mb-5"
      />

      <label className="block font-semibold mb-1">Notification Message</label>
      <input
        type="text"
        placeholder="Enter Notification Message"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 mb-5"
      />

      <label className="block font-semibold mb-1">Notification URL (Optional)</label>
      <input
        type="url"
        placeholder="Enter Notification URL"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 mb-5"
      />

<label className="block font-semibold mb-1">Send User type</label>
      <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 mb-5">
        <option>Select a User type</option>
      </select>     

       {/* Submit Button */}
       <button className="bg-[#7EC1B1] cursor-pointer text-white px-6 py-2 rounded-md hover:bg-[#25803D] transition duration-300">
          Send Notification
        </button>
    </div>
  )
}

export default SendNotification
