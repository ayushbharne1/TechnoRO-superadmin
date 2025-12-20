import { sidebarItems } from "../../../utils/constant";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/Technoro.png";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../../redux/slices/authslice";


const Sidebar = () => {
  const navigate = useNavigate();
   const dispatch = useDispatch();

  
  // const handleLogout = (path) => {
  //   navigate(path);
  // };
   
   // S FIXED LOGOUT
  const handleLogout = () => {
    dispatch(adminLogout());           // clear redux + localStorage
    navigate("/", { replace: true });  // force redirect & block back
  };

  // 

  

  return (
    <div
      className="flex flex-col h-screen overflow-y-auto scrollbar-hide  shadow-lg border-r-2 border-gray-400
                    w-full max-w-[270px] md:w-[270px] xl:w-[270px]"
    >
      {/* Logo */}
      {/* <div className="ml-2 border-b-2 border-gray-400">
        <img className="py-4 md:ml-3 h-[73px]" src={logo} alt="logo" />
      </div> */}

      <div className="ml-2 border-b-2 border-gray-400 flex justify-center items-center">
  <img
    className="w-[136px] h-[72px] object-cover"
    src={logo}
    alt="logo"
  />
</div>


      {/* Sidebar Items */}
      <div className="flex flex-col md:mx-4 px-2">
        {sidebarItems.map((group) => (
          <div key={group.groupName} className="mb-2">
            <h1 className="text-[16px] font-semibold mb-2">
              {group.groupName}
            </h1>
            {group.groupItems.map(({ id, name, icon, path }) => {
              const isLogout = name.toLowerCase() === "logout";
              return (
                <NavLink
                  key={id}
                  to={isLogout ? "/" : path}
                  onClick={isLogout ? () => handleLogout("/") : undefined}
                  className={({ isActive }) =>
                    `flex items-center text-[16px] font-semibold space-x-2 p-2 rounded-[8px] mb-2
    overflow-hidden
    ${
      isLogout
        ? "text-red-500 hover:bg-red-100"
        : isActive
          ? "bg-[#7EC1B1] text-white"
          : "text-[#7EC1B1] hover:bg-[#7EC1B1] hover:text-white"
    }`
                  }
                >
                  <span className={`text-xl ${isLogout ? "text-red-500" : ""}`}>
                    {icon}
                  </span>
                  <span>{name}</span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
