import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/slices/productSlice"; 
import PreviewIcon from "../../../assets/preview1.svg";
import SearchIcon from "../../../assets/search.png";
import Header2 from '../../../components/superAdmin/header/Header2';
import { Edit, Trash2, Plus } from "lucide-react"; 
import {  deleteProduct, clearSuccessMessage } from "../../../redux/slices/productSlice"; 
import { toast } from "react-toastify"; // Import toast

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Local State
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Get successMessage to show toast
  const { products, pagination, loading, successMessage } = useSelector((state) => state.products);

  // ✅ Handle Toast for Delete
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearSuccessMessage());
    }
  }, [successMessage, dispatch]);

  // ✅ NEW: Handle Delete Click
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  // Fetch Data
  useEffect(() => {
    dispatch(fetchProducts({ 
      page, 
      limit: rowsPerPage, 
      search, 
      category: categoryFilter 
    }));
  }, [dispatch, page, rowsPerPage, search, categoryFilter]);

  const handleRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.pages) setPage(newPage);
  };

  // Status Styling
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved": return "text-[#34C759]";
      case "pending": return "text-[#FFCC00]";
      case "rejected": return "text-[#FF383C]";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="bg-white p-2 md:p-4 h-full overflow-y-auto flex flex-col gap-2 mt-2 ml-2">
      <Header2 title="Product List"/>

      {/* Table Container */}
      <div className="bg-white p-3 md:p-4 md:pl-0 w-full overflow-x-auto">
        

        {/* Controls Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 pl-0 pr-2">
          
          {/* Left: Show Entries */}
          <div className="flex items-center gap-3 text-gray-700 font-normal">
            <span>Show</span>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPage}
              className="bg-gray-100 border border-black rounded px-2 py-1 focus:outline-none focus:border-[#7EC1B1]"
            >
              {[7, 10, 20, 50].map(num => <option key={num} value={num}>{num}</option>)}
            </select>
            <span>Entries</span>
          </div>

          {/* Right: Search, Filter, Add Button */}
          {/* ✅ Increased gap-4 to gap-6 for more space */}
          <div className="flex flex-col md:flex-row gap-14 w-full md:w-auto items-center">
            
            {/* Search */}
            <div className="relative w-full md:w-50">
              <img src={SearchIcon} alt="" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full bg-gray-100 border border-black rounded pl-10 pr-3 py-1 focus:outline-none focus:border-[#7EC1B1]"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
              className="bg-gray-100 border border-black rounded px-3 py-1 w-full md:w-48 focus:outline-none focus:border-[#7EC1B1]"
            >
              <option value="">Select Category</option>
              <option value="Spare Parts">Spare Parts</option>
              <option value="Water Purifier">Water Purifier</option>
              <option value="Water Softener">Water Softener</option>
              <option value="RO Plant">RO Plant</option>
              <option value="Water Ionizer">Water Ionizer</option>
            </select>

            {/* Add Product Button */}
            <button 
                onClick={() => navigate('/product/add-product')} 
                className="bg-[#7EC1B1] text-white px-6 py-1 rounded-lg font-medium shadow-sm hover:bg-[#6db0a0] flex items-center gap-2 whitespace-nowrap w-full md:w-auto justify-center"
            >
                 Add Product
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F5F5F5] text-gray-700">
              <tr>
                <th className="p-3 font-semibold text-center w-16">Sr.No.</th>
                <th className="p-3 font-semibold">Category</th>
                <th className="p-3 font-semibold w-1/4">Product Name</th>
                <th className="p-3 font-semibold text-center">Price</th>
                <th className="p-3 font-semibold text-center">Warranty</th>
                <th className="p-3 font-semibold text-center">Discount</th>
                <th className="p-3 font-semibold text-center">Status</th>
                <th className="p-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {loading ? (
                <tr><td colSpan="8" className="p-8 text-center">Loading Data...</td></tr>
              ) : products.length > 0 ? (
                products.map((row, index) => (
                  <tr key={row._id || index} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-3 text-center font-medium">{(pagination.page - 1) * pagination.limit + index + 1}</td>
                    <td className="p-3">{row.category}</td>
                    <td className="p-3" title={row.name}>
                        {row.name.length > 40 ? row.name.substring(0, 40) + '...' : row.name}
                    </td>
                    <td className="p-3 text-center font-medium">₹{row.price}</td>
                    <td className="p-3 text-center">{row.warrantyPeriod} Years</td>
                    <td className="p-3 text-center">{row.discountPercent}%</td>
                    <td className={`p-3 text-center  ${getStatusColor(row.status)}`}>
                        {row.status || 'Pending'}
                    </td>
                    <td className="p-3 text-center">
                        <div className="flex justify-center items-center gap-3">
                            <button 
                                onClick={() => navigate(`/product/product-details/${row._id}`, { state: row })}
                                className="p-1 hover:bg-blue-50 rounded" title="View"
                            >
                                <img src={PreviewIcon} alt="View" className="w-5 h-5 text-blue-500" />
                            </button>
                            <button 
                                onClick={() => navigate(`/product/edit-product/${row._id}`)} 
                                className="p-1 hover:bg-blue-50 rounded text-blue-500" title="Edit"
                            >
                                <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(row._id || row.id)} className="p-1 hover:bg-red-50 rounded text-red-500" title="Delete">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="8" className="p-8 text-center">No products found matching your criteria.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {pagination.pages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-gray-600 text-sm">
                <div>
                    Showing {Math.min((page - 1) * rowsPerPage + 1, pagination.total)} to {Math.min(page * rowsPerPage, pagination.total)} of {pagination.total} Entries
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                    <button 
                        onClick={() => handlePageChange(page - 1)} 
                        disabled={page === 1}
                        className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    {[...Array(Math.min(5, pagination.pages))].map((_, i) => {
                        const pNum = i + 1; 
                        return (
                            <button 
                                key={pNum} 
                                onClick={() => handlePageChange(pNum)}
                                className={`px-3 py-1 border rounded ${page === pNum ? 'bg-[#7EC1B1] text-white border-[#7EC1B1]' : 'hover:bg-gray-100'}`}
                            >
                                {pNum}
                            </button>
                        )
                    })}
                    <button 
                        onClick={() => handlePageChange(page + 1)} 
                        disabled={page === pagination.pages}
                        className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default Product;