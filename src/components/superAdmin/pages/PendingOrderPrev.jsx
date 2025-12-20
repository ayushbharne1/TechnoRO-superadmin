import { IoMdArrowRoundBack, IoMdTimer } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TbDeviceMobileDollar } from "react-icons/tb";
import { PiShapes } from "react-icons/pi";

const PendingOrderPrev = ({ onBack }) => {
  return (
    <div className="w-full p-4 sm:p-6 bg-[#EBF2F1] shadow-lg rounded-md space-y-4">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="text-2xl sm:text-[28px] outline-none cursor-pointer rounded"
      >
        <IoMdArrowRoundBack />
      </button>

      {/* 1st Section: Order Info */}
       <div className="p-4 bg-gray-50 rounded-md flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0 text-[18px] sm:text-[20px]">
        <p><strong>Order No:</strong> 6019</p>
        <p><strong>Shipped date:</strong> 01-02-2026</p>
        <p><strong>Customer Name:</strong> Kartik Ray</p>
        <p><strong>Mobile Number:</strong> 89xxxxxxxx</p>
      </div>

      {/* 2nd Section: Order Items */}
      <div className="p-4 text-black bg-gray-50 rounded-md">
        <h2 className="font-semibold text-[20px] sm:text-[22px] mb-2">Order Items</h2>
        <ul className="list-decimal pl-6 text-[16px] sm:text-[18px] space-y-1">
          <li>
            <p><strong>Water Purifier Full Checkup</strong></p>
            <p className="text-gray-600">Problem: Low Water Flow</p>
            <p className="text-gray-600">Qty: 1</p>
            <p className="text-gray-600">Price: ₹299</p>
            <p className="text-gray-600">Service time: 1hr 30min</p>
          </li>
        </ul>
      </div>

      {/* 3rd Section: Date And Time Slot Details */}
      <div className="p-4 bg-gray-50 rounded-md text-[16px] sm:text-[18px] space-y-2">
        <h2 className="font-semibold text-[20px] sm:text-[22px] mb-2">Date And Time Slot Details</h2>
        <div className="flex flex-col md:flex-row md:justify-between gap-2 md:gap-0">
          <p className="flex gap-2 items-center"><FaRegCalendarAlt /> Date: Sun 02</p>
          <p className="flex gap-2 items-center"><IoMdTimer /> Time: 09:00 am</p>
          <p className="flex gap-2 items-center"><TbDeviceMobileDollar /> Payment Method: Cash On Delivery</p>
          <p className="flex gap-2 items-center"><PiShapes /> Category: Water Purifier Repair</p>
        </div>
      </div>

      {/* 4th Section: Payment Summary */}
      <div className="p-4 bg-gray-50 rounded-md text-[16px] sm:text-[18px] space-y-1">
        <h2 className="font-semibold text-[20px] sm:text-[22px] mb-2">Payment Summary</h2>
        <p className="flex justify-between">Item’s total: <span>₹200</span></p>
        <p className="flex justify-between">Taxes and Fee: <span>₹68</span></p>
        <p className="flex justify-between font-bold">Total: <span className="font-normal">₹268</span></p>
      </div>

   {/* 5th Section: Shipping And Billing + Print Button */}
<div className="bg-white p-4 rounded-md shadow-md space-y-4">
  {/* Heading */}
  <h2 className="font-semibold text-[20px] sm:text-[22px]">Shipping And Billing Details</h2>

  {/* Shipping Info & Order Status */}
  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-[16px] sm:text-[18px]">
    <p>Shipping Address: Xxxxxxxx</p>
    <p>Order Status: Pending</p>
  </div>

  {/* Print Button */}
  <div className="flex justify-center mt-2">
    <button className="bg-[#67D6B9] hover:bg-[#25803D] text-white px-6 py-2 rounded-md text-[16px] sm:text-[18px] w-full md:w-auto">
      Print Order Preview
    </button>
  </div>
</div>


    </div>
  );
};

export default PendingOrderPrev;
