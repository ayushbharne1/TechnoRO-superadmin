import React from "react";

/**
 * Reusable Loader Component
 * 
 * @param {string} size - Size of the loader: 'small', 'medium', 'large' (default: 'medium')
 * @param {string} message - Loading message to display
 * @param {string} submessage - Additional message below main message
 * @param {boolean} fullScreen - Whether to display as full screen loader (default: false)
 * @param {boolean} showDots - Whether to show bouncing dots (default: true)
 * @param {string} color - Custom color for loader (default: '#7EC1B1')
 */
const Loader = ({
  size = "medium",
  message = "Loading...",
  submessage = "",
  fullScreen = false,
  showDots = true,
  color = "#7EC1B1",
}) => {
  // Size configurations
  const sizeConfig = {
    small: {
      outer: "h-8 w-8",
      inner: "h-4 w-4",
      border: "border-2",
      text: "text-sm",
      subtext: "text-xs",
    },
    medium: {
      outer: "h-16 w-16",
      inner: "h-8 w-8",
      border: "border-4",
      text: "text-lg",
      subtext: "text-sm",
    },
    large: {
      outer: "h-24 w-24",
      inner: "h-12 w-12",
      border: "border-4",
      text: "text-2xl",
      subtext: "text-base",
    },
  };

  const config = sizeConfig[size] || sizeConfig.medium;

  const LoaderContent = () => (
    <div className="text-center">
      <div className="relative inline-block">
        {/* Outer spinning circle */}
        <div
          className={`animate-spin rounded-full ${config.outer} ${config.border} border-gray-200 mx-auto`}
          style={{ borderTopColor: color }}
        ></div>
        {/* Inner pulsing circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className={`animate-pulse ${config.inner} rounded-full opacity-75`}
            style={{ backgroundColor: color }}
          ></div>
        </div>
      </div>

      {/* Loading message */}
      {message && (
        <div className="mt-6 space-y-2">
          <p className={`text-gray-700 font-semibold ${config.text}`}>
            {message}
          </p>
          {submessage && (
            <p className={`text-gray-500 ${config.subtext}`}>{submessage}</p>
          )}
        </div>
      )}

      {/* Bouncing dots */}
      {showDots && (
        <div className="flex justify-center gap-2 mt-4">
          <div
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              backgroundColor: color,
              animationDelay: "0ms",
            }}
          ></div>
          <div
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              backgroundColor: color,
              animationDelay: "150ms",
            }}
          ></div>
          <div
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              backgroundColor: color,
              animationDelay: "300ms",
            }}
          ></div>
        </div>
      )}
    </div>
  );

  // Full screen loader
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center">
        <LoaderContent />
      </div>
    );
  }

  // Inline loader
  return (
    <div className="flex items-center justify-center py-12">
      <LoaderContent />
    </div>
  );
};

export default Loader;