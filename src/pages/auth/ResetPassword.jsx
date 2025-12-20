// saumya
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import resetImage from "../../assets/amico.png";
import {
  resetPassword,
  clearAuthError,
} from "../../redux/slices/authslice";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.adminAuth);

  const mobile = location.state?.mobile;

  /* =====================
     SAFETY CHECK
  ===================== */
  useEffect(() => {
    if (!mobile) {
      alert("No mobile number found. Redirecting to forgot password page.");
      navigate("/forgetPassword");
    }
  }, [mobile, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearAuthError());

    // SAME validation
    if (!password || !confirmPassword) {
      return;
    }
    if (password.length < 6) {
      return;
    }
    if (password !== confirmPassword) {
      return;
    }

    const result = await dispatch(
      resetPassword({ mobile, newPassword: password })
    );

    if (result.meta.requestStatus === "fulfilled") {
      alert("Password reset successfully! Please log in.");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#7EC1B1] p-6">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl rounded-3xl overflow-hidden bg-white">

        {/* Left Image */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-12 bg-[#7EC1B1]">
          <img
            src={resetImage}
            alt="Reset Password"
            className="w-full max-w-xl h-auto object-contain"
          />
        </div>

        {/* Right Form */}
        <div className="flex-1 flex flex-col justify-center px-12 py-16 lg:py-24">
          <div className="max-w-md w-full mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-[#263138] mb-6 text-center">
              Reset Password
            </h1>

            <p className="text-gray-600 mb-12 text-center">
              Please enter your new password.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* New Password */}
              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="New Password (min 6 chars)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full px-6 py-5 border border-gray-300 rounded-xl bg-gray-100 focus:outline-none focus:ring-4 focus:ring-[#7EC1B1]"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  className="w-full px-6 py-5 border border-gray-300 rounded-xl bg-gray-100 focus:outline-none focus:ring-4 focus:ring-[#7EC1B1]"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-[#7EC1B1] text-white rounded-xl font-semibold hover:bg-[#68a998] transition disabled:bg-gray-400"
              >
                {loading ? "Resetting..." : "Done"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation }from "react-router-dom";
// import resetImage from "../../assets/amico.png"; // Illustration image
// import axios from "axios"; // Import axios

// function ResetPassword() {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState(""); // To show errors from the API
//   const [isLoading, setIsLoading] = useState(false); // For loading state

//   const navigate = useNavigate();
//   const location = useLocation(); // To get data from the previous page

//   // Get the mobile number passed from the VerifyOtp component
//   const mobile = location.state?.mobile;

//   // This is a "proper" check: if a user lands on this page
//   // without a mobile number, send them back to the start.
//   useEffect(() => {
//     if (!mobile) {
//       alert("No mobile number found. Redirecting to forgot password page.");
//       navigate("/forgetPassword");
//     }
//   }, [mobile, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(""); // Clear old errors

//     // Client-side validation
//     if (!password || !confirmPassword) {
//       setError("Please fill in both password fields.");
//       return;
//     }
//     if (password.length < 6) {
//       setError("Password must be at least 6 characters long.");
//       return;
//     }
//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // API call based on your document (page 20)
//       const response = await axios.post(
//         "https://ro-service-engineer-be.onrender.com/api/admin/reset-pass",
//         {
//           mobile: mobile,
//           newPassword: password, // The API requires the key "newPassword"
//         }
//       );

//       if (response.data.success) {
//         // On success, notify user and send to login page
//         alert("Password reset successfully! Please log in.");
//         navigate("/"); // Go to login page
//       } else {
//         // Show error from API (e.g., "An error occurred")
//         setError(response.data.message || "An unknown error occurred.");
//       }
//     } catch (err) {
//       // Handle network errors or other exceptions
//       console.error("Reset Password API Error:", err);
//       if (err.response && err.response.data && err.response.data.message) {
//         setError(err.response.data.message);
//       } else {
//         setError("An error occurred. Please try again.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#7EC1B1] p-6">
//       <div className="flex flex-col lg:flex-row w-full max-w-7xl rounded-3xl overflow-hidden bg-white">
//         {/* Left Side: Illustration */}
//         <div className="hidden lg:flex flex-1 items-center justify-center p-12 bg-[#7EC1B1]">
//           <img
//             src={resetImage}
//             alt="Reset Password"
//             className="w-full max-w-xl h-auto object-contain"
//           />
//         </div>

//         {/* Right Side: Reset Password Form */}
//         <div className="flex-1 flex flex-col justify-center px-12 py-16 lg:py-24">
//           <div className="max-w-md w-full mx-auto">
//             <h1 className="text-3xl md:text-4xl font-bold text-[#263138] mb-6 text-center">
//               Reset Password
//             </h1>
//             <p className="text-gray-600 mb-12 text-center">
//               Please enter your new password.
//             </p>

//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {/* New Password */}
//               <div>
//                 <label className="block mb-2 text-gray-700 font-medium">
//                   New Password
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="New Password (min 6 chars)"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-6 py-5 border border-gray-300 rounded-xl bg-gray-100 focus:outline-none focus:ring-4 focus:ring-[#7EC1B1] transition"
//                   disabled={isLoading}
//                 />
//               </div>

//               {/* Confirm Password */}
//               <div>
//                 <label className="block mb-2 text-gray-700 font-medium">
//                   Confirm Password
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="Confirm Password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="w-full px-6 py-5 border border-gray-300 rounded-xl bg-gray-100 focus:outline-none focus:ring-4 focus:ring-[#7EC1B1] transition"
//                   disabled={isLoading}
//                 />
//               </div>

//               {/* Error message will be displayed here */}
//               {error && (
//                 <p className="text-red-500 text-sm text-center">{error}</p>
//               )}

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full py-5 bg-[#7EC1B1] text-white rounded-xl font-semibold hover:bg-[#68a998] transition disabled:bg-gray-400"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Resetting..." : "Done"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ResetPassword;