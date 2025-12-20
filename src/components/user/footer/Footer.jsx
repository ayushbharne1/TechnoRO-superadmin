import React from "react";
import { footerItems } from "../../../utils/constant";
import logo from "../../../assets/logo.png"
import { NavLink } from "react-router-dom";


const Footer = () => {
  return (
    <footer className=" bg-[#7EC1B1] text-black mt-4 p-10">
      <div className="max-w-7xl mx-auto">
        {/* Logo */}
        <div className="mb-10">
            <img src={logo} alt="Techno RO" className="h-[40px ] mr-2" />
        </div>

        {/* Footer Sections */}
        <div className="grid grid-cols-4 gap-8">
          {footerItems.map((section, index) => (
            <div  key={index}>
                <h1 className="text-xl font-semibold mb-6">{section.heading}</h1>
            {
                section.items && (
                    <nav className="flex flex-col space-y-1">
                        {section.items.map((item) => (
                            <NavLink  key={item.id} to={item.path} 
                            className="hover:text-black text-gray-700">
                                 {item.name}
                            </NavLink>
                        ))}
                    </nav>
                )}

                {/* Social Links Section */}
              {section.socialIcons && (
                <div className="flex space-x-3 mt-2">
                  {section.socialIcons.map((social) => (
                    <NavLink  target="_blank"  key={social.id} to={social.link} className="text-2xl">
                      <img src={social.icon} alt={social.icon} className="w-8 h-8" />
                    </NavLink>
                  ))}
                </div>
              )}

              {/* App Store Links */}
              {section.appLinks && (
                <div className="mt-3">
                  {section.appLinks.map((app) => (
                    <NavLink target="_blank" key={app.id} to={app.link} className="block mb-2">
                      <img src={app.img} alt="Download" className="w-36" />
                    </NavLink>
                  ))}
                </div>
              )}
            
             </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="border-t-[3px] text-[#263138] font-[400] border-gray-700 mt-6 pt-4 text-[16px] text-start">
          <p className="">© Copyright 2025 Techno RO. All rights reserved. | CIN: UID2584937HDR20250101</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
