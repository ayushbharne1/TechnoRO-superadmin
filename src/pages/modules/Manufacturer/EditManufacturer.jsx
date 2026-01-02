import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchManufacturerById, updateManufacturer } from "../../../redux/slices/manufacturerSlice";
import Header2 from "../../../components/superAdmin/header/Header2";
import bankIcon from "../../../assets/proicons_bank.png";

const EditManufacturer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { current, loading: isBusy } = useSelector((s) => s.manufacturer);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    aadharNo: "",
    panNo: "",
    gst: "",
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountType: "",
  });
  const [error, setError] = useState("");

  // Extract a readable error message from common Axios/backend shapes
  const extractErrorMessage = (err) => {
    const res = err?.response?.data;
    if (res?.errors && Array.isArray(res.errors)) {
      return res.errors
        .map((e) => {
          if (typeof e === "string") return e;
          return e.field ? `${e.field}: ${e.message}` : e.message;
        })
        .filter(Boolean)
        .join("\n");
    }
    if (err?.errors && Array.isArray(err.errors)) {
      return err.errors
        .map((e) => {
          if (typeof e === "string") return e;
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

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/");
      return;
    }
    dispatch(fetchManufacturerById(id));
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (current?._id === id) {
      const { name, phone, address, email, aadharNo, panNo, gst, bankDetails } = current;
      setFormData({
        name: name || "",
        phone: phone || "",
        address: address || "",
        email: email || "",
        password: "",
        aadharNo: aadharNo || "",
        panNo: panNo || "",
        gst: gst || "",
        accountHolderName: bankDetails?.accountHolderName || "",
        bankName: bankDetails?.bankName || "",
        accountNumber: bankDetails?.accountNumber || "",
        ifscCode: bankDetails?.ifscCode || "",
        accountType: bankDetails?.accountType || "",
      });
    }
  }, [current, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    // Match API payload structure exactly
    // Build payload matching API and omit empty fields to avoid validation errors
    const base = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      aadharNo: formData.aadharNo,
      panNo: formData.panNo,
      gst: formData.gst,
      address: formData.address,
      password: formData.password,
    };

    const payload = Object.entries(base).reduce((acc, [k, v]) => {
      if (v !== undefined && v !== null && String(v).trim() !== "") acc[k] = v;
      return acc;
    }, {});

    const bankRaw = {
      accountHolderName: formData.accountHolderName,
      bankName: formData.bankName,
      accountNumber: formData.accountNumber,
      ifscCode: formData.ifscCode,
      accountType: formData.accountType,
    };
    const requiredBankFields = ["accountHolderName", "bankName", "accountNumber", "ifscCode"]; // accountType optional
    const hasRequiredBank = requiredBankFields.every((k) => {
      const v = bankRaw[k];
      return v !== undefined && v !== null && String(v).trim() !== "";
    });
    if (hasRequiredBank) {
      const cleanedBank = Object.entries(bankRaw).reduce((acc, [k, v]) => {
        if (v !== undefined && v !== null && String(v).trim() !== "") acc[k] = v;
        return acc;
      }, {});
      if (Object.keys(cleanedBank).length) payload.bankDetails = cleanedBank;
    }

    // Remove password if not provided or too short
    if (payload.password && String(payload.password).trim().length < 6) {
      setError("Password must be at least 6 characters if provided.");
      return;
    }
    if (!payload.password || String(payload.password).trim() === "") {
      delete payload.password;
    }

    setError("");

    try {
      await dispatch(updateManufacturer({ id, data: payload })).unwrap();
      alert("Manufacturer updated successfully!");
      navigate(`/manufacturer/viewmanufacturer/${id}`);
    } catch (err) {
      console.error("Failed to update manufacturer:", err);
      setError(extractErrorMessage(err));
    }
  };

  if (isBusy && !formData.name) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="bg-white p-4 min-h-screen flex flex-col">
      <Header2 title="Edit Manufacturer Details" />
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
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-poppins font-medium text-gray-700 text-[16px]">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-poppins font-medium text-gray-700 text-[16px]">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-poppins font-medium text-gray-700 text-[16px]">Aadhaar No.</label>
              <input type="text" name="aadharNo" value={formData.aadharNo} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-poppins font-medium text-gray-700 text-[16px]">PAN No.</label>
              <input type="text" name="panNo" value={formData.panNo} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-poppins font-medium text-gray-700 text-[16px]">GSTIN</label>
              <input type="text" name="gst" value={formData.gst} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5] w-full" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-poppins font-medium text-gray-700 text-[16px]">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                className="p-3 border border-[#606060] bg-[#F5F5F5]"
                placeholder="Enter new password (optional)"
              />
            </div>
          </div>
          <div className="mt-4"><h2 className="text-[#2F8868] font-semibold flex items-center gap-2"><img src={bankIcon} alt="bank"/>Bank Details</h2></div>
          <div className="flex flex-col md:flex-row gap-6 w-full mt-2">
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-poppins font-medium text-gray-700 text-[16px]">Account Holder Name</label>
              <input type="text" name="accountHolderName" placeholder="Enter Account Holder Name" value={formData.accountHolderName} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
            </div>
          </div>
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
                <option value="">Select</option>
                <option value="saving">Saving</option>
                <option value="current">Current</option>
              </select>
            </div>
          </div>
          {error && (
            <div className="rounded-md border border-red-300 bg-red-50 text-red-700 p-3">
              <div className="font-semibold">There was a problem</div>
              <pre className="whitespace-pre-wrap text-sm mt-1">{error}</pre>
            </div>
          )}
          <div className="flex justify-center w-full mt-6">
            <button type="submit" disabled={isBusy} className="bg-[#7EC1B1] text-white font-poppins font-semibold px-6 py-3 rounded-lg hover:bg-[#65a89d] transition w-full md:w-1/8 disabled:bg-gray-400">
              {isBusy ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditManufacturer;