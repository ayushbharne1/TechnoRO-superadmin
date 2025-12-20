

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PreviewIcon from "../../../assets/preview1.svg";
import EditIcon from "../../../assets/edit1.svg";
import Deleteicon from "../../../assets/delete.svg";
import Header2 from "../../../components/superAdmin/header/Header2";
import SearchIcon from "../../../assets/search.png";

const Services = () => {
  const [rows, setRows] = useState([
    { id: 1, category: "Service", serviceAMC: "Water Purifier Service Maintenance Service", price: "₹899.00", warrenty: "NA", discount: "10%" },
    { id: 2, category: "AMC Plan", serviceAMC: "Silver Annual Maintenance Contract (AMC) Plan Premium Service.", price: "₹1899.00", warrenty: "1 Year", discount: "10%" },
    { id: 3, category: "Service", serviceAMC: "Gold Annual Maintenance Contract (AMC) Plan Premium Service.", price: "₹2899.00", warrenty: "1 Year", discount: "10%" },
    { id: 4, category: "AMC Plan", serviceAMC: "Dimond Annual Maintenance Contract (AMC) Plan Premium Service.", price: "₹3899.00", warrenty: "1 Year", discount: "10%" },
    { id: 5, category: "AMC Plan", serviceAMC: "Platinum Annual Maintenance Contract (AMC) Plan Premium Service.", price: "₹4899.00", warrenty: "1 Year", discount: "10%" },
    { id: 6, category: "Service", serviceAMC: "Installation RO Water Purifier Service", price: "₹899.00", warrenty: "NA", discount: "10%" },
    { id: 7, category: "AMC Plan", serviceAMC: "Uninstallation RO Water Purifier Service", price: "₹899.00", warrenty: "NA", discount: "10%" },
    { id: 8, category: "AMC Plan", serviceAMC: "Water Purifier Service Maintenance Service", price: "₹899.00", warrenty: "NA", discount: "10%" },
    { id: 9, category: "Service", serviceAMC: "Water Purifier Service Maintenance Service", price: "₹899.00", warrenty: "NA", discount: "10%" },
    { id: 10, category: "AMC Plan", serviceAMC: "Water Purifier Service Maintenance Service", price: "₹899.00", warrenty: "NA", discount: "10%" },
  ]);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const navigate = useNavigate();
  const navigate2 = useNavigate();
  const navigate3 = useNavigate();

  const handleClick = () => navigate("/services/addservice");

  const handleRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  const filteredRows = rows
    .filter((row) => row.category.toLowerCase().includes(search.toLowerCase()))
    .filter((row) => (statusFilter ? row.category === statusFilter : true));

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const paginatedRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div className="bg-white p-4 h-full overflow-y-auto flex flex-col gap-6">
      <Header2 />

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow flex flex-col gap-4 overflow-x-auto">

        {/* Top Controls */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-4 ">
            <div className="flex items-center gap-2 flex-wrap text-sm md:text-base mr-10">
              <span>Show</span>
              <select
                value={rowsPerPage}
                onChange={handleRowsPerPage}
                className="p-1 md:p-2 border rounded bg-gray-100 w-[60px]"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <span>Entries</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-sm md:text-base mr-15">
              <div className="relative w-full max-w-[200px]">
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
                className="p-1 md:p-2 border rounded w-full md:w-[200px] text-sm md:text-base bg-gray-100"
              >
                <option value="">Select Category</option>
                <option value="Service">Service</option>
                <option value="AMC Plan">AMC Plan</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleClick}
            className="w-full sm:w-[200px] h-[40px] bg-[#7EC1B1] text-white rounded-lg font-poppins text-[16px]"
          >
            Add Service/AMC
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full min-w-[600px] border border-gray-400 md:min-w-full">
            <thead className="hidden md:table-header-group">
              <tr className="bg-gray-100 text-center text-sm md:text-lg">
                <th className="p-2 md:p-3 font-poppins font-medium">Sr. No.</th>
                <th className="p-2 md:p-3 font-poppins font-medium">Category</th>
                <th className="p-2 md:p-3 font-poppins font-medium">Service & AMC Plan Name</th>
                <th className="p-2 md:p-3 font-poppins font-medium">Price</th>
                <th className="p-2 md:p-3 font-poppins font-medium">Warrenty/Validity</th>
                <th className="p-2 md:p-3 font-poppins font-medium">Discount</th>
                <th className="p-2 md:p-3 font-poppins font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-center text-sm md:text-base">
              {paginatedRows.map((row) => (
                <tr key={row.id} className="bg-white text-black block md:table-row mb-4 md:mb-0 p-2 md:p-0 rounded-lg shadow md:shadow-none">
                  <td className="p-2 md:p-3 block md:table-cell text-left md:text-center">
                    <span className="md:hidden font-semibold">Sr. No.: </span>{row.id}
                  </td>
                  <td className="p-2 md:p-3 block md:table-cell text-left md:text-center">
                    <span className="md:hidden font-semibold">Category: </span>{row.category}
                  </td>
                  <td className="p-2 md:p-3 block md:table-cell text-left md:text-center max-w-full sm:truncate md:max-w-[200px]" title={row.serviceAMC}>
                    <span className="md:hidden font-semibold">Service/AMC: </span>{row.serviceAMC}
                  </td>
                  <td className="p-2 md:p-3 block md:table-cell text-left md:text-center">
                    <span className="md:hidden font-semibold">Price: </span>{row.price}
                  </td>
                  <td className="p-2 md:p-3 block md:table-cell text-left md:text-center">
                    <span className="md:hidden font-semibold">Warrenty: </span>{row.warrenty}
                  </td>
                  <td className="p-2 md:p-3 block md:table-cell text-left md:text-center">
                    <span className="md:hidden font-semibold">Discount: </span>{row.discount}
                  </td>
                  <td className="p-2 md:p-3 flex gap-2 justify-start md:justify-center flex-wrap">
                    <span className="md:hidden font-semibold">Action: </span>
                    <div className="h-[30px] w-[30px] md:h-[36px] md:w-[36px] flex items-center justify-center rounded">
                      <img src={PreviewIcon} onClick={() => navigate2("/services/servicedetails", { state: row })} alt="preview" className="w-4 h-4 md:w-5 md:h-5 cursor-pointer" />
                    </div>
                    <div className="h-[30px] w-[30px] md:h-[36px] md:w-[36px] flex items-center justify-center rounded">
                      <img src={EditIcon} onClick={() => navigate3("/services/editservice", { state: row })} alt="edit" className="w-4 h-4 md:w-5 md:h-5 cursor-pointer" />
                    </div>
                    <div className="h-[30px] w-[30px] md:h-[36px] md:w-[36px] flex items-center justify-center rounded">
                      <img src={Deleteicon} alt="delete" className="w-4 h-4 md:w-5 md:h-5 cursor-pointer" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2 flex-wrap font-semibold text-gray-700 text-sm md:text-base">
          <span>
            Showing {Math.min((page - 1) * rowsPerPage + 1, filteredRows.length)} to {Math.min(page * rowsPerPage, filteredRows.length)} of {filteredRows.length} entries
          </span>
          <div className="flex flex-wrap gap-2 text-[#7EC1B1] justify-center">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 md:px-4 md:py-2 border border-[#7EC1B1] rounded-lg"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`p-1 md:p-2 border rounded-lg border-[#7EC1B1] ${page === idx + 1 ? "bg-[#7EC1B1] text-white" : ""} w-[30px] md:w-[36px]`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 md:px-4 md:py-2 border border-[#7EC1B1] rounded-lg"
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


