


import React from "react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import Header2 from "../../../components/superAdmin/header/Header2";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { PieChart, Pie, Cell } from "recharts";

const ReportAnalytics = () => {
  const analyticsData = [
    {
      title: "Total Revenue",
      amount: "₹ 10,00,000",
      change: "0.7%",
      increase: true,
      bgColor: "bg-[#00C8B3]"
    },
    {
      title: "Total Sales",
      amount: "₹ 8,50,000",
      change: "0.3%",
      increase: false,
      bgColor: "bg-[#CB30E0]"
    },
    {
      title: "Total Profit",
      amount: "₹ 6,20,000",
      change: "1.2%",
      increase: true,
      bgColor: "bg-[#00C0E8]"
    },
  ];

  const chartData = [
    { name: "Mon", service: 800, product: 550 },
    { name: "Tue", service: 600, product: 700 },
    { name: "Wed", service: 900, product: 850 },
    { name: "Thu", service: 350, product: 500 },
    { name: "Fri", service: 500, product: 600 },
    { name: "Sat", service: 600, product: 550 },
    { name: "Sun", service: 700, product: 500 },
  ];

  const donutData = {
    manufacturer: [
      { name: "In Progress", value: 40, color: "#3CC8FF" },
      { name: "Pending", value: 25, color: "#FACC15" },
      { name: "Completed", value: 35, color: "#16A34A" },
    ],
    vendor: [
      { name: "In Progress", value: 50, color: "#3CC8FF" },
      { name: "Pending", value: 20, color: "#FACC15" },
      { name: "Completed", value: 30, color: "#16A34A" },
    ],
    serviceEngineer: [
      { name: "In Progress", value: 30, color: "#3CC8FF" },
      { name: "Pending", value: 40, color: "#FACC15" },
      { name: "Completed", value: 30, color: "#16A34A" },
    ],
  };

  const areaData = [
    { area: "North", total: 1500, completed: 800 },
    { area: "South", total: 1200, completed: 700 },
    { area: "East", total: 1800, completed: 900 },
    { area: "West", total: 2000, completed: 1200 },
    { area: "Central", total: 1600, completed: 1000 },
  ];

  
  const tableData = [
    { id: 1, area: "North", totalLeads: 1500, completed: 800,completetionRate:"60%", revenue: "₹5,00,000", trendUp: true, trendPercent: "0.8%", status: "Good" },
    { id: 2, area: "South", totalLeads: 1200, completed: 700,completetionRate:"60%", revenue: "₹3,50,000", trendUp: false, trendPercent: "0.5%", status: "Average" },
    { id: 3, area: "East", totalLeads: 1800, completed: 900,completetionRate:"60%", revenue: "₹6,20,000", trendUp: true, trendPercent: "1.2%", status: "Excellent" },
    { id: 4, area: "West", totalLeads: 2000, completed: 1200,completetionRate:"60%", revenue: "₹7,00,000", trendUp: false, trendPercent: "0.3%", status: "Need Attention" },
    { id: 5, area: "Center", totalLeads: 1600, completed: 1000, completetionRate:"60%",revenue: "₹5,50,000", trendUp: true, trendPercent: "0.7%", status: "Good" },
  ];


  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, payload }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) / 2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {payload.name}
      </text>
    );
  };

  const DonutBox = ({ title, data }) => (
    <div className="bg-white rounded-lg shadow-md p-5 flex flex-col items-center">
      <h3 className="text-[16px] font-semibold mb-4">{title}</h3>
      <div className="w-full h-65">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={50}
              outerRadius={120}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend with colored circles and percentages */}
      <div className="mt-4 w-1/2 flex justify-around flex-wrap">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <div
              style={{
                backgroundColor: item.color,
                width: "20px",
                height: "20px",
                borderRadius: "50%",
              }}
            ></div>
            <span className="text-md font-medium">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between mb-6 rounded-md">
        <Header2 />
      </div>

      {/* Top 3 Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 mb-10">
        {analyticsData.map((item, index) => (
          <div
            key={index}
            className={`${item.bgColor} rounded-lg shadow-md p-5 flex flex-col justify-between transition-all hover:shadow-lg`}
          >
            <h2 className="text-[16px] font-poppins font-600 text-white mb-2">{item.title}</h2>
            <div className="flex items-center gap-1 text-[24px] font-bold text-white mb-3">
              <span>{item.amount}</span>
            </div>
            <div className="flex items-center gap-2 text-[14px]">
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-white font-medium ${
                  item.increase ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {item.increase ? <FaArrowTrendUp className="text-sm" /> : <FaArrowTrendDown className="text-sm" />}
                <span>{item.change}</span>
              </div>
              <span className="text-white font-poppins text-[14px] flex items-center gap-1">
                Since last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Report Bar Chart */}
      <div className="px-6 mb-10">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Sales Report</h2>
          <select className="border px-2 py-1 rounded">
            <option>This Week</option>
            <option>Last Week</option>
          </select>
        </div>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={20} barSize={60}>
              <XAxis dataKey="name" />
              <YAxis
                domain={[0, 1000]}
                ticks={[0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]}
                tickFormatter={(value) => `${value}K`}
              />
              <Tooltip />
              <Bar dataKey="service" fill="#3CC8FF" radius={[4, 4, 0, 0]} />
              <Bar dataKey="product" fill="#007AFF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-6 mt-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#3CC8FF]"></div>
            <span className="text-sm text-gray-600">Service Purchase</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#007AFF]"></div>
            <span className="text-sm text-gray-600">Product Purchase</span>
          </div>
        </div>
      </div>

      {/* Donut Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 mt-6">
        <DonutBox title="Manufacturer" data={donutData.manufacturer} />
        <DonutBox title="Vendor" data={donutData.vendor} />
        <DonutBox title="Service Engineer" data={donutData.serviceEngineer} />
      </div>

      {/* Area-wise Performance Bar Chart */}
      <div className="mt-10 px-10 bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Area-wise Performance</h2>
          <select className="border px-2 py-1 rounded">
            <option>This Week</option>
            <option>Last Week</option>
          </select>
        </div>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={areaData} barGap={20} barSize={60}>
              <XAxis dataKey="area" />
              <YAxis
                domain={[0, 3000]}
                ticks={[0, 100, 200, 400, 800,1000, 1200, 1600,1800,2000,2400, 3000]}
              />
              <Tooltip />
              <Bar dataKey="total" fill="#6f31daff" radius={[4, 4, 0, 0]} />
              <Bar dataKey="completed" fill="#16A34A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Legend below area-wise chart */}
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#6f31daff]"></div>
            <span className="text-sm font-medium">Total Leads</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#16A34A]"></div>
            <span className="text-sm font-medium">Completed</span>
          </div>
        </div>
        </div>
        

