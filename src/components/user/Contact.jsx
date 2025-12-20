import React from 'react'
import { recommendedVideoItems } from '../../utils/constant'
import { FaPhone } from "react-icons/fa6";
import { PiChatsCircle } from "react-icons/pi";
import { NavLink } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="p-8 bg-white text-gray-800">
    {/* Help & Support Header */}
    <h2 className="text-xl font-semibold">Help & Support</h2>
    <p className="mt-4">
      Contact us on our toll-free number: <span className="text-green-500">1800 236 458 326</span>
    </p>

    {/* Recommended Videos */}
    <h3 className="text-lg font-semibold mt-6">Recommended Videos</h3>
    <div className="grid grid-cols-5 gap-10 mt-4">
      {recommendedVideoItems.map((items) => (
        <div key={items.id} className="w-full overflow-hidden">
          <img
            src={items.img}
            alt="video-thumbnail"
            className="w-full rounded-lg h-[120px] object-cover"
          />
          <p className="mt-2 text-sm text-justify">{items.title}</p>
        </div>
      ))}
    </div>

    {/* Need Help? Section */}
    <h3 className="text-xl font-semibold mt-6">Need Help?</h3>
    <div className="mt-2 text-md text-[#7EC1B1] cursor-pointer space-y-1">
      <NavLink to='/chat'>
      <p>Payment Related Issues</p>
      <p>Service Related Issues</p>
      <p>Purchase Related Issues</p>
      <p>Others Issues</p>
      </NavLink>
    </div>

    {/* Chat Button */}
    <NavLink to={'/chat'}>
    <button className="mt-4 flex items-center gap-2 border px-4 py-2 rounded-md  border-[#7EC1B1] hover:bg-green-50">
    <PiChatsCircle className='text-xl' /> Chat With Us
    </button>
    </NavLink>

    {/* Further Assistance Section */}
    <div className="mt-6 p-4 border-2 border-[#CACACA] rounded-lg">
      <h3 className="text-lg font-semibold">Need Further Assistance?</h3>
      <p className="mt-1">We are here to help you!</p>
      <button className="mt-4 flex items-center gap-2 border border-[#7EC1B1]  text-[#7EC1B1] px-4 py-2 rounded-md hover:bg-green-50">
        <FaPhone /> Call Us
      </button>
    </div>
  </div>
  )
}

export default Contact
