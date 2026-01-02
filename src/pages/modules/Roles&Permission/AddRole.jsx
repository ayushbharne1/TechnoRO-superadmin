import { useState } from "react";
import Header2 from "../../../components/superAdmin/header/Header2";
import { useDispatch, useSelector } from "react-redux";
import { addRole } from "../../../redux/slices/rolesSlice";
import { useNavigate } from "react-router-dom";

const RolesAndPermissions = () => {
  const modulesList = [
    "Module 1",
    "Module 2",
    "Module 3",
    "Module 4",
    "Module 5",
    "Module 6",
    "Module 7",
    "Module 8",
    "Module 9",
    "Module 10",
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading: isLoading } = useSelector((s) => s.role || {});

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
    setPermissions((prev) =>
      prev.map((perm) =>
        perm.id === id ? { ...perm, [type]: !perm[type] } : perm
      )
    );
  };

  const [formData, setFormData] = useState({
    name: "",
    role: "subAdmin",
    mobile: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    const errs = [];
    if (!formData.name.trim()) errs.push("Name is required");
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
      errs.push("Valid email is required");
    if (!formData.mobile.trim()) errs.push("Mobile is required");
    if (!formData.password.trim() || formData.password.length < 6)
      errs.push("Password (min 6 chars) is required");
    return errs;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    if (!token) return navigate("/");
    const errs = validate();
    if (errs.length) return setError(errs.join("\n"));
    setError("");
    // convert UI permissions to backend shape: [{ module, permissions: { add, edit, view, delete } }]
    const mappedPermissions = permissions
      .filter((p) => p.selected || p.add || p.edit || p.delete || p.view)
      .map((p) => ({
        module: p.module,
        permissions: {
          add: !!p.add,
          edit: !!p.edit,
          view: !!p.view,
          delete: !!p.delete,
        },
      }));

    const payload = { ...formData, permissions: mappedPermissions };
    try {
      await dispatch(addRole(payload)).unwrap();
      alert("Role/sub-admin added successfully");
      navigate("/roles-permission");
    } catch (err) {
      console.error(err);
      const serverMsg =
        (err && (err.message || err?.data?.message || err?.message?.message)) ||
        (typeof err === "string" ? err : null);
      setError(serverMsg || "Failed to add role");
    }
  };

  return (
    <div className="bg-white p-6 w-full font-[Poppins] text-black">
      <Header2 title="Create Sub Admin" />

      {/* Create Sub-Admin Form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Sub Admin Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <input
              type="text"
              name="role"
              placeholder="Enter Role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mobile No.</label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter Mobile No."
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="w-1/2 border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Permissions Table */}
        <div className="mt-10 overflow-x-auto">
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
                <th className="px-4 py-2 text-center text-sm font-semibold">
                  Add
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold">
                  Edit
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold">
                  Delete
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold">
                  View
                </th>
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

      {/* Error above Add button (bottom) */}
      {error && (
        <div className="mb-2 rounded-md bg-red-50 border border-red-200 p-3 text-red-700 w-full max-w-3xl mx-auto">
          <pre className="whitespace-pre-wrap text-sm">{error}</pre>
        </div>
      )}

      <div className="flex justify-center mt-4">
        <button
          onClick={handleAdd}
          disabled={isLoading}
          className="bg-[#7EC1B1] text-white px-10 py-2 rounded-md hover:bg-[#66b0a0] transition text-sm disabled:opacity-60"
        >
          {isLoading ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
};

export default RolesAndPermissions;
