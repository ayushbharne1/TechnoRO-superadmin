import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Layout
import Sidebar from "../components/superAdmin/sidebar/Sidebar";
import Header from "../components/superAdmin/header/Header";
import ResponsiveLayout from "./ResponsiveLayout";
import LoadingPage from "../pages/modules/LoadingPage";

// --- AUTH ---
import Login from "../pages/auth/Login";
// import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOtp from "../pages/auth/VerifyOtp";
import ResetPassword from "../pages/auth/ResetPassword";

// --- CORE ---
import Dashboard from "../pages/modules/dashboard/Dashboard";
import Profile from "../pages/modules/Profile/Profile";
import Setting from "../components/superAdmin/pages/Setting";

// --- SERVICES ---
import Services from "../pages/modules/services/Services";
import AddService from "../pages/modules/services/AddService";
import ServiceDetails from "../pages/modules/services/ServiceDetails";
import EditService from "../pages/modules/services/EditService";

// --- PRODUCT ---
import Product from "../pages/modules/product/Product";

import ViewProduct from "../pages/modules/product/ViewProduct";

import AddProduct from "../pages/modules/product/AddProduct";     // ✅ Import this
import UpdateProduct from "../pages/modules/product/UpdateProduct"; // ✅ Import this

// --- TIME SLOT ---
import TimeSlotAndDate from "../pages/modules/timeSlotAndDate/TimeSlotAndDate";
import AddTimeSlot from "../components/superAdmin/pages/AddTimeSlot";

// --- BANNERS & TESTIMONIAL ---
import Banner from "../pages/modules/Banners/Banner";
import Testimonial from "../pages/modules/Testimonial/Testimonial";
import TestimonialForm from "../pages/modules/Testimonial/TestimonialForm";
import EditTestimonial from "../pages/modules/Testimonial/EditTestimonial";

// --- ORDERS ---
import PendingOrders from "../components/superAdmin/pages/PendingOrders";
import CompleteOrders from "../components/superAdmin/pages/CompleteOrders";
import CompleteOrdersPreview from "../components/superAdmin/pages/CompleteOrdersPreview";
import CancelledOrder from "../components/superAdmin/pages/CancelledOrder";
import CancelledOrderPreview from "../components/superAdmin/pages/CancelledOrderPreview";

import Order from "../pages/modules/Order/Order";
import ViewOrder from "../pages/modules/Order/ViewOrder";
import AssignOrder from "../pages/modules/Order/AssignOrder";

// --- OFFERS ---
import Offers from "../pages/modules/Offers/Offers";
import AddOffers from "../pages/modules/Offers/AddOffers";

// --- NOTIFICATION in header---
import Notification from "../components/superAdmin/header/Notification";

// import SendNotification from "../components/superAdmin/pages/SendNotification";
import ChatWithUs from "../components/superAdmin/pages/ChatWithUs";

// --- HELP ---
import HelpAndSupport from "../pages/modules/Help&Support/HelpAndSupport";

// --- INVENTORY ---
import InventoryManagement from "../pages/modules/Inventory/InventoryManagement";
import Inventoryform from "../pages/modules/Inventory/Inventoryform";

// --- PAYMENT GATEWAY ---
import PaymentGateway from "../pages/modules/PaymentGateway/PaymentGateway";
import PaymentGatewayForm from "../pages/modules/PaymentGateway/PaymentGatewayForm";

// --- MANUFACTURER ---
import Manufacturer from "../pages/modules/Manufacturer/Manufacturer";
import AddManufacturer from "../pages/modules/Manufacturer/AddManufacture";
import EditManufacturer from "../pages/modules/Manufacturer/EditManufacturer";
import ViewManufacturer from "../pages/modules/Manufacturer/ViewManufacturer";

// --- VENDOR ---
import Vendor from "../pages/modules/Vendor/Vendor";
import AddVendor from "../pages/modules/Vendor/AddVendor";
import EditVendor from "../pages/modules/Vendor/EditVendor";
import ViewVendor from "../pages/modules/Vendor/ViewVendor";

