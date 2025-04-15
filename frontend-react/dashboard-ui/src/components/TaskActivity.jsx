import React from "react";
import "./TaskActivity.css"; // Make sure the path is correct

const chartUrl =
  "https://quickchart.io/chart?c=" +
  encodeURIComponent(
    JSON.stringify({
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Tasks",
            data: [20, 30, 45, 60, 40, 30, 20],
            fill: false,
            borderColor: "#3498db",
            backgroundColor: "#3498db",
            tension: 0.3,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Weekly Task Activity",
          },
          legend: {
            display: true,
            position: "bottom",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })
  );

const TaskActivity = () => {
  return (
    <div className="task-activity-container">
      <h3 className="task-activity-title">Task Activity</h3>
      <img
        src={chartUrl}
        alt="Weekly Task Activity Chart"
        className="task-activity-chart"
      />
    </div>
  );
};

export default TaskActivity;
