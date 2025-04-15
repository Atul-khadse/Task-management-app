import React from "react";
import "./DashboardHeader.css"; // Make sure the path is correct

const DashboardHeader = () => {
  return (
    <div className="dashboard-header">
      <h2>Good Morning</h2>
      <p>You have 6 tasks today</p>
      <button className="view-task-btn">View Task</button>
    </div>
  );
};

export default DashboardHeader;
