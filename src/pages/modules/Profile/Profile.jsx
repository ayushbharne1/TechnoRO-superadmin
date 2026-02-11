// src/pages/Profile.jsx - VERIFIED AND CORRECTED
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header2 from "../../../components/superAdmin/header/Header2";
import logoImage from "../../../assets/51a2667788ebcdbeeab9f107b69a80d1053e1aa1.jpg";
import { FiPhone, FiMail, FiEdit } from "react-icons/fi";
// import Icon from "../../../assets/logo.png";
import SuccessIcon from "../../../assets/logo.png";
import { FiX } from "react-icons/fi";
import { FiSave } from "react-icons/fi";
import MdiIcon from "@mdi/react";
import { mdiImageEditOutline } from "@mdi/js";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
} from "../../../redux/slices/adminProfileSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminProfile = useSelector((state) => state.adminProfile || {});
  const { profile, loading } = adminProfile;
  const isLoading = loading ?? false;
  const [userImage, setUserImage] = useState(logoImage);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const fileInputRef = useRef(null);

  //
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/");
      return;
    }
    dispatch(fetchAdminProfile());
  }, [dispatch, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        name: profile.name,
        mobile: profile.mobile,
        email: profile.email,
      }));
      // if (profile.picture) {
      //   setUserImage(profile.picture);
      // }

      //
      if (profile.picture && profile.picture.startsWith("http")) {
        setUserImage(profile.picture);
      }

      //
    }
  }, [profile]);
  //

  //
  const handleSave = () => {
    const updateData = new FormData();
    updateData.append("name", formData.name);
    updateData.append("mobile", formData.mobile);
    updateData.append("email", formData.email);

    if (imageFile) {
      updateData.append("avatar", imageFile);
    }

    setError("");

    dispatch(updateAdminProfile(updateData)).then((res) => {
      if (!res.error) {
        setIsEditing(false);
      }
    });
  };
  //

  //
  const handlePasswordSubmit = () => {
    setPasswordError("");

    if (formData.newPassword !== formData.confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }

    if (formData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    dispatch(
      changeAdminPassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      })
    ).then((res) => {
      if (!res.error) {
        setIsPasswordModalOpen(false);
        setIsSuccessModalOpen(true);
      }
    });
  };

  //

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setUserImage(URL.createObjectURL(file));
    }
  };

  //

  //

  const handleLoginAgain = () => {
    setIsSuccessModalOpen(false);
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  const handleEdit = () => setIsEditing(true);

  return (
    <>


      <div className="w-full bg-white">
        <div className="mb-6 p-4 bg-white ">
        <Header2 />
      </div>
        <div className="px-4 sm:px-6 md:px-8 py-6 mt-2 w-full mx-auto relative">
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="absolute top-4 right-4 border border-[#7EC1B1] text-[#7EC1B1] px-3 sm:px-4 py-2 rounded-md flex items-center gap-2 text-sm sm:text-base hover:bg-[#7EC1B1] hover:text-white transition cursor-pointer whitespace-nowrap"
            >
              <FiEdit className="w-4 h-4 sm:w-5 sm:h-5" />
              Edit Profile Info
            </button>
          )}

          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
            <div
              className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer"
              onClick={handleImageClick}
            >
              {/* <img
                src={userImage}
                alt="Profile"
                className={`w-[90px] h-[90px] sm:w-[160px] sm:h-[160px] rounded-full border border-gray-300 object-cover ${
                  isEditing ? "hover:opacity-80 transition" : ""
                }`}
              />
              
              {isEditing && (
                <p className="text-sm sm:text-base text-gray-500 mt-1">
                  Click to change
                </p>
             

              )} */}

              {/*  */}
              <div className="relative inline-block">
                <img
                  src={userImage}
                  alt="Profile"
                  className={`w-[90px] h-[90px] sm:w-[160px] sm:h-[160px] rounded-full border border-gray-300 object-cover ${
                    isEditing ? "hover:opacity-80 transition" : ""
                  }`}
                />

                {/* Edit icon on image */}
                {isEditing && (
                  <div
                    // onClick={handleImageClick}
                    className="
        absolute bottom-1 right-1
        w-[40px] h-[40px]
        flex items-center justify-center
        rounded-full
        bg-[#7EC1B1]
        p-2
        cursor-pointer
      "
                  >
                    <MdiIcon
                      path={mdiImageEditOutline}
                      size={1}
                      color="#ffffff"
                    />
                  </div>
                )}
              </div>

              {/*  */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/*Edit profile   */}

            <div className="flex-1 flex flex-col gap-6 w-full">
              {isEditing ? (
                <>
                  <div>
                    {/* <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                      Name
                    </label> */}
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="
    w-[510px] h-[64px]
    bg-[#F5F5F5]
    border border-[#606060]
    px-4 py-2
    rounded-md

    font-poppins
    font-semibold
    text-[32px]
    leading-[32px]
    tracking-normal
    text-[#263138]

    
    focus:outline-none
  "
                    />
                  </div>

                  <div>
                    <label
                      className="
    w-[860px] h-[30px]
    flex items-center gap-2
    opacity-100
    font-poppins
    font-medium
    text-base
    text-[#263138]
  "
                    >
                      <FiPhone className="text-[#7EC1B1] text-lg" />
                      Contact
                    </label>

                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="
    w-[510px] h-[56px]
    bg-[#F5F5F5]
    border border-[#606060]
    px-4
    rounded-md

    font-poppins
    text-base
    text-[#263138]
    placeholder:text-[#9E9E9E]

    focus:outline-none
  "
                    />
                  </div>

                  <div>
                    <label
                      className="
    flex items-center gap-2
    h-[30px]
    font-poppins
    font-normal
    text-[20px]
    leading-[20px]
    text-[#263138]
  "
                    >
                      <FiMail className="text-[#7EC1B1] text-[18px]" />
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="
    w-[510px] h-[56px]
    bg-[#F5F5F5]
    border border-[#606060]
    px-4
    rounded-md

    font-poppins
    text-base
    text-[#263138]
    placeholder:text-[#9E9E9E]

    focus:outline-none
  "
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  )}
                  {/* <div className="mt-4 sm:mt-6 flex justify-center">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="bg-[#7EC1B1] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md text-sm sm:text-lg hover:bg-[#66b0a0] transition cursor-pointer w-full sm:w-auto disabled:bg-gray-400"
                    >
                      {isLoading ? "Saving..." : "Save"}
                    </button>
                  </div> */}
                  <div className="absolute top-0 right-0 mt-4 sm:mt-6">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="
    w-[150px] h-[40px]
    flex items-center justify-center gap-2

    px-4 py-2
    rounded-[8px]
    border border-[#7EC1B1]
    bg-white

    font-poppins
    font-medium
    text-[16px]
    leading-[16px]
    text-[#7EC1B1]

    opacity-100
   hover:bg-[#F1FAF8]
    transition
    disabled:bg-gray-400"
                    >
                      <FiSave className="w-6 h-6 text-[#7EC1B1] group-hover:text-white" />
                      {isLoading ? "Saving..." : "Save Info"}
                    </button>
                  </div>
                </>
              ) : (
                //

                <>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {formData.name || "Loading..."}
                  </h2>

                  <div className="flex flex-col mt-2">
                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-1 text-sm sm:text-lg">
                      <FiPhone className="text-[#7EC1B1] text-base sm:text-xl" />
                      Contact
                    </label>
                    <span className="text-blue-600 text-sm sm:text-lg">
                      {formData.mobile}
                    </span>
                  </div>

                  <div className="flex flex-col mt-2 sm:mt-4">
                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-1 text-sm sm:text-lg">
                      <FiMail className="text-[#7EC1B1] text-base sm:text-xl" />
                      Email
                    </label>
                    <span className="text-blue-600 text-sm sm:text-lg">
                      {formData.email}
                    </span>
                  </div>

                  <div className="mt-4 flex justify-center md:justify-center">
                    <button
                      onClick={() => setIsPasswordModalOpen(true)}
                      className="bg-[#7EC1B1] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md text-sm sm:text-lg hover:bg-[#66b0a0] transition cursor-pointer w-full sm:w-auto"
                    >
                      Change Password
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {isPasswordModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
              <div className="relative bg-white rounded-lg shadow-lg p-8 sm:p-12 w-11/12 sm:w-[42rem] h-auto min-h-[60vh] max-h-[92vh] flex flex-col justify-start overflow-y-auto">
                {/*  */}
                <button
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
                >
                  <FiX size={24} />
                </button>

                {/*  */}

                <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center">
                  Change Password
                </h2>

                <p className="text-center text-gray-600 mb-6">
                  Please enter your new password
                </p>

                <div className="flex flex-col gap-6 px-2 sm:px-8">
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700 mb-1">
                      Old Password
                    </label>
                    <input
                      type="password"
                      name="oldPassword"
                      placeholder="Enter old password"
                      value={formData.oldPassword}
                      onChange={handleChange}
                      className="w-full bg-[#F5F5F5] border border-gray-300 rounded-md px-3 py-3"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="Enter new password (min 6 chars)"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="w-full bg-[#F5F5F5] border border-gray-300 rounded-md px-3 py-3"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm new password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full bg-[#F5F5F5] border border-gray-300 rounded-md px-3 py-3"
                    />
                  </div>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-sm text-center mt-4">
                    {passwordError}
                  </p>
                )}
                <div className="flex justify-center mt-10">
                  <button
                    onClick={handlePasswordSubmit}
                    disabled={isLoading}
                    className="bg-[#7EC1B1] text-white px-10 py-3 rounded-md hover:bg-[#66b0a0] transition text-lg disabled:bg-gray-400"
                  >
                    {isLoading ? "Changing..." : "Change"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {isSuccessModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              <div className="bg-white rounded-xl shadow-lg w-11/12 sm:w-[48rem] min-h-[70vh] sm:min-h-[80vh] flex flex-col items-center justify-center p-10 sm:p-14 text-center pointer-events-auto">
                <img
                  // src={Icon}
                  src={SuccessIcon}
                  alt="Success"
                  className="w-40 sm:w-60 h-32 sm:h-44 mb-10 object-contain "
                />
                <h2 className="text-4xl sm:text-6xl font-extrabold mb-6">
                  CONGRATS!
                </h2>
                <p className="text-gray-600 text-base sm:text-2xl mb-14 leading-relaxed">
                  Password change successful
                </p>
                <button
                  onClick={handleLoginAgain}
                  className="bg-[#7EC1B1] text-white px-16 py-4 rounded-lg hover:bg-[#66b0a0] transition text-xl sm:text-2xl font-semibold"
                >
                  Login Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;

// sir
// src/pages/Profile.jsx - VERIFIED AND CORRECTED
// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Header2 from "../../../components/superAdmin/header/Header2";
// import logoImage from "../../../assets/51a2667788ebcdbeeab9f107b69a80d1053e1aa1.jpg";
// import { FiPhone, FiMail, FiEdit } from "react-icons/fi";
// import Icon from "../../../assets/logo.png";

// const API_BASE_URL = "https://ro-service-engineer-be.onrender.com/api/admin";

// const Profile = () => {
//   const navigate = useNavigate();
//   const [userImage, setUserImage] = useState(logoImage);
//   const [imageFile, setImageFile] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     email: "",
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
//   const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("adminToken");
//       if (!token) {
//         navigate("/");
//         return;
//       }

//       try {
//         setIsLoading(true);
//         const response = await axios.get(`${API_BASE_URL}/profile`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (response.data.success) {
//           // --- THIS IS THE CRUCIAL FIX ---
//           // We now correctly read from `response.data.admin` instead of `response.data.data`
//           // and use `picture` for the image, matching your API response.
//           const { name, mobile, email, picture } = response.data.admin;
//           setFormData((prev) => ({ ...prev, name, mobile, email }));
//           if (picture) {
//             setUserImage(picture);
//           }
//         }
//       } catch (err) {
//         console.error("Failed to fetch profile:", err);
//         setError("Could not load profile data.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [navigate]);

//   const handleSave = async () => {
//     const token = localStorage.getItem("adminToken");
//     if (!token) return;

//     const updateData = new FormData();
//     updateData.append("name", formData.name);
//     updateData.append("mobile", formData.mobile);
//     updateData.append("email", formData.email);
//     if (imageFile) {
//       updateData.append("avatar", imageFile); // The update API uses 'avatar'
//     }

//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await axios.put(`${API_BASE_URL}/update`, updateData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.data.success) {
//         setIsEditing(false);
//         // The update response might return a different structure, so we check carefully
//         if (response.data.data && response.data.data.avatar) {
//           setUserImage(response.data.data.avatar);
//         }
//       } else {
//         setError(response.data.message || "Failed to update profile.");
//       }
//     } catch (err) {
//       console.error("Update profile error:", err);
//       setError(err.response?.data?.message || "An error occurred while saving.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePasswordSubmit = async () => {
//     setPasswordError("");
//     if (formData.newPassword !== formData.confirmPassword) {
//       setPasswordError("New password and confirm password do not match.");
//       return;
//     }
//     if (formData.newPassword.length < 6) {
//       setPasswordError("Password must be at least 6 characters long.");
//       return;
//     }

//     const token = localStorage.getItem("adminToken");
//     if (!token) return;

//     setIsLoading(true);
//     try {
//       const response = await axios.put(
//         `${API_BASE_URL}/change-password`,
//         {
//           oldPassword: formData.oldPassword,
//           newPassword: formData.newPassword,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         setIsPasswordModalOpen(false);
//         setIsSuccessModalOpen(true);
//       } else {
//         setPasswordError(response.data.message || "Failed to change password.");
//       }
//     } catch (err) {
//       console.error("Change password error:", err);
//       setPasswordError(err.response?.data?.message || "An error occurred.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageClick = () => {
//     if (isEditing && fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       setUserImage(URL.createObjectURL(file));
//     }
//   };

//   const handleLoginAgain = () => {
//     setIsSuccessModalOpen(false);
//     localStorage.removeItem("adminToken");
//     navigate("/");
//   };

//   const handleEdit = () => setIsEditing(true);

//   return (
//     <>
//       <div className="mb-6">
//         <Header2 />
//       </div>

//       <div className="w-full">
//         <div className="bg-white shadow-md rounded-lg px-4 sm:px-6 md:px-8 py-6 mt-2 w-full mx-auto relative">
//           {!isEditing && (
//             <button
//               onClick={handleEdit}
//               className="absolute top-4 right-4 border border-[#7EC1B1] text-[#7EC1B1] px-3 sm:px-4 py-2 rounded-md flex items-center gap-2 text-sm sm:text-base hover:bg-[#7EC1B1] hover:text-white transition cursor-pointer whitespace-nowrap"
//             >
//               <FiEdit className="w-4 h-4 sm:w-5 sm:h-5" />
//               Edit Profile Info
//             </button>
//           )}

//           <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
//             <div
//               className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer"
//               onClick={handleImageClick}
//             >
//               <img
//                 src={userImage}
//                 alt="Profile"
//                 className={`w-[90px] h-[90px] sm:w-[160px] sm:h-[160px] rounded-full border border-gray-300 object-cover ${
//                   isEditing ? "hover:opacity-80 transition" : ""
//                 }`}
//               />
//               {isEditing && (
//                 <p className="text-sm sm:text-base text-gray-500 mt-1">
//                   Click to change
//                 </p>
//               )}
//               <input
//                 type="file"
//                 accept="image/*"
//                 ref={fileInputRef}
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//             </div>

//             <div className="flex-1 flex flex-col gap-4 w-full">
//               {isEditing ? (
//                 <>
//                   <div>
//                     <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">
//                       Name
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-lg"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">
//                       Contact
//                     </label>
//                     <input
//                       type="text"
//                       name="mobile"
//                       value={formData.mobile}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-lg"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-lg"
//                     />
//                   </div>
//                   {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//                   <div className="mt-4 sm:mt-6 flex justify-center">
//                     <button
//                       onClick={handleSave}
//                       disabled={isLoading}
//                       className="bg-[#7EC1B1] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md text-sm sm:text-lg hover:bg-[#66b0a0] transition cursor-pointer w-full sm:w-auto disabled:bg-gray-400"
//                     >
//                       {isLoading ? "Saving..." : "Save"}
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
//                     {formData.name || "Loading..."}
//                   </h2>

//                   <div className="flex flex-col mt-2">
//                     <label className="flex items-center gap-2 text-gray-700 font-semibold mb-1 text-sm sm:text-lg">
//                       <FiPhone className="text-[#7EC1B1] text-base sm:text-xl" />
//                       Contact
//                     </label>
//                     <span className="text-blue-600 text-sm sm:text-lg">
//                       {formData.mobile}
//                     </span>
//                   </div>

//                   <div className="flex flex-col mt-2 sm:mt-4">
//                     <label className="flex items-center gap-2 text-gray-700 font-semibold mb-1 text-sm sm:text-lg">
//                       <FiMail className="text-[#7EC1B1] text-base sm:text-xl" />
//                       Email
//                     </label>
//                     <span className="text-blue-600 text-sm sm:text-lg">
//                       {formData.email}
//                     </span>
//                   </div>

//                   <div className="mt-4 flex justify-center md:justify-center">
//                     <button
//                       onClick={() => setIsPasswordModalOpen(true)}
//                       className="bg-[#7EC1B1] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md text-sm sm:text-lg hover:bg-[#66b0a0] transition cursor-pointer w-full sm:w-auto"
//                     >
//                       Change Password
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>

//           {isPasswordModalOpen && (
//             <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
//               <div className="bg-white rounded-lg shadow-lg p-8 sm:p-12 w-11/12 sm:w-[42rem] h-auto min-h-[60vh] max-h-[92vh] flex flex-col justify-start overflow-y-auto">
//                 <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center">
//                   Change Password
//                 </h2>
//                 <p className="text-center text-gray-600 mb-6">
//                   Please enter your new password
//                 </p>
//                 <div className="flex flex-col gap-6 px-2 sm:px-8">
//                   <div className="flex flex-col">
//                     <label className="font-medium text-gray-700 mb-1">Old Password</label>
//                     <input
//                       type="password"
//                       name="oldPassword"
//                       placeholder="Enter old password"
//                       value={formData.oldPassword}
//                       onChange={handleChange}
//                       className="w-full bg-[#F5F5F5] border border-gray-300 rounded-md px-3 py-3"
//                     />
//                   </div>
//                   <div className="flex flex-col">
//                     <label className="font-medium text-gray-700 mb-1">New Password</label>
//                     <input
//                       type="password"
//                       name="newPassword"
//                       placeholder="Enter new password (min 6 chars)"
//                       value={formData.newPassword}
//                       onChange={handleChange}
//                       className="w-full bg-[#F5F5F5] border border-gray-300 rounded-md px-3 py-3"
//                     />
//                   </div>
//                   <div className="flex flex-col">
//                     <label className="font-medium text-gray-700 mb-1">Confirm Password</label>
//                     <input
//                       type="password"
//                       name="confirmPassword"
//                       placeholder="Confirm new password"
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                       className="w-full bg-[#F5F5F5] border border-gray-300 rounded-md px-3 py-3"
//                     />
//                   </div>
//                 </div>
//                 {passwordError && <p className="text-red-500 text-sm text-center mt-4">{passwordError}</p>}
//                 <div className="flex justify-center mt-10">
//                   <button
//                     onClick={handlePasswordSubmit}
//                     disabled={isLoading}
//                     className="bg-[#7EC1B1] text-white px-10 py-3 rounded-md hover:bg-[#66b0a0] transition text-lg disabled:bg-gray-400"
//                   >
//                     {isLoading ? "Changing..." : "Change"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {isSuccessModalOpen && (
//             <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
//               <div className="bg-white rounded-xl shadow-lg w-11/12 sm:w-[48rem] min-h-[70vh] sm:min-h-[80vh] flex flex-col items-center justify-center p-10 sm:p-14 text-center pointer-events-auto">
//                 <img
//                   src={Icon}
//                   alt="Success"
//                   className="w-40 sm:w-60 h-32 sm:h-44 mb-10 object-contain "
//                 />
//                 <h2 className="text-4xl sm:text-6xl font-extrabold mb-6">
//                   CONGRATS!
//                 </h2>
//                 <p className="text-gray-600 text-base sm:text-2xl mb-14 leading-relaxed">
//                   Password change successful
//                 </p>
//                 <button
//                   onClick={handleLoginAgain}
//                   className="bg-[#7EC1B1] text-white px-16 py-4 rounded-lg hover:bg-[#66b0a0] transition text-xl sm:text-2xl font-semibold"
//                 >
//                   Login Again
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;
