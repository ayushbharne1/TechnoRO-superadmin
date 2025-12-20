// import React from "react";
// import { useLocation } from "react-router-dom";
// import Header2 from "../../../components/superAdmin/header/Header2";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import locationIcon from "../../../assets/location.png";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const ViewOrder = () => {
//   const { state } = useLocation();
//   const order = state || {};

//   const defaultPriceDetails = {
//     price: 24999,
//     discount: -5000,
//     platformFee: 1,
//     debitCardOff: -1000,
//     deliveryCharges: 0,
//     total: 19000,
//   };

//   const priceDetails = (order && order.priceDetails) || defaultPriceDetails;

//   const fmt = (n) => `₹${Number(n).toLocaleString()}`;

//   // Build product display string from available order fields. Prefer order.items/order.products when present.
//   const itemsArray =
//     order.items && order.items.length
//       ? order.items
//       : order.products && order.products.length
//       ? order.products
//       : null;
//   let productDisplay = "";

//   // helper to parse numeric price
//   const parsePrice = (v) => {
//     if (v == null) return 0;
//     if (typeof v === "number") return v;
//     const s = String(v).replace(/[^0-9.-]+/g, "");
//     const n = Number(s);
//     return isNaN(n) ? 0 : n;
//   };

//   const items = itemsArray || [];
//   const itemsSubtotal = items.length
//     ? items.reduce(
//         (s, it) =>
//           s +
//           parsePrice(it.price ?? it.unitPrice ?? it.amount) *
//             (it.qty ?? it.quantity ?? 1),
//         0
//       )
//     : 0;

//   if (itemsArray) {
//     if (items.length === 1) {
//       const it = items[0];
//       const name =
//         it.name ||
//         it.productName ||
//         it.title ||
//         order.productName ||
//         (typeof order.product === "string"
//           ? order.product
//           : order.product?.name) ||
//         "Kent Grand Plus RO";
//       const qty = it.qty ?? it.quantity ?? 1;
//       const unitPrice =
//         it.price ?? it.unitPrice ?? it.amount ?? priceDetails.price ?? null;
//       productDisplay = unitPrice
//         ? `${name} - Quantity:${qty} - Price: ${fmt(unitPrice)}`
//         : `${name} - Quantity:${qty}`;
//     } else {
//       // multiple items: list names and show total to match Price Details
//       const names = items.map(
//         (it) =>
//           it.name ||
//           it.productName ||
//           it.title ||
//           order.productName ||
//           (typeof order.product === "string"
//             ? order.product
//             : order.product?.name) ||
//           "Kent Grand Plus RO"
//       );
//       productDisplay = `${names.join(" | ")} - Total: ${fmt(itemsSubtotal)}`;
//     }
//   } else {
//     const productName =
//       order.productName ||
//       (typeof order.product === "string"
//         ? order.product
//         : order.product?.name) ||
//       "Kent Grand Plus RO";
//     const quantity = order.quantity ?? order.qty ?? 1;
//     const priceValue =
//       order.price ??
//       order.amount ??
//       order.product?.price ??
//       priceDetails.price ??
//       null;
//     productDisplay = priceValue
//       ? `${productName} - Quantity:${quantity} - Price: ${fmt(priceValue)}`
//       : `${productName} - Quantity:${quantity}`;
//   }

//   const display = {
//     orderId: order.orderId || "OD54875",
//     customerName: order.customerName || "Kathryn Murphy",
//     address: order.address || "4140 Parker Rd. Allentown, New Mexico 31134",
//     phone: order.phone || "+91 98765 43210",
//     product: productDisplay,
//     orderDateTime: order.orderDateTime || "21 Oct 2025, 10:00 AM",
//     status: order.status || "New",
//   };

//   const markerIcon = new L.Icon({
//     iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//     shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });

//   return (
//     <div className="min-h-screen md:p-0">
//       <Header2 />
//       <div className="bg-white">
//         <div className="mx-auto w-full max-w-[1200px] bg-white p-6 rounded-lg relative">
//           <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 md:gap-4" />

//           <div className="mt-2">
//             <div className="max-h-[420px] overflow-y-auto hide-scrollbar">
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <h3 className="text-4xl md:text-5xl font-extrabold text-[#263138] leading-tight">
//                     {display.customerName}
//                   </h3>
//                   <div className="text-sm text-gray-500 mt-2">
//                     Order ID: {display.orderId}
//                   </div>
//                 </div>

//                 <span className="inline-block px-6 py-3 bg-yellow-400 rounded-full text-sm font-semibold md:px-6 md:py-3 shadow-sm">
//                   {display.status}
//                 </span>
//               </div>

//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 <div>
//                   <div className="flex items-center gap-2 text-gray-600 mb-2">
//                     <img
//                       src={locationIcon}
//                       alt="location"
//                       className="w-4 h-4"
//                     />
//                     <span className="font-medium">Delivery Address</span>
//                   </div>
//                   <div className="text-[#7EC1B1] mb-4">{display.address}</div>

//                   <div className="h-40 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center text-gray-400 mb-6 overflow-hidden">
//                     <MapContainer
//                       className="relative z-0"
//                       center={[35.5007, -105.5007]}
//                       zoom={13}
//                       scrollWheelZoom={false}
//                       style={{ height: "200px", width: "100%" }}
//                     >
//                       <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
//                       />
//                       <Marker position={[35.5007, -105.5007]} icon={markerIcon}>
//                         <Popup>
//                           <div className="font-semibold">
//                             {display.customerName}
//                           </div>
//                           <div className="text-sm">{display.address}</div>
//                         </Popup>
//                       </Marker>
//                     </MapContainer>
//                   </div>
//                 </div>

//                 <div>
//                   <div className="flex flex-col gap-4">
//                     {/* Phone */}
//                     <div>
//                       <div className="flex items-center gap-3">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6 text-[#7EC1B1] flex-shrink-0"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="1.5"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12 1.05.38 2.07.77 3.02a2 2 0 0 1-.45 2.11L9.91 11.91a16 16 0 0 0 6.18 6.18l1.06-1.06a2 2 0 0 1 2.11-.45c.95.39 1.97.65 3.02.77A2 2 0 0 1 22 16.92z"
//                           />
//                         </svg>
//                         <span className="text-[20px] leading-[30px] font-normal text-[#263138]">
//                           Phone No.
//                         </span>
//                       </div>
//                       <div className="text-[20px] leading-[30px] font-normal text-[#7EC1B1] mt-2">
//                         {display.phone}
//                       </div>
//                     </div>

//                     {/* Product Ordered */}
//                     <div>
//                       <div className="flex items-center gap-3">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6 text-[#7EC1B1] flex-shrink-0"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="1.5"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
//                           />
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M7.5 4.21v8.79"
//                           />
//                         </svg>
//                         <span className="text-[20px] leading-[30px] font-normal text-[#263138]">
//                           Product Ordered
//                         </span>
//                       </div>
//                       <div className="text-[20px] leading-[30px] font-normal text-[#7EC1B1] mt-2">
//                         {display.product}
//                       </div>
//                     </div>

//                     {/* Order Date & Time */}
//                     <div>
//                       <div className="flex items-center gap-3">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6 text-[#7EC1B1] flex-shrink-0"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="1.5"
//                         >
//                           <rect
//                             x="3"
//                             y="4"
//                             width="18"
//                             height="18"
//                             rx="2"
//                             ry="2"
//                           />
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M16 2v4M8 2v4M3 10h18"
//                           />
//                         </svg>
//                         <span className="text-[20px] leading-[30px] font-normal text-[#263138]">
//                           Order Date & Time
//                         </span>
//                       </div>
//                       <div className="text-[20px] leading-[30px] font-normal text-[#7EC1B1] mt-2">
//                         {display.orderDateTime}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {/* PRICE DETAILS (FULL WIDTH) START */}
//               <div className="w-full mt-6">
//                 <div className="border rounded p-4 bg-white">
//                   <h4 className="text-lg font-semibold mb-4 text-[#263138]">
//                     Price Details
//                   </h4>
//                   <div className="space-y-4">
//                     {(order.items && order.items.length) ||
//                     (order.products && order.products.length) ? (
//                       (() => {
//                         const localItems =
//                           order.items && order.items.length
//                             ? order.items
//                             : order.products;
//                         const productNameFallback =
//                           order.productName ||
//                           (typeof order.product === "string"
//                             ? order.product
//                             : order.product?.name) ||
//                           "Kent Grand Plus RO";
//                         const subtotal = localItems.reduce(
//                           (s, it) =>
//                             s +
//                             parsePrice(it.price ?? it.unitPrice ?? it.amount) *
//                               (it.qty ?? it.quantity ?? 1),
//                           0
//                         );

//                         return (
//                           <>
//                             <div className="flex justify-between text-[#606060]">
//                               <span>Price ({localItems.length} Items)</span>
//                               <span>{fmt(subtotal)}</span>
//                             </div>
//                             <div className="space-y-2">
//                               {localItems.map((it, i) => (
//                                 <div
//                                   key={i}
//                                   className="flex justify-between text-[#606060]"
//                                 >
//                                   <span className="text-sm">
//                                     {it.name ||
//                                       it.productName ||
//                                       it.title ||
//                                       productNameFallback}
//                                   </span>
//                                   <span className="text-sm">
//                                     {fmt(
//                                       parsePrice(
//                                         it.price ?? it.unitPrice ?? it.amount
//                                       )
//                                     )}
//                                     {it.qty ?? it.quantity
//                                       ? ` x ${it.qty ?? it.quantity}`
//                                       : ""}
//                                   </span>
//                                 </div>
//                               ))}
//                             </div>
//                           </>
//                         );
//                       })()
//                     ) : (
//                       <div className="flex justify-between text-[#606060]">
//                         <span>Price (1 Items)</span>
//                         <span>{fmt(priceDetails.price)}</span>
//                       </div>
//                     )}

//                     <div className="flex justify-between">
//                       <span className="text-[#606060]">Discount</span>
//                       <span className="text-[#34C759]">
//                         -{fmt(Math.abs(priceDetails.discount))}
//                       </span>
//                     </div>
//                     <div className="flex justify-between text-[#606060]">
//                       <span>Platform Fee</span>
//                       <span>{fmt(priceDetails.platformFee)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-[#606060]">Debit Card Off</span>
//                       <span className="text-[#34C759]">
//                         -{fmt(Math.abs(priceDetails.debitCardOff))}
//                       </span>
//                     </div>

//                     <div className="flex justify-between text-[#606060]">
//                       <span>Delivery Charges</span>
//                       <div className="flex items-center gap-2">
//                         <span className="line-through text-sm text-[#CACACA]">
//                           {fmt(priceDetails.deliveryCharges || 100)}
//                         </span>
//                         <span className="text-[#34C759]">Free</span>
//                       </div>
//                     </div>

//                     <div className="border-t pt-3 mt-3 flex justify-between font-semibold text-lg text-[#263138]">
//                       <span>Total Amount</span>
//                       <span>{fmt(priceDetails.total)}</span>
//                     </div>
//                     <div className="text-sm text-[#7EC1B1]">
//                       Total saved on this order ₹700
//                     </div>
//                     <div className="mt-4 p-3 border rounded flex items-start gap-3">
//                       <div className="w-9 h-9 rounded-full bg-[#7EC1B1] flex items-center justify-center text-white">
//                         <span className="text-base font-semibold">%</span>
//                       </div>
//                       <div>
//                         <div className="font-semibold text-[#263138]">
//                           1 Offer Applied On This Order
//                         </div>
//                         <div className="text-sm text-[#263138]">
//                           Debit Card Off ₹100
//                         </div>
//                       </div>
//                     </div>
//                     <div className="mt-4 text-[#263138]">
//                       Payment Mode : Debit Card
//                     </div>
//                   </div>
//                   <div className="mt-6 flex justify-center">
//                     <button className="px-8 py-3 bg-green-600 text-white rounded-full font-semibold w-full max-w-xs">
//                       Assign Order
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* PRICE DETAILS (FULL WIDTH) END */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewOrder;

