import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PreviewIcon from "../../../assets/preview1.svg";
import EditIcon from "../../../assets/edit1.svg";
import Deleteicon from "../../../assets/delete.svg";
import Header2 from "../../../components/superAdmin/header/Header2";
import SearchIcon from "../../../assets/search.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices, deleteService } from "../../../redux/slices/serviceSlice";
import { fetchAllCategories } from "../../../redux/slices/CategorySlice";
import swal from "sweetalert2";
import { toast } from "react-toastify";

const Services = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: apiRows = [], loading } = useSelector((state) => state.service);
  const { categories = [] } = useSelector((state) => state.category);

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  /* ===================== FETCH API DATA ===================== */
  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchAllCategories());
  }, [dispatch]);

  /* ===================== MAP API DATA TO UI ===================== */
  useEffect(() => {
    if (!apiRows.length || !categories.length) return;

    const uiRows = apiRows.map((row) => {
      // Find category name from category ID
      const categoryObj = categories.find((cat) => cat._id === row.category);
      const categoryName = categoryObj?.name || "Unknown";

      return {
        _id: row._id,
        category: categoryName,
        categoryId: row.category,
        serviceAMC: row.name,
        price: `₹${row.price}`,
        warrenty: row.warranty || "NA",
        discount: row.discount ? `${row.discount}%` : "NA",
        description: row.description,
        features: row.features,
        images: row.images,
      };
    });

    setRows(uiRows);
  }, [apiRows, categories]);

  const handleClick = () => navigate("/services/addservice");

  const handleRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  const filteredRows = rows
    .filter((row) => 
      row.serviceAMC.toLowerCase().includes(search.toLowerCase()) ||
      row.category.toLowerCase().includes(search.toLowerCase())
    )
    .filter((row) => {
      if (!statusFilter) return true;
      return row.categoryId === statusFilter;
    });

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const paginatedRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) setPage(newPage);
  };

  const handleDelete = async (id) => {
    const result = await swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this service!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteService(id)).unwrap();
        toast.success("Service deleted successfully");
      } catch (error) {
        toast.error("Failed to delete service");
      }
    }
  };

  const handleAddCategory = () => {
    navigate("/services/category/add");
  };

  return (
    <div className="bg-white p-4 h-full overflow-y-auto flex flex-col gap-6">
      <Header2 />

      <div className="bg-white flex flex-col gap-4 overflow-x-auto">
        {/* Top Controls */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 flex-wrap text-sm md:text-base mr-10">
              <span>Show</span>
              <select
                value={rowsPerPage}
                onChange={handleRowsPerPage}
                className="p-1 md:p-2 border rounded bg-gray-100 w-15"
              >
                {[10, 20, 30, 40, 50].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <span>Entries</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-sm md:text-base mr-15">
              <div className="relative w-full max-w-50">
                <img
                  src={SearchIcon}
                  alt="Search"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5"
                />
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="p-1 pl-8 md:p-2 md:pl-9 border rounded w-full text-sm md:text-base bg-gray-100"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-1 md:p-2 border rounded w-full md:w-50 text-sm md:text-base bg-gray-100"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleAddCategory}
              className="w-full sm:w-50 h-10 bg-[#7EC1B1] text-white rounded-lg font-poppins text-[16px]"
            >
              Add Service Category
            </button>
            <button
              onClick={handleClick}
              className="w-full sm:w-50 h-10 bg-[#7EC1B1] text-white rounded-lg font-poppins text-[16px]"
            >
              Add Services
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full min-w-150 border border-gray-400 md:min-w-full">
            <thead className="hidden md:table-header-group">
              <tr className="bg-gray-100 text-center text-sm md:text-lg">
                <th className="p-2 md:p-3 font-poppins font-medium">Sr. No.</th>
                <th className="p-2 md:p-3 font-poppins font-medium">Category</th>
                <th className="p-2 md:p-3 font-poppins font-medium">Services</th>
                <th className="p-2 md:p-3 font-poppins font-medium">Price</th>
                <th className="p-2 md:p-3 font-poppins font-medium">Warranty</th>
                <th className="p-2 md:p-3 font-poppins font-medium">Discount</th>
                <th className="p-2 md:p-3 font-poppins font-medium">Action</th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <tr>
                  <td colSpan={7} className="text-center p-6 text-gray-500">
                    Loading...
                  </td>
                </tr>
              </tbody>
            ) : paginatedRows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={7} className="text-center p-6 text-gray-500">
                    No services found
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="text-center text-sm md:text-base">
                {paginatedRows.map((row, index) => {
                  const serialNumber = (page - 1) * rowsPerPage + index + 1;

                  return (
                    <tr
                      key={row._id}
                      className="bg-white text-black block md:table-row mb-4 md:mb-0 p-2 md:p-0 rounded-lg shadow md:shadow-none"
                    >
                      <td className="p-2 md:p-3 block md:table-cell text-left md:text-center">
                        <span className="md:hidden font-semibold">Sr. No.: </span>
                        {serialNumber}
                      </td>
                      <td className="p-2 md:p-3 block md:table-cell text-left md:text-center">
                        <span className="md:hidden font-semibold">Category: </span>
                        {row.category}
                      </td>
                      <td
                        className="p-2 md:p-3 block md:table-cell text-left md:text-center max-w-full sm:truncate md:max-w-50"
                        title={row.serviceAMC}
                      >
                        <span className="md:hidden font-semibold">Service: </span>
                        {row.serviceAMC}
                      </td>
                      <td className="p-2 md:p-3 block md:table-cell text-left md:text-center">
                        <span className="md:hidden font-semibold">Price: </span>
                        {row.price}
                      </td>
                      <td className="p-2 md:p-3 block md:table-cell text-left md:text-center">
                        <span className="md:hidden font-semibold">Warranty: </span>
                        {row.warrenty}
                      </td>
                      <td className="p-2 md:p-3 block md:table-cell text-left md:text-center">
                        <span className="md:hidden font-semibold">Discount: </span>
                        {row.discount}
                      </td>
                      <td className="p-2 md:p-3 flex gap-2 justify-start md:justify-center flex-wrap">
                        <span className="md:hidden font-semibold">Action: </span>
                        <div className="h-7.5 w-7.5 md:h-9 md:w-9 flex items-center justify-center rounded">
                          <img
                            src={PreviewIcon}
                            onClick={() =>
                              navigate(`/services/servicedetails/${row._id}`)
                            }
                            alt="preview"
                            className="w-4 h-4 md:w-5 md:h-5 cursor-pointer"
                          />
                        </div>
                        <div className="h-7.5 w-7.5 md:h-9 md:w-9 flex items-center justify-center rounded">
                          <img
                            src={EditIcon}
                            onClick={() =>
                              navigate(`/services/editservice/${row._id}`)
                            }
                            alt="edit"
                            className="w-4 h-4 md:w-5 md:h-5 cursor-pointer"
                          />
                        </div>
                        <div
                          onClick={() => handleDelete(row._id)}
                          className="h-7.5 w-7.5 md:h-9 md:w-9 flex items-center justify-center rounded cursor-pointer"
                        >
                          <img
                            src={Deleteicon}
                            alt="delete"
                            className="w-4 h-4 md:w-5 md:h-5"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2 flex-wrap font-semibold text-gray-700 text-sm md:text-base">
          <span>
            Showing{" "}
            {filteredRows.length === 0 ? 0 : (page - 1) * rowsPerPage + 1} to{" "}
            {Math.min(page * rowsPerPage, filteredRows.length)} of{" "}
            {filteredRows.length} entries
          </span>
          <div className="flex flex-wrap gap-2 text-[#7EC1B1] justify-center">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 md:px-4 md:py-2 border border-[#7EC1B1] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`p-1 md:p-2 border rounded-lg border-[#7EC1B1] ${
                  page === idx + 1 ? "bg-[#7EC1B1] text-white" : ""
                } w-7.5 md:w-9`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages || totalPages === 0}
              className="px-3 py-1 md:px-4 md:py-2 border border-[#7EC1B1] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;