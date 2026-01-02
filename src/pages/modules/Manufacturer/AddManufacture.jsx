import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addManufacturer } from "../../../redux/slices/manufacturerSlice";
import Header2 from "../../../components/superAdmin/header/Header2";
import bankIcon from "../../../assets/proicons_bank.png";

const AddManufacturer = () => {
  const dispatch = useDispatch();
  const { loading: isSubmitting } = useSelector((s) => s.manufacturer);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    aadhaar: "", // The form state can keep this name
    pan: "",       // The form state can keep this name
    gst: "",
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountType: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Extract a readable error message from common Axios/backend shapes
  const extractErrorMessage = (err) => {
    const res = err?.response?.data;
    if (res?.errors && Array.isArray(res.errors)) {
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
    if (!formData.name.trim()) msgs.push("Manufacturer Name is required");
    if (!formData.phone.trim()) msgs.push("Phone number is required");
    if (!/^[0-9]{10,13}$/.test(formData.phone.trim())) msgs.push("Phone number must be 10-13 digits");
    if (!formData.email.trim()) msgs.push("Email is required");
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) msgs.push("Enter a valid email address");
    if (!formData.password.trim()) msgs.push("Password is required");
    if (formData.password && formData.password.trim().length < 6) msgs.push("Password must be at least 6 characters");
    if (!formData.address.trim()) msgs.push("Address is required");
    if (formData.aadhaar && !/^\d{12}$/.test(formData.aadhaar.trim())) msgs.push("Aadhaar must be 12 digits");
    if (formData.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(formData.pan.trim())) msgs.push("Enter a valid PAN (e.g., ABCDE1234F)");
    if (formData.gst && formData.gst.trim().length !== 15) msgs.push("GSTIN must be 15 characters");
    return msgs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
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

    // CORRECTED: This payload now uses 'phone', 'aadharNo', and 'panNo' as required by the 'create' API.
    const bankDetails = {
      accountHolderName: formData.accountHolderName,
      bankName: formData.bankName,
      accountNumber: formData.accountNumber,
      ifscCode: formData.ifscCode,
      accountType: formData.accountType,
    };

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      aadharNo: formData.aadhaar,
      panNo: formData.pan,
      gst: formData.gst,
      bankDetails,
      address: formData.address,
    };

    setError("");

    try {
      await dispatch(addManufacturer(payload)).unwrap();
      alert("Manufacturer added successfully!");
      navigate("/manufacturer");
    } catch (err) {
      console.error("Failed to add manufacturer:", err);
      setError(extractErrorMessage(err));
    }
  };

  return (
    <div className="bg-white p-4 min-h-screen flex flex-col">
      <Header2 title="Add Manufacturer" />
      <div className="bg-white p-6 shadow-lg flex flex-col gap-8 w-full h-full">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">Manufacturer Name</label>
            <input type="text" name="name" placeholder="Enter Manufacturer Name" value={formData.name} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">Phone Number</label>
            <input type="text" name="phone" placeholder="Enter Phone Number" value={formData.phone} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 w-full">
           <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">Email</label>
            <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">Address</label>
            <input type="text" name="address" placeholder="Enter Address" value={formData.address} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">Aadhaar No.</label>
            <input type="text" name="aadhaar" placeholder="Enter Aadhaar No" value={formData.aadhaar} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">PAN No.</label>
            <input type="text" name="pan" placeholder="Enter PAN No." value={formData.pan} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">GSTIN</label>
            <input type="text" name="gst" placeholder="Enter GSTIN" value={formData.gst} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5] w-full" />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="p-3 border border-[#606060] bg-[#F5F5F5]"
            />
          </div>
        </div>
        
        <div className="mt-4"><h2 className="text-[#2F8868] font-semibold flex items-center gap-2"><img src={bankIcon} alt="bank" />Bank Details</h2></div>

        <div className="flex flex-col md:flex-row gap-6 w-full mt-2">
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">Select Bank</label>
            <select name="bankName" value={formData.bankName} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]">
              <option value="" disabled>Select Bank</option><option value="HDFC Bank">HDFC Bank</option><option value="SBI">SBI</option><option value="ICICI">ICICI</option><option value="Axis Bank">Axis Bank</option>
            </select>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">Account No</label>
            <input type="text" name="accountNumber" placeholder="Enter Account No" value={formData.accountNumber} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">Account Holder Name</label>
            <input type="text" name="accountHolderName" placeholder="Enter Account Holder Name" value={formData.accountHolderName} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 w-full mt-4">
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">IFSC</label>
            <input type="text" name="ifscCode" placeholder="Enter IFSC Code" value={formData.ifscCode} onChange={handleChange} className="p-3 border border-[#606060] bg-[#F5F5F5]" />
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
          <button onClick={handleAdd} disabled={isSubmitting} className="bg-[#7EC1B1] text-white font-poppins font-semibold px-6 py-3 rounded-lg hover:bg-[#65a89d] transition w-full md:w-1/8 disabled:bg-gray-400">
            {isSubmitting ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddManufacturer;