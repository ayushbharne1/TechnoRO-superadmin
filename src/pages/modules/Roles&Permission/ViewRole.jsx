import React, { useEffect, useMemo } from "react";
import { FiPhone, FiMail, FiLock, FiUser } from "react-icons/fi";
import { useLocation, useParams } from "react-router-dom";
import Header2 from "../../../components/superAdmin/header/Header2";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoleById, clearCurrent } from "../../../redux/slices/rolesSlice";

const ViewSubAdmin = () => {
  const location = useLocation();
  const { user: userData } = location.state || {};

  const { id: paramId } = useParams();
  const dispatch = useDispatch();
  const { current } = useSelector((s) => s.role || {});

  useEffect(() => {
    if (!userData && paramId) dispatch(fetchRoleById(paramId));
    return () => dispatch(clearCurrent());
  }, [dispatch, paramId, userData]);

  const data = userData || current;
  if (!data) return <div>User data not found</div>;

  const normalizedPermissions = useMemo(() => {
    if (!Array.isArray(data.permissions)) return [];
    return data.permissions.map((p, idx) => {
      const inner = p && typeof p === "object" && p.permissions ? p.permissions : p || {};
      const pick = (k) => !!inner?.[k];
      return {
        id: idx + 1,
        module: p.module || p.name || `Module ${idx + 1}`,
        add: pick("add"),
        edit: pick("edit"),
        delete: pick("delete"),
        view: pick("view"),
      };
    });
  }, [data.permissions]);

  return (
    <div className="min-h-screen bg-white p-6 gap-6 font-[Poppins]">

<Header2 title="View Sub Admin"/>    

      {/* User Info */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h3 className="text-2xl font-semibold mb-4">{data.name}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center gap-2 text-gray-600">
            <FiUser className="text-xl" />
            <span className="text-green-600">{data.role}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FiPhone className="text-xl" />
            <span className="text-green-600">{data.mobile || data.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FiMail className="text-xl" />
            <span className="text-green-600">{data.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FiLock className="text-xl" />
            <span className="text-green-600">******</span>
          </div>
        </div>
      </div>


      {/* Permissions Table */}

      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-3">Permissions</h2>

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
            {normalizedPermissions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-3 text-center text-gray-500">
                  No permissions available
                </td>
              </tr>
            ) : (
              normalizedPermissions.map((perm, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{perm.module}</td>
                  {["add", "edit", "delete", "view"].map((type) => (
                    <td key={type} className="px-4 py-2 text-center">
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${
                          perm[type] ? "bg-green-500" : "bg-gray-300"
                        }`}
                        title={perm[type] ? "Yes" : "No"}
                      ></span>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewSubAdmin;
