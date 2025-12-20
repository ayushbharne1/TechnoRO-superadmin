import { useState } from "react";

const Addpro = () => {
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-300">
      <div className="flex items-center space-x-2">
        <span>Show</span>
        <select
          className="border p-1 rounded"
          value={entries}
          onChange={(e) => setEntries(e.target.value)}
        >
          {[10, 25, 50, 100].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <span>Entries</span>
      </div>
      <div>
        <label className="mr-2">Search:</label>
        <input
          type="text"
          className="border p-1 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Addpro;


