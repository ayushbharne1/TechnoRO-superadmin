import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Header2 from "../../../components/superAdmin/header/Header2";

const RolesAndPermissions = () => {
  const modulesList = [
    "Module 1", "Module 2", "Module 3", "Module 4", "Module 5",
    "Module 6", "Module 7", "Module 8", "Module 9", "Module 10"
  ];

  const [showForm, setShowForm] = useState(false);

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

  const togglePermission = (id, type) => {
    setPermissions(prev =>
      prev.map(perm =>
        perm.id === id ? { ...perm, [type]: !perm[type] } : perm
      )
    );
  };

  return (
    <div className="px-10 mt-6 w-full font-[Poppins] text-black">
        <Header2/>

      {/* Create Sub-Admin Form */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Sub Admin Name</label>
              <input type="text" placeholder="Enter Full Name" className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <input type="text" placeholder="Enter Role" className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone No.</label>
              <input type="text" placeholder="Enter Phone No." className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" placeholder="Enter Email" className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input type="password" placeholder="Enter Password" className="w-1/2 border border-gray-300 rounded px-3 py-2" />
            </div>
          </div>

          {/* Permissions Table */}
          <div className="mt-10 overflow-x-auto">
              <h2 className="text-lg font-semibold mb-3">Permissions </h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#F3F3F3]">
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
                {permissions.map((perm) => (
                  <tr key={perm.id} className="hover:bg-blue-50 transition">
                    <td className="px-4 py-2 text-sm">{perm.id}</td>
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
        </div>
     <div className="flex justify-center mt-4">
  <button className="bg-[#7EC1B1] text-white px-10 py-2 rounded-md hover:bg-[#66b0a0] transition text-sm">
    Add
  </button>
</div>

    
    </div>
  );
};

export default RolesAndPermissions;
