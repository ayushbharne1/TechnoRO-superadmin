// saumya
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ResetPassword from "./pages/auth/ResetPassword";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*  PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        {/*  PROTECTED ROUTES */}
        <Route path="/*" element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// sir
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/auth/Login";
// // import UserLayout from "./layouts/UserLayout";
// import AdminLayout from "./layouts/AdminLayout";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import VerifyOtp from "./pages/auth/VerifyOtp"
// import ResetPassword from "./pages/auth/ResetPassword";


// function App() {
//   return (
//     <BrowserRouter>
//       {/* Wrap everything in hide-scrollbar */}
//       <div className="hide-scrollbar h-screen">
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Login />} />
//           <Route path="/forgetPassword" element={<ForgotPassword />} />
//           <Route path="/verify-otp" element={<VerifyOtp />} />
//           <Route path="/resetpassword" element={<ResetPassword />} />



//           {/* User Routes */}
//           {/* <Route path="/user/*" element={<UserLayout />} /> */}

//           {/* Admin Routes */}
//           <Route path="/*" element={<AdminLayout />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

