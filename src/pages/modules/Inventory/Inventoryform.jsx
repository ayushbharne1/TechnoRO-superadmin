import { useState } from "react";

export default function Inventoryform() {
  const [selectedFile, setSelectedFile] = useState(null);
 
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  

  return (
    <div  className="absolute bg-white shadow-md rounded-lg overflow-hidden"
    style={{ width: "1092px", height: "905px", top: "96px", left: "324px", padding: "24px", gap: "24px" }}
>
      <label className="block font-medium mb-2">Product Image</label>
      <div className="flex items-center space-x-2 border border-gray-300 p-2 rounded-lg">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-gray-200 px-4 py-2 rounded-md text-gray-700"
        >
          Choose File
        </label>
        <span className="text-gray-500">
          {selectedFile ? selectedFile.name : "No File Uploaded"}
        </span>
      </div>
      <button className="text-green-600 mt-2">+ Add More Image</button>

      <label className="block font-medium mt-4">Product Name</label>
      <input
        type="text"
        placeholder="Enter Product Name"
        className="w-full border border-gray-300 p-2 rounded-lg mt-1"
      />

      <label className="block font-medium mt-4">Product Category</label>
      <select className="w-full border border-gray-300 p-2 rounded-lg mt-1">
        <option>Select</option>
      </select>

      <label className="block font-medium mt-4">Price</label>
      <input
        type="text"
        placeholder="Enter Price"
        className="w-full border border-gray-300 p-2 rounded-lg mt-1"
      />

      <label className="block font-medium mt-4">Number of Pieces</label>
      <input
        type="text"
        placeholder="Enter Number"
        className="w-full border border-gray-300 p-2 rounded-lg mt-1"
      />

      <label className="block font-medium mt-4">Select Colors</label>
      <select className="w-full border border-gray-300 p-2 rounded-lg mt-1">
        <option>Select colors</option>
      </select>

      <button className="w-40 bg-green-500 text-white p-2 rounded-lg mt-4">
        Add Product
      </button>
    </div>
  );
}
