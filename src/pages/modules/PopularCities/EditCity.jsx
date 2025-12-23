// Adding alert for these 
import React, { useState, useEffect } from "react";
import Header2 from "../../../components/superAdmin/header/Header2";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePopularCity } from "../../../redux/slices/popularCitiesSlice";
import Swal from "sweetalert2"; //  ADD THIS

const EditCity = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const cityData = location.state?.city || {};

  const [formData, setFormData] = useState({
    cityName: "",
    contactNumber: "",
    whatsappLink: "",
    contactEmail: "",
  });

  /* =========================
     Prefill form
  ========================= */
  useEffect(() => {
    if (cityData) {
      setFormData({
        cityName: cityData.cityName || "",
        contactNumber: cityData.contactNumber || "",
        whatsappLink: cityData.whatsappLink || "",
        contactEmail: cityData.contactEmail || "",
      });
    }
  }, [cityData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* =========================
     SUBMIT WITH CONFIRM
  ========================= */
  const handleSubmit = () => {
    Swal.fire({
      title: "Confirm Update",
      text: "Are you sure you want to update this city?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7EC1B1",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          updatePopularCity({
            id: cityData.id, // IMPORTANT
            cityName: formData.cityName,
            contactNumber: formData.contactNumber,
            contactEmail: formData.contactEmail,
            whatsappLink: formData.whatsappLink,
          })
        );

        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "City details updated successfully.",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/popular-cities");
      }
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header2 title="Edit City" />

      <div className="bg-white p-6 shadow-lg flex flex-col gap-8 w-full h-full">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-medium text-gray-700">City Name</label>
            <input
              name="cityName"
              type="text"
              value={formData.cityName}
              onChange={handleChange}
              className="p-3 border bg-[#F5F5F5]"
              required
            />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <label className="font-medium text-gray-700">
              Contact Number
            </label>
            <input
              name="contactNumber"
              type="text"
              value={formData.contactNumber}
              onChange={handleChange}
              className="p-3 border bg-[#F5F5F5]"
              required
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-medium text-gray-700">
              WhatsApp Link
            </label>
            <input
              name="whatsappLink"
              type="url"
              value={formData.whatsappLink}
              onChange={handleChange}
              className="p-3 border bg-[#F5F5F5]"
              required
            />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <label className="font-medium text-gray-700">
              Contact Email
            </label>
            <input
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleChange}
              className="p-3 border bg-[#F5F5F5]"
              required
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center w-full mt-6">
          <button
            onClick={handleSubmit}
            className="bg-[#7EC1B1] text-white px-6 py-3 rounded-lg hover:bg-[#65a89d]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCity;

// sir
// import React, { useState, useEffect } from "react";
// import Header2 from "../../../components/superAdmin/header/Header2";
// import { useNavigate, useLocation } from "react-router-dom";

// const EditCity = () => {
//   const navigate = useNavigate();
//   const location = useLocation(); // 👈 Get the route state
//   const cityData = location.state?.city || {}; // 👈 Access the data passed via navigate()

//   const [formData, setFormData] = useState({
//     cityName: "",
//     contactNumber: "",
//     whatsappLink: "",
//     contactEmail: "",
//   });

//   // Prefill data when editing
//   useEffect(() => {
//     if (cityData) {
//       setFormData({
//         cityName: cityData.cityName || "",
//         contactNumber: cityData.contactNumber || "",
//         whatsappLink: cityData.whatsappLink || "",
//         contactEmail: cityData.contactEmail || "",
//       });
//     }
//   }, [cityData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     console.log("City Updated:", formData);
//     navigate("/popular-cities");
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col">
//       {/* ✅ Fixed Header Title */}
//       <Header2 title="Edit City" />

//       {/* Form Section */}
//       <div className="bg-white p-6 shadow-lg flex flex-col gap-8 w-full h-full">
//         {/* Row 1: City Name & Contact Number */}
//         <div className="flex flex-col md:flex-row gap-6 w-full">
//           <div className="flex-1 flex flex-col gap-2">
//             <label className="font-poppins font-medium text-gray-700 text-[16px]">
//               City Name
//             </label>
//             <input
//               name="cityName"
//               type="text"
//               value={formData.cityName}
//               onChange={handleChange}
//               placeholder="Enter City Name"
//               className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
//               required
//             />
//           </div>

//           <div className="flex-1 flex flex-col gap-2">
//             <label className="font-poppins font-medium text-gray-700 text-[16px]">
//               Contact Number
//             </label>
//             <input
//               name="contactNumber"
//               type="text"
//               value={formData.contactNumber}
//               onChange={handleChange}
//               placeholder="Enter Contact Number"
//               className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
//               required
//             />
//           </div>
//         </div>

//         {/* Row 2: WhatsApp Link & Contact Email */}
//         <div className="flex flex-col md:flex-row gap-6 w-full">
//           <div className="flex-1 flex flex-col gap-2">
//             <label className="font-poppins font-medium text-gray-700 text-[16px]">
//               WhatsApp Link
//             </label>
//             <input
//               name="whatsappLink"
//               type="url"
//               value={formData.whatsappLink}
//               onChange={handleChange}
//               placeholder="Enter WhatsApp Link (https://wa.me/...)"
//               className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
//               required
//             />
//           </div>

//           <div className="flex-1 flex flex-col gap-2">
//             <label className="font-poppins font-medium text-gray-700 text-[16px]">
//               Contact Email
//             </label>
//             <input
//               name="contactEmail"
//               type="email"
//               value={formData.contactEmail}
//               onChange={handleChange}
//               placeholder="Enter Contact Email"
//               className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
//               required
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-center w-full mt-6">
//           <button
//             onClick={handleSubmit}
//             className="bg-[#7EC1B1] text-white font-poppins font-semibold px-6 py-3 rounded-lg hover:bg-[#65a89d] transition w-full md:w-1/8"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditCity;

// try final 
// import React, { useState, useEffect } from "react";
// import Header2 from "../../../components/superAdmin/header/Header2";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { updatePopularCity } from "../../../redux/slices/popularCitiesSlice";

// const EditCity = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();

//   // 👇 City data passed from listing page
//   const cityData = location.state?.city || {};

//   const [formData, setFormData] = useState({
//     cityName: "",
//     contactNumber: "",
//     whatsappLink: "",
//     contactEmail: "",
//   });

//   /* =========================
//      Prefill form on edit
//   ========================= */
//   useEffect(() => {
//     if (cityData) {
//       setFormData({
//         cityName: cityData.cityName || "",
//         contactNumber: cityData.contactNumber || "",
//         whatsappLink: cityData.whatsappLink || "",
//         contactEmail: cityData.contactEmail || "",
//       });
//     }
//   }, [cityData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   /* =========================
//      SUBMIT (UPDATE)
//   ========================= */
//   const handleSubmit = () => {
//     dispatch(
//       updatePopularCity({
//         id: cityData.id, // 👈 VERY IMPORTANT
//         cityName: formData.cityName,
//         contactNumber: formData.contactNumber,
//         contactEmail: formData.contactEmail,
//         whatsappLink: formData.whatsappLink,
//       })
//     );

//     navigate("/popular-cities");
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col">
//       {/* Header */}
//       <Header2 title="Edit City" />

//       {/* Form */}
//       <div className="bg-white p-6 shadow-lg flex flex-col gap-8 w-full h-full">
//         {/* Row 1 */}
//         <div className="flex flex-col md:flex-row gap-6 w-full">
//           <div className="flex-1 flex flex-col gap-2">
//             <label className="font-medium text-gray-700">
//               City Name
//             </label>
//             <input
//               name="cityName"
//               type="text"
//               value={formData.cityName}
//               onChange={handleChange}
//               placeholder="Enter City Name"
//               className="p-3 border bg-[#F5F5F5]"
//               required
//             />
//           </div>

//           <div className="flex-1 flex flex-col gap-2">
//             <label className="font-medium text-gray-700">
//               Contact Number
//             </label>
//             <input
//               name="contactNumber"
//               type="text"
//               value={formData.contactNumber}
//               onChange={handleChange}
//               placeholder="Enter Contact Number"
//               className="p-3 border bg-[#F5F5F5]"
//               required
//             />
//           </div>
//         </div>

//         {/* Row 2 */}
//         <div className="flex flex-col md:flex-row gap-6 w-full">
//           <div className="flex-1 flex flex-col gap-2">
//             <label className="font-medium text-gray-700">
//               WhatsApp Link
//             </label>
//             <input
//               name="whatsappLink"
//               type="url"
//               value={formData.whatsappLink}
//               onChange={handleChange}
//               placeholder="Enter WhatsApp Link"
//               className="p-3 border bg-[#F5F5F5]"
//               required
//             />
//           </div>

//           <div className="flex-1 flex flex-col gap-2">
//             <label className="font-medium text-gray-700">
//               Contact Email
//             </label>
//             <input
//               name="contactEmail"
//               type="email"
//               value={formData.contactEmail}
//               onChange={handleChange}
//               placeholder="Enter Contact Email"
//               className="p-3 border bg-[#F5F5F5]"
//               required
//             />
//           </div>
//         </div>

//         {/* Submit */}
//         <div className="flex justify-center w-full mt-6">
//           <button
//             onClick={handleSubmit}
//             className="bg-[#7EC1B1] text-white px-6 py-3 rounded-lg hover:bg-[#65a89d] transition"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditCity;


