// saumya
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import verificationImage from "../../assets/Verify-OTP.png";
import {
  verifyForgotOtp,
  sendForgotOtp,
  clearAuthError,
} from "../../redux/slices/authslice";

export default function VerifyOtp() {
  // OTP state (6 digits)
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

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

  /* =====================
     AUTO FOCUS
  ===================== */
  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  }, []);

  /* =====================
     INPUT HANDLERS
  ===================== */
  const handleChange = (e, index) => {
    if (loading) return;
    const value = e.target.value;

    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (loading) return;
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    if (loading) return;
    e.preventDefault();

    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d{6}$/.test(pasteData)) {
      setOtp(pasteData.split(""));
      inputRefs.current[5].focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  /* =====================
     VERIFY OTP
  ===================== */
  const handleVerify = async () => {
    if (!isOtpComplete || loading) return;

    dispatch(clearAuthError());
    const finalOtp = otp.join("");

    const result = await dispatch(
      verifyForgotOtp({ mobile, otp: finalOtp })
    );

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/resetpassword", { state: { mobile } });
    } else {
      setOtp(Array(6).fill(""));
      inputRefs.current[0].focus();
    }
  };

  /* =====================
     RESEND OTP
  ===================== */
  const handleResend = async () => {
    if (loading) return;
    dispatch(clearAuthError());
    await dispatch(sendForgotOtp({ mobile }));
  };

  return (
    <main className="min-h-screen bg-[#7EC1B1] flex items-center justify-center p-6">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl rounded-3xl overflow-hidden bg-white">

        {/* Left Image */}
        <div className="hidden lg:flex flex-1 bg-[#7EC1B1] items-center justify-center p-12">
          <img
            src={verificationImage}
            alt="OTP Verification"
            className="w-full h-full max-w-xl object-contain"
          />
        </div>

        {/* Right Form */}
        <div className="flex-1 flex flex-col justify-center px-12 py-16 lg:py-24">
          <div className="max-w-md w-full mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#263138] mb-6">
              Verify OTP
            </h1>

            <p className="text-gray-600 mb-12 text-base">
              Please enter the 6-digit code sent to your mobile number.
            </p>

            {/* OTP INPUTS */}
            <div
              className="flex justify-center gap-2 sm:gap-4 mb-8"
              onPaste={handlePaste}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  disabled={loading}
                  className="w-12 h-12 sm:w-16 sm:h-16 text-center text-2xl sm:text-3xl font-semibold border-2 border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#7EC1B1]"
                />
              ))}
            </div>

            {error && <p className="text-red-500 text-sm mb-6">{error}</p>}

            {/* VERIFY BUTTON */}
            <button
              onClick={handleVerify}
              disabled={!isOtpComplete || loading}
              className={`w-full py-5 rounded-xl text-white font-semibold text-lg ${
                isOtpComplete && !loading
                  ? "bg-[#7EC1B1] hover:bg-[#68a998]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>

            {/* RESEND */}
            <p className="text-gray-500 text-sm mt-6">
              Didn’t receive the code?{" "}
              <span
                onClick={handleResend}
                className="text-[#82a89f] hover:underline cursor-pointer"
              >
                Resend OTP
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

// sir
// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import verificationImage from "../../assets/Verify-OTP.png";
// import axios from "axios";

// export default function VerifyOtp() {
//   // 1. Initialize state for 6 digits instead of 4
//   const [otp, setOtp] = useState(Array(6).fill(""));
//   const inputRefs = useRef([]);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const mobile = location.state?.mobile;

//   useEffect(() => {
//     if (!mobile) {
//       alert("No mobile number found. Redirecting to forgot password page.");
//       navigate("/forgetPassword");
//     }
//   }, [mobile, navigate]);

//   useEffect(() => {
//     if (inputRefs.current[0]) inputRefs.current[0].focus();
//   }, []);

//   const handleChange = (e, index) => {
//     if (isLoading) return;
//     const value = e.target.value;
//     if (/^[0-9]$/.test(value) || value === "") {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
//       // 2. Move focus up to the 5th index (the last input)
//       if (value !== "" && index < 5) inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (isLoading) return;
//     if (e.key === "Backspace" && otp[index] === "" && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     if (isLoading) return;
//     e.preventDefault();
//     // 3. Handle a 6-digit paste
//     const pasteData = e.clipboardData.getData("text").slice(0, 6);
//     if (/^\d{6}$/.test(pasteData)) {
//       const newOtp = pasteData.split("");
//       setOtp(newOtp);
//       inputRefs.current[5].focus();
//     }
//   };

//   const isOtpComplete = otp.every((digit) => digit !== "");

//   const handleVerify = async () => {
//     if (!isOtpComplete || isLoading) return;

//     setIsLoading(true);
//     setError("");
//     const finalOtp = otp.join("");

//     try {
//       // The API endpoint expects a 6-digit OTP
//       const response = await axios.post(
//         "https://ro-service-engineer-be.onrender.com/api/admin/forgot-pass/verify-otp",
//         {
//           mobile: mobile,
//           otp: finalOtp,
//         }
//       );

//       if (response.data.success) {
//         navigate("/resetpassword", { state: { mobile: mobile } });
//       } else {
//         setError(response.data.message || "Invalid OTP. Please try again.");
//         setOtp(Array(6).fill(""));
//         inputRefs.current[0].focus();
//       }
//     } catch (err) {
//       console.error("Verify OTP Error:", err);
//       if (err.response && err.response.data && err.response.data.message) {
//         setError(err.response.data.message);
//       } else {
//         setError("Verification failed. Please try again.");
//       }
//       setOtp(Array(6).fill(""));
//       inputRefs.current[0].focus();
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     if (isLoading) return;
//     setIsLoading(true);
//     setError("");
//     try {
//       await axios.post(
//         "https://ro-service-engineer-be.onrender.com/api/admin/forgot-pass/send-otp",
//         { mobile: mobile }
//       );
//     } catch (err) {
//       console.error("Resend OTP Error:", err);
//       if (err.response && err.response.data && err.response.data.message) {
//         setError(err.response.data.message);
//       } else {
//         setError("Failed to resend OTP. Please try again.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[#7EC1B1] flex items-center justify-center p-6">
//       <div className="flex flex-col lg:flex-row w-full max-w-7xl rounded-3xl overflow-hidden bg-white">
//         {/* Left side - Image */}
//         <div className="hidden lg:flex flex-1 bg-[#7EC1B1] items-center justify-center p-12">
//           <img
//             src={verificationImage}
//             alt="OTP Verification"
//             className="w-full h-full max-w-xl object-contain"
//           />
//         </div>

//         {/* Right side - Form */}
//         <div className="flex-1 flex flex-col justify-center px-12 py-16 lg:py-24">
//           <div className="max-w-md w-full mx-auto text-center">
//             <h1 className="text-3xl md:text-4xl font-bold text-[#263138] mb-6">
//               Verify OTP
//             </h1>
//             {/* 4. Updated text to ask for a 6-digit code */}
//             <p className="text-gray-600 mb-12 text-base">
//               Please enter the 6-digit code sent to your mobile number.
//             </p>

//             {/* OTP Inputs - This now renders 6 boxes */}
//             <div className="flex justify-center gap-2 sm:gap-4 mb-8" onPaste={handlePaste}>
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   ref={(el) => (inputRefs.current[index] = el)}
//                   type="text"
//                   maxLength="1"
//                   value={digit}
//                   onChange={(e) => handleChange(e, index)}
//                   onKeyDown={(e) => handleKeyDown(e, index)}
//                   disabled={isLoading}
//                   className="w-12 h-12 sm:w-16 sm:h-16 text-center text-2xl sm:text-3xl font-semibold border-2 border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#7EC1B1] transition"
//                 />
//               ))}
//             </div>

//             {error && <p className="text-red-500 text-sm mb-6">{error}</p>}

//             {/* Verify Button */}
//             <button
//               onClick={handleVerify}
//               disabled={!isOtpComplete || isLoading}
//               className={`w-full py-5 rounded-xl text-white font-semibold text-lg transition-all duration-300 ${
//                 isOtpComplete && !isLoading
//                   ? "bg-[#7EC1B1] hover:bg-[#68a998]"
//                   : "bg-gray-400 cursor-not-allowed"
//               }`}
//             >
//               {isLoading ? "Verifying..." : "Verify"}
//             </button>

//             {/* Resend OTP */}
//             <p className="text-gray-500 text-sm mt-6">
//               Didn’t receive the code?{" "}
//               <span
//                 onClick={handleResend}
//                 className="text-[#82a89f] hover:underline cursor-pointer"
//               >
//                 Resend OTP
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }