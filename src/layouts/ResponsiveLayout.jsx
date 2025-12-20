import React from "react";

const ResponsiveLayout = ({ children }) => {
  return (
    <div className="p-4 md:p-6 w-full">
      {children} {/* Page content goes here */}
    </div>
  );
};

export default ResponsiveLayout;
