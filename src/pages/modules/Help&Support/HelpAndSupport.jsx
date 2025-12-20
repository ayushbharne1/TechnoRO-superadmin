import React from "react";
import { FaCommentAlt, FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const offers = [
  { id: 1, Name: "XXXXXXXXXX", Number: "XXXXXXXXXX", Details: "XXXXXXXXXX", status: "Mark as Solved" },
  { id: 2, Name: "XXXXXXXXXX", Number: "XXXXXXXXXX", Details: "XXXXXXXXXX", status: "Mark as Solved" },
  { id: 3, Name: "XXXXXXXXXX", Number: "XXXXXXXXXX", Details: "XXXXXXXXXX", status: "Mark as Solved" },
  { id: 4, Name: "XXXXXXXXXX", Number: "XXXXXXXXXX", Details: "XXXXXXXXXX", status: "Solved" },
  { id: 5, Name: "XXXXXXXXXX", Number: "XXXXXXXXXX", Details: "XXXXXXXXXX", status: "Solved" },
     { id: 6, Name: "XXXXXXXXXX", Number: "XXXXXXXXXX", Details: "XXXXXXXXXX", status: "Solved" },
 { id: 7, Name: "XXXXXXXXXX", Number: "XXXXXXXXXX", Details: "XXXXXXXXXX", status: "Solved" },
 { id: 8, Name: "XXXXXXXXXX", Number: "XXXXXXXXXX", Details: "XXXXXXXXXX", status: "Solved" },
 { id: 9, Name: "XXXXXXXXXX", Number: "XXXXXXXXXX", Details: "XXXXXXXXXX", status: "Solved" },
 { id: 10, Name: "XXXXXXXXXX", Number: "XXXXXXXXXX", Details: "XXXXXXXXXX", status: "Solved" },
];

const Offers = () => {
    const navigate = useNavigate();

    
const handleChatClick = (offerId) => {
  navigate(`/chatwithus/${offerId}`);
};


  return (
    <div className="flex flex-col justify-between items-center w-full">
      <div className="flex justify-between min-w-full p-4 border-b">
        {/* Entries Dropdown */}
        <div className="flex items-center space-x-2">
          <label htmlFor="entries" className="text-sm">
            Show
          </label>
          <select
            id="entries"
            className="border p-1 rounded text-sm"
            defaultValue="10"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span className="text-sm">Entries</span>
        </div>

        {/* Search Box */}
        <div className="flex items-center space-x-2">
          <label htmlFor="search" className="text-sm">
            Search:
          </label>
          <input
            id="search"
            type="text"
            className="border p-1 rounded text-sm"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg text-lg">
            <thead className="bg-gray-200">
              <tr className="text-left text-gray-700 text-base">
                <th className="p-3 ">Sr. No.</th>
                <th className="p-3 ">Full Name</th>
                <th className="p-3 ">Mobile Number</th>
                <th className="p-3 ">Issue Details</th>
                <th className="p-3  text-center">Status</th>
                <th className="p-3 ">Action</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer, index) => (
                <tr key={offer.id} className="text-gray-700 even:bg-gray-100 text-base">
                  <td className="p-3 ">{index + 1}</td>
                  <td className="p-3 ">{offer.Name}</td>
                  <td className="p-3 ">{offer.Number}</td>
                  <td className="p-3 ">{offer.Details}</td>
                  <td className="p-3  text-center">
                    <span className={`rounded-full inline-flex justify-center items-center px-3 py-1 text-md w-[180px]  ${offer.status === "Solved" ? " text-[#7EC1B1] border border-[#7EC1B1] " : "bg-[#7EC1B1] text-white"}`}>
                      {offer.status}
                    </span>
                  </td>
                  <td className="p-3 flex space-x-2 ">
                    <button
                      className="bg-blue-500 text-white p-2 rounded cursor-pointer "
                      onClick={() => handleChatClick(offer.id)}
                    >
                      <FaCommentAlt size={14} />
                    </button>
                    <button className="bg-green-600 text-white p-2 rounded">
                      <FaPhoneAlt size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600 text-sm">Showing 1 to 10 of 30 Entries</p>
          <div className="flex space-x-2">
            <button className="bg-[#7EC1B1] text-white px-3 py-1 rounded hover:bg-green-700">Previous</button>
            <button className="bg-gray-300 px-3 py-1 rounded">1</button>
            <button className="bg-gray-300 px-3 py-1 rounded">2</button>
            <button className="bg-gray-300 px-3 py-1 rounded">3</button>
            <button className="bg-[#7EC1B1] text-white px-3 py-1 rounded hover:bg-green-700">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
