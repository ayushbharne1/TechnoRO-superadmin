import React from 'react'
import Technician from '../../assets/Technician.png';
import { LuSmile } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { FiDollarSign } from "react-icons/fi";

const RegisterProfessional = () => {
  return (
    <div className="flex w-full flex-col items-center p-6">
      <div className="flex justify-center mt-4">
      <div className='flex flex-col w-[419px] space-y-3 justify-center'>
      <h2 className="text-[32px] text-[#263138] font-bold text-center">
        Earn More. Earn Respect. <br /> Safety Ensured.
      </h2>
      <p className="text-center text-[24px] text-[#263138] mt-2">Join 50,000+ partners across India.</p>
      </div>
      
        <img
          src={Technician}
          alt="Workers"
          className="rounded-lg w-[540px] h-[360px] "
        />
      </div>
      <h3 className="text-[32px] text-[#263138] font-semibold text-center mt-6">
        Join Techno RO to change your life
      </h3>
      <p className="text-center text-[24px] text-[#606060] mt-2">
        Techno RO is an app-based marketplace that empowers professionals like you to become your own boss
      </p>
      <div className="flex justify-between gap-6 mt-6 text-center">
        <div className="flex flex-col space-y-3 items-center">
          <span className="text-6xl text-gray-400"><FiUser /></span>
          <p className="text-[#7EC1B1] text-[24px] font-bold">40,000+</p>
          <p className="text-[#263138] text-[20px]">Partners already on board</p>
        </div>
        <div className="flex flex-col space-y-3 items-center">
          <span className="text-6xl text-gray-400"><FiDollarSign /></span>
          <p className="text-[#7EC1B1] text-[24px] font-bold">₹1500Cr
          </p>
          <p className="text-[#263138] text-[20px]">Paid out to partners in 2024</p>
        </div>
        <div className="flex flex-col space-y-3 items-center">
          <span className="text-6xl text-gray-400"><LuSmile /></span>
          <p className="text-[#7EC1B1] text-[24px] font-bold">15,50,000+</p>
          <p className="text-[#263138] text-[20px]">Services delivered each month</p>
        </div>
      </div>
      <div className=" p-4 mt-6 w-full max-w-[750px] rounded-lg border border-[#CACACA]">
        <p className="text-center text-[18px]  text-[#263138]">
          Share your WhatsApp number and we'll reach out via our WhatsApp Business Account.
        </p>
        <div className="flex justify-center space-x-5 mt-4 p-2">
          <input
            type="text"
            placeholder="Enter your WhatsApp Number"
            className="outline-none  border border-[#CACACA] w-[488px] text-sm px-6 py-2 rounded-md"
          />
          <button className="bg-[#7EC1B1] text-white px-8 py-2 rounded-md">
            Join Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterProfessional
