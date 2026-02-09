import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchManufacturerById,
  toggleManufacturerStatus,
  toggleManufacturerVerification,
} from "../../../redux/slices/manufacturerSlice";
import Header2 from "../../../components/superAdmin/header/Header2";
import { Eye, CheckCircle, XCircle, Clock, MapPin, Phone, Mail, CreditCard, Building2 } from "lucide-react";

/* -------------------- DUMMY DATA -------------------- */
const stats = [
  { label: "Total Order Handled", value: "8,478", bg: "bg-purple-100", text: "text-purple-600", icon: "✔" },
  { label: "Ongoing Orders", value: "234", bg: "bg-yellow-100", text: "text-yellow-600", icon: "…" },
  { label: "Orders Rejected", value: "34", bg: "bg-red-100", text: "text-red-600", icon: "✕" },
  { label: "Success Rate", value: "94%", bg: "bg-green-100", text: "text-green-600", icon: "◔" },
];

const orders = [
  { id: 1, orderId: "OD54487", customer: "Kathryn Murphy", product: "Kent Grand Plus RO", date: "21-10-2025", status: "Assigned" },
  { id: 2, orderId: "OD54487", customer: "Courtney Henry", product: "Kent Grand Plus RO", date: "21-10-2025", status: "Accepted" },
  { id: 3, orderId: "OD54487", customer: "Darlene Robertson", product: "Kent Grand Plus RO", date: "21-10-2025", status: "In-progress" },
  { id: 4, orderId: "OD54487", customer: "Savannah Nguyen", product: "Kent Grand Plus RO", date: "21-10-2025", status: "Delivered" },
  { id: 5, orderId: "OD54487", customer: "Annette Black", product: "Kent Grand Plus RO", date: "21-10-2025", status: "Delivered" },
];