// --- SERVICE ENGINEER ---
import Engineer from "../pages/modules/ServiceEngineer/Engineer";
import AddEngineer from "../pages/modules/ServiceEngineer/AddEngineer";
import EditEngineer from "../pages/modules/ServiceEngineer/EditEngineer";
import ViewEngineer from "../pages/modules/ServiceEngineer/ViewEngineer";

// --- CUSTOMERS ---
import Customer from "../pages/modules/customer/Customer";
import ViewCustomer from "../pages/modules/customer/ViewCustomer";

// --- LEAD MANAGEMENT ---
import LeadManagement from "../pages/modules/LeadManagement/Lead";
import LeadView from "../pages/modules/LeadManagement/ViewLead";
import AssignLead from "../pages/modules/LeadManagement/AssignLead";

//---- SEND NOTIFICATION AND MESSAGES
import SendNotification from "../pages/modules/Notification&Messages/SendNotification";

{
  /* //REPORT AND ANALYTICS */
}
import ReportAnalytics from "../pages/modules/Report&Analytics/Report";

import RolesAndPermissions from "../pages/modules/Roles&Permission/Roles";
import AddRole from "../pages/modules/Roles&Permission/AddRole";
import EditRole from "../pages/modules/Roles&Permission/EditRole";
import ViewRole from "../pages/modules/Roles&Permission/ViewRole";

import Messages from "../pages/modules/Message/Message";
import StartNewChat from "../pages/modules/Message/StartNewChat";
import ChatPage from "../pages/modules/Message/ChatPage";

import PopularCities from "../pages/modules/PopularCities/Popularcities";
import AddCity from "../pages/modules/PopularCities/AddCity"; 
import EditCity from "../pages/modules/PopularCities/EditCity";