import React from "react";
import { useLocation } from "react-router-dom";
import Header2 from "../../../components/superAdmin/header/Header2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import locationIcon from "../../../assets/location.png";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const ViewOrder = () => {
  const { state } = useLocation();
  const order = state || {};

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-200 text-gray-800";

    const formatted = status.toString().toLowerCase().trim().replace(/[-_]/g, " ");

    if (formatted.includes("new")) return "bg-[#FFCC00] text-white";
    if (formatted.includes("in progress")) return "bg-[#0088FF] text-white";
    if (formatted.includes("delivered")) return "bg-[#34C759] text-white";

    return "bg-gray-200 text-gray-800";
  };


  const defaultPriceDetails = {
    price: 24999,
    discount: -5000,
    platformFee: 1,
    debitCardOff: -1000,
    deliveryCharges: 0,
    total: 19000,
  };

  const priceDetails = (order && order.priceDetails) || defaultPriceDetails;

  const fmt = (n) => `₹${Number(n).toLocaleString()}`;

  const itemsArray =
    order.items && order.items.length
      ? order.items
      : order.products && order.products.length
        ? order.products
        : null;

  let productDisplay = "";

  const parsePrice = (v) => {
    if (v == null) return 0;
    if (typeof v === "number") return v;
    const s = String(v).replace(/[^0-9.-]+/g, "");
    const n = Number(s);
    return isNaN(n) ? 0 : n;
  };

  const items = itemsArray || [];
  const itemsSubtotal = items.length
    ? items.reduce(
      (s, it) =>
        s +
        parsePrice(it.price ?? it.unitPrice ?? it.amount) *
        (it.qty ?? it.quantity ?? 1),
      0
    )
    : 0;

  if (itemsArray) {
    if (items.length === 1) {
      const it = items[0];
      const name =
        it.name ||
        it.productName ||
        it.title ||
        order.productName ||
        (typeof order.product === "string"
          ? order.product
          : order.product?.name) ||
        "Kent Grand Plus RO";
      const qty = it.qty ?? it.quantity ?? 1;
      const unitPrice =
        it.price ?? it.unitPrice ?? it.amount ?? priceDetails.price ?? null;
      productDisplay = unitPrice
        ? `${name} - Quantity:${qty} - Price: ${fmt(unitPrice)}`
        : `${name} - Quantity:${qty}`;
    } else {
      const names = items.map(
        (it) =>
          it.name ||
          it.productName ||
          it.title ||
          order.productName ||
          (typeof order.product === "string"
            ? order.product
            : order.product?.name) ||
          "Kent Grand Plus RO"
      );
      productDisplay = `${names.join(" | ")} - Total: ${fmt(itemsSubtotal)}`;
    }
  } else {
    const productName =
      order.productName ||
      (typeof order.product === "string"
        ? order.product
        : order.product?.name) ||
      "Kent Grand Plus RO";
    const quantity = order.quantity ?? order.qty ?? 1;
    const priceValue =
      order.price ??
      order.amount ??
      order.product?.price ??
      priceDetails.price ??
      null;
    productDisplay = priceValue
      ? `${productName} - Quantity:${quantity} - Price: ${fmt(priceValue)}`
      : `${productName} - Quantity:${quantity}`;
  }

  const display = {
    orderId: order.orderId || "OD54875",
    customerName: order.customerName || "Kathryn Murphy",
    address: order.address || "4140 Parker Rd. Allentown, New Mexico 31134",
    phone: order.phone || "+91 98765 43210",
    product: productDisplay,
    orderDateTime: order.orderDateTime || "21 Oct 2025, 10:00 AM",
    status: order.status || "New",
  };

  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] flex flex-col">
      <Header2 />

      {/* Full width container */}
      <div className="flex-1 w-full bg-white p-6 rounded-none">
        <div className="max-h-full overflow-y-auto hide-scrollbar">
          {/* Header Row */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-3xl md:text-3xl font-extrabold text-[#263138] leading-tight">
                {display.customerName}
              </h3>
              <div className="text-sm text-black mt-2">
                Order ID: {display.orderId}
              </div>
            </div>
            <span
              className={`inline-block px-6 py-2 rounded-full text-sm font-semibold md:px-8 md:py-2 shadow-sm ${getStatusColor(display.status)}`}
            >
              {display.status || "NA"}
            </span>
          </div>

          {/* Main Layout - full width */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 w-full">
            {/* Left Side - Address & Map */}
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <img src={locationIcon} alt="location" className="w-4 h-4" />
                <span className="font-medium">Delivery Address</span>
              </div>
              <div className="text-[#7EC1B1] mb-4">{display.address}</div>

              <div className="h-[250px] rounded-md border border-gray-200 overflow-hidden">
                <MapContainer
                  className="relative z-0"
                  center={[35.5007, -105.5007]}
                  zoom={13}
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[35.5007, -105.5007]} icon={markerIcon}>
                    <Popup>
                      <div className="font-semibold">
                        {display.customerName}
                      </div>
                      <div className="text-sm">{display.address}</div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* Right Side - Order Info */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-[20px] font-normal text-[#263138]">
                  Phone No.
                </p>
                <p className="text-[20px] font-normal text-[#7EC1B1] mt-2">
                  {display.phone}
                </p>
              </div>

              <div>
                <p className="text-[20px] font-normal text-[#263138]">
                  Product Ordered
                </p>
                <p className="text-[20px] font-normal text-[#7EC1B1] mt-2">
                  {display.product}
                </p>
              </div>

              <div>
                <p className="text-[20px] font-normal text-[#263138]">
                  Order Date & Time
                </p>
                <p className="text-[20px] font-normal text-[#7EC1B1] mt-2">
                  {display.orderDateTime}
                </p>
              </div>
            </div>
          </div>

          {/* Price Details Full Width */}
          <div className="w-full mt-10 border rounded p-6 bg-white">
            <h4 className="text-lg font-semibold mb-4 text-[#263138]">
              Price Details
            </h4>

            <div className="space-y-4">
              <div className="flex justify-between text-[#606060]">
                <span>Price</span>
                <span>{fmt(priceDetails.price)}</span>
              </div>
              <div className="flex justify-between text-[#606060]">
                <span>Discount</span>
                <span className="text-[#34C759]">
                  -{fmt(Math.abs(priceDetails.discount))}
                </span>
              </div>
              <div className="flex justify-between text-[#606060]">
                <span>Platform Fee</span>
                <span>{fmt(priceDetails.platformFee)}</span>
              </div>
              <div className="flex justify-between text-[#606060]">
                <span>Debit Card Off</span>
                <span className="text-[#34C759]">
                  -{fmt(Math.abs(priceDetails.debitCardOff))}
                </span>
              </div>
              <div className="flex justify-between text-[#606060]">
                <span>Delivery Charges</span>
                <div className="flex items-center gap-2">
                  <span className="line-through text-sm text-[#CACACA]">
                    {fmt(priceDetails.deliveryCharges || 100)}
                  </span>
                  <span className="text-[#34C759]">Free</span>
                </div>
              </div>
              <div className="border-t pt-3 mt-3 flex border-dotted justify-between font-semibold text-lg text-[#263138]">
                <span>Total Amount</span>
                <span>{fmt(priceDetails.total)}</span>
              </div>

              <div className="border-t border-dotted py-4 mt-3 ">
                <div className="text-sm text-[#7EC1B1] mt-1">
                  Total saved on this order ₹700
                </div>
                <div className="mt-4 p-3  flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#7EC1B1] flex items-center justify-center text-white">
                    <span className="text-base font-semibold">%</span>
                  </div>
                  <div>
                    <div className="font-semibold  text-[#263138]">
                      1 Offer Applied On This Order
                    </div>
                    <div className="text-sm text-[#263138] pb-3 border-b border-dotted border-[#CACACA] ">
                      Debit Card Off ₹100
                    </div>
                  </div>
                </div>
                Payment Mode : Debit Card
              </div>
            </div>
          </div>

          <div className="mt-4  text-[#263138]">
            {display.status?.toLowerCase().includes("new") && (
              <div className="mt-6 flex justify-center">
                <button className="px-12 py-2 bg-green-600 text-white rounded-sm font-semibold md:max-w-sm">
                  Assign Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
