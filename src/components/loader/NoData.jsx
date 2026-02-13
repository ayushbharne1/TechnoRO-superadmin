import React from "react";

/**
 * Reusable No Data / Empty State Component
 * 
 * @param {string} title - Main title text
 * @param {string} message - Description message
 * @param {string} icon - Icon type: 'notfound', 'empty', 'error', 'nodata' (default: 'nodata')
 * @param {Function} onAction - Optional action button callback
 * @param {string} actionText - Text for action button
 * @param {string} actionColor - Color for action button (default: '#7EC1B1')
 * @param {boolean} fullScreen - Whether to display as full screen (default: false)
 */
const NoData = ({
  title = "No Data Found",
  message = "There is no data to display at the moment.",
  icon = "nodata",
  onAction = null,
  actionText = "Go Back",
  actionColor = "#7EC1B1",
  fullScreen = false,
}) => {
  // Icon configurations
  const icons = {
    notfound: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    empty: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
    ),
    error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    nodata: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  };

  const selectedIcon = icons[icon] || icons.nodata;

  const Content = () => (
    <div className="text-center max-w-md mx-auto px-4">
      <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
        {selectedIcon}
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">{title}</h2>
      <p className="text-gray-500 mb-8">{message}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition font-medium shadow-sm"
          style={{ backgroundColor: actionColor }}
        >
          {actionText}
        </button>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex-1 flex items-center justify-center py-12 min-h-[400px]">
        <Content />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <Content />
    </div>
  );
};

export default NoData;