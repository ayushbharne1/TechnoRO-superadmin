import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchManufacturerById,
  toggleManufacturerStatus,
} from "../../../redux/slices/manufacturerSlice";
import Header2 from "../../../components/superAdmin/header/Header2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

  return (
    <div className="bg-white min-h-screen">
      <Header2 />

      <div className="p-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-3">
          Manufacturer &gt;{" "}
          <span className="text-blue-600 font-medium">
            Manufacturer Details
          </span>
        </div>

        {/* Title + Status */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[#263138]">
            {manufacturer.name}
          </h2>

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
        <h3 className="text-xl font-semibold text-[#263138] mb-3">
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
              />
              <select className="border border-gray-300 rounded px-3 py-1">
                <option>Select Status</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-md">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-3 text-center">Sr.No.</th>
                  <th className="p-3 text-center">Order ID</th>
                  <th className="p-3 text-center">Customer Name</th>
                  <th className="p-3 text-center">Product Ordered</th>
                  <th className="p-3 text-center">Order Date</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o, idx) => (
                  <tr key={o.id} className="border-b last:border-b-0">
                    <td className="p-3 text-center">{idx + 1}</td>
                    <td className="p-3 text-center">{o.orderId}</td>
                    <td className="p-3 text-center">{o.customer}</td>
                    <td className="p-3 text-center">{o.product}</td>
                    <td className="p-3 text-center">{o.date}</td>
                    <td className="p-3 text-center font-medium text-blue-600">
                      {o.status}
                    </td>
                    <td className="p-3 text-center cursor-pointer text-blue-600">
                      👁
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
      </div>
    </div>
  );
};

export default ViewManufacturer;
