import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addVendor } from "../../../redux/slices/vendorSlice";
import Header2 from "../../../components/superAdmin/header/Header2";

const AddVendor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading: isLoading, error: reduxError } = useSelector((s) => s.vendor);
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  
  // Extract a readable error message from common Axios/backend shapes
  const extractErrorMessage = (err) => {
    const res = err?.response?.data;
    if (res?.errors && Array.isArray(res.errors)) {
      // Join multiple validation errors
      return res.errors
        .map((e) => {
          if (typeof e === 'string') return e;
          return e.field ? `${e.field}: ${e.message}` : e.message;
        })
        .filter(Boolean)
        .join("\n");
    }
    if (err?.errors && Array.isArray(err.errors)) {
      return err.errors
        .map((e) => {
          if (typeof e === 'string') return e;
          return e.field ? `${e.field}: ${e.message}` : e.message;
        })
        .filter(Boolean)
        .join("\n");
    }
    if (typeof res?.message === "string" && res.message.trim()) return res.message;
    if (typeof res?.error === "string" && res.error.trim()) return res.error;
    if (typeof res === "string" && res.trim()) return res;
    return err?.message || "An error occurred. Please check all fields.";
  };

  // Basic client-side validation to surface immediate input issues
  const validate = () => {
    const msgs = [];
    if (!formData.name.trim()) msgs.push("Full Name is required");
    if (!formData.companyName.trim()) msgs.push("Company is required");
    if (!formData.phone.trim()) msgs.push("Phone number is required");
    if (!/^[0-9]{10,13}$/.test(formData.phone.trim())) msgs.push("Phone number must be 10-13 digits");
    if (!formData.email.trim()) msgs.push("Email is required");
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) msgs.push("Enter a valid email address");
    if (!formData.address.trim()) msgs.push("Address is required");
    if (!formData.password.trim()) msgs.push("Password is required");
    if (formData.password.length < 6) msgs.push("Password must be at least 6 characters");
    return msgs;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/");
      return;
    }
    const validationErrors = validate();
    if (validationErrors.length) {
      setError(validationErrors.join("\n"));
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
    setError("");
    try {
      await dispatch(addVendor(payload)).unwrap();
      alert("Vendor added successfully!");
      navigate("/vendors");
    } catch (err) {
      console.error("Failed to add vendor:", err);
      setError(extractErrorMessage(err));
    }
  };

  return (
    <div className="bg-white p-4 min-h-screen flex flex-col">
      <Header2 />
      <div className="bg-white p-6 shadow-lg flex flex-col gap-8 w-full h-full">
        {error && (
          <div className="rounded-md border border-red-300 bg-red-50 text-red-700 p-3">
            <div className="font-semibold">There was a problem</div>
            <pre className="whitespace-pre-wrap text-sm mt-1">{error}</pre>
          </div>
        )}
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