
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header2 from "../../../components/superAdmin/header/Header2";

const SubAdminForm = ({ onClose }) => {
  const location = useLocation();
  const userData = location.state?.user; // Get passed user object

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
    password: "",
  });

  const modulesList = [
    "Module 1", "Module 2", "Module 3", "Module 4", "Module 5",
    "Module 6", "Module 7", "Module 8", "Module 9", "Module 10"
  ];

  const [permissions, setPermissions] = useState(
    modulesList.map((module, idx) => ({
      id: idx + 1,
      module,
      selected: false,
      add: false,
      edit: false,
      delete: false,
      view: false,
    }))
  );

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        role: userData.role || "",
        phone: userData.phone || "",
        email: userData.email || "",
        password: userData.password || "",
      });

      if (userData.permissions && Array.isArray(userData.permissions)) {
        setPermissions(prev =>
          prev.map(perm => {
            const userPerm = userData.permissions.find(p => p.module === perm.module);
            return userPerm ? { ...perm, ...userPerm } : perm;
          })
        );
      }
    }
  }, [userData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePermission = (id, type) => {
    setPermissions((prev) =>
      prev.map((perm) =>
        perm.id === id ? { ...perm, [type]: !perm[type] } : perm
      )
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 mt-6">
      <h3 className="text-md font-semibold mb-4">
        <Header2/>
      </h3>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

        {["name", "role", "phone", "email", "password"].map((field) => (
          <div
            key={field}
            className={field === "password" ? "md:col-span-2" : ""}
          >
            <label className="block text-sm font-medium mb-1">
              {field === "name" && "Sub Admin Name"}
              {field === "role" && "Role"}
              {field === "phone" && "Phone No."}
              {field === "email" && "Email"}
              {field === "password" && "Password"}
            </label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        ))}
      </div>

      {/* Permissions Table */}
      <div className="mt-4 overflow-x-auto">
                              <h2 className="text-lg font-semibold mb-3">Permissions </h2>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#F3F3F3]">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Sr.No
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Modules
              </th>
              {["Add", "Edit", "Delete", "View"].map((col) => (
                <th
                  key={col}
                  className="px-4 py-2 text-center text-sm font-semibold"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {permissions.map((perm) => (
              <tr key={perm.id} className="hover:bg-blue-50 transition">
                <td className="px-4 py-2">{perm.id}</td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={perm.selected}
                    onChange={() => togglePermission(perm.id, "selected")}
                  />
                  {perm.module}
                </td>
                {["add", "edit", "delete", "view"].map((type) => (
                  <td key={type} className="px-4 py-2 text-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={perm[type]}
                        onChange={() => togglePermission(perm.id, type)}
                      />
                      <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#7EC1B1] rounded-full peer peer-checked:bg-[#7EC1B1] transition after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save Button */}
      <div className="flex justify-center mt-4">
        <button
          className="bg-[#7EC1B1] text-white px-4 py-2 rounded-md hover:bg-[#66b0a0] transition"
          onClick={onClose}
        >
          {userData ? "Update Role" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default SubAdminForm;
