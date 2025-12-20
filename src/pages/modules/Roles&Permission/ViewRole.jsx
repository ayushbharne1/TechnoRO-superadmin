import React, { useState } from "react";
import { FiPhone, FiMail, FiLock, FiUser } from "react-icons/fi";
import { useLocation, Link } from "react-router-dom";
import Header2 from "../../../components/superAdmin/header/Header2";

const ViewSubAdmin = () => {
  const location = useLocation();
  const { user: userData } = location.state || {};

  if (!userData) return <div>User data not found</div>;

  // Sample permissions data
  const [permissions, setPermissions] = useState([
    { module: "Module 1", add: true, edit: true, delete: true, view: true },
    { module: "Module 2", add: true, edit: false, delete: true, view: false },
    { module: "Module 3", add: false, edit: true, delete: false, view: true },
    { module: "Module 4", add: false, edit: false, delete: false, view: true },
  ]);

  const togglePermission = (index, type) => {
    const updated = [...permissions];
    updated[index][type] = !updated[index][type];
    setPermissions(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 font-[Poppins]">

<Header2/>    

      {/* User Info */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h3 className="text-2xl font-semibold mb-4">{userData.name}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center gap-2 text-gray-600">
            <FiUser className="text-xl" />
            <span className="text-green-600">{userData.role}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FiPhone className="text-xl" />
            <span className="text-green-600">{userData.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FiMail className="text-xl" />
            <span className="text-green-600">{userData.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FiLock className="text-xl" />
            <span className="text-green-600">{userData.password}</span>
          </div>
        </div>
      </div>


      {/* Permissions Table */}

      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
                    <h2 className="text-lg font-semibold mb-3">Permissions </h2>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">Sr.No</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Modules</th>
              <th className="px-4 py-2 text-center text-sm font-semibold">Add</th>
              <th className="px-4 py-2 text-center text-sm font-semibold">Edit</th>
              <th className="px-4 py-2 text-center text-sm font-semibold">Delete</th>
              <th className="px-4 py-2 text-center text-sm font-semibold">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {permissions.map((perm, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{perm.module}</td>

                {/* Toggle switches */}
                {["add", "edit", "delete", "view"].map((type) => (
                  <td key={type} className="px-4 py-2 text-center">
                    <button
                      onClick={() => togglePermission(idx, type)}
                      className={`w-10 h-5 rounded-full relative transition-colors ${
                        perm[type] ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`block w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                          perm[type] ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewSubAdmin;
