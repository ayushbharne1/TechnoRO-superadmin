import { useState } from "react";
import logoImage from '../../../assets/logo.png';

export default function Setting() {
  const [logo, setLogo] = useState(logoImage);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const roles = ["User", "Engineer", "Partner"];

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-6 max-w-6xl mx-auto mt-6">
      
      {/* Set New Company Logo */}
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Set New Company Logo</h2>
      <div className="flex flex-col md:flex-row items-center gap-6 mb-6 border p-4 rounded border-gray-300">
        <input
          type="file"
          className="bg-gray-200 p-2 rounded w-full md:w-60"
          onChange={handleFileChange}
        />
        <div className="flex-shrink-0">
          <img className="h-20 md:h-24 object-contain" src={logo} alt="Company Logo" />
        </div>
      </div>

      {/* Currency & Time Zone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Set Currency</h2>
          <select className="border p-3 border-gray-300 rounded w-full">
            <option>INR</option>
          </select>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Select Time Zone</h2>
          <select className="border p-3 border-gray-300 rounded w-full">
            <option>Asia/Kolkata</option>
          </select>
        </div>
      </div>

      {/* One Signal App Ids & API Keys */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {roles.map((role) => (
          <div key={role} className="grid grid-cols-1 gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">{role} App One Signal App Id</h2>
              <input
                type="text"
                className="border p-3 border-gray-300 rounded w-full"
                placeholder="XXXXXXXXXXXX"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">{role} App One Signal Rest API Key</h2>
              <input
                type="text"
                className="border p-3 border-gray-300 rounded w-full"
                placeholder="XXXXXXXXXXXX"
              />
            </div>
          </div>
        ))}
      </div>

      {/* About Us */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">About Us</h3>
        <p className="text-gray-600 p-4 border border-gray-300 rounded text-sm whitespace-pre-line">
          Lorem ipsum dolor sit amet consectetur. Sit lorem senectus blandit eros vitae blandit at nibh.
          Lorem ipsum dolor sit amet consectetur. Sit lorem senectus blandit eros vitae blandit at nibh.
          Lorem ipsum dolor sit amet consectetur. Sit lorem senectus blandit eros vitae blandit at nibh.
          Lorem ipsum dolor sit amet consectetur. Sit lorem senectus blandit eros vitae blandit at nibh.
        </p>
      </div>

    </div>
  );
}
