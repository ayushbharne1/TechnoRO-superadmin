import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Corrected import
import Image from "../../../assets/image 92.png";
import Addpro from "../../../components/Addpro";

export default function InventoryManagement() {
  const navigate = useNavigate();

  const Inventoryform = () => {
    navigate("/Inventoryform"); // Ensure this route matches your actual path
  };
  const [image92, setLogo] = useState(Image);
  const products = [
    {
      id: 1,
      image: "/assets/image-89.png", // Ensure images are correctly stored in public/assets/
      name: "Whole house filter with two replacement filters",
      category: "Spare Parts",
      price: "₹200",
      piece: 63,
      colors: ["black", "red", "blue"],
    },
    {
      id: 2,
      image: "/assets/image-90.png",
      name: "EV943750 EVERPURE Endurance TKO Microfilter Pretreatment System",
      category: "Spare Parts",
      price: "₹650",
      piece: 13,
      colors: ["black", "red", "blue", "pink", "gold"],
    },
    {
      id: 3,
      image: "/assets/image-91.png",
      name: "3000 Gallon Replacement Water Filter",
      category: "Spare Parts",
      price: "₹650",
      piece: 635,
      colors: ["black", "red", "blue", "purple"],
    },
    {
      id: 4,
      image: "/assets/image-92.png",
      name: "Domestic RO Membrane",
      category: "Spare Parts",
      price: "₹650",
      piece: 67,
      colors: ["black", "red", "blue"],
    },
    {
      id: 5,
      image: "/assets/image-93.png",
      name: 'VYAIR 10" x 2.5" Replacement Water Filter Cartridge Set of 3 for Ro system',
      category: "Spare Parts",
      price: "₹650",
      piece: 52,
      colors: ["black", "red", "blue"],
    },
    {
      id: 6,
      image: "/assets/image-94.png",
      name: "Kent complete filter replacement",
      category: "Spare Parts",
      price: "₹790",
      piece: 13,
      colors: ["black", "red", "blue", "pink", "gold"],
    },
    {
      id: 7,
      image: "/assets/image-95.png",
      name: "KENT Gold Spare Kit Gold Pleated Filter Cartridge (0.5, Pack of 1)",
      category: "Spare Parts",
      price: "₹59000",
      piece: 635,
      colors: ["black", "red", "blue"],
    },
    {
      id: 8,
      image: "/assets/image-96.png",
      name: "Kent Automated Water Softener, For Domestic, 3000 LPH",
      category: "Spare Parts",
      price: "₹699",
      piece: 12,
      colors: ["black", "red", "blue", "purple"],
    },
  ];

  return (
    <div>
      <Addpro />
 <div className="hide-scrollbar overflow-auto h-full w-full p-4">
  <div className="bg-white shadow-lg rounded-lg border border-gray-300"
        style={{
          width: "1044px",
          height: "700px",
          borderWidth: "0.87px",
        }}>
      
        {/* Table */}
        <table className="w-full h-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Sr. No.</th>
              <th className="p-2">Image</th>
              <th className="p-2">Product Name</th>
              <th className="p-2">Category</th>
              <th className="p-2">Price</th>
              <th className="p-2">Piece</th>
              <th className="p-2">Available Colors</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  <img
                    src={image92} // Corrected image source
                    alt={product.name}
                    className="w-12 border border-gray-300 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.category}</td>
                <td className="p-2">{product.price}</td>
                <td className="p-2">{product.piece}</td>
                <td className="p-6 flex space-x-1">
                  {product.colors.map((color, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color }}
                    ></span>
                  ))}
                </td>
                <td className="p-2 space-x-2">
                  <button onClick={Inventoryform} className="text-blue-500">
                    <FaEdit size={18} />
                  </button>
                  <button className="text-red-500">
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between p-10 items-center">
          <span>Showing 1 to 10 of 30 Entries</span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded bg-gray-100">
              Previous
            </button>
            <button className="px-3 py-1 border rounded bg-green-300">1</button>
            <button className="px-3 py-1 border rounded">2</button>
            <button className="px-3 py-1 border rounded">3</button>
            <button className="px-3 py-1 border rounded bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}




