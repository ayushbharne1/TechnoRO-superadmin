import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

const PendingOrderDecision = ({ order, onBack }) => {
  return (
    <div className="h-screen bg-white p-6 rounded-xl text-[#263138] shadow-sm">
    <button
            onClick={onBack}
            className=" text-2xl outline-none cursor-pointer rounded"
          >
            <IoMdArrowRoundBack />
          </button>

    <label className="md:mt-4 block font-semibold mb-1">Select Status</label>
    <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 mb-5">
      <option>Select a status</option>
      <option>Accept</option>
      <option>Reject</option>
    </select>

    <label className="block font-semibold mb-1">Comment</label>
    <textarea
      placeholder="Write Comment"
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 mb-2"
      rows="4"
    ></textarea>

    <label className="block font-semibold mb-1">Credit Required For this Order Accept ?</label>
    <input
      type="text"
      placeholder=""
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 mb-10"
    />

    

    

     {/* Submit Button */}
     <button className="bg-[#7EC1B1] cursor-pointer md:ml-[400px] text-white px-10 py-2 rounded-md hover:bg-[#25803D] transition duration-300">
        Submit Decision
      </button>
  </div>
  );
};

export default PendingOrderDecision;