const AdminLayout = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  // Hide sidebar and header on login and signup
  const isAuthPage = ["/", "/signup"].includes(location.pathname);

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      {!isAuthPage && <Sidebar />}

      <div className="flex flex-col flex-1 min-w-0 h-screen">
        {/* Header */}
        {!isAuthPage && <Header />}

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-white">
          <ResponsiveLayout>
            <div className="w-full h-full">
              <Routes>
              {/* AUTH */}
              <Route path="/" element={<Login />} />
              {/* <Route path="/signup" element={<SignUp />} /> */}
              <Route path="/forgetPassword" element={<ForgotPassword />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />
              <Route path="/resetpassword" element={<ResetPassword />} />

              {/* CORE */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Setting />} />

              {/* SERVICES */}
              <Route path="/services" element={<Services />} />

              <Route path="/services/addservice" element={<AddService />} />

              <Route path="/services/addservice" element={<AddService />} />

              <Route
                path="/services/servicedetails"
                element={<ServiceDetails />}
              />
              <Route path="/services/editservice" element={<EditService />} />

              {/* PRODUCT */}
              <Route path="/product" element={<Product />} />

              <Route path="/product/product-details" element={<ViewProduct />} />
              
              <Route path="/product/product-details/:productid" element={<ViewProduct />} />

              <Route path="/product/add-product" element={<AddProduct />} />
              <Route path="/product/edit-product/:productid" element={<UpdateProduct />} />

              {/* TIME SLOT */}
              <Route path="/time-slot" element={<TimeSlotAndDate />} />
              <Route path="/add-timeslot" element={<AddTimeSlot />} />

              {/* BANNERS & TESTIMONIAL */}
              <Route path="/banner" element={<Banner />} />
              <Route path="/Testimonial" element={<Testimonial />} />
              <Route path="/TestimonialForm" element={<TestimonialForm />} />
              <Route
                path="/edit-testimonial/:id"
                element={<EditTestimonial />}
              />

              {/* ORDERS */}
              <Route path="/pending-orders" element={<PendingOrders />} />
              <Route path="/CompleteOrders" element={<CompleteOrders />} />
              <Route
                path="/CompleteOrdersPreview"
                element={<CompleteOrdersPreview />}
              />
              <Route path="/CancelledOrder" element={<CancelledOrder />} />
              <Route
                path="/CancelledOrderPreview"
                element={<CancelledOrderPreview />}
              />

              <Route path="/order-management" element={<Order />} />
              <Route path="/order-management/view/:id" element={<ViewOrder />} />
              <Route path="/order-management/assign/:id" element={<AssignOrder />} />
              

              {/* OFFERS */}
              <Route path="/Offers" element={<Offers />} />
              <Route path="/add-offer" element={<AddOffers />} />

              {/* NOTIFICATION */}
              <Route path="/send-notification" element={<SendNotification />} />
              <Route path="/chatwithus/:id" element={<ChatWithUs />} />

              {/* HELP */}
              <Route path="/HelpSupport" element={<HelpAndSupport />} />

              {/* INVENTORY */}
              <Route
                path="/InventoryManagement"
                element={<InventoryManagement />}
              />
              <Route path="/Inventoryform" element={<Inventoryform />} />

              {/* PAYMENT GATEWAY */}
              <Route path="/PaymentGateway" element={<PaymentGateway />} />
              <Route
                path="/PaymentGatewayForm"
                element={<PaymentGatewayForm />}
              />

              {/* MANUFACTURER */}
              <Route path="/manufacturer" element={<Manufacturer />} />
              <Route
                path="/manufacturer/addmanufacturer"
                element={<AddManufacturer />}
              />
              <Route
                path="/manufacturer/editmanufacturer/:id"
                element={<EditManufacturer />}
              />
              <Route
                path="/manufacturer/viewmanufacturer/:id"
                element={<ViewManufacturer />}
              />

              {/* VENDOR */}
              <Route path="/vendors" element={<Vendor />} />
              <Route path="/vendors/addvendor" element={<AddVendor />} />
              <Route path="/vendors/editvendor/:id" element={<EditVendor />} />
              <Route path="/vendors/details/:id" element={<ViewVendor />} />

              {/* SERVICE ENGINEER */}
              <Route path="/service-engineer" element={<Engineer />} />
              <Route
                path="/service-engineer/add-engineer"
                element={<AddEngineer />}
              />
              <Route
                path="/service-engineer/edit/:id"
                element={<EditEngineer />}
              />
              <Route
                path="/service-engineer/view/:id"
                element={<ViewEngineer />}
              />

              {/* CUSTOMER */}
              <Route path="/customers" element={<Customer />} />
              <Route
                path="/customers/view-customer/:id"
                element={<ViewCustomer />}
              />

              {/* LEAD MANAGEMENT */}
              <Route path="/lead-management" element={<LeadManagement />} />
              <Route path="/lead-management/view/:id" element={<LeadView />} />
              <Route
                path="/lead-management/view/assign-lead"
                element={<AssignLead />}
              />

              {/* {SEND NOTIFICATIONS} */}
              <Route path="/send-notification" element={<SendNotification />} />

              {/* //REPORT AND ANALYTICS */}
              <Route path="/report-analytics" element={<ReportAnalytics />} />

              <Route
                path="/roles-permission"
                element={<RolesAndPermissions />}
              />
              <Route
                path="/roles-permission/create-sub-admin"
                element={<AddRole />}
              />
              <Route
                path="/roles-permission/edit-sub-admin/:id"
                element={<EditRole />}
              />
              <Route
                path="/roles-permission/view-sub-admin/:id"
                element={<ViewRole />}
              />

              <Route path="/message" element={<Messages />} />

              <Route path="/message/newchat" element={<StartNewChat />} />

              <Route path="/message/newchat/chat" element={<ChatPage />} />

              <Route path="/notifications" element={<Notification />} />

        
              <Route path="/popular-cities" element={<PopularCities />} />    
              <Route path="/popular-cities/add-new-city" element={<AddCity />} />
              <Route path="/popular-cities/edit-city/:id" element={<EditCity />} />
                    
            </Routes>
            </div>
          </ResponsiveLayout>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
