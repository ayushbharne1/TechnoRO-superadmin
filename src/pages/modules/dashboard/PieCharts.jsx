// DashboardPieCharts.js
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieCard = ({ title, data, colors }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center w-full md:w-1/3">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <Pie
      data={{
        labels: ["Active", "Inactive"],
        datasets: [
          {
            data: data,
            backgroundColor: colors,
            borderWidth: 0,
          },
        ],
      }}
      options={{
        plugins: { legend: { display: false } },
        maintainAspectRatio: false,
      }}
      height={120}
    />
    <div className="flex gap-4 mt-4 text-center">
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold">{data[0].toLocaleString()}</span>
        <span className="text-blue-500 text-sm">Active</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold">{data[1].toLocaleString()}</span>
        <span className="text-pink-400 text-sm">Inactive</span>
      </div>
    </div>
  </div>
);

export default function DashboardPieCharts() {
  const charts = [
    { title: "Vendors", data: [1890, 1700], colors: ["#3b82f6", "#f472b6"] },
    { title: "Service Engineers", data: [29467, 29467], colors: ["#3b82f6", "#f472b6"] },
    { title: "Customers", data: [9189000, 300948], colors: ["#3b82f6", "#f472b6"] },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-6">
      {charts.map((chart) => (
        <PieCard key={chart.title} {...chart} />
      ))}
    </div>
  );
}