<div className="mt-10 px-10">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-xl font-semibold">Detailed Area Breakdown</h3>
    <select className="border px-3 py-1 rounded">
      <option>This Week</option>
      <option>Last Week</option>
    </select>
  </div>
  <div className="bg-white rounded-xl shadow-md overflow-x-auto w-full">
    <table className="min-w-full divide-y divide-gray-200 table-auto">
      <thead className="bg-gray-100">
        <tr>
          {["S.No", "Area", "Total Leads", "Completed", "Completion Rate", "Revenue", "Trend", "Status"].map((header, idx) => (
            <th 
              key={idx} 
              className="px-6 py-4 text-left text-base font-semibold text-gray-700"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="">
        {tableData.map((row) => {
          const completionPercent = Math.round((row.completed / row.totalLeads) * 100);
          return (
            <tr key={row.id} className="hover:bg-gray-50 border-b border-gray-300">
              <td className="px-6 py-4 text-base font-medium">{row.id}</td>
              <td className="px-6 py-4 text-base">{row.area}</td>
              <td className="px-6 py-4 text-base">{row.totalLeads}</td>
              <td className="px-6 py-4 text-base">{row.completed}</td>
              <td className="px-6 py-4 text-base w-[250px]">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-5 overflow-hidden">
                    <div
                      className="bg-blue-500 h-5 rounded-full"
                      style={{ width: `${completionPercent}%` }}
                    ></div>
                  </div>
                  <span className="text-base font-medium w-14">{completionPercent}%</span>
                </div>
              </td>
              <td className="px-6 py-4 text-base">{row.revenue}</td>
             <td className="px-6 py-4 text-base">
  <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-white font-medium ${
    row.trendUp ? "bg-green-500" : "bg-red-500"
  } w-max`}>
    {row.trendUp ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
    <span>{row.trendPercent}</span>
  </div>
</td>

              <td className="px-6 py-4 text-base">{row.status}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>



      </div>
  );
};

export default ReportAnalytics;
