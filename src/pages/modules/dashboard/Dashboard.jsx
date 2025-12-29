// import React from "react";
import React, { useEffect, useState } from "react";
import RevenueSummaryGraph from "./RevenueSummaryGraph";
import ManufacturerStatus from "./ManufacturerStatus";
import { Pie } from "react-chartjs-2";
import Header2 from "../../../components/superAdmin/header/Header2";
import manufIcon from "../../../assets/dashboard_total manufacture.png";
import vendorsIcon from "../../../assets/dashboard_total vendors.png";
import serviceEngIcon from "../../../assets/dashboard_total service Engineering.png";
import customerIcon from "../../../assets/Customer.png";
import ordersIcon from "../../../assets/Orders.png";
import trendingUp from "../../../assets/Trending Up.png";
import trendingDown from "../../../assets/Trending Down.png";

import axios from "axios";

const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState(null);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await axios.get(
          "https://ro-service-engineer-be.onrender.com/api/admin/dashborad-stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDashboardData(response.data.data);
      } catch (error) {
        console.error("Dashboard API error", error);
      }
    };

    fetchDashboardData();
  }, []);



  // const statCards = [
  //   {
  //     title: "Total Manufacturers",
  //     value: "3590",
  //     icon: <img src={manufIcon} alt="manufacturers" />,
  //     bgColor: "bg-[#7373E5]/25",
  //     trend: "up",
  //     percentage: "2.4%",
  //   },
  //   {
  //     title: "Total Vendors",
  //     value: "3590",
  //     icon: <img src={vendorsIcon} alt="vendors" />,
  //     bgColor: "bg-[#FEC53D]/25",
  //     trend: "down",
  //     percentage: "3.5%",
  //   },
  //   {
  //     title: "Total Service Engineers",
  //     value: "58,934",
  //     icon: <img src={serviceEngIcon} alt="service engineers" />,
  //     bgColor: "bg-[#FF9066]/25",
  //     trend: "up",
  //     percentage: "2.6%",
  //   },
  //   {
  //     title: "Total Customers",
  //     value: "94,89,948",
  //     icon: <img src={customerIcon} alt="customers" />,
  //     bgColor: "bg-[#4AD991]/25",
  //     trend: "up",
  //     percentage: "9.7%",
  //   },
  //   {
  //     title: "Total Orders",
  //     value: "1,23,456",
  //     icon: <img src={ordersIcon} alt="orders" />,
  //     bgColor: "bg-[#4AD99140]",
  //     trend: "down",
  //     percentage: "3.5%",
  //   },
  // ];



  const statCards = [
    {
      title: "Total Manufacturers",
      value: dashboardData?.manufacturer?.total ?? 0,
      icon: <img src={manufIcon} alt="manufacturers" />,
      bgColor: "bg-[#7373E5]/25",
      trend: "up",
      percentage: `${dashboardData?.manufacturer?.growthPercent ?? 0}%`,
    },
    {
      title: "Total Vendors",
      value: dashboardData?.vendor?.total ?? 0,
      icon: <img src={vendorsIcon} alt="vendors" />,
      bgColor: "bg-[#FEC53D]/25",
      trend: "up",
      percentage: `${dashboardData?.vendor?.growthPercent ?? 0}%`,
    },
    {
      title: "Total Service Engineers",
      value: dashboardData?.engineer?.total ?? 0,
      icon: <img src={serviceEngIcon} alt="service engineers" />,
      bgColor: "bg-[#FF9066]/25",
      trend: "up",
      percentage: `${dashboardData?.engineer?.growthPercent ?? 0}%`,
    },
    {
      title: "Total Customers",
      value: dashboardData?.customer?.total ?? 0,
      icon: <img src={customerIcon} alt="customers" />,
      bgColor: "bg-[#4AD991]/25",
      trend: "up",
      percentage: `${dashboardData?.customer?.growthPercent ?? 0}%`,
    },
    {
      title: "Total Orders",
      value: dashboardData?.overall?.total ?? 0,
      icon: <img src={ordersIcon} alt="orders" />,
      bgColor: "bg-[#4AD99140]",
      trend: "up",
      percentage: `${dashboardData?.overall?.growthPercent ?? 0}%`,
    },
  ];


  // const overviewCards = [
  //   {
  //     title: "Vendors",
  //     data: { active: 1890, inactive: 1700 },
  //     colors: ["#CB30E0", "#FF2D55"],
  //   },
  //   {
  //     title: "Service Engineers",
  //     data: { active: 29467, inactive: 29467 },
  //     colors: ["#FF8D28", "#FFCC00"],
  //   },
  //   {
  //     title: "Customers",
  //     data: { active: 918900, inactive: 300948 },
  //     colors: ["#6155F5", "#00C3D0"],
  //   },
  // ];

 
  const overviewCards = [
    {
      title: "Vendors",
      data: {
        active: dashboardData?.vendor?.active ?? 0,
        inactive: dashboardData?.vendor?.inactive ?? 0,
      },
      colors: ["#CB30E0", "#FF2D55"],
    },
    {
      title: "Service Engineers",
      data: {
        active: dashboardData?.engineer?.active ?? 0,
        inactive: dashboardData?.engineer?.inactive ?? 0,
      },
      colors: ["#FF8D28", "#FFCC00"],
    },
    {
      title: "Customers",
      data: {
        active: dashboardData?.customer?.active ?? 0,
        inactive: dashboardData?.customer?.inactive ?? 0,
      },
      colors: ["#6155F5", "#00C3D0"],
    },
  ];
 

  return (
    <div className="flex flex-col bg-white p-4 sm:p-6 gap-y-6 sm:gap-y-8 min-h-screen font-sans">
      <div className="flex flex-col">
        {/* Header */}
        <Header2 />
      </div>

      {/* ✅ Stat Cards - scrollable horizontally */}
      {/* <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="w-full flex flex-col justify-between p-4 sm:p-5 bg-gray-100 rounded-2xl font-semibold shadow-sm min-h-[140px]"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base text-gray-600 truncate">
                    {card.title}
                  </h3>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 truncate">
                    {card.value}
                  </p>
                </div>

                <div
                  className={`flex items-center justify-center rounded-2xl p-2 overflow-hidden ${card.bgColor}`}
                  style={{ width: 56, height: 56 }}
                >
                  {React.isValidElement(card.icon)
                    ? React.cloneElement(card.icon, {
                        className: "w-full h-full object-contain",
                      })
                    : card.icon}
                </div>
              </div>

              <div className="flex items-center mt-3">
                <img
                  src={card.trend === "up" ? trendingUp : trendingDown}
                  alt={card.trend}
                  className="w-4 h-4"
                />
                <p
                  className={`font-bold ml-2 text-sm ${
                    card.trend === "up" ? "text-[#7EC1B1]" : "text-[#FF6B6B]"
                  }`}
                >
                  {card.percentage}
                </p>
                <p className="text-gray-500 text-xs ml-2">from past month</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* ✅ Stat Cards - scrollable horizontally on small screens */}
      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 min-w-[600px]">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full flex flex-col justify-between p-4 sm:p-5 bg-gray-100 rounded-2xl font-semibold shadow-sm min-h-[140px]"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base text-gray-600 truncate">
                    {card.title}
                  </h3>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 truncate">
                    {card.value}
                  </p>
                </div>

                <div
                  className={`flex items-center justify-center rounded-2xl p-2 overflow-hidden ${card.bgColor}`}
                  style={{ width: 56, height: 56 }}
                >
                  {React.isValidElement(card.icon)
                    ? React.cloneElement(card.icon, {
                      className: "w-full h-full object-contain",
                    })
                    : card.icon}
                </div>
              </div>

              <div className="flex items-center mt-3">
                <img
                  src={card.trend === "up" ? trendingUp : trendingDown}
                  alt={card.trend}
                  className="w-4 h-4"
                />
                <p
                  className={`font-bold ml-2 text-sm ${card.trend === "up" ? "text-[#7EC1B1]" : "text-[#FF6B6B]"
                    }`}
                >
                  {card.percentage}
                </p>
                <p className="text-gray-500 text-xs ml-2">from past month</p>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Service Booking & Customer Satisfaction - responsive columns */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="w-full lg:w-2/3">
          <RevenueSummaryGraph />
        </div>
        <div className="w-full lg:w-1/3">
          <ManufacturerStatus />
        </div>
      </div>

      {/* Overview Cards - responsive, no fixed px sizes */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
        {overviewCards.map((card, index) => {
          const { active, inactive } = card.data;
          const data = {
            labels: ["Active", "Inactive"],
            datasets: [
              {
                data: [active, inactive],
                backgroundColor: card.colors,
                borderWidth: 0,
              },
            ],
          };

          return (
            <div
              key={index}
              className="relative flex flex-col items-center bg-[#F5F5F5] p-6 rounded-[16px] w-full"
            >
              <h1 className="w-full text-left mb-4 text-base font-semibold text-[#263138]">
                {card.title}
              </h1>

              <div className="flex flex-col items-center w-full">
                <div className="w-36 h-36 sm:w-40 sm:h-40">
                  <Pie
                    data={data}
                    options={{
                      maintainAspectRatio: true,
                      plugins: { legend: { display: false } },
                    }}
                  />
                </div>

                <div className="mt-6 w-full flex justify-between px-4">
                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-extrabold text-[#263138]">
                      {active.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-sm font-semibold text-[#263138] opacity-90">
                      <span
                        style={{
                          width: 11.33,
                          height: 11.34,
                          backgroundColor: card.colors[0],
                          borderRadius: 99,
                          display: "inline-block",
                        }}
                      />
                      Active
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-extrabold text-[#263138]">
                      {inactive.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-sm font-semibold text-[#263138] opacity-90">
                      <span
                        style={{
                          width: 11.33,
                          height: 11.34,
                          backgroundColor: card.colors[1],
                          borderRadius: 99,
                          display: "inline-block",
                        }}
                      />
                      Inactive
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function App() {
  return <Dashboard />;
}



// Sir
// import React from "react";
// import RevenueSummaryGraph from "./RevenueSummaryGraph";
// import ManufacturerStatus from "./ManufacturerStatus";
// import { Pie } from "react-chartjs-2";
// import Header2 from "../../../components/superAdmin/header/Header2";
// import manufIcon from "../../../assets/dashboard_total manufacture.png";
// import vendorsIcon from "../../../assets/dashboard_total vendors.png";
// import serviceEngIcon from "../../../assets/dashboard_total service Engineering.png";
// import customerIcon from "../../../assets/Customer.png";
// import ordersIcon from "../../../assets/Orders.png";
// import trendingUp from "../../../assets/Trending Up.png";
// import trendingDown from "../../../assets/Trending Down.png";

// const Dashboard = () => {
//   const statCards = [
//     {
//       title: "Total Manufacturers",
//       value: "3590",
//       icon: <img src={manufIcon} alt="manufacturers" />,
//       bgColor: "bg-[#7373E5]/25",
//       trend: "up",
//       percentage: "2.4%",
//     },
//     {
//       title: "Total Vendors",
//       value: "3590",
//       icon: <img src={vendorsIcon} alt="vendors" />,
//       bgColor: "bg-[#FEC53D]/25",
//       trend: "down",
//       percentage: "3.5%",
//     },
//     {
//       title: "Total Service Engineers",
//       value: "58,934",
//       icon: <img src={serviceEngIcon} alt="service engineers" />,
//       bgColor: "bg-[#FF9066]/25",
//       trend: "up",
//       percentage: "2.6%",
//     },
//     {
//       title: "Total Customers",
//       value: "94,89,948",
//       icon: <img src={customerIcon} alt="customers" />,
//       bgColor: "bg-[#4AD991]/25",
//       trend: "up",
//       percentage: "9.7%",
//     },
//     {
//       title: "Total Orders",
//       value: "1,23,456",
//       icon: <img src={ordersIcon} alt="orders" />,
//       bgColor: "bg-[#4AD99140]",
//       trend: "down",
//       percentage: "3.5%",
//     },
//   ];

//   const overviewCards = [
//     {
//       title: "Vendors",
//       data: { active: 1890, inactive: 1700 },
//       colors: ["#CB30E0", "#FF2D55"],
//     },
//     {
//       title: "Service Engineers",
//       data: { active: 29467, inactive: 29467 },
//       colors: ["#FF8D28", "#FFCC00"],
//     },
//     {
//       title: "Customers",
//       data: { active: 918900, inactive: 300948 },
//       colors: ["#6155F5", "#00C3D0"],
//     },
//   ];

//   return (
//     <div className="flex flex-col bg-white p-4 sm:p-6 gap-y-6 sm:gap-y-8 min-h-screen font-sans">
//       <div className="flex flex-col">
//         {/* Header */}
//         <Header2 />
//       </div>

//       {/* ✅ Stat Cards - scrollable horizontally */}
//       {/* <div className="w-full">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//           {statCards.map((card, index) => (
//             <div
//               key={index}
//               className="w-full flex flex-col justify-between p-4 sm:p-5 bg-gray-100 rounded-2xl font-semibold shadow-sm min-h-[140px]"
//             >
//               <div className="flex justify-between items-start gap-4">
//                 <div className="min-w-0">
//                   <h3 className="text-sm sm:text-base text-gray-600 truncate">
//                     {card.title}
//                   </h3>
//                   <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 truncate">
//                     {card.value}
//                   </p>
//                 </div>

//                 <div
//                   className={`flex items-center justify-center rounded-2xl p-2 overflow-hidden ${card.bgColor}`}
//                   style={{ width: 56, height: 56 }}
//                 >
//                   {React.isValidElement(card.icon)
//                     ? React.cloneElement(card.icon, {
//                         className: "w-full h-full object-contain",
//                       })
//                     : card.icon}
//                 </div>
//               </div>

//               <div className="flex items-center mt-3">
//                 <img
//                   src={card.trend === "up" ? trendingUp : trendingDown}
//                   alt={card.trend}
//                   className="w-4 h-4"
//                 />
//                 <p
//                   className={`font-bold ml-2 text-sm ${
//                     card.trend === "up" ? "text-[#7EC1B1]" : "text-[#FF6B6B]"
//                   }`}
//                 >
//                   {card.percentage}
//                 </p>
//                 <p className="text-gray-500 text-xs ml-2">from past month</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div> */}

//       {/* ✅ Stat Cards - scrollable horizontally on small screens */}
// <div className="w-full overflow-x-auto">
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 min-w-[600px]">
//     {statCards.map((card, index) => (
//       <div
//         key={index}
//         className="flex-shrink-0 w-full flex flex-col justify-between p-4 sm:p-5 bg-gray-100 rounded-2xl font-semibold shadow-sm min-h-[140px]"
//       >
//         <div className="flex justify-between items-start gap-4">
//           <div className="min-w-0">
//             <h3 className="text-sm sm:text-base text-gray-600 truncate">
//               {card.title}
//             </h3>
//             <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 truncate">
//               {card.value}
//             </p>
//           </div>

//           <div
//             className={`flex items-center justify-center rounded-2xl p-2 overflow-hidden ${card.bgColor}`}
//             style={{ width: 56, height: 56 }}
//           >
//             {React.isValidElement(card.icon)
//               ? React.cloneElement(card.icon, {
//                   className: "w-full h-full object-contain",
//                 })
//               : card.icon}
//           </div>
//         </div>

//         <div className="flex items-center mt-3">
//           <img
//             src={card.trend === "up" ? trendingUp : trendingDown}
//             alt={card.trend}
//             className="w-4 h-4"
//           />
//           <p
//             className={`font-bold ml-2 text-sm ${
//               card.trend === "up" ? "text-[#7EC1B1]" : "text-[#FF6B6B]"
//             }`}
//           >
//             {card.percentage}
//           </p>
//           <p className="text-gray-500 text-xs ml-2">from past month</p>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>


//       {/* Service Booking & Customer Satisfaction - responsive columns */}
//       <div className="flex flex-col lg:flex-row gap-6 w-full">
//         <div className="w-full lg:w-2/3">
//           <RevenueSummaryGraph />
//         </div>
//         <div className="w-full lg:w-1/3">
//           <ManufacturerStatus />
//         </div>
//       </div>

//       {/* Overview Cards - responsive, no fixed px sizes */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
//         {overviewCards.map((card, index) => {
//           const { active, inactive } = card.data;
//           const data = {
//             labels: ["Active", "Inactive"],
//             datasets: [
//               {
//                 data: [active, inactive],
//                 backgroundColor: card.colors,
//                 borderWidth: 0,
//               },
//             ],
//           };

//           return (
//             <div
//               key={index}
//               className="relative flex flex-col items-center bg-[#F5F5F5] p-6 rounded-[16px] w-full"
//             >
//               <h1 className="w-full text-left mb-4 text-base font-semibold text-[#263138]">
//                 {card.title}
//               </h1>

//               <div className="flex flex-col items-center w-full">
//                 <div className="w-36 h-36 sm:w-40 sm:h-40">
//                   <Pie
//                     data={data}
//                     options={{
//                       maintainAspectRatio: true,
//                       plugins: { legend: { display: false } },
//                     }}
//                   />
//                 </div>

//                 <div className="mt-6 w-full flex justify-between px-4">
//                   <div className="flex flex-col items-center">
//                     <div className="text-2xl font-extrabold text-[#263138]">
//                       {active.toLocaleString()}
//                     </div>
//                     <div className="flex items-center gap-2 mt-2 text-sm font-semibold text-[#263138] opacity-90">
//                       <span
//                         style={{
//                           width: 11.33,
//                           height: 11.34,
//                           backgroundColor: card.colors[0],
//                           borderRadius: 99,
//                           display: "inline-block",
//                         }}
//                       />
//                       Active
//                     </div>
//                   </div>

//                   <div className="flex flex-col items-center">
//                     <div className="text-2xl font-extrabold text-[#263138]">
//                       {inactive.toLocaleString()}
//                     </div>
//                     <div className="flex items-center gap-2 mt-2 text-sm font-semibold text-[#263138] opacity-90">
//                       <span
//                         style={{
//                           width: 11.33,
//                           height: 11.34,
//                           backgroundColor: card.colors[1],
//                           borderRadius: 99,
//                           display: "inline-block",
//                         }}
//                       />
//                       Inactive
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default function App() {
//   return <Dashboard />;
// }
