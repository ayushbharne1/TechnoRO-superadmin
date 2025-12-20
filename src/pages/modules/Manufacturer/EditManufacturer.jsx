// src/pages/manufacturer/EditManufacturer.jsx - VERIFIED AND CORRECTED

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header2 from "../../../components/superAdmin/header/Header2";
import bankIcon from "../../../assets/proicons_bank.png";

const API_URL = "https://ro-service-engineer-be.onrender.com/api/admin/manufacturer";

const EditManufacturer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", companyName: "", mobile: "", address: "", email: "", aadhaar: "", pan: "", gst: "",
    bankName: "", accountNumber: "", ifscCode: "", accountType: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchManufacturerDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/details/${id}`, { // API to get details by ID
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          const { name, companyName, mobile, address, email, aadhaar, pan, gst, bankDetails } = response.data.data;
          // Flatten the API response to fit the form's state structure
          setFormData({
            name: name || "", companyName: companyName || "", mobile: mobile || "", address: address || "",
            email: email || "", aadhaar: aadhaar || "", pan: pan || "", gst: gst || "",
            bankName: bankDetails?.bankName || "", accountNumber: bankDetails?.accountNumber || "",
            ifscCode: bankDetails?.ifscCode || "", accountType: bankDetails?.accountType || ""
          });
        }
      } catch (err) {
        console.error("Failed to fetch manufacturer details:", err);
        setError("Could not load manufacturer data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchManufacturerDetails();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    // Re-nest the form data to match the API's expected payload structure
    const payload = {
      name: formData.name, mobile: formData.mobile, email: formData.email, companyName: formData.companyName,
      address: formData.address, gst: formData.gst, pan: formData.pan, aadhaar: formData.aadhaar,
      bankDetails: {
        bankName: formData.bankName, accountNumber: formData.accountNumber,
        ifscCode: formData.ifscCode, accountType: formData.accountType
      }
    };

    setIsLoading(true);
    setError("");

    try {
      await axios.put(`${API_URL}/update/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Manufacturer updated successfully!");
      navigate(`/manufacturer/viewmanufacturer/${id}`);
    } catch (err) {
      console.error("Failed to update manufacturer:", err);
      setError(err.response?.data?.message || "An error occurred during update.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !formData.name) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header2 />
      <div className="bg-white p-6 shadow-lg flex flex-col gap-8 w-full h-full">
        <form onSubmit={handleUpdate} className="flex flex-col gap-8 w-full">
          {/* All form fields are correctly mapped to the updated formData state */}
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-poppins font-medium text-gray-700 text-[16px]">Manufacturer Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-poppins font-medium text-gray-700 text-[16px]">Phone Number</label>
              <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 w-full">
             <div className="flex-1 flex flex-col gap-2">
              <label className="font-poppins font-medium text-gray-700 text-[16px]">Company Name</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-poppins font-medium text-gray-700 text-[16px]">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
          </div>
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-poppins font-medium text-gray-700 text-[16px]">Aadhaar No.</label>
              <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-poppins font-medium text-gray-700 text-[16px]">PAN No.</label>
              <input type="text" name="pan" value={formData.pan} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
            </div>
          </div>
           <div className="flex flex-col gap-2 w-full md:w-1/2 pr-0 md:pr-3">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">GSTIN</label>
            <input type="text" name="gst" value={formData.gst} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5] w-full" />
          </div>
          <div className="mt-4"><h2 className="text-[#2F8868] font-semibold flex items-center gap-2"><img src={bankIcon} alt="bank"/>Bank Details</h2></div>
          <div className="flex flex-col md:flex-row gap-6 w-full mt-2">
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-poppins font-medium text-gray-700 text-[16px]">Select Bank</label>
              <select name="bankName" value={formData.bankName} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]">
                <option value="">Select Bank</option><option value="HDFC Bank">HDFC Bank</option><option value="SBI">SBI</option><option value="ICICI">ICICI</option><option value="Axis Bank">Axis Bank</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-poppins font-medium text-gray-700 text-[16px]">Account No</label>
              <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 w-full mt-4">
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-poppins font-medium text-gray-700 text-[16px]">IFSC</label>
              <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-poppins font-medium text-gray-700 text-[16px]">Select Account Type</label>
              <select name="accountType" value={formData.accountType} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]">
                <option value="">Select</option><option value="savings">Savings</option><option value="current">Current</option>
              </select>
            </div>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="flex justify-center w-full mt-6">
            <button type="submit" disabled={isLoading} className="bg-[#7EC1B1] text-white font-poppins font-semibold px-6 py-3 rounded-lg hover:bg-[#65a89d] transition w-full md:w-1/8 disabled:bg-gray-400">
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditManufacturer;