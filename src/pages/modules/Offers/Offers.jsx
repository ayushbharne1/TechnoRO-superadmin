import { useState } from "react";
import DeleteImg from "../../../assets/delete.svg"; // replace path as needed
import EditImg from "../../../assets/edit.svg"; // replace path as needed

import { useNavigate } from "react-router-dom";

const offersData = [
  { id: 1, service: "Water Purifier Installation", subtitle: "20% off on first service", category: "Best Offers", status: "Published" },
  { id: 2, service: "Water Purifier Uninstallation", subtitle: "15% cashback on uninstallation", category: "Best Offers", status: "Published" },
  { id: 3, service: "Water Purifier Repair", subtitle: "Free spare parts on first repair", category: "Best Offers", status: "Published" },
  { id: 4, service: "Filter Replacement", subtitle: "Buy 1 get 1 free", category: "Special Offers", status: "Published" },
  { id: 5, service: "Annual Maintenance Silver Plan", subtitle: "Save 20% on annual plan", category: "AMC Plans", status: "Published" },
  { id: 6, service: "Annual Maintenance Gold Plan", subtitle: "Save 25% on annual plan", category: "AMC Plans", status: "Published" },
  { id: 7, service: "Annual Maintenance Platinum Plan", subtitle: "Save 30% on annual plan", category: "AMC Plans", status: "Published" },
  { id: 8, service: "RO System Installation", subtitle: "Free installation kit included", category: "Installation Offers", status: "Published" },
  { id: 9, service: "RO System Uninstallation", subtitle: "Discount on reinstallation", category: "Installation Offers", status: "Published" },
  { id: 10, service: "Leak Repair Service", subtitle: "Complimentary water testing", category: "Repair Offers", status: "Published" },
  { id: 11, service: "UV System Repair", subtitle: "10% off on replacement parts", category: "Repair Offers", status: "Published" },
  { id: 12, service: "Pipe Replacement", subtitle: "Free consultation included", category: "Repair Offers", status: "Published" },
  { id: 13, service: "Water Testing Service", subtitle: "First test free", category: "Special Offers", status: "Published" },
  { id: 14, service: "RO Filter Cleaning", subtitle: "20% off on cleaning service", category: "Maintenance Offers", status: "Published" },
  { id: 15, service: "UV Filter Cleaning", subtitle: "15% off for members", category: "Maintenance Offers", status: "Published" },
  { id: 16, service: "Chlorine Removal Service", subtitle: "Free home visit", category: "Special Offers", status: "Published" },
  { id: 17, service: "RO Membrane Replacement", subtitle: "Buy 1 get 1 50% off", category: "Repair Offers", status: "Published" },
  { id: 18, service: "AMC Bronze Plan", subtitle: "10% off on yearly subscription", category: "AMC Plans", status: "Published" },
  { id: 19, service: "AMC Silver Plus Plan", subtitle: "15% off + free filter kit", category: "AMC Plans", status: "Published" },
  { id: 20, service: "AMC Gold Plus Plan", subtitle: "20% off + free annual service", category: "AMC Plans", status: "Published" },
];

const Offers = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState(10); // total entries allowed (from dropdown)
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddOffer = () => navigate("/add-offer");

  const maxRowsPerPage = 10; // always fixed 10 per page
  const totalEntries = Math.min(entries, offersData.length); // entries to consider
  const totalPages = Math.ceil(totalEntries / maxRowsPerPage);

  const startIndex = (currentPage - 1) * maxRowsPerPage;
  const endIndex = startIndex + maxRowsPerPage;

  // Slice using only the "entries" worth of data first, then paginate
  const currentOffers = offersData.slice(0, totalEntries).slice(startIndex, endIndex);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="w-[95%] mx-auto p-4 sm:p-6 md:p-6 lg:p-6 bg-[] shadow-lg rounded-lg">
      {/* Top Control Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
        {/* Left side: Show entries */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">Show</span>
          <select
            className="w-[80px] h-[40px] border rounded px-2"
            value={entries}
            onChange={(e) => {
              setEntries(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[10, 20, 30, 40, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span className="text-gray-700">Entries</span>
        </div>

        {/* Middle: Search */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-gray-700">Search</span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full sm:w-[240px] h-[40px] border rounded px-2"
          />
        </div>

        {/* Right side: Add Offers button */}
        <button
          className="bg-[#7EC1B1] text-white w-full sm:w-[200px] h-[40px] rounded hover:bg-green-700"
          onClick={handleAddOffer}
        >
          Add Offers
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg text-sm sm:text-base">
          <thead className="bg-[#E6E6E6]">
            <tr className="text-left text-gray-700">
              <th className="p-2">Sr. No.</th>
              <th className="p-2">Services</th>
              <th className="p-2">Offer Subtitle</th>
              <th className="p-2">Main Offer Category</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOffers.map((offer, index) => (
              <tr
                key={startIndex + index + 1}
                className="text-gray-700 even:bg-gray-100"
              >
                <td className="p-2">{startIndex + index + 1}</td>
                <td className="p-2">{offer.service}</td>
                <td className="p-2">{offer.subtitle}</td>
                <td className="p-2">{offer.category}</td>
                <td className="p-2">
                  <span className="border border-green-300 text-green-700 px-2 py-1 rounded-full text-sm">
                    {offer.status}
                  </span>
                </td>
              <td className="p-2 flex space-x-2">
  <button className="bg-[#C17E7F] p-2 rounded hover:bg-red-600">
    <img src={DeleteImg} alt="delete" className="w-4 h-4" />
  </button>
  <button className="bg-[#007AFF] p-2 rounded hover:bg-blue-600">
    <img src={EditImg} alt="edit" className="w-4 h-4" />
  </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-2 sm:gap-0">
        <p className="text-gray-600 text-sm">
          Showing {startIndex + 1} to {Math.min(endIndex, totalEntries)} of{" "}
          {totalEntries} Entries
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            className="bg-[#7EC1B1] text-white px-3 py-1 rounded hover:bg-green-700"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-[#7EC1B1] text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="bg-[#7EC1B1] text-white px-3 py-1 rounded hover:bg-green-700"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offers;
