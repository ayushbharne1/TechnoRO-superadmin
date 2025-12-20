

// import { useState } from 'react';
// import SignupImg from "../../assets/Signup.png";
// import { Link } from "react-router-dom";
// import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

// const SignUp = () => {
//     const [email, setEmail] = useState('');
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [termsAccepted, setTermsAccepted] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [errors, setErrors] = useState({});

//     const handleSignup = () => {
//         let newErrors = {};

//         if (!email.trim()) {
//             newErrors.email = "Email is required";
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//             newErrors.email = "Enter a valid email address";
//         }

//         if (!username.trim()) newErrors.username = "Username is required";
//         if (!password.trim()) newErrors.password = "Password is required";
//         if (!termsAccepted) newErrors.terms = "You must accept terms and conditions";

//         setErrors(newErrors);

//         if (Object.keys(newErrors).length === 0) {
//             console.log({ email, username, password, termsAccepted });
//         }
//     };

//     return (
//         <div className="min-h-screen bg-[#7EC1B1] flex items-center justify-center p-4">
//             <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-lg w-full max-w-6xl overflow-hidden">
                
//                 {/* Right Side - Signup Image */}
//                 <div className="hidden lg:flex flex-1 items-center justify-center bg-[#7EC1B1]">
//                     <img src={SignupImg} alt="Signup Illustration" className="w-full h-auto max-w-md object-contain" />
//                 </div>

//                 {/* Left Side - Signup Form */}
//                 <div className="flex-1 px-6 md:px-10 py-10 md:py-20 flex flex-col justify-center items-center">
//                     <h2 className="text-2xl md:text-3xl font-semibold text-black mb-2">Create an Account</h2>
//                     <p className="text-center md:text-left mb-6 text-gray-600">Create an account to continue</p>

//                     <div className="w-full max-w-md space-y-6">
//                         {/* Email */}
//                         <div className='flex flex-col gap-2'>
//                             <label htmlFor="email" className='text-lg md:text-xl'>Email Address</label>
//                             <input
//                                 id="email"
//                                 type="email"
//                                 placeholder="Email"
//                                 className="h-14 md:h-16 text-black border p-3 rounded-lg w-full"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                             {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//                         </div>

//                         {/* Username */}
//                         <div className='flex flex-col gap-2'>
//                             <label htmlFor="username" className='text-lg md:text-xl'>Username</label>
//                             <input
//                                 id="username"
//                                 type="text"
//                                 placeholder="Username"
//                                 className="h-14 md:h-16 text-black border p-3 rounded-lg w-full"
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                             />
//                             {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
//                         </div>

//                         {/* Password */}
//                         <div className='flex flex-col gap-2'>
//                             <label htmlFor="password" className='text-lg md:text-xl'>Password</label>
//                             <div className="relative w-full">
//                                 <input
//                                     id="password"
//                                     type={showPassword ? "text" : "password"}
//                                     placeholder="Password"
//                                     className="h-14 md:h-16 text-gray-600 border px-4 w-full rounded-lg pr-12"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                 />
//                                 <span
//                                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
//                                     onClick={() => setShowPassword(!showPassword)}
//                                 >
//                                     {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
//                                 </span>
//                             </div>
//                             {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//                         </div>
//                     </div>

//                     {/* Terms Checkbox */}
//                     <div className="w-full max-w-md flex items-center mt-3 text-sm md:text-base">
//                         <label className="flex items-center space-x-2">
//                             <input
//                                 type="checkbox"
//                                 checked={termsAccepted}
//                                 onChange={() => setTermsAccepted(!termsAccepted)}
//                                 className="accent-violet-600"
//                             />
//                             <span>I accept terms and conditions</span>
//                         </label>
//                     </div>
//                     {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}

//                     {/* Sign Up Button */}
//                     <button
//                         onClick={handleSignup}
//                         className="w-full h-14 md:h-16 max-w-md bg-[#7EC1B1] text-white rounded-lg mt-6 text-lg md:text-xl"
//                     >
//                         Sign Up
//                     </button>

//                     {/* Login Link */}
//                     <p className="mt-5 text-center md:text-left text-sm md:text-base">
//                         Already have an account?{" "}
//                         <Link to="/" className="text-blue-500 underline">
//                             Login
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignUp;
