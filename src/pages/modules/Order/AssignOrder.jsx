import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header2 from "../../../components/superAdmin/header/Header2";
import { assignOrder } from "../../../redux/slices/orderSlice"; // ADD

const AssignOrder = () => {
  const { id } = useParams(); // orderId
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.order); //  ADD

  const [assignTo, setAssignTo] = useState("manufacturer");
  const [selectedId, setSelectedId] = useState("");

  const handleAssign = () => {
    if (!selectedId) {
      alert(`Please select ${assignTo}`);
      return;
    }

    const payload =
      assignTo === "manufacturer"
        ? { orderId: id, manufacturerId: selectedId }
        : { orderId: id, vendorId: selectedId };

    dispatch(assignOrder(payload)).then(() => {
      navigate("/order-management");
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header2 title="Assign Order" />

      <div className="p-6 flex flex-col gap-8 w-full">
        <div className="flex flex-col md:flex-row gap-6 w-full items-center">

          {/* Assign To */}
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-medium">Order Assign To</label>
            <select
              value={assignTo}
              onChange={(e) => {
                setAssignTo(e.target.value);
                setSelectedId("");
              }}
              className="p-3 border border-gray-400 bg-[#F5F5F5]"
            >
              <option value="manufacturer">Manufacturer</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>

          {/* Manufacturer / Vendor */}
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-medium">
              Select {assignTo === "manufacturer" ? "Manufacturer" : "Vendor"}
            </label>

            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="p-3 border border-gray-400 bg-[#F5F5F5]"
            >
              <option value="">Select</option>

              {assignTo === "manufacturer" ? (
                <>
                  <option value="6933d3ac95ecf49bd29eea29">KENT PVT. LTD.</option>
                  <option value="6933d3ac95ecf49bd29eea29">AQUAGUARD</option>
                  <option value="6933d3ac95ecf49bd29eea29">PUREIT</option>
                </>
              ) : (
                <>
                  <option value="68ff5cd2f357bf48dc48b949">DELHIVERY</option>
                  <option value="68ff5cd2f357bf48dc48b949">BLUEDART</option>
                  <option value="68ff5cd2f357bf48dc48b949">DTDC</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Assign Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleAssign}
            disabled={loading}
            className="bg-[#7EC1B1] text-white px-10 py-3 rounded disabled:opacity-60"
          >
            {loading ? "Assigning..." : "Assign"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignOrder;


// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Header2 from "../../../components/superAdmin/header/Header2";

// const AssignOrder = () => {
//   const { id } = useParams(); // order id
//   const navigate = useNavigate();

//   const [assignTo, setAssignTo] = useState("manufacturer");
//   const [manufacturer, setManufacturer] = useState("");

//   const handleAssign = () => {
//     if (!manufacturer) {
//       alert("Please select manufacturer");
//       return;
//     }

//     // later API call will go here
//     console.log({
//       orderId: id,
//       assignTo,
//       manufacturer,
//     });

//     navigate("/order-management");
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header */}
//       <Header2 title="Assign Order" />

//       {/* Content */}
//       <div className="p-6 flex flex-col gap-8 w-full">
//         {/* Row */}
//         <div className="flex flex-col md:flex-row gap-6 w-full items-center">
          
//           {/* Order Assign To */}
//           <div className="flex-1 flex flex-col gap-2">
//             <label className="font-medium">Order Assign To</label>
//             <select
//               value={assignTo}
//               onChange={(e) => setAssignTo(e.target.value)}
//               className="p-3 border border-gray-400 bg-[#F5F5F5]"
//             >
//               <option value="manufacturer">Manufacturer</option>
//               <option value="vendor">Vendor</option>
//             </select>
//           </div>

//           {/* Select Manufacturer */}
//           <div className="flex-1 flex flex-col gap-2">
//             <label className="font-medium">Select Manufacturer</label>
//             <select
//               value={manufacturer}
//               onChange={(e) => setManufacturer(e.target.value)}
//               className="p-3 border border-gray-400 bg-[#F5F5F5]"
//             >
//               <option value="">Select Manufacturer</option>
//               <option value="KENT PVT. LTD.">KENT PVT. LTD.</option>
//               <option value="AQUAGUARD">AQUAGUARD</option>
//               <option value="PUREIT">PUREIT</option>
//             </select>
//           </div>
//         </div>

//         {/* Assign Button */}
//         <div className="flex justify-center mt-6">
//           <button
//             onClick={handleAssign}
//             className="bg-[#7EC1B1] text-white px-10 py-3 rounded"
//           >
//             Assign
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssignOrder;







