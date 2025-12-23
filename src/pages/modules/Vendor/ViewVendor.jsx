import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorById, toggleVendorStatus } from "../../../redux/slices/vendorSlice";
import Header2 from "../../../components/superAdmin/header/Header2";
import { FiPhone } from "react-icons/fi";
import { Eye } from "lucide-react";
import CompanyIcon from "../../../assets/company.svg";
import AddressIcon from "../../../assets/Location.svg";

const VendorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { current: vendor, loading } = useSelector((s) => s.vendor);

  /* -------------------- FETCH VENDOR (REDUX) -------------------- */
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/");
      return;
    }
    dispatch(fetchVendorById(id));
  }, [dispatch, id, navigate]);

  const handleToggleStatus = async () => {
    try {
      await dispatch(toggleVendorStatus(id)).unwrap();
    } catch {
      alert("Failed to update status");
    }
  };

  /* -------------------- DUMMY DATA (SAFE) -------------------- */
  const stats = [
    { title: "Total Leads Handled", value: "8,478", bg: "bg-indigo-100", text: "text-indigo-600", icon: "📊" },
    { title: "Ongoing Leads", value: "234", bg: "bg-yellow-100", text: "text-yellow-600", icon: "⏳" },
    { title: "Leads Rejected", value: "34", bg: "bg-red-100", text: "text-red-600", icon: "✕" },
    { title: "Success Rate", value: "94 %", bg: "bg-green-100", text: "text-green-600", icon: "✅" },
  ];

  const leads = [
    { id: 1, leadId: "OD54487", name: "Kathryn Murphy", service: "RO Installation", model: "MG678", date: "21-10-2025", status: "Assigned" },
    { id: 2, leadId: "OD54487", name: "Courtney Henry", service: "Maintenance", model: "MG678", date: "21-10-2025", status: "Accepted" },
    { id: 3, leadId: "OD54487", name: "Darlene Robertson", service: "Repair", model: "MG678", date: "21-10-2025", status: "In-progress" },
    { id: 4, leadId: "OD54487", name: "Savannah Nguyen", service: "Maintenance", model: "MG678", date: "21-10-2025", status: "Completed" },
  ];

  if (loading || !vendor) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header2 />
        <div className="p-12 text-center text-xl">Loading Vendor Data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 space-y-6">
      <Header2 title="Vendor Details" />

      {/* =================== DETAILS CARD =================== */}
      <div className="bg-white rounded-lg p-6 space-y-6">

        <div className="flex justify-between items-start">
          <h2 className="text-3xl font-bold text-[#263138]">{vendor.name}</h2>

          <div className="flex items-center gap-3">
            <span className="font-medium">Active Status</span>
            <label className="relative inline-flex cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={vendor.status === "active"}
                onChange={handleToggleStatus}
              />
              <div className="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-green-500"></div>
              <div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition peer-checked:translate-x-7"></div>
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Address */}
          <div>
            <div className="flex items-center gap-2 font-medium">
              <img src={AddressIcon} className="w-5" />
              Address
            </div>
            <p className="text-[#7EC1B1] mt-1">{vendor.address}</p>

            <iframe
              className="mt-4 h-60 w-full rounded-lg border"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(vendor.address)}&z=15&output=embed`}
              loading="lazy"
            />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 font-medium">
                <img src={CompanyIcon} className="w-5" />
                Company
              </div>
              <p className="text-[#7EC1B1]">{vendor.companyName}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 font-medium">
                <FiPhone />
                Phone No.
              </div>
              <p className="text-[#7EC1B1]">{vendor.mobile || vendor.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* =================== STATS =================== */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#F4FAF8] rounded-xl p-4 flex justify-between items-center shadow-sm">
            <div>
              <p className="text-gray-500">{s.title}</p>
              <p className="text-2xl font-bold">{s.value}</p>
            </div>
            <div className={`w-12 h-12 flex items-center justify-center rounded-full ${s.bg} ${s.text}`}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* =================== ASSIGNED LEADS =================== */}
      <h3 className="text-xl font-semibold text-[#263138]">Assigned Leads</h3>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {/* Controls */}
        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
          <div>
            Show
            <select className="mx-2 border rounded px-2 py-1">
              <option>10</option>
            </select>
            Entries
          </div>

          <div className="flex gap-3">
            <input className="border rounded px-3 py-1" placeholder="Search" />
            <select className="border rounded px-3 py-1">
              <option>Select Status</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="border border-gray-100 rounded-md overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-center font-medium">
                <th className="p-3">Sr.No.</th>
                <th className="p-3">Lead ID</th>
                <th className="p-3">Customer Name</th>
                <th className="p-3">Service Type</th>
                <th className="p-3">Product Model</th>
                <th className="p-3">Order Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((l, i) => (
                <tr key={l.id} className="border-b border-gray-100 text-center">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">{l.leadId}</td>
                  <td className="p-3">{l.name}</td>
                  <td className="p-3">{l.service}</td>
                  <td className="p-3">{l.model}</td>
                  <td className="p-3">{l.date}</td>
                  <td className="p-3 font-medium text-[#7EC1B1]">{l.status}</td>
                  <td className="p-3 flex justify-center">
                    <Eye className="text-blue-500 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <span>Showing 1 to 10 of 30 Entries</span>
          <div className="flex gap-2">
            <button className="border px-3 py-1 rounded">Previous</button>
            <button className="bg-[#7EC1B1] text-white px-3 py-1 rounded">1</button>
            <button className="border px-3 py-1 rounded">2</button>
            <button className="border px-3 py-1 rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;
