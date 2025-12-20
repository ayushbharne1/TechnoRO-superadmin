// Saumya
import { useState } from "react";
import LoginImg from "../../assets/loginimg.png";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../redux/slices/authslice";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.adminAuth);

  const handleLogin = async () => {
    let newErrors = {};

    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const result = await dispatch(adminLogin({ mobile, password }));

      if (result.meta.requestStatus === "fulfilled") {
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#7EC1B1] flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row bg-white rounded-2xl w-full max-w-6xl overflow-hidden">

        {/* Left Image */}
        <div className="hidden lg:flex flex-1 items-center justify-center bg-[#7EC1B1]">
          <img src={LoginImg} alt="Login" className="w-full max-w-md" />
        </div>

        {/* Login Form */}
        <div className="flex-1 px-6 md:px-10 py-10 md:py-20 flex flex-col items-center">
          <h2 className="text-3xl font-semibold mb-3">Welcome to Admin Panel</h2>
          <p className="text-gray-600 mb-8 text-center">
            Please enter your mobile and password to continue
          </p>

          <div className="w-full max-w-md space-y-6">

            {/* Mobile */}
            <div>
              <label className="text-[#263138]">Mobile Number</label>
              <input
                type="tel"
                placeholder="10-digit Mobile Number"
                className="h-14 border p-4 rounded-lg w-full"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={loading}
              />
              {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between">
                <label className="text-[#263138]">Password</label>
                <Link to="/forgetPassword" className="text-blue-500 text-sm">
                  Forget Password?
                </Link>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="h-14 border p-4 rounded-lg w-full pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                </span>
              </div>

              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            {/* Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full h-14 bg-[#7EC1B1] text-white rounded-lg text-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


// sir
// import { useState } from "react";
// import LoginImg from "../../assets/loginimg.png";
// import { Link, useNavigate } from "react-router-dom";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import axios from "axios";

// const Login = () => {
//   // 1. Renamed state for clarity
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     let newErrors = {};

//     // 2. Updated validation to match API requirements for a 10-digit number
//     if (!mobile.trim()) {
//       newErrors.mobile = "Mobile number is required";
//     } else if (!/^[0-9]{10}$/.test(mobile)) {
//       newErrors.mobile = "Enter a valid 10-digit mobile number";
//     }

//     if (!password.trim()) {
//       newErrors.password = "Password is required";
//     }

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       setIsLoading(true);
//       setErrors({});

//       try {
//         const response = await axios.post(
//           "https://ro-service-engineer-be.onrender.com/api/admin/login",
//           {
//             mobile: mobile,
//             password: password,
//           }
//         );

//         if (response.data.success) {
//           localStorage.setItem("adminToken", response.data.token);
//           navigate("/dashboard");
//         } else {
//           setErrors({ api: response.data.message || "An unknown error occurred." });
//         }
//       } catch (error) {
//         if (error.response && error.response.data && error.response.data.message) {
//           setErrors({ api: error.response.data.message });
//         } else {
//           setErrors({ api: "Login failed. Please check your credentials or network." });
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#7EC1B1] flex items-center justify-center p-4">
//       <div className="flex flex-col lg:flex-row bg-white rounded-2xl w-full max-w-6xl overflow-hidden">
//         {/* Left - Image */}
//         <div className="hidden lg:flex flex-1 items-center justify-center bg-[#7EC1B1]">
//           <img
//             src={LoginImg}
//             alt="Login Illustration"
//             className="w-full h-auto max-w-md object-contain"
//           />
//         </div>

//         {/* Right - Login Form */}
//         <div className="flex-1 px-6 md:px-10 py-10 md:py-20 flex flex-col justify-center items-center">
//           <h2 className="text-2xl md:text-3xl font-semibold text-black mb-3 text-center">
//             Welcome to Admin Panel
//           </h2>
//           <p className="text-gray-600 mb-8 text-center">
//             Please enter your mobile and password to continue
//           </p>

//           <div className="w-full max-w-md space-y-6">
//             {/* Mobile Number Input */}
//             <div className="flex flex-col gap-2">
//               {/* 3. Updated UI text for clarity */}
//               <label htmlFor="mobile" className="text-base md:text-base text-[#263138]">
//                 Mobile Number
//               </label>
//               <input
//                 id="mobile"
//                 type="tel" // Use "tel" for mobile numbers
//                 placeholder="10-digit Mobile Number"
//                 className="h-14 md:h-16 text-black border p-4 rounded-lg w-full"
//                 value={mobile}
//                 onChange={(e) => setMobile(e.target.value)}
//                 disabled={isLoading}
//               />
//               {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
//             </div>

//             {/* Password (unchanged) */}
//             <div className="flex flex-col gap-2">
//               <div className="flex justify-between items-center">
//                 <label htmlFor="password" className="text-base md:text-base text-[#263138]">
//                   Password
//                 </label>
//                 <Link
//                   to="/forgetPassword"
//                   className="text-sm md:text-base text-[#007AFF] hover:underline"
                  
//                 >
//                   Forget Password?
//                 </Link>
//               </div>
//               <div className="relative">
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   className="h-14 md:h-16 text-black border p-4 rounded-lg w-full pr-12"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   disabled={isLoading}
//                 />
//                 <span
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
//                 </span>
//               </div>
//               {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//             </div>

//             {/* Remember Me (unchanged) */}
//             <label className="flex items-center gap-2 text-black">
//               <input
//                 type="checkbox"
//                 checked={rememberMe}
//                 onChange={() => setRememberMe(!rememberMe)}
//               />
//               Remember Me
//             </label>

//             {errors.api && <p className="text-red-500 text-sm text-center">{errors.api}</p>}

//             {/* Login Button (unchanged) */}
//             <button
//               onClick={handleLogin}
//               className="w-full h-14 md:h-16 bg-[#7EC1B1] hover:bg-[#68a998] text-white font-medium rounded-lg transition text-lg md:text-xl mt-4"
//               disabled={isLoading}
//             >
//               {isLoading ? "Logging in..." : "Login"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;