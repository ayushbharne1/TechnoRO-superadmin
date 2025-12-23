// Saumya
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Header2 from "../../../components/superAdmin/header/Header2";
import { addPopularCity } from "../../../redux/slices/popularCitiesSlice";
import { useNavigate } from "react-router-dom";

const AddCity = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cityName, setCityName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const handleAdd = () => {
    dispatch(
      addPopularCity({
        cityName,
        contactNumber,
        whatsappLink,
        contactEmail,
      })
    );

    // Reset form fields
    setCityName("");
    setContactNumber("");
    setWhatsappLink("");
    setContactEmail("");

    // Show success message 
    alert("City added successfully!");

    // Navigate back to the previous page
    navigate("/popular-cities");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/*  Header with Title */}
      <Header2 title="Add New City" />

      {/* Form Section */}
      <div className="bg-white p-6 shadow-lg flex flex-col gap-8 w-full h-full">
        {/* Row 1: City Name & Contact Number */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* City Name Field */}
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">
              City Name
            </label>
            <input
              type="text"
              placeholder="Enter City Name"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
              required
            />
          </div>

          {/* Contact Number Field */}
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">
              Contact Number
            </label>
            <input
              type="text"
              placeholder="Enter Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
              required
            />
          </div>
        </div>

        {/* Row 2: WhatsApp Link & Contact Email */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* WhatsApp Link Field */}
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">
              WhatsApp Link
            </label>
            <input
              type="url"
              placeholder="Enter WhatsApp Link (https://wa.me/...)"
              value={whatsappLink}
              onChange={(e) => setWhatsappLink(e.target.value)}
              className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
              required
            />
          </div>

          {/* Contact Email Field */}
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-poppins font-medium text-gray-700 text-[16px]">
              Contact Email
            </label>
            <input
              type="email"
              placeholder="Enter Contact Email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
              required
            />
          </div>
        </div>

        {/* Add Button */}
        <div className="flex justify-center w-full mt-6">
          <button
            onClick={handleAdd}
            className="bg-[#7EC1B1] text-white font-poppins font-semibold px-6 py-3 rounded-lg hover:bg-[#65a89d] transition w-full md:w-1/8"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCity;

// sir 
// import React, { useState } from "react";
// import Header2 from "../../../components/superAdmin/header/Header2";

// const AddCity = () => {
//   const [cityName, setCityName] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [whatsappLink, setWhatsappLink] = useState("");
//   const [contactEmail, setContactEmail] = useState("");

//   const handleAdd = () => {
//     console.log({
//       cityName,
//       contactNumber,
//       whatsappLink,
//       contactEmail,
//     });

//     // Later, you can add API logic here to post new city details
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col">
//       {/* ✅ Header with Title */}
//       <Header2 title="Add New City" />

//       {/* Form Section */}
//       <div className="bg-white p-6 shadow-lg flex flex-col gap-8 w-full h-full">
//         {/* Row 1: City Name & Contact Number */}
//         <div className="flex flex-col md:flex-row gap-6 w-full">
//           {/* City Name Field */}
//           <div className="flex-1 flex flex-col gap-2">
//             <label className="font-poppins font-medium text-gray-700 text-[16px]">
//               City Name
//             </label>
//             <input
//               type="text"
//               placeholder="Enter City Name"
//               value={cityName}
//               onChange={(e) => setCityName(e.target.value)}
//               className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
//               required
//             />
//           </div>

//           {/* Contact Number Field */}
//           <div className="flex-1 flex flex-col gap-2">
//             <label className="font-poppins font-medium text-gray-700 text-[16px]">
//               Contact Number
//             </label>
//             <input
//               type="text"
//               placeholder="Enter Contact Number"
//               value={contactNumber}
//               onChange={(e) => setContactNumber(e.target.value)}
//               className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
//               required
//             />
//           </div>
//         </div>

//         {/* Row 2: WhatsApp Link & Contact Email */}
//         <div className="flex flex-col md:flex-row gap-6 w-full">
//           {/* WhatsApp Link Field */}
//           <div className="flex-1 flex flex-col gap-2">
//             <label className="font-poppins font-medium text-gray-700 text-[16px]">
//               WhatsApp Link
//             </label>
//             <input
//               type="url"
//               placeholder="Enter WhatsApp Link (https://wa.me/...)"
//               value={whatsappLink}
//               onChange={(e) => setWhatsappLink(e.target.value)}
//               className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
//               required
//             />
//           </div>

//           {/* Contact Email Field */}
//           <div className="flex-1 flex flex-col gap-2">
//             <label className="font-poppins font-medium text-gray-700 text-[16px]">
//               Contact Email
//             </label>
//             <input
//               type="email"
//               placeholder="Enter Contact Email"
//               value={contactEmail}
//               onChange={(e) => setContactEmail(e.target.value)}
//               className="p-3 border border-[#606060] bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#7EC1B1]"
//               required
//             />
//           </div>
//         </div>

//         {/* Add Button */}
//         <div className="flex justify-center w-full mt-6">
//           <button
//             onClick={handleAdd}
//             className="bg-[#7EC1B1] text-white font-poppins font-semibold px-6 py-3 rounded-lg hover:bg-[#65a89d] transition w-full md:w-1/8"
//           >
//             Add
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCity;



