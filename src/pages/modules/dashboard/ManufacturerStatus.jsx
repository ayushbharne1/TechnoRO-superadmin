import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const ManufacturerStatus = () => {
  // Data from the image
  const active = 1890;
  const inactive = 1700;
  const total = active + inactive;

  const data = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [active, inactive],
        backgroundColor: ["#2276da", "#4bc0c0"],
        borderColor: ["#fff", "#fff"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          padding: 20,
          font: { size: 14 },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full bg-[#F5F5F5] p-4 rounded-2xl shadow-lg flex flex-col items-center min-h-[360px]">
      <h2 className="w-full text-lg font-bold text-gray-800 mb-4 text-left">
        Manufacturer
      </h2>

      <div className="w-full flex justify-center">
        <div style={{ width: "260px", height: "260px" }}>
          <Pie data={data} options={options} />
        </div>
      </div>

      <div className="flex justify-around w-full mt-4">
        <div className="flex items-center">
          <span className="w-4 h-4 mr-2 bg-[#2276da] rounded-full"></span>
          <span className="text-gray-800 font-medium">Active: {active}</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 mr-2 bg-[#4bc0c0] rounded-full"></span>
          <span className="text-gray-800 font-medium">
            Inactive: {inactive}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerStatus;
