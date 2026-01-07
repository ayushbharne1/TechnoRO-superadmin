import { sidebarItems } from "../../../utils/constant";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/Technoro.png";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../../redux/slices/authslice";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // S FIXED LOGOUT
  const handleLogout = () => {
    dispatch(adminLogout()); // clear redux + localStorage
    navigate("/", { replace: true }); // force redirect & block back
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-5 left-4 z-50 md:hidden bg-transparent text-gray-600 p-2.5 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {isMobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Overlay - Removed for better visibility */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-transparent z-30 md:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed md:relative top-0 left-0 flex flex-col h-screen bg-white shadow-2xl w-[280px] md:w-[270px] z-40 transform transition-transform duration-150 ease-in-out md:shadow-lg md:border-r-2 md:border-gray-400 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
      {/* Logo - Fixed at top */}
      <div className="ml-2 border-b-2 border-gray-300 flex justify-center items-center flex-shrink-0 sticky top-0 bg-white z-10 py-4 md:border-b-2 md:border-gray-400">
        <img
          className="w-[100px] h-[4.9vh] object-cover"
          src={logo}
          alt="logo"
        />
      </div>
      
      {/* Sidebar Items - Scrollable */}
      <div className="flex flex-col px-4 md:mx-4 md:px-2 overflow-y-auto scrollbar-hide flex-1 mt-4 md:mt-0">
        {sidebarItems.map((group) => (
          <div key={group.groupName} className="mb-4 md:mb-2">
            <h1 className="text-[13px] md:text-[16px] font-bold text-gray-700 mb-3 md:mb-2 uppercase tracking-wider">
              {group.groupName}
            </h1>
            {group.groupItems.map(({ id, name, icon, path }) => {
              const isLogout = name.toLowerCase() === "logout";
              return (
                <NavLink
                  key={id}
                  to={isLogout ? "/" : path}
                  onClick={() => {
                    if (isLogout) {
                      handleLogout("/");
                    }
                    closeMobileSidebar();
                  }}
                  className={({ isActive }) =>
                    `flex items-center text-[15px] md:text-[16px] font-semibold space-x-3 px-3 md:px-2 py-3 md:py-2 rounded-lg mb-2
    overflow-hidden transition-all duration-200
    ${
      isLogout
        ? "text-red-600 hover:bg-red-50"
        : isActive
        ? "bg-[#7EC1B1] text-white shadow-md"
        : "text-[#7EC1B1] hover:bg-[#7EC1B1] hover:text-white"
    }`
                  }
                >
                  <span className={`text-2xl md:text-xl flex-shrink-0 ${isLogout ? "text-red-600" : ""}`}>
                    {icon}
                  </span>
                  <span className="truncate flex-1">{name}</span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Sidebar;
