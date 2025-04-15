// import React from "react";
// // import Navbar from "./components/Navbar";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import DashboardHeader from "../components/DashboardHeader";
// import StatsCard from "../components/StatsCard";
// import TaskSummary from "../components/TaskSummary";
// import TaskActivity from "../components/TaskActivity";
// import CalendarWidget from "../components/CalendarWidget";
// import Schedule from "../components/Schedule";
// import Reminder from "../components/Reminder";
// import { FaClipboardList, FaSpinner, FaCheckCircle } from "react-icons/fa";

// const Dashboard = () => {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-1 p-6">
//         <Navbar />
//         <DashboardHeader /> {/* ✅ Added DashboardHeader Here */}
//         <div className="grid grid-cols-3 gap-4 mt-6">
//           <StatsCard
//             icon={<FaClipboardList size={24} />}
//             count={25}
//             label="Upcoming"
//             color="bg-blue-200"
//           />
//           <StatsCard
//             icon={<FaSpinner size={24} />}
//             count={10}
//             label="On Progress"
//             color="bg-yellow-200"
//           />
//           <StatsCard
//             icon={<FaCheckCircle size={24} />}
//             count={123}
//             label="Completed"
//             color="bg-green-200"
//           />
//         </div>
//         <div className="grid grid-cols-3 gap-4 mt-6">
//           <TaskSummary />
//           <TaskActivity />
//           <CalendarWidget />
//         </div>
//         <div className="grid grid-cols-2 gap-4 mt-6">
//           <Schedule />
//           <Reminder />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardHeader from "../components/DashboardHeader";
import StatsCard from "../components/StatsCard";
import TaskSummary from "../components/TaskSummary";
import TaskActivity from "../components/TaskActivity";
import CalendarWidget from "../components/CalendarWidget";
import Schedule from "../components/Schedule";
import Reminder from "../components/Reminder";
import { FaClipboardList, FaSpinner, FaCheckCircle } from "react-icons/fa";

import "./Dashboard.css"; // Make sure this path is correct

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Navbar />
        <DashboardHeader />

        <div className="dashboard-section stats-cards">
          <StatsCard
            icon={<FaClipboardList />}
            count={25}
            label="Upcoming"
            color="#cce5ff"
          />
          <StatsCard
            icon={<FaSpinner />}
            count={10}
            label="On Progress"
            color="#fff3cd"
          />
          <StatsCard
            icon={<FaCheckCircle />}
            count={123}
            label="Completed"
            color="#d4edda"
          />
        </div>

        <div className="dashboard-section charts-row">
          <TaskSummary />
          <TaskActivity />
          <CalendarWidget />
        </div>

        <div className="dashboard-section reminders-row">
          <Schedule />
          <Reminder />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
