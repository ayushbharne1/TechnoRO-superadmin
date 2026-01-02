import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";

const Header2 = ({ title }) => {
  const location = useLocation();

  const routeLabels = {
    "/dashboard": "Dashboard",

    // Leads
    "/lead-management": "Lead Management",
    "/lead-management/view": "Lead Details",
    "/lead-management/view/assign-lead": "Assign Lead",

    // Orders
    "/order-management": "Order Management",
    "/order-management/view": "Order Details",

    // Services & Products
    "/services": "Services & AMC Plan",
    "/services/addservice": "Add Services",
    "/services/servicedetails": "Service Details",
    "/services/editservice": "Edit Service",
    "/product": "Products & Spare Parts",

    "/addservice": "Add Service",

    "/product/add-product": "Add Product",
    "/product/product-details": "Product Details",
    // ✅ Added this so the parent route has a nice name
    "/product/edit-product": "Edit Product",

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

    "/vendors": "Vendor",
    "/vendors/addvendor": "Add Vendor",
    "/vendors/editvendor": "Edit Vendor",
    "/vendors/editvendor/": "Edit Vendor",
    "/vendors/editvendor/:id": "Edit Vendor",
    "/vendors/details": "Vendor Details",
    "/vendors/details/:id": "Vendor Details",

    "/pendingServices": "Pending Services",
    "/technicianActivity": "Technician Activity",
    "/technicianMonitoring": "Technician Monitor",

    "/service-engineer": "Service Engineer",

    "/roles-permission": "Roles & Permission",
    "/roles-permission/view-sub-admin": "Sub Admin Details",
    "/roles-permission/edit-sub-admin": "Edit Sub Admin",
    "/roles-permission/create-sub-admin": "Create Sub Admin",
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

    // 1. Skip pure numbers
    if (/^\d+$/.test(label)) continue;

    // 2. ✅ NEW: Skip MongoDB ObjectIds (24 hex characters)
    // This removes IDs like "694bd008f417ffc6b9125902" from breadcrumbs
    if (/^[0-9a-fA-F]{24}$/.test(label)) continue;

    if (seen.has(label.toLowerCase())) continue;
    seen.add(label.toLowerCase());
    breadcrumbs.push({ ...crumb, label });
  }

  // Heading Logic
  let heading = title
    ? title
    : breadcrumbs.length > 0
    ? breadcrumbs[breadcrumbs.length - 1].label
    : "Page";

  // Special overrides
  if (
    location.pathname === "/manufacturer" ||
    location.pathname === "/manufacturer/"
  ) {
    heading = "Manufacturer List";
  }

  return (
    <div className="w-full flex flex-col pt-2 pb-3 border-b border-gray-300">
      <div className="flex items-center space-x">
        <MdDashboard className="w-6 h-6 text-gray-600 flex-shrink-0" />
        <span className="flex items-center">
          <Link to="/dashboard" className="sr-only">
            Dashboard
          </Link>
          <span className="mx-1 text-gray-400">&gt;</span>
        </span>

        {breadcrumbs.map(
          (crumb, idx) =>
            crumb.label &&
            crumb.label.toLowerCase() !== "dashboard" &&
            (idx < breadcrumbs.length - 1 ? (
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
      <h2 className="mt-5 text-[20px] font-semibold text-black">{heading}</h2>
    </div>
  );
};

export default Header2;
