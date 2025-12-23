// src/pages/vendor/EditVendor.jsx - FINAL VERIFIED CODE

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorById, updateVendor } from "../../../redux/slices/vendorSlice";
import Header2 from "../../../components/superAdmin/header/Header2";

const EditVendor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { current, loading: isBusy } = useSelector((s) => s.vendor);
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    mobile: "",
    address: "",
    email: "",
    password: "", // Kept for API, but only send if not empty
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/");
      return;
    }
    dispatch(fetchVendorById(id));
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (current?._id === id) {
      const { name, companyName, mobile, phone, address, email } = current;
      setFormData({ name, companyName, mobile: mobile || phone, address, email, password: "" });
    }
  }, [current, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    // Only send fields required by the update API
    const payload = {
        name: formData.name,
        mobile: formData.mobile,
        companyName: formData.companyName,
        address: formData.address,
        email: formData.email
    };
    // Only include the password if the user has typed a new one
    if (formData.password) {
        payload.password = formData.password;
    }

    try {
      await dispatch(updateVendor({ id, data: payload })).unwrap();
      alert("Vendor updated successfully!");
      navigate("/vendors");
    } catch (err) {
      console.error("Update failed:", err);
      setError(err?.message || "Update failed.");
    }
  };
  
  if (isBusy && !formData.name) return <div className="p-6 text-center">Loading...</div>

  return (
    <div className="bg-gray-100 min-h-screen w-full p-4 sm:p-6 flex flex-col">
      <Header2 />
      <div className="bg-white p-8 rounded-2xl shadow-md w-full h-full mt-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Edit Vendor Details</h2>
        <hr className="border-gray-300 mb-6" />
        <form onSubmit={handleUpdate} className="flex flex-col gap-6 w-full">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border" />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Company</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full p-3 border" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Phone No.</label>
              <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full p-3 border" />
            </div>
             <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-3 border" />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">New Password (optional)</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Leave blank to keep current password" className="w-full p-3 border" />
            </div>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="flex justify-center pt-4">
          <button type="submit" disabled={isBusy} className="bg-[#7EC1B1] text-white font-medium px-20 py-2 hover:bg-[#65a89d] transition disabled:bg-gray-400">
              {isBusy ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVendor;