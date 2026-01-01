import React from "react";
import { motion } from "framer-motion";

const LeadTimeline = ({ lead }) => {
  // 1. Safety check
  if (!lead) return null;

  // 2. Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
    });
  };

  // 3. Define Real World Steps
  const rawSteps = [
    {
      id: "registered",
      title: "Service Registered Confirmed",
      description: lead.remarks || "Service registered successfully.",
      date: formatDate(lead.createdAt),
      isCompleted: true, // Always true if lead exists
    },
    {
      id: "assigned",
      title: "Assigned To Service Engineer",
      description: lead.assignedVendorId ? `Assigned to ${lead.assignedVendorId.name}` : "Pending Assignment",
      date: lead.assignedVendorId ? "Confirmed" : "-",
      isCompleted: !!lead.assignedVendorId, // True if vendor exists
    },
    {
      id: "completed",
      title: "Job Completed",
      description: lead.status?.toLowerCase() === 'completed' ? "Service successfully done" : "Pending completion",
      date: lead.status?.toLowerCase() === 'completed' ? formatDate(lead.updatedAt) : "-",
      isCompleted: lead.status?.toLowerCase() === 'completed',
    },
  ];

  // Filter steps: Only show "Job Completed" if it is actually completed (to match your screenshot logic)
  // or you can show it as grayed out. Here I follow your screenshot logic:
  const steps = lead.status?.toLowerCase() === 'completed' 
    ? rawSteps 
    : rawSteps.filter(s => s.id !== 'completed');

  return (
    // Matches the container style from ViewLead.jsx
    <div className=" border border-gray-200  p-6 relative overflow-hidden">
      <div className="relative flex flex-col gap-8">
        
        {/* Vertical Green Line */}
        {/* Adjusted to left-[7px] relative to the flex container to center with dots */}
        <motion.div
          className="absolute left-[7px] top-2 bottom-4 w-1 bg-[#4CAF50] z-0"
          initial={{ height: 0 }}
          animate={{ height: "100%" }} 
          transition={{ duration: 1.0, ease: "easeInOut" }}
        />

        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex items-start relative z-10"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
          >
            {/* Left Column: Dot */}
            <div className="flex flex-col items-center pt-1 mr-4">
              <motion.div
                // Matches your screenshot: Solid green, no border
                className="w-4 h-4 rounded-full bg-[#4CAF50] shadow-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.2 }}
              />
            </div>

            {/* Right Column: Content */}
            <div className="flex-1">
                <h4 className="text-gray-900 font-bold text-base">
                  {step.title}
                </h4>
                
                {/* Description */}
                {step.description && step.description !== "Pending Assignment" && step.description !== "Pending completion" && (
                  <p className={`text-sm mt-1 ${step.id === 'completed' ? 'text-green-600 font-medium' : 'text-gray-600'}`}>
                    {step.description}
                  </p>
                )}
                
                {/* Date */}
                {step.date && step.date !== "-" && step.date !== "Confirmed" && (
                  <p className="text-gray-400 text-xs mt-2">
                    {step.date}
                  </p>
                )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LeadTimeline;