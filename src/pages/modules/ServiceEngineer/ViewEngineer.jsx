import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getServiceEngineerById,
  toggleServiceEngineerVerification,
} from "../../../redux/slices/serviceEngineerSlice";
import Header2 from "../../../components/superAdmin/header/Header2";
import { FiPhone, FiMail, FiBriefcase, FiMapPin, FiFileText } from "react-icons/fi";
import { CheckCircle, Eye, XCircle, Clock, Download, ExternalLink, MapPin } from "lucide-react";
import AddressIcon from "../../../assets/Location.svg";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ViewEngineer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentEngineer: engineer, loading } = useSelector((s) => s.serviceEngineer);

  /* -------------------- FETCH ENGINEER (REDUX) -------------------- */
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/");
      return;
    }
    dispatch(getServiceEngineerById(id));
  }, [dispatch, id, navigate]);

  const handleVerification = async (action) => {
    const actionText = action === "verified" ? "verify" : "reject";

    const confirm = await Swal.fire({
      title: `Are you sure you want to ${actionText} this engineer?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do it!",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await dispatch(toggleServiceEngineerVerification({ id, action })).unwrap();

      toast.success(
        `Engineer verification ${
          action === "verified" ? "verified" : "rejected"
        } successfully!`
      );

      dispatch(getServiceEngineerById(id)); // refresh data
    } catch (error) {
      const msg =
        error?.message ||
        error?.msg ||
        error?.error ||
        "Failed to update verification status";

      toast.error(msg);
    }
  };

  /* -------------------- HELPER FUNCTIONS -------------------- */
  const displayValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return <span className="text-gray-400 italic">Info not available</span>;
    }
    return value;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Info not available";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
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

  if (loading || !engineer) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header2 />
        <div className="p-12 text-center text-xl">Loading Engineer Data...</div>
      </div>
    );
  }

  // Extract location data
  const location_data = engineer.location || {};
  const city = location_data.city || "N/A";
  const state = location_data.state || "N/A";
  const pincode = location_data.pincode || "N/A";
  const serviceRadius = location_data.serviceRadius || 0;
  const assignedArea = `${city}, ${state} - ${pincode}`;

  // Extract KYC data
  const kyc = engineer.kyc || {};
  const aadharNumber = kyc.aadharNumber || "N/A";
  const panNumber = kyc.panNumber || "N/A";

  // Extract Bank Details
  const bankDetails = engineer.bankDetails || {};
  const accountNumber = bankDetails.accountNumber || "N/A";
  const ifscCode = bankDetails.ifscCode || "N/A";
  const accountHolderName = bankDetails.accountHolderName || "N/A";

  // Other details
  const serviceTypes = engineer.serviceTypes || [];
  const experience = engineer.experience || 0;
  const otpVerified = engineer.otpVerified || false;

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 space-y-6">
      <Header2 title="Service Engineer Details" />

      {/* =================== BASIC INFO CARD =================== */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-[#263138]">{displayValue(engineer.name)}</h2>
            <p className="text-gray-500 mt-1">ID: {engineer._id || "N/A"}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${
                  engineer.verificationStatus === "verified"
                    ? "bg-green-100 text-green-700"
                    : engineer.verificationStatus === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {engineer.verificationStatus === "verified" ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Account Verified
                  </>
                ) : engineer.verificationStatus === "pending" ? (
                  <>
                    <Clock className="w-4 h-4" />
                    Pending Verification
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    Not Verified
                  </>
                )}
              </span>
              
              <span
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${
                  otpVerified ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                }`}
              >
                {otpVerified ? "OTP Verified" : "OTP Not Verified"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-medium">Active Status</span>
            <label className="relative inline-flex cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={engineer.isAccountVerified}
                disabled
              />
              <div className="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-green-500"></div>
              <div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition peer-checked:translate-x-7"></div>
            </label>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-3 gap-6 pt-4 border-t">
          <div>
            <div className="flex items-center gap-2 font-medium text-gray-700 mb-2">
              <FiPhone className="w-5 h-5" />
              Phone No.
            </div>
            <p className="text-[#7EC1B1]">+91 {displayValue(engineer.phone)}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 font-medium text-gray-700 mb-2">
              <FiBriefcase className="w-5 h-5" />
              Experience
            </div>
            <p className="text-[#7EC1B1]">
              {experience} {experience === 1 ? "year" : "years"}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 font-medium text-gray-700 mb-2">
              <MapPin className="w-5 h-5" />
              Service Radius
            </div>
            <p className="text-[#7EC1B1]">{serviceRadius} km</p>
          </div>
        </div>

        {/* Dates */}
        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
          <div>
            <div className="flex items-center gap-2 font-medium text-gray-700 mb-2">
              <Clock className="w-5 h-5" />
              Created At
            </div>
            <p className="text-gray-600">{formatDate(engineer.createdAt)}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 font-medium text-gray-700 mb-2">
              <Clock className="w-5 h-5" />
              Last Updated
            </div>
            <p className="text-gray-600">{formatDate(engineer.updatedAt)}</p>
          </div>
        </div>
      </div>

      {/* =================== SERVICE INFORMATION CARD =================== */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-xl font-bold text-[#263138] flex items-center gap-2">
          <FiBriefcase className="w-6 h-6" />
          Service Information
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="font-medium text-gray-700 mb-2">Experience (Years)</div>
            <p className="text-[#7EC1B1]">
              {experience ? `${experience} years` : displayValue(null)}
            </p>
          </div>

          <div>
            <div className="font-medium text-gray-700 mb-2">Service Radius</div>
            <p className="text-[#7EC1B1]">
              {serviceRadius ? `${serviceRadius} km` : displayValue(null)}
            </p>
          </div>
        </div>

        {/* Service Types */}
        <div className="pt-4 border-t">
          <div className="font-medium text-gray-700 mb-3">Service Types</div>
          {serviceTypes && serviceTypes.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {serviceTypes.map((service, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-[#F4FAF8] text-[#7EC1B1] rounded-full text-sm font-medium border border-[#7EC1B1]"
                >
                  {service}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic">No service types listed</p>
          )}
        </div>
      </div>

      {/* =================== ADDRESS INFO CARD =================== */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-xl font-bold text-[#263138] flex items-center gap-2">
          <img src={AddressIcon} className="w-6" alt="Address" />
          Location Information
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-medium text-gray-700 mb-2">City</div>
                <p className="text-[#7EC1B1]">{displayValue(city)}</p>
              </div>

              <div>
                <div className="font-medium text-gray-700 mb-2">State</div>
                <p className="text-[#7EC1B1] capitalize">{displayValue(state)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-medium text-gray-700 mb-2">Pin Code</div>
                <p className="text-[#7EC1B1]">{displayValue(pincode)}</p>
              </div>

              <div>
                <div className="font-medium text-gray-700 mb-2">Service Radius (km)</div>
                <p className="text-[#7EC1B1]">
                  {serviceRadius ? `${serviceRadius} km` : displayValue(null)}
                </p>
              </div>
            </div>

            <div>
              <div className="font-medium text-gray-700 mb-2">Assigned Area</div>
              <p className="text-[#7EC1B1]">{assignedArea}</p>
            </div>
          </div>

          {/* Map */}
          <div>
            {assignedArea ? (
              <iframe
                className="h-80 w-full rounded-lg border"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(assignedArea)}&z=12&output=embed`}
                loading="lazy"
                title="Engineer Location"
              />
            ) : (
              <div className="h-80 w-full rounded-lg border flex items-center justify-center bg-gray-50">
                <p className="text-gray-400">Map not available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =================== KYC DOCUMENTS CARD =================== */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-xl font-bold text-[#263138] flex items-center gap-2">
          <FiFileText className="w-6 h-6" />
          KYC Documents
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Aadhar Document */}
          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-800">Aadhar Card</h4>
              <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                KYC Document
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Aadhar Number</p>
              <p className="font-mono text-sm text-gray-800">
                {displayValue(aadharNumber)}
              </p>
            </div>
          </div>

          {/* PAN Document */}
          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-800">PAN Card</h4>
              <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                KYC Document
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">PAN Number</p>
              <p className="font-mono text-sm text-gray-800">
                {displayValue(panNumber)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =================== BANK DETAILS CARD =================== */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-xl font-bold text-[#263138] flex items-center gap-2">
          <FiFileText className="w-6 h-6" />
          Bank Details
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="font-medium text-gray-700 mb-2">Account Holder Name</div>
            <p className="text-[#7EC1B1]">{displayValue(accountHolderName)}</p>
          </div>

          <div>
            <div className="font-medium text-gray-700 mb-2">Account Number</div>
            <p className="text-[#7EC1B1] font-mono">{displayValue(accountNumber)}</p>
          </div>

          <div>
            <div className="font-medium text-gray-700 mb-2">IFSC Code</div>
            <p className="text-[#7EC1B1] font-mono">{displayValue(ifscCode)}</p>
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

      {/* =================== VERIFICATION BUTTONS =================== */}
      {engineer.verificationStatus === "pending" && (
        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            onClick={() => handleVerification("rejected")}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            <XCircle className="w-5 h-5" />
            Reject Verification
          </button>
          <button
            onClick={() => handleVerification("verified")}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            <CheckCircle className="w-5 h-5" />
            Verify Account
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewEngineer;