import React from "react";
import "./TaskSummary.css"; // Ensure this path is correct

const chartUrl =
  "https://quickchart.io/chart?c=" +
  encodeURIComponent(
    JSON.stringify({
      type: "pie",
      data: {
        labels: ["Upcoming", "In Progress", "Completed"],
        datasets: [
          {
            label: "Task Status",
            data: [40, 35, 25],
            backgroundColor: ["#3498db", "#f1c40f", "#2ecc71"],
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Task Summary",
          },
          legend: {
            display: true,
            position: "bottom",
          },
        },
      },
    })
  );

const TaskSummary = () => {
  return (
    <div className="task-summary-container">
      <h3 className="task-summary-title">Task Summary</h3>
      <img
        src={chartUrl}
        alt="Task Summary Pie Chart"
        className="task-summary-chart"
      />
    </div>
  );
};

export default TaskSummary;
