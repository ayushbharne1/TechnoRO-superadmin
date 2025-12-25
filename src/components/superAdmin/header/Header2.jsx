import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";

const Header2 = ({ title }) => {
  const location = useLocation();

  const routeLabels = {
    "/dashboard": "Dashboard",
    "/lead-management": "Lead Management",
    "/lead-management/view": "Lead Details",
    "/lead-management/view/assign-lead": "Assign Lead",
    "/order-management": "Order Management",
    "/order-management/view": "Order Details",
    "/services": "Services & AMC Plan",
    "/services/addservice": "Add Services ",
    "/services/servicedetails": "Service Details",
    // "/services/editservice": "Edit Service",
    "/service-engineer/edit/:id": "Edit Service Engineer",
    "/service-engineer/view/:id": "Service Engineer Details",
    "/service-engineer/add-engineer": "Add Service Engineer",
    // 
    "/product": "Products & Spare Parts",
    "/addservice": "Add Service",
    "/product/add-product": "Add Product",
    "/product/product-details": "Product Details",
    "/customers": "Customers",
    "/technician": "Technicians",
    "/partner": "Partners",
    "/manufacturer": "Manufacturer",
    "/manufacturer/addManufacturer": "Add Manufacturer",
    "/manufacturer/addmanufacturer": "Add Manufacturer",
    "/manufacturer/editManufacturer/:id": "Edit Manufacturer",
    "/manufacturer/editmanufacturer": "Edit Manufacturer",
    "/manufacturer/editmanufacturer/:id": "Edit Manufacturer",
    "/manufacturer/viewmanufacturer": "Manufacturer Details",
    "/manufacturer/viewmanufacturer/:id": "Manufacturer Details",
    "/vendors": "Vendors",
    "/vendors/addvendor": "Add Vendor",
    "/vendors/editvendor/:id": "Edit Vendor",
    "/pendingServices": "Pending Services",
    "/technicianActivity": "Technician Activity",
    "/technicianMonitoring": "Technician Monitor",
    "/service-engineer": "Service Engineer",
    "/roles-permission": "Roles & Permission",
    "/report-analytics": "Report & Analytics",
    "/messages": "Messages",
    "/messages/:id": "Message",
    "/popular-cities": "RO Care Popular Cities",
  };

  const getLabel = (path) => {
    if (routeLabels[path]) return routeLabels[path];
    for (const route in routeLabels) {
      if (route.includes(":")) {
        const regex = new RegExp("^" + route.replace(/:\w+/g, "[^/]+") + "$");
        if (regex.test(path)) {
          return routeLabels[route];
        }
      }
    }
    const lastPart = path.split("/").pop();
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
  };

  const pathParts = location.pathname.split("/").filter(Boolean);
  const rawBreadcrumbs = pathParts.map((part, index) => {
    const path = "/" + pathParts.slice(0, index + 1).join("/");
    let label = getLabel(path);
    return { path, label };
  });

  const seen = new Set();
  const breadcrumbs = [];
  for (const crumb of rawBreadcrumbs) {
    if (!crumb.label) continue;
    const label = crumb.label.trim();
    // 
    // for remove edit and view 
    if (label.toLowerCase() === "edit") continue;
    if (label.toLowerCase() === "view") continue;
    // 



    if (/^\d+$/.test(label)) continue;
    if (seen.has(label.toLowerCase())) continue;
    seen.add(label.toLowerCase());
    breadcrumbs.push({ ...crumb, label });
  }

  // ✅ Use title prop if passed
  let heading = title
    ? title
    : breadcrumbs.length > 0
      ? breadcrumbs[breadcrumbs.length - 1].label
      : "Page";

  let displayBreadcrumbs = breadcrumbs;
  if (
    location.pathname === "/manufacturer" ||
    location.pathname === "/manufacturer/"
  ) {
    displayBreadcrumbs = [{ path: "/manufacturer", label: "Manufacturer" }];
    heading = "Manufacturer List";
  }

  return (
    <div className="w-full flex flex-col pt-2 pb-3 border-b border-gray-300">
      <div className="flex items-center space-x-2">
        <MdDashboard className="w-6 h-6 text-gray-600 flex-shrink-0" />
        <span className="flex items-center">
          <Link to="/dashboard" className="sr-only">
            Dashboard
          </Link>
          <span className="mx-2 text-gray-400">&gt;</span>
        </span>

        {displayBreadcrumbs.map(
          (crumb, idx) =>
            crumb.label &&
            crumb.label.toLowerCase() !== "dashboard" &&
            (idx < displayBreadcrumbs.length - 1 ? (
              <span key={crumb.path} className="flex items-center">
                <Link to={crumb.path} className="font-medium hover:underline">
                  {crumb.label}
                </Link>
                <span className="mx-2 text-gray-400">&gt;</span>
              </span>
            ) : (
              <span key={crumb.path} className="text-[#0088FF] font-medium">
                {crumb.label}
              </span>
            ))
        )}
      </div>

      {/* Heading */}
      <h2 className="mt-2 text-[20px] font-semibold text-black">{heading}</h2>
    </div>
  );
};

export default Header2;



