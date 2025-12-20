import React from "react";

const PageHeader = ({ entries, setEntries, search, setSearch }) => {
  // Updated options for "Show entries" dropdown
  const entryOptions = [10, 20, 30, 40, 50];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full">
      {/* Show entries */}
      <div className="flex items-center gap-2 sm:gap-4">
        <label className="font-medium text-sm sm:text-base">Show</label>
        <select
          value={entries}
          onChange={(e) => setEntries(Number(e.target.value))}
          className="w-[60px] sm:w-[80px] outline-none p-1 border border-gray-400 rounded-md"
        >
          {entryOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <label className="font-medium text-sm sm:text-base">Entries</label>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <label className="font-medium text-sm sm:text-base">Search:</label>
        <input
          type="text"
          placeholder="Search by partner name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-1 sm:p-2 outline-none border border-gray-400 rounded-md w-[150px] sm:w-[250px]"
        />
      </div>
    </div>
  );
};

export default PageHeader;
