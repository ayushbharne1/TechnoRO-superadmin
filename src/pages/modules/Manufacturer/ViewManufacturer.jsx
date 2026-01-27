import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchManufacturerById,
  toggleManufacturerStatus,
  toggleManufacturerVerification,
} from "../../../redux/slices/manufacturerSlice";
import Header2 from "../../../components/superAdmin/header/Header2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Eye, CheckCircle, XCircle } from "lucide-react";

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
  const { current: manufacturer, loading } = useSelector(
    (s) => s.manufacturer
  );

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
    // action should be 'verified' or 'unverified' (backend uses verificationStatus)
    const actionText = action === "verified" ? "verify" : "mark as unverified";
    if (!window.confirm(`Are you sure you want to ${actionText} this manufacturer's verification?`)) {
      return;
    }

    try {
      await dispatch(toggleManufacturerVerification({ id, action })).unwrap();
      alert(`Manufacturer verification ${action === "verified" ? "verified" : "set to unverified"} successfully!`);
      dispatch(fetchManufacturerById(id)); // Refresh the data
    } catch (error) {
      // show full error payload if message missing to help debugging
      const msg =
        (error && (error.message || error.msg || error.error)) ||
        (typeof error === "string" ? error : null) ||
        JSON.stringify(error) ||
        "Failed to update verification status";
      alert(msg);
    }
  }; 

  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  if (loading || !manufacturer) {
    return (
      <div className="bg-white min-h-screen">
        <Header2 />
        <div className="text-center py-20 text-xl">
          Loading Manufacturer Details...
        </div>
      </div>
    );
  }

  // Filter orders by search query (orderId, customer, product, status)
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
      <Header2 />

      {/* Details Card */}
      <div className="bg-white rounded-lg p-6 space-y-6">
        {/* Title + Status */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#263138]">
              {manufacturer.name}
            </h2>
            <div className="mt-2">
              <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${
                manufacturer.isAccountVerified 
                  ? "bg-green-100 text-green-700" 
                  : "bg-yellow-100 text-yellow-700"
              }`}>
                {manufacturer.isAccountVerified ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Account Verified
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    Account Not Verified
                  </>
                )}
              </span>
            </div>
          </div>

          <div>
            <div className="font-medium text-[#263138]">Active Status</div>
            <label className="relative inline-flex items-center cursor-pointer mt-2">
              <input
                type="checkbox"
                className="sr-only"
                checked={manufacturer.status === "active"}
                onChange={handleToggleStatus}
              />
              <span
                className={`w-14 h-6 rounded-full transition ${
                  manufacturer.status === "active"
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              />
              <span
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  manufacturer.status === "active" ? "translate-x-8" : ""
                }`}
              />
            </label>
          </div>
        </div>

        {/* Address + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map */}
          <div>
            <div className="text-gray-500 mb-1">📍 Address</div>
            <div className="text-[#7EC1B1] mb-4">
              {manufacturer.address}
            </div>

            <MapContainer
              center={[35.5, -105.5]}
              zoom={13}
              style={{ height: 360, borderRadius: 8 }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[35.5, -105.5]} icon={markerIcon}>
                <Popup>
                  <strong>{manufacturer.name}</strong>
                  <br />
                  {manufacturer.address}
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Details */}
          <div className="bg-white rounded-lg p-6 space-y-3">
            <div>📞 Phone: <span className="text-[#7EC1B1]">{manufacturer.phone}</span></div>
            <div>📧 Email: <span className="text-[#7EC1B1]">{manufacturer.email}</span></div>
            <div>🪪 Aadhaar: <span className="text-[#7EC1B1]">{manufacturer.aadharNo}</span></div>
            <div>🧾 PAN: <span className="text-[#7EC1B1]">{manufacturer.panNo}</span></div>
            <div>🏢 GSTIN: <span className="text-[#7EC1B1]">{manufacturer.gst}</span></div>

            <div className="pt-4">
              <div>🏦 Bank Name: <span className="text-[#7EC1B1]">{manufacturer.bankDetails?.bankName}</span></div>
              <div>Account No: <span className="text-[#7EC1B1]">{manufacturer.bankDetails?.accountNumber}</span></div>
              <div>IFSC: <span className="text-[#7EC1B1]">{manufacturer.bankDetails?.ifscCode}</span></div>
              <div>Account Type: <span className="text-[#7EC1B1]">{manufacturer.bankDetails?.accountType}</span></div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-[#F4FAF8] rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <div className="text-sm text-gray-500">{s.label}</div>
                <div className="text-2xl font-bold">{s.value}</div>
              </div>
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full ${s.bg} ${s.text}`}
              >
                {s.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Assigned Orders */}
        <h3 className="text-xl font-semibold text-[#263138]">
          Assigned Orders
        </h3>

        {/* Orders Container */}
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
                onChange={e => setOrderSearch(e.target.value)}
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
                    <td className="p-3 font-medium text-blue-600">{o.status}</td>
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
              <button className="px-3 py-1 bg-[#7EC1B1] text-white rounded">
                1
              </button>
              <button className="px-3 py-1 border rounded">2</button>
              <button className="px-3 py-1 border rounded">Next</button>
            </div>
          </div>
        </div>

        {/* Verification Buttons - Show only if not verified */}
        {!manufacturer.isAccountVerified && (
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
    </div>
  );
};

export default ViewManufacturer;