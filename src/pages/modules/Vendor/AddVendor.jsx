// src/pages/vendor/AddVendor.jsx - FINAL VERIFIED CODE

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header2 from "../../../components/superAdmin/header/Header2";

const API_URL = "https://ro-service-engineer-be.onrender.com/api/admin/vendor";

const AddVendor = () => {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/");
      return;
    }
    // The payload uses the exact field names required by the create API
    const payload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      companyName: formData.companyName,
      address: formData.address,
    };
    setIsLoading(true);
    setError("");
    try {
      await axios.post(API_URL, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Vendor added successfully!");
      navigate("/vendors");
    } catch (err) {
      console.error("Failed to add vendor:", err);
      setError(err.response?.data?.message || "An error occurred. Please check all fields.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header2 />
      <div className="bg-white p-6 shadow-lg flex flex-col gap-8 w-full h-full">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">Full Name</label>
            <input type="text" name="name" placeholder="Enter Full Name" value={formData.name} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">Company</label>
            <input type="text" name="companyName" placeholder="Enter Company Name" value={formData.companyName} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">Phone Number</label>
            <input type="text" name="phone" placeholder="Enter Phone Number" value={formData.phone} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">Email</label>
            <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">Address</label>
            <input type="text" name="address" placeholder="Enter Address" value={formData.address} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
          </div>
           <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">Password</label>
            <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
          </div>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <div className="flex justify-center w-full mt-6">
          <button onClick={handleAdd} disabled={isLoading} className="bg-[#7EC1B1] text-white font-poppins font-semibold px-6 py-3 rounded-lg hover:bg-[#65a89d] transition w-full md:w-1/8 disabled:bg-gray-400">
            {isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVendor;