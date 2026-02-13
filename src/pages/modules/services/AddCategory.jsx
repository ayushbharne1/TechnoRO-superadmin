import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header2 from "../../../components/superAdmin/header/Header2";
import EditIcon from "../../../assets/edit1.svg";
import Deleteicon from "../../../assets/delete.svg";
import { toast } from "react-toastify";
import {
  fetchAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  clearMessages,
} from "../../../redux/slices/CategorySlice";

const AddCategory = () => {
  const dispatch = useDispatch();
  const { categories, loading, error, success } = useSelector(
    (state) => state.category
  );

  const [categoryName, setCategoryName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  // Handle success and error messages
  useEffect(() => {
    if (success) {
      // toast.success(success);
      dispatch(clearMessages());
    }
    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
  }, [success, error, dispatch]);

  // Handle adding new category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (categoryName.trim() === "") {
      toast.warn("Please enter a category name");
      return;
    }

    await dispatch(createCategory({ name: categoryName }));
    toast.success("Category added successfully");
    setCategoryName("");
  };

  // Handle edit button click
  const handleEditClick = (category) => {
    setEditingId(category._id);
    setEditingName(category.name);
  };

  // Handle save edit
  const handleSaveEdit = async (id) => {
    if (editingName.trim() === "") {
      toast.warn("Category name cannot be empty");
      return;
    }

    await dispatch(updateCategory({ id, categoryData: { name: editingName } }));
    setEditingId(null);
    setEditingName("");
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  // Handle delete category
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <div className="bg-white p-4 h-full overflow-y-auto flex flex-col gap-6">
      <Header2 />

      <div className="bg-white">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 font-poppins">
          Manage Categories
        </h2>

        {/* Add Category Form */}
        <form
          onSubmit={handleAddCategory}
          className="mb-8 bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-200"
        >
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 font-poppins">
            Add New Category
          </h3>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="flex-1 p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] bg-white"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-6 py-2 md:py-3 bg-[#7EC1B1] text-white rounded-lg font-poppins text-base hover:bg-[#6db09f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding..." : "Add Category"}
            </button>
          </div>
        </form>

        {/* Categories List */}
        <div className="bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 font-poppins">
            All Categories ({categories.length})
          </h3>

          {loading && categories.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Loading categories...</p>
          ) : categories.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No categories added yet. Add your first category above.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto w-full min-w-150 border border-gray-300 md:min-w-full">
                <thead className="hidden md:table-header-group">
                  <tr className="bg-gray-100 text-center text-sm md:text-base">
                    <th className="p-2 md:p-3 font-poppins font-medium border-b border-gray-300">
                      Sr. No.
                    </th>
                    <th className="p-2 md:p-3 font-poppins font-medium border-b border-gray-300">
                      Category Name
                    </th>
                    {/* <th className="p-2 md:p-3 font-poppins font-medium border-b border-gray-300">
                      Status
                    </th> */}
                    <th className="p-2 md:p-3 font-poppins font-medium border-b border-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center text-sm md:text-base">
                  {categories.map((category, index) => (
                    <tr
                      key={category._id}
                      className="bg-white text-black block md:table-row mb-4 md:mb-0 p-2 md:p-0 rounded-lg shadow md:shadow-none border-b border-gray-200"
                    >
                      <td className="p-2 md:p-3 block md:table-cell text-left md:text-center">
                        <span className="md:hidden font-semibold">
                          Sr. No.:{" "}
                        </span>
                        {index + 1}
                      </td>

                      <td className="p-2 md:p-3 block md:table-cell text-left md:text-center">
                        <span className="md:hidden font-semibold">
                          Category:{" "}
                        </span>
                        {editingId === category._id ? (
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="w-full md:w-auto px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
                            autoFocus
                          />
                        ) : (
                          <span className="font-medium">{category.name}</span>
                        )}
                      </td>

                      {/* <td className="p-2 md:p-3 block md:table-cell text-left md:text-center">
                        <span className="md:hidden font-semibold">
                          Status:{" "}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            category.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {category.isActive ? "Active" : "Inactive"}
                        </span>
                      </td> */}

                      <td className="p-2 md:p-3 flex gap-2 justify-start md:justify-center flex-wrap">
                        <span className="md:hidden font-semibold">
                          Actions:{" "}
                        </span>
                        {editingId === category._id ? (
                          <>
                            <button
                              onClick={() => handleSaveEdit(category._id)}
                              disabled={loading}
                              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm disabled:opacity-50"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              disabled={loading}
                              className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors text-sm disabled:opacity-50"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="h-7.5 w-7.5 md:h-9 md:w-9 flex items-center justify-center rounded">
                              <img
                                src={EditIcon}
                                onClick={() => handleEditClick(category)}
                                alt="edit"
                                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer hover:opacity-70"
                              />
                            </div>
                            <div className="h-7.5 w-7.5 md:h-9 md:w-9 flex items-center justify-center rounded">
                              <img
                                src={Deleteicon}
                                onClick={() => handleDelete(category._id)}
                                alt="delete"
                                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer hover:opacity-70"
                              />
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCategory;