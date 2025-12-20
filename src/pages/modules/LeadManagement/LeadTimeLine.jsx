


// import { motion } from "framer-motion";

// const LeadTimeline = () => {
//   const steps = [
//     {
//       title: "Service Registered Confirmed",
//       description: "Booking received successfully",
//       date: "Wed, 1 Oct | 10:30 AM",
//     },
//     {
//       title: "Assigned To Service Engineer",
//       description: "John Doe",
//       date: "Thu, 2 Oct | 12:00 PM",
//     },
//     {
//       title: "Service OTP Received",
//       description: "OTP: 4567",
//       date: "Thu, 2 Oct | 01:45 PM",
//     },
//     {
//       title: "Order Summary",
//       description: "Product: Water Purifier",
//       date: "Thu, 2 Oct | 03:15 PM",
//     },
//   ];

//   return (
//     <div className="w-1/2 bg-white p-6 rounded-lg shadow-md mt-6 relative overflow-hidden ml-0">
//       {/* wrapper for line + steps */}
//       <div className="relative">
//         {/* Vertical line placed at center of left column (left column = w-10) */}
//         <motion.div
//           className="absolute left-10 top-6 bottom-6 w-[3px] bg-green-500 rounded"
//           initial={{ height: 0 }}
//           animate={{ height: "90%" }}
//           transition={{ duration: 1.0, ease: "easeInOut" }}
//         />

//         <div className="flex flex-col gap-10 relative">
//           {steps.map((step, index) => (
//             <motion.div
//               key={index}
//               className="flex items-start"
//               initial={{ opacity: 0, x: -10 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.45, delay: index * 0.25 }}
//             >
//               {/* Left column: fixed width for dot (centers on the line) */}
//               <div className="w-21 flex justify-center">
//                 <motion.span
//                   className="w-5 h-5 bg-green-500 rounded-full border-4 border-white shadow"
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ duration: 0.35, delay: index * 0.25 }}
//                 />
//               </div>

//               {/* Right column: content */}
//               <div className="flex-1 bg-white p-4 rounded-md shadow-sm ml-2">
//                 <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
//                 <p className="text-gray-600 text-sm">{step.description}</p>
//                 <p className="text-gray-400 text-xs mt-1">{step.date}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeadTimeline;




import { motion } from "framer-motion";

const LeadTimeline = () => {
  const steps = [
    {
      title: "Service Registered Confirmed",
      description: "Booking received successfully",
      date: "Wed, 1 Oct | 10:30 AM",
    },
    {
      title: "Assigned To Service Engineer",
      description: "John Doe",
      date: "Thu, 2 Oct | 12:00 PM",
    },
    {
      title: "Service OTP Received",
      description: "OTP: 4567",
      date: "Thu, 2 Oct | 01:45 PM",
    },
    {
      title: "Order Summary",
      description: "Product: Water Purifier",
      date: "Thu, 2 Oct | 03:15 PM",
    },
    {
      title: "Case Closed",
    
    },
  ];

  return (
    <div className="w-1/2 bg-white p-6 rounded-lg shadow-md mt-6 relative overflow-hidden ml-0">
      <div className="relative flex flex-col gap-10">
        {/* Vertical line: span entire dot container */}
        <motion.div
          className="absolute left-5 top-1/2 transform -translate-y-1/2 w-[3px] bg-green-500 rounded"
          style={{ height: `calc(100% - 2.5rem)` }} 
          initial={{ height: 0 }}
          animate={{ height: `calc(100% - 2.5rem)` }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
        />

        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex items-start relative"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: index * 0.25 }}
          >
            {/* Left column: dot aligned with line */}
            <div className="w-10 flex justify-center relative">
              <motion.span
                className="w-5 h-5 bg-green-500 rounded-full border-4 border-white shadow"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.35, delay: index * 0.25 }}
              />
            </div>

            {/* Right column: content */}
            <div className="flex-1 bg-white p-4 rounded-md shadow-sm ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
              <p className="text-gray-400 text-xs mt-1">{step.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LeadTimeline;
