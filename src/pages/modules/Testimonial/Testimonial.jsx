import { useState } from "react";
import trash from "../../../assets/trash.png";
import edit from "../../../assets/edit.png";
import avatar1 from "../../../assets/avatar1.jpg"
import avatar2 from "../../../assets/avatar2.jpg"

import { useNavigate } from "react-router-dom";

export default function Testimonial() {
  const initialUsers = [
    {
      id: 1,
      name: "Ajay Kumar",
      image: avatar1,
      comment: "Great service, will recommend!",
      status: "Published",
    },
    {
      id: 2,
      name: "Ravi Singh",
      image: avatar1,
      comment: "Had a good experience.",
      status: "Published",
    },
    {
      id: 3,
      name: "Priya Sharma",
      image: avatar2,
      comment: "Satisfactory support.",
      status: "Pending",
    },
    {
      id: 4,
      name: "Neha Gupta",
      image: avatar2,
      comment: "Excellent product quality.",
      status: "Published",
    },
    {
      id: 5,
      name: "Vikram Patil",
      image: avatar1,
      comment: "Response was a bit late.",
      status: "Pending",
    },
    {
      id: 6,
      name: "Simran Kaur",
      image: avatar2,
      comment: "Very smooth process.",
      status: "Published",
    },
    {
      id: 7,
      name: "Anil Verma",
      image: avatar1,
      comment: "Good customer support.",
      status: "Published",
    },
    {
      id: 8,
      name: "Sunita Rao",
      image: avatar2,
      comment: "Quick service.",
      status: "Published",
    },
    {
      id: 9,
      name: "Deepak Joshi",
      image: avatar1,
      comment: "Would love to buy again.",
      status: "Published",
    },
    {
      id: 10,
      name: "Kiran Mehta",
      image: avatar1,
      comment: "Amazing experience.",
      status: "Pending",
    },
  ];

  const navigate =  useNavigate()
  const [users] = useState(initialUsers);
  const [entries, setEntries] = useState(7);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.comment.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = startIndex + entries;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const TestimonialFrom = () => {
    navigate('/TestimonialForm'); // Ensure this route matches your actual path
  };


  return (
    <div className="flex flex-col bg-[#EBF2F1] items-center p-4 w-full space-y-6">
      {/* Top Controls */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-xl shadow-md">
        {/* Show Entries */}
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="font-poppins text-[16px] font-[500]">Show</span>
          <select
            value={entries}
            onChange={(e) => {
              setEntries(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="p-2 border w-[60px] text-center focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {[5, 7, 10].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span className="font-poppins text-[16px] font-[500]">Entries</span>
        </div>

        {/* Search */}
        <div className="flex items-center w-full md:w-auto">
          <label className="mr-2 font-poppins text-[16px] font-[500]">Search:</label>
          <input
            type="text"
            className="w-full md:w-[250px] p-3 border border-black placeholder-[#979797] focus:outline-none focus:ring-2 focus:ring-blue-300 "
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search name or comment..."
          />
        </div>

        {/* Add Button */}
        <button className="bg-[#7EC1B1] text-white px-4 py-2 rounded hover:bg-[#65a89d] transition" 
         onClick={TestimonialFrom}
>
          Add Testimonial
        </button>
      </div>

      {/* Table Section */}
      <div className="w-full md:w-[100%] bg-white shadow-md  overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="p-3">SL. No.</th>
                <th className="p-3">Full Name</th>
                <th className="p-3">Image</th>
                <th className="p-3">Comment</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="p-3">{String(user.id).padStart(2, "0")}</td>
                  <td className="p-3 font-poppins">{user.name}</td>
                  <td className="p-3">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-3">{user.comment}</td>
                  <td className="p-3">
                    <span
                      className={`px-6 py-1 rounded-3xl border ${
                        user.status === "Published"
                          ? "border-green-500 text-green-600"
                          : "border-yellow-500 text-yellow-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3 flex space-x-2">
                    <button className="p-2 bg-[#007AFF] text-white rounded-md hover:bg-blue-600 transition" 
onClick={() => navigate(`/edit-testimonial/${user.id}`)}
>
                      <img src={edit} alt="edit" className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-[#C17E7F] text-white rounded-md hover:bg-red-500 transition">
                      <img src={trash} alt="delete" className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center p-4 border-t gap-2">
          <span className="text-gray-600 text-sm">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of{" "}
            {filteredUsers.length} Entries
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              className="px-3 py-1 border rounded-md text-gray-600 disabled:opacity-50"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded-md ${
                  currentPage === i + 1
                    ? "bg-[#7EC1B1] text-white"
                    : "border text-gray-600"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 border rounded-md text-gray-600 disabled:opacity-50"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