// import { Link, useLocation } from "react-router-dom";
// import { MdDashboard } from "react-icons/md";

// const Header2 = () => {
//   const location = useLocation();

//   // Define your route labels
//   const routeLabels = {
//     "/dashboard": "Dashboard",

//     // Leads
//     "/lead-management": "Lead Management",
//     "/lead-management/view": "Lead Details",
//     "/lead-management/view/assign-lead": "Assign Lead", 

//     // Orders
//     "/order-management": "Order Management",
//     "/order-management/view": "Order Details",


//     // Services & Products
//     "/services": "Services & AMC Plan",
//     "/services/addservice":" Add Services",
//     "/services/servicedetails":"Service Details",
//     "/services/editservice":"Edit Service",
//     "/product": "Products & Spare Parts",


//     "/addservice": "Add Service",


//     "/product/add-product": "Add Product",
//     "/product/product-details": "Product Details",

//     "/customers": "Customers",
//     "/technician": "Technicians",
//     "/partner": "Partners",

//     "/manufacturer": "Manufacturer",
//     "/manufacturer/addManufacturer": "Add Manufacturer",
//     "/manufacturer/addmanufacturer": "Add Manufacturer",
//     "/manufacturer/editManufacturer/:id": "Edit Manufacturer",
//     "/manufacturer/editmanufacturer": "Edit Manufacturer",
//     "/manufacturer/editmanufacturer/:id": "Edit Manufacturer",
//     "/manufacturer/viewmanufacturer": "Manufacturer Details",
//     "/manufacturer/viewmanufacturer/:id": "Manufacturer Details",

//     "/vendors": "Vendors",
//     "/vendors/addvendor": "Add Vendor",
//     "/vendors/editvendor/:id": "Edit Vendor",

//     "/pendingServices": "Pending Services",
//     "/technicianActivity": "Technician Activity",
//     "/technicianMonitoring": "Technician Monitor",

//     "/service-engineer": "Service Engineer",

//     "/roles-permission": "Roles & Permission",
//     "/report-analytics": "Report & Analytics",

//     // 👇 Add route for your Messages
//     "/messages": "Messages",
//     "/messages/:id": "Message",

//     "/popular-cities": "RO Care Popular Cities",
//   };

//   // Helper to match dynamic routes
//   const getLabel = (path) => {
//     if (routeLabels[path]) return routeLabels[path];

//     for (const route in routeLabels) {
//       if (route.includes(":")) {
//         const regex = new RegExp("^" + route.replace(/:\w+/g, "[^/]+") + "$");
//         if (regex.test(path)) {
//           return routeLabels[route];
//         }
//       }
//     }

//     // Fallback: capitalize first letter of last path part
//     const lastPart = path.split("/").pop();
//     return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
//   };

//   const pathParts = location.pathname.split("/").filter(Boolean);

//   const rawBreadcrumbs = pathParts.map((part, index) => {
//     const path = "/" + pathParts.slice(0, index + 1).join("/");
//     let label = getLabel(path);
//     return { path, label };
//   });

//   const seen = new Set();
//   const breadcrumbs = [];

//   for (const crumb of rawBreadcrumbs) {
//     if (!crumb.label) continue;
//     const label = crumb.label.trim();
//     if (/^\d+$/.test(label)) continue;
//     if (seen.has(label.toLowerCase())) continue;
//     seen.add(label.toLowerCase());
//     breadcrumbs.push({ ...crumb, label });
//   }

//   // Default heading is last breadcrumb label
//   let heading =
//     breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].label : "Page";

//   // Manufacturer special case
//   let displayBreadcrumbs = breadcrumbs;
//   if (location.pathname === "/manufacturer" || location.pathname === "/manufacturer/") {
//     displayBreadcrumbs = [{ path: "/manufacturer", label: "Manufacturer" }];
//     heading = "Manufacturer List";
//   }

//   return (
//     <div className="w-full flex flex-col pt-2 pb-3 border-b border-gray-300">
//       {/* Breadcrumb row */}
//       <div className="flex items-center space-x-2">
//         <MdDashboard className="w-6 h-6 text-gray-600 flex-shrink-0" />
//         <span className="flex items-center">
//           <Link to="/dashboard" className="sr-only">
//             Dashboard
//           </Link>
//           <span className="mx-2 text-gray-400">&gt;</span>
//         </span>

//         {displayBreadcrumbs.map(
//           (crumb, idx) =>
//             crumb.label &&
//             crumb.label.toLowerCase() !== "dashboard" &&
//             (idx < displayBreadcrumbs.length - 1 ? (
//               <span key={crumb.path} className="flex items-center">
//                 <Link to={crumb.path} className="font-medium hover:underline">
//                   {crumb.label}
//                 </Link>
//                 <span className="mx-2 text-gray-400">&gt;</span>
//               </span>
//             ) : (
//               <span key={crumb.path} className="text-[#0088FF] font-medium">
//                 {crumb.label}
//               </span>
//             ))
//         )}
//       </div>

//       {/* Heading */}
//       <h2 className="mt-2 text-[20px] font-semibold text-black">{heading}</h2>
//     </div>
//   );
// };

// export default Header2;

