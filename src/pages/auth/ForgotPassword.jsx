 // saumya
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import forgotpassword from "../../assets/Forgot-Password.png";
import { useDispatch, useSelector } from "react-redux";
import { sendForgotOtp, clearAuthError } from "../../redux/slices/authslice";

const ForgotPassword = () => {
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //  Get loading & error from Redux
  const { loading, error } = useSelector((state) => state.adminAuth);

  //  Mobile validation (UNCHANGED)
  const validateMobile = (mobile) => /^[0-9]{10}$/.test(mobile);

  const handleGetOtp = async (e) => {
    e.preventDefault();
    dispatch(clearAuthError());

    if (!mobile.trim()) {
      return;
    }

    if (!validateMobile(mobile)) {
      return;
    }

    //  Call Redux thunk
    const result = await dispatch(sendForgotOtp({ mobile }));

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/verify-otp", { state: { mobile } });
    }
  };

  return (
    <div className="min-h-screen bg-[#7EC1B1] flex items-center justify-center p-6">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl rounded-3xl overflow-hidden bg-white">

        {/* Left Image */}
        <div className="hidden lg:flex flex-1 bg-[#7EC1B1] items-center justify-center p-12">
          <img
            src={forgotpassword}
            alt="Forgot Password Illustration"
            className="w-full h-full max-w-xl object-contain"
          />
        </div>

        {/* Right Form */}
        <div className="flex-1 flex flex-col justify-center px-12 py-16 lg:py-24">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#263138] text-center mb-6">
              Forgot Password?
            </h2>

            <p className="text-gray-600 mb-12 text-center">
              Please enter your registered mobile number to continue.
            </p>

            <form className="space-y-6" onSubmit={handleGetOtp}>
              {/* Mobile Input */}
              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  className={`w-full px-6 py-5 bg-gray-100 border rounded-xl ${
                    error
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-[#7EC1B1]"
                  }`}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  disabled={loading}
                />
                {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="block w-full bg-[#7EC1B1] text-white py-5 rounded-xl font-semibold hover:bg-[#68a998] transition disabled:bg-gray-400"
              >
                {loading ? "Sending OTP..." : "Get OTP"}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center text-gray-500 mt-10">
              Remember password?
              <a href="/" className="text-blue-500 hover:underline ml-2 font-medium">
                Login
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

// sir
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import forgotpassword from "../../assets/Forgot-Password.png";
// import axios from "axios";

// const ForgotPassword = () => {
//   // 1. State changed from 'email' to 'mobile'
//   const [mobile, setMobile] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   // 2. Validation logic now correctly checks for a 10-digit mobile number
//   const validateMobile = (mobile) => {
//     const re = /^[0-9]{10}$/;
//     return re.test(String(mobile));
//   };

//   const handleGetOtp = async (e) => {
//     e.preventDefault();

//     if (!mobile.trim()) {
//       setError("Please enter your mobile number");
//       return;
//     }
//     if (!validateMobile(mobile)) {
//       setError("Please enter a valid 10-digit mobile number");
//       return;
//     }

//     setError("");
//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         "https://ro-service-engineer-be.onrender.com/api/admin/forgot-pass/send-otp",
//         {
//           mobile: mobile,
//         }
//       );

//       if (response.data.success) {
//         navigate("/verify-otp", { state: { mobile: mobile } });
//       } else {
//         setError(response.data.message || "An error occurred. Please try again.");
//       }
//     } catch (err) {
//       if (err.response && err.response.data && err.response.data.message) {
//         setError(err.response.data.message);
//       } else {
//         setError("Failed to send OTP. Please check your network and try again.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#7EC1B1] flex items-center justify-center p-6">
//       <div className="flex flex-col lg:flex-row w-full max-w-7xl rounded-3xl overflow-hidden bg-white">
//         {/* Left Side - Image */}
//         <div className="hidden lg:flex flex-1 bg-[#7EC1B1] items-center justify-center p-12">
//           <img
//             src={forgotpassword}
//             alt="Forgot Password Illustration"
//             className="w-full h-full max-w-xl object-contain"
//           />
//         </div>

//         {/* Right Side - Form */}
//         <div className="flex-1 flex flex-col justify-center px-12 py-16 lg:py-24">
//           <div className="max-w-md w-full mx-auto">
//             <h2 className="text-3xl md:text-4xl font-bold text-[#263138] text-center mb-6">
//               Forgot Password?
//             </h2>
//             {/* 3. UI text updated for clarity */}
//             <p className="text-gray-600 mb-12 text-center">
//               Please enter your registered mobile number to continue.
//             </p>

//             <form className="space-y-6" onSubmit={handleGetOtp}>
//               {/* Mobile Number Input */}
//               <div className="text-left">
//                 <label
//                   htmlFor="mobile"
//                   className="block mb-2 text-gray-700 font-medium"
//                 >
//                   Mobile Number
//                 </label>
//                 <input
//                   id="mobile"
//                   // 4. Input type changed to "tel" for better mobile usability
//                   type="tel"
//                   placeholder="10-digit mobile number"
//                   className={`w-full px-6 py-5 bg-gray-100 border rounded-xl focus:outline-none focus:ring-4 transition ${
//                     error
//                       ? "border-red-500 focus:ring-red-400"
//                       : "border-gray-300 focus:ring-[#7EC1B1]"
//                   }`}
//                   value={mobile}
//                   onChange={(e) => setMobile(e.target.value)}
//                   disabled={isLoading}
//                 />
//                 {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
//               </div>

//               {/* Get OTP Button */}
//               <button
//                 type="submit"
//                 className="block w-full bg-[#7EC1B1] text-white py-5 rounded-xl text-center font-semibold hover:bg-[#68a998] transition disabled:bg-gray-400"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Sending OTP..." : "Get OTP"}
//               </button>
//             </form>

//             {/* Footer Link */}
//             <div className="text-center text-gray-500 mt-10">
//               Remember password?
//               <a
//                 href="/"
//                 className="text-blue-500 hover:underline ml-2 font-medium"
//               >
//                 Login
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;