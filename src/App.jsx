import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
// import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOtp from "./pages/auth/VerifyOtp"
import ResetPassword from "./pages/auth/ResetPassword";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        <BrowserRouter>
      {/* Wrap everything in hide-scrollbar */}
      <div className="hide-scrollbar h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} /> 
          <Route path="/forgetPassword" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          {/* User Routes */}
          {/* <Route path="/user/*" element={<UserLayout />} /> */}

          {/* Admin Routes */}
          {/* ✅ FIX: Added "/*" here. This matches everything else and lets AdminLayout define sub-routes */}
          <Route path="/*" element={<AdminLayout />} />
          
        </Routes>
      </div>
    </BrowserRouter>
    </>

  );
}

export default App;