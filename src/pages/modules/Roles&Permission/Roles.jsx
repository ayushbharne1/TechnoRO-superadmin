import { useState, useEffect, useCallback } from "react";
import { FiSearch, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import Header2 from "../../../components/superAdmin/header/Header2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, deleteRole } from "../../../redux/slices/rolesSlice";

const RolesAndPermissions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: tableData = [], loading } = useSelector((s) => s.role || {});

  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // Fetch roles with debounce when `search` changes (and on mount)
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return navigate("/");
    const t = setTimeout(() => dispatch(fetchRoles({ search })), 300);
    return () => clearTimeout(t);
  }, [dispatch, navigate, search]);

  const normalizedSearch = search.trim().toLowerCase();
  const filteredRows = tableData.filter((row) => {
    const name = (row.name || "").toString().toLowerCase();
    const email = (row.email || "").toString().toLowerCase();
    const phone = ((row.mobile || row.phone) || "").toString().toLowerCase();
    if (!normalizedSearch) return true;
    return (
      name.includes(normalizedSearch) ||
      email.includes(normalizedSearch) ||
      phone.includes(normalizedSearch)
    );
  });

  const totalPages = Math.ceil(filteredRows.length / entriesPerPage);
  const indexOfLastItem = currentPage * entriesPerPage;
  const indexOfFirstItem = indexOfLastItem - entriesPerPage;
  const currentItems = filteredRows.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePageChange = (page) => setCurrentPage(page);

  // Reset to first page when search or entriesPerPage change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, entriesPerPage]);

  const handleEdit = (row) =>
    navigate(`/roles-permission/edit-sub-admin/${row._id}`, {
      state: { user: row },
    });
  const handleView = (row) =>
    navigate(`/roles-permission/view-sub-admin/${row._id}`, {
      state: { user: row },
    });

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this sub-admin?")) return;
    try {
      await dispatch(deleteRole(id)).unwrap();
      alert("Deleted successfully");
      dispatch(fetchRoles({ search }));
    } catch (err) {
      console.error(err);
      alert(err?.message || "Failed to delete");
    }
  };

  return (
    <div className="bg-white p-6 h-full overflow-y-auto font-poppins">
      <Header2 title="Roles & Permissions" />

      {/* Top Controls */}
      <div className="flex flex-wrap p-2 items-center justify-between gap-4 w-full md:p-4">
        {/* Entries */}
        <div className="flex items-center gap-2">
          <span className="text-[16px]">Show</span>
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="p-2 border rounded w-[80px] bg-[#F5F5F5]"
          >
            {[5, 10, 15].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span className="text-[16px]">Entries</span>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-[260px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 pl-10 border rounded bg-[#F5F5F5]"
          />
        </div>

        {/* Filter */}
        <select className="p-2 border rounded bg-[#F5F5F5]">
          <option>Select Role</option>
          <option>Sub Admin</option>
          <option>Admin</option>
          <option>Manager</option>
        </select>

        {/* Button */}
        <button
          onClick={() => navigate("/roles-permission/create-sub-admin")}
          className="bg-[#7EC1B1] hover:bg-[#68a697] text-white px-6 py-2 rounded-lg font-medium"
        >
          Create Sub Admin
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-[#CACACA] min-w-[950px] rounded-lg">
          <thead>
            <tr className="bg-[#F5F5F5] text-center">
              {[
                "S.No",
                "Sub Admin Name",
                "Role",
                "Phone",
                "Email",
                "Password",
                "Action",
              ].map((head, i) => (
                <th key={i} className="p-3 font-medium text-[18px]">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-center">
            {loading ? (
              <tr>
                <td colSpan="7" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : currentItems.length > 0 ? (
              currentItems.map((row, idx) => (
                <tr key={row._id || idx}>
                  <td className="p-3">
                    {(currentPage - 1) * entriesPerPage + idx + 1}
                  </td>
                  <td className="p-3 capitalize">{row.name}</td>
                  <td className="p-3">{row.role}</td>
                  <td className="p-3">{row.mobile || row.phone}</td>
                  <td className="p-3">{row.email}</td>
                  <td className="p-3">******</td>
                  <td className="p-3 flex justify-center gap-3">
                    <FiEye
                      className="text-blue-600 w-5 h-5 cursor-pointer"
                      onClick={() => handleView(row)}
                    />
                    <FiEdit
                      className="text-green-600 w-5 h-5 cursor-pointer"
                      onClick={() => handleEdit(row)}
                    />
                    <FiTrash2
                      className="text-red-600 w-5 h-5 cursor-pointer"
                      onClick={() => handleDelete(row._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-gray-500">
                  No Sub Admins Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-between items-center mt-2 gap-3">
        <span>
          Showing {Math.min(indexOfFirstItem + 1, filteredRows.length)} to{" "}
          {Math.min(indexOfLastItem, filteredRows.length)} of{" "}
          {filteredRows.length} entries
        </span>

        <div className="flex flex-wrap gap-2 text-[#7EC1B1]">
          <button
            disabled={currentPage === 1}
            onClick={handlePrevPage}
            className="px-3 py-1 border border-[#7EC1B1] rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => handlePageChange(n)}
              className={`px-2 py-1 border border-[#7EC1B1] rounded-lg ${
                currentPage === n ? "bg-[#7EC1B1] text-white" : ""
              }`}
            >
              {n}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
            className="px-3 py-1 border border-[#7EC1B1] rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RolesAndPermissions;
