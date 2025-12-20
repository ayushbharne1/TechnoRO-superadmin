// import React from "react";

// const ConfirmDeletionModal = ({ isOpen, onClose, onConfirm }) => {
//   if (!isOpen) return null;

//   return (
//     // Soft grey background overlay
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-80">
//       <div className="bg-white rounded-2xl shadow-2xl w-[95%] max-w-2xl p-12 text-center border border-gray-200">
//         {/* Title */}
//         <h2 className="text-4xl font-bold text-gray-800 mb-6">
//           Confirm Deletion
//         </h2>

//         {/* Message */}
//         <p className="text-xl text-gray-600 mb-10 leading-relaxed">
//           Are you sure you want to delete this item? <br />
//           <span className="text-gray-500">
//             This action cannot be undone.
//           </span>
//         </p>

//         {/* Buttons */}
//         <div className="flex justify-center gap-6">
//           {/* Cancel Button */}
//           <button
//             onClick={onClose}
//             className="min-w-[150px] px-6 py-3 rounded-xl border-2 border-[#7EC1B1] text-[#7EC1B1] font-semibold text-lg bg-white hover:bg-gray-50 transition duration-200"
//           >
//             Cancel
//           </button>

//           {/* Confirm Button */}
//           <button
//             onClick={onConfirm}
//             className="min-w-[150px] px-6 py-3 rounded-xl bg-[#7EC1B1] text-white font-semibold text-lg hover:bg-[#65a89d] transition duration-200"
//           >
//             Yes, Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmDeletionModal;


import React from "react";

const ConfirmDeletionModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmText = "Yes, Delete",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    // ✅ Soft grey overlay background
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-80">
      <div className="bg-white rounded-2xl shadow-2xl w-[95%] max-w-2xl p-12 text-center border border-gray-200 transition-transform duration-300 ease-in-out">
        {/* ✅ Dynamic Title */}
        <h2 className="text-4xl font-bold text-gray-800 mb-6">{title}</h2>

        {/* ✅ Dynamic Message */}
        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
          {message.split("\n").map((line, idx) => (
            <span key={idx} className="block">
              {line}
            </span>
          ))}
        </p>

        {/* ✅ Buttons */}
        <div className="flex justify-center gap-6">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="min-w-[150px] px-6 py-3 rounded-xl border-2 border-[#7EC1B1] text-[#7EC1B1] font-semibold text-lg bg-white hover:bg-gray-50 transition duration-200"
          >
            {cancelText}
          </button>

          {/* Confirm Button */}
          <button
            onClick={onConfirm}
            className="min-w-[150px] px-6 py-3 rounded-xl bg-[#7EC1B1] text-white font-semibold text-lg hover:bg-[#65a89d] transition duration-200"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletionModal;
