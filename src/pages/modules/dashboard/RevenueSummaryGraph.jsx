import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const dummyCanvas = document.createElement("canvas");
const ctx = dummyCanvas.getContext("2d");

const gradientSales = ctx.createLinearGradient(0, 0, 0, 400);
gradientSales.addColorStop(0, "#8979FF");
gradientSales.addColorStop(1, "#8979FF");

const gradientProfit = ctx.createLinearGradient(0, 0, 0, 400);
gradientProfit.addColorStop(0, "#FF928A");
gradientProfit.addColorStop(1, "#FF928A");

const gradientFillSales = ctx.createLinearGradient(0, 0, 0, 250);
gradientFillSales.addColorStop(0, "rgba(137, 121, 255, 0.3)");
gradientFillSales.addColorStop(1, "rgba(137, 121, 255, 0)");

const gradientFillProfit = ctx.createLinearGradient(0, 0, 0, 250);
gradientFillProfit.addColorStop(0, "rgba(255, 146, 138, 0.3)");
gradientFillProfit.addColorStop(1, "rgba(255, 146, 138, 0)");

const RevenueSummaryGraph = () => {
  const [viewMode, setViewMode] = useState("month"); // 'month' | 'year'
  const [selectedMonth, setSelectedMonth] = useState("October");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [showSales, setShowSales] = useState(true);
  const [showProfit, setShowProfit] = useState(true);

  // sample daily data per month (only October defined originally)
  const chartData = {
    October: {
      sales: [
        80, 70, 60, 50, 40, 50, 70, 90, 80, 60, 40, 30, 50, 70, 90, 80, 60, 40,
        50, 70, 90, 80, 60, 40, 30, 20, 10, 5, 0, 0, 0,
      ],
      profit: [
        70, 60, 50, 40, 30, 40, 60, 80, 70, 50, 30, 20, 40, 60, 80, 70, 50, 30,
        40, 60, 80, 70, 50, 30, 20, 10, 5, 0, 0, 0,
      ],
    },
  };

  // sample aggregated monthly data for a year (12 months)
  const chartDataYear = {
    2025: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      sales: [800, 700, 600, 500, 450, 520, 700, 900, 850, 780, 640, 500],
      profit: [700, 600, 500, 400, 360, 420, 620, 820, 760, 700, 560, 420],
    },
  };

  const dataForSelectedMonth = chartData[selectedMonth];
  const dataForSelectedYear = chartDataYear[selectedYear];

  const chartDataPerMonth = {
    labels: Array.from({ length: 31 }, (_, i) => i + 1),
    datasets: [
      {
        label: "Sales",
        data: dataForSelectedMonth.sales,
        fill: true,
        backgroundColor: gradientFillSales,
        borderColor: gradientSales,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#8979FF",
        pointRadius: 6,
        tension: 0.18,
        hidden: !showSales,
      },
      {
        label: "Profit",
        data: dataForSelectedMonth.profit,
        fill: true,
        backgroundColor: gradientFillProfit,
        borderColor: gradientProfit,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#FF928A",
        pointRadius: 6,
        tension: 0.18,
        hidden: !showProfit,
      },
    ],
  };

  const chartDataPerYear = {
    labels: dataForSelectedYear.labels,
    datasets: [
      {
        label: "Sales",
        data: dataForSelectedYear.sales,
        fill: true,
        backgroundColor: gradientFillSales,
        borderColor: gradientSales,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#8979FF",
        pointRadius: 6,
        tension: 0.18,
        hidden: !showSales,
      },
      {
        label: "Profit",
        data: dataForSelectedYear.profit,
        fill: true,
        backgroundColor: gradientFillProfit,
        borderColor: gradientProfit,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#FF928A",
        pointRadius: 6,
        tension: 0.18,
        hidden: !showProfit,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: "Day" },
        grid: { display: false },
        ticks: { color: "#606060" },
      },
      y: {
        title: { display: true, text: "Amount (k)" },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: (value) => `${value}k`,
          color: "#606060",
        },
        grid: {
          display: true,
          color: "#e5e7eb",
          borderDash: [6, 6],
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: { display: false }, // Hide default legend
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y}k`;
          },
        },
      },
      shadowPlugin: {
        id: "shadowPlugin",
        beforeDatasetDraw: (chart, args) => {
          const ctx = chart.ctx;
          if (args.index === 0) {
            // Sales
            ctx.shadowColor = "rgba(137, 121, 255, 0.4)";
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
          } else if (args.index === 1) {
            // Profit
            ctx.shadowColor = "rgba(255, 146, 138, 0.4)";
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
          }
        },
        afterDatasetDraw: (chart) => {
          const ctx = chart.ctx;
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        },
      },
    },
    elements: {
      point: {
        radius: 6,
        backgroundColor: "#fff",
        borderWidth: 2,
      },
      line: {
        tension: 0.2,
      },
    },
  };

  return (
    <div className="bg-[#F5F5F5] rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-4">
        <h2 className="text-xl font-bold text-gray-800">Revenue Summary</h2>

        <div className="flex items-center gap-2">
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setViewMode("year");
            }}
            className="w-[110px] border border-gray-300 rounded-md text-sm px-2 py-1 bg-white text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {Object.keys(chartDataYear).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setViewMode("month");
            }}
            className="w-[110px] border border-gray-300 rounded-md text-sm px-2 py-1 bg-white text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {Object.keys(chartData).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Inner chart white box */}
      <div className="w-full bg-white rounded-lg shadow-md p-4">
        <div style={{ height: "250px" }}>
          {viewMode === "month" ? (
            <Line data={chartDataPerMonth} options={chartOptions} />
          ) : (
            <Line data={chartDataPerYear} options={chartOptions} />
          )}
        </div>

        {/* toggles for series visibility */}
        <div className="flex items-center justify-center gap-8 mt-4">
          <button
            onClick={() => setShowSales((s) => !s)}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            <div className="flex items-center">
              <div className="w-4 h-px bg-[#8979FF]"></div>
              <div className="w-2 h-2 mx-px rounded-full border-2 border-[#8979FF] bg-white"></div>
              <div className="w-4 h-px bg-[#8979FF]"></div>
            </div>
            <span>Sales</span>
          </button>

          <button
            onClick={() => setShowProfit((s) => !s)}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            <div className="flex items-center">
              <div className="w-4 h-px bg-[#FF928A]"></div>
              <div className="w-2 h-2 mx-px rounded-full border-2 border-[#FF928A] bg-white"></div>
              <div className="w-4 h-px bg-[#FF928A]"></div>
            </div>
            <span>Profit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RevenueSummaryGraph;
