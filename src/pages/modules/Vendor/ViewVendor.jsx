// src/pages/vendor/VendorDetails.jsx - FINAL VERIFIED CODE

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// ... other imports ...
import Header2 from "../../../components/superAdmin/header/Header2";
import { FiPhone } from "react-icons/fi";
import CompanyIcon from "../../../assets/company.svg";
import AddressIcon from "../../../assets/Location.svg";

const API_URL = "https://ro-service-engineer-be.onrender.com/api/admin/vendor";

const VendorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // ... your states for leads table can remain ...

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/");
      return;
    }
    const fetchVendorDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setVendor(response.data.data);
        } else {
           navigate("/vendors"); // If vendor not found, go back
        }
      } catch (err) {
        console.error("Failed to fetch vendor:", err);
        navigate("/vendors");
      } finally {
        setIsLoading(false);
      }
    };
    fetchVendorDetails();
  }, [id, navigate]);

  const handleToggleStatus = async () => {
    const token = localStorage.getItem("adminToken");
    const originalStatus = vendor.status;
    setVendor(prev => ({ ...prev, status: prev.status === 'active' ? 'inactive' : 'active' }));
    try {
      await axios.patch(`${API_URL}/toggle-status/${id}`, {}, {
         headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Failed to toggle status:", error);
      alert("Failed to update status.");
      setVendor(prev => ({ ...prev, status: originalStatus }));
    }
  };

  if (isLoading || !vendor) {
    return (
      <div className="bg-gray-100 min-h-screen p-4">
        <Header2 />
        <div className="text-center p-12 text-xl">Loading Vendor Data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex flex-col gap-6">
      <Header2 />
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h2 className="text-xl font-semibold text-[#263138] mb-4 sm:mb-0">{vendor.name}</h2>
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Active Status</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={vendor.status === 'active'}
                onChange={handleToggleStatus}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5EC87E]"></div>
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <div className="flex items-center mb-1">
              <img src={AddressIcon} className="w-5 h-5 text-gray-500 mr-2" alt="Address Icon" />
              <span className="text-[#263138] font-medium">Address</span>
            </div>
            <p className="text-[#7EC1B1] font-medium mb-4">{vendor.address}</p>
            <iframe
              title="Vendor Location"
              className="h-60 w-full rounded-xl border border-gray-300"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(vendor.address)}&z=15&output=embed`}
              allowFullScreen loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-start space-y-6">
            <div>
              <div className="flex items-center mb-1">
                <img src={CompanyIcon} className="w-5 h-5 text-gray-500 mr-2" alt="Company Icon" />
                <span className="text-[#263138] font-medium">Company</span>
              </div>
              <p className="text-[#7EC1B1] font-semibold text-lg">{vendor.companyName}</p>
            </div>
            <div>
              <div className="flex items-center mb-1">
                <FiPhone className="text-gray-500 w-5 h-5 mr-2" />
                <span className="text-[#263138] font-medium">Phone No.</span>
              </div>
              <p className="text-[#7EC1B1] font-semibold text-lg">{vendor.mobile || vendor.phone}</p>
            </div>
          </div>
        </div>
      </div>
       {/* ... The rest of your JSX for stats and leads table ... */}
    </div>
  );
};

export default VendorDetails;