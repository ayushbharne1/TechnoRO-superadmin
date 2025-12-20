// src/pages/manufacturer/ViewManufacturer.jsx - VERIFIED AND CORRECTED

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header2 from "../../../components/superAdmin/header/Header2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// ... other image imports remain the same

const API_URL = "https://ro-service-engineer-be.onrender.com/api/admin/manufacturer";

const ViewManufacturer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manufacturer, setManufacturer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // ... your other states for orders table can remain as is ...

  useEffect(() => {
    const fetchDetails = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/");
        return;
      }
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/details/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          setManufacturer(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch manufacturer details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id, navigate]);

  const handleToggleStatus = async () => {
    const token = localStorage.getItem("adminToken");
    const originalStatus = manufacturer.status;
    
    // Optimistic UI update for better UX
    setManufacturer(prev => ({ ...prev, status: prev.status === 'active' ? 'inactive' : 'active' }));

    try {
      await axios.patch(`${API_URL}/toggle-status/${id}`, {}, {
         headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Failed to toggle status:", error);
      alert("Failed to update status.");
      // Revert UI on failure
      setManufacturer(prev => ({ ...prev, status: originalStatus }));
    }
  };

  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
  });

  if (isLoading || !manufacturer) {
    return (
      <div className="bg-gray-100 p-4 min-h-screen">
        <Header2 />
        <div className="text-center p-12 text-xl">Loading Manufacturer Details...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-4 min-h-screen">
      <Header2 />
      <div className="bg-white p-6 rounded-lg mt-6">
        <div className="w-full flex items-center justify-between mb-4">
          <h2 className="text-4xl font-bold text-[#263138]">{manufacturer.name}</h2>
          <div>
            <div className="text-xl font-medium text-[#263138]">Active Status</div>
            <div className="mt-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={manufacturer.status === 'active'}
                  onChange={handleToggleStatus}
                />
                <span className={`block w-14 h-6 rounded-full transition-colors duration-200 ${manufacturer.status === 'active' ? "bg-[#3A953A]" : "bg-gray-300"}`} />
                <span className={`absolute top-0.5 left-0 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 transform ${manufacturer.status === 'active' ? "translate-x-8" : "translate-x-0"}`} style={{ boxShadow: "1px 0px 2px rgba(0,0,0,0.25)" }} />
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-gray-600">📍 Address</div>
            <div className="text-[#7EC1B1] mb-4">{manufacturer.address}</div>
            <MapContainer center={[35.5007, -105.5007]} zoom={13} scrollWheelZoom={false} style={{ height: "360px", width: "100%", borderRadius: "8px" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors' />
              <Marker position={[35.5007, -105.5007]} icon={markerIcon}>
                <Popup>
                  <div className="font-semibold">{manufacturer.name}</div>
                  <div className="text-sm">{manufacturer.address}</div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          <div className="bg-white p-6 rounded-lg" style={{ height: "560px" }}>
            <div className="flex flex-col gap-4">
              {/* All these fields will now correctly display API data */}
               <div className="text-xl">Phone No: <span className="text-[#7EC1B1]">{manufacturer.mobile}</span></div>
               <div className="text-xl">Email: <span className="text-[#7EC1B1]">{manufacturer.email}</span></div>
               <div className="text-xl">Aadhaar No: <span className="text-[#7EC1B1]">{manufacturer.aadhaar}</span></div>
               <div className="text-xl">PAN No.: <span className="text-[#7EC1B1]">{manufacturer.pan}</span></div>
               <div className="text-xl">GSTIN: <span className="text-[#7EC1B1]">{manufacturer.gst}</span></div>
               <div className="mt-4">
                  <div className="text-lg">Bank Name: <span className="text-[#7EC1B1]">{manufacturer.bankDetails?.bankName}</span></div>
                  <div className="text-lg">Account No: <span className="text-[#7EC1B1]">{manufacturer.bankDetails?.accountNumber}</span></div>
                  <div className="text-lg">IFSC: <span className="text-[#7EC1B1]">{manufacturer.bankDetails?.ifscCode}</span></div>
                  <div className="text-lg">Account Type: <span className="text-[#7EC1B1]">{manufacturer.bankDetails?.accountType}</span></div>
               </div>
            </div>
          </div>
        </div>
        {/* The rest of the orders table JSX remains the same */}
      </div>
    </div>
  );
};
export default ViewManufacturer;