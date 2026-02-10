import React from "react";

const ResponsiveLayout = ({ children }) => {
  return (
    <div className="w-full">
      {children} {/* Page content goes here */}
    </div>
  );
};

export default ResponsiveLayout;