/* -------------------- COMPONENT -------------------- */
const ViewManufacturer = () => {
  const [orderSearch, setOrderSearch] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { current: manufacturer, loading } = useSelector((s) => s.manufacturer);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/");
      return;
    }
    dispatch(fetchManufacturerById(id));
  }, [dispatch, id, navigate]);

  const handleToggleStatus = async () => {
    try {
      await dispatch(toggleManufacturerStatus(id)).unwrap();
    } catch {
      alert("Failed to update status");
      dispatch(fetchManufacturerById(id));
    }
  };

  const handleVerification = async (action) => {
    const actionText = action === "verified" ? "verify" : "mark as unverified";
    if (!window.confirm(`Are you sure you want to ${actionText} this manufacturer's verification?`)) {
      return;
    }

    try {
      await dispatch(toggleManufacturerVerification({ id, action })).unwrap();
      alert(`Manufacturer verification ${action === "verified" ? "verified" : "set to unverified"} successfully!`);
      dispatch(fetchManufacturerById(id));
    } catch (error) {
      const msg =
        (error && (error.message || error.msg || error.error)) ||
        (typeof error === "string" ? error : null) ||
        JSON.stringify(error) ||
        "Failed to update verification status";
      alert(msg);
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

  if (loading || !manufacturer) {
    return (
      <div className="bg-white min-h-screen">
        <Header2 />
        <div className="text-center py-20 text-xl">Loading Manufacturer Details...</div>
      </div>
    );
  }

  // Filter orders by search query
  const filteredOrders = orders.filter((o) => {
    const q = orderSearch.toLowerCase();
    return (
      o.orderId.toLowerCase().includes(q) ||
      o.customer.toLowerCase().includes(q) ||
      o.product.toLowerCase().includes(q) ||
      o.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 space-y-6">
      <Header2 title="Manufacturer Details" />

      {/* =================== BASIC INFO CARD =================== */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-[#263138]">{displayValue(manufacturer.name)}</h2>
            <p className="text-gray-500 mt-1">ID: {manufacturer._id || "N/A"}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${
                  manufacturer.verificationStatus === "verified"
                    ? "bg-green-100 text-green-700"
                    : manufacturer.verificationStatus === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {manufacturer.verificationStatus === "verified" ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Account Verified
                  </>
                ) : manufacturer.verificationStatus === "pending" ? (
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
                  manufacturer.isAccountVerified ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                }`}
              >
                {manufacturer.isAccountVerified ? "Account Verified" : "Account Not Verified"}
              </span>

              <span
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${
                  manufacturer.otpVerified ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                }`}
              >
                {manufacturer.otpVerified ? "OTP Verified" : "OTP Not Verified"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-medium">Active Status</span>
            <label className="relative inline-flex cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={manufacturer.status === "active"}
                onChange={handleToggleStatus}
              />
              <div className="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-green-500"></div>
              <div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition peer-checked:translate-x-7"></div>
            </label>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
          <div>
            <div className="flex items-center gap-2 font-medium text-gray-700 mb-2">
              <Mail className="w-5 h-5" />
              Email
            </div>
            <p className="text-[#7EC1B1]">{displayValue(manufacturer.email)}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 font-medium text-gray-700 mb-2">
              <Phone className="w-5 h-5" />
              Phone No.
            </div>
            <p className="text-[#7EC1B1]">{displayValue(manufacturer.phone)}</p>
          </div>
        </div>

        {/* Dates */}
        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
          <div>
            <div className="flex items-center gap-2 font-medium text-gray-700 mb-2">
              <Clock className="w-5 h-5" />
              Created At
            </div>
            <p className="text-gray-600">{formatDate(manufacturer.createdAt)}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 font-medium text-gray-700 mb-2">
              <Clock className="w-5 h-5" />
              Last Updated
            </div>
            <p className="text-gray-600">{formatDate(manufacturer.updatedAt)}</p>
          </div>
        </div>
      </div>

      {/* =================== BUSINESS DOCUMENTS CARD =================== */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-xl font-bold text-[#263138] flex items-center gap-2">
          <CreditCard className="w-6 h-6" />
          Business Documents
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Aadhar Document */}
          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-800">Aadhar Card</h4>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  manufacturer.businessDocuments?.aadhar?.verified
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {manufacturer.businessDocuments?.aadhar?.verified ? "Verified" : "Not Verified"}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Aadhar Number</p>
              <p className="font-mono text-sm text-gray-800">
                {displayValue(manufacturer.businessDocuments?.aadhar?.number)}
              </p>
            </div>

            {manufacturer.businessDocuments?.aadhar?.fileUrl ? (
              <div className="flex gap-2">
                <a
                  href={manufacturer.businessDocuments.aadhar.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition text-sm"
                >
                  <Eye className="w-4 h-4" />
                  View
                </a>
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No file uploaded</p>
            )}
          </div>

          {/* PAN Document */}
          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-800">PAN Card</h4>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  manufacturer.businessDocuments?.pan?.verified
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {manufacturer.businessDocuments?.pan?.verified ? "Verified" : "Not Verified"}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">PAN Number</p>
              <p className="font-mono text-sm text-gray-800">
                {displayValue(manufacturer.businessDocuments?.pan?.number)}
              </p>
            </div>

            {manufacturer.businessDocuments?.pan?.fileUrl ? (
              <div className="flex gap-2">
                <a
                  href={manufacturer.businessDocuments.pan.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition text-sm"
                >
                  <Eye className="w-4 h-4" />
                  View
                </a>
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No file uploaded</p>
            )}
          </div>

          {/* GST Document */}
          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-800">GST Certificate</h4>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  manufacturer.businessDocuments?.gst?.verified
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {manufacturer.businessDocuments?.gst?.verified ? "Verified" : "Not Verified"}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">GST Number</p>
              <p className="font-mono text-sm text-gray-800">
                {displayValue(manufacturer.businessDocuments?.gst?.number)}
              </p>
            </div>

            {manufacturer.businessDocuments?.gst?.fileUrl ? (
              <div className="flex gap-2">
                <a
                  href={manufacturer.businessDocuments.gst.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition text-sm"
                >
                  <Eye className="w-4 h-4" />
                  View
                </a>
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No file uploaded</p>
            )}
          </div>
        </div>
      </div>

      {/* =================== BANK DETAILS CARD =================== */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-xl font-bold text-[#263138] flex items-center gap-2">
          <Building2 className="w-6 h-6" />
          Bank Details
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="font-medium text-gray-700 mb-2">Account Holder Name</div>
            <p className="text-[#7EC1B1]">{displayValue(manufacturer.bankDetails?.accountHolderName)}</p>
          </div>

          <div>
            <div className="font-medium text-gray-700 mb-2">Bank Name</div>
            <p className="text-[#7EC1B1]">{displayValue(manufacturer.bankDetails?.bankName)}</p>
          </div>

          <div>
            <div className="font-medium text-gray-700 mb-2">Account Number</div>
            <p className="text-[#7EC1B1] font-mono">{displayValue(manufacturer.bankDetails?.accountNumber)}</p>
          </div>

          <div>
            <div className="font-medium text-gray-700 mb-2">IFSC Code</div>
            <p className="text-[#7EC1B1] font-mono">{displayValue(manufacturer.bankDetails?.ifscCode)}</p>
          </div>

          <div>
            <div className="font-medium text-gray-700 mb-2">Account Type</div>
            <p className="text-[#7EC1B1] capitalize">{displayValue(manufacturer.bankDetails?.accountType)}</p>
          </div>
        </div>
      </div>

      {/* =================== STATS =================== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#F4FAF8] rounded-lg p-4 flex justify-between items-center shadow-sm">
            <div>
              <div className="text-sm text-gray-500">{s.label}</div>
              <div className="text-2xl font-bold">{s.value}</div>
            </div>
            <div className={`w-12 h-12 flex items-center justify-center rounded-full ${s.bg} ${s.text}`}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* =================== ASSIGNED ORDERS =================== */}
      <h3 className="text-xl font-semibold text-[#263138]">Assigned Orders</h3>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {/* Controls */}
        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
          <div className="text-sm text-gray-600">
            Show{" "}
            <select className="border border-gray-300 rounded px-2 py-1 mx-1">
              <option>10</option>
            </select>{" "}
            Entries
          </div>

          <div className="flex gap-3">
            <input
              className="border border-gray-300 rounded px-3 py-1"
              placeholder="Search"
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
            />
            <select className="border border-gray-300 rounded px-3 py-1">
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
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer Name</th>
                <th className="p-3">Product Ordered</th>
                <th className="p-3">Order Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o, idx) => (
                <tr key={o.id} className="border-b border-gray-100 text-center">
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{o.orderId}</td>
                  <td className="p-3">{o.customer}</td>
                  <td className="p-3">{o.product}</td>
                  <td className="p-3">{o.date}</td>
                  <td className="p-3 font-medium text-[#7EC1B1]">{o.status}</td>
                  <td className="p-3 flex justify-center">
                    <Eye className="text-blue-500 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-between items-center mt-4 text-sm text-gray-600">
          <div>Showing 1 to 10 of 30 entries</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded">Previous</button>
            <button className="px-3 py-1 bg-[#7EC1B1] text-white rounded">1</button>
            <button className="px-3 py-1 border rounded">2</button>
            <button className="px-3 py-1 border rounded">Next</button>
          </div>
        </div>
      </div>

      {/* =================== VERIFICATION BUTTONS =================== */}
      {manufacturer.verificationStatus === "pending" && (
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

export default ViewManufacturer;