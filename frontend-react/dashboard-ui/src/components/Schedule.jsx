import React from "react";
import "./Schedule.css"; // Make sure the path is correct

const scheduleData = [
  { date: "11 Apr", title: "Team Meeting", details: "Zoom @ 10:00 AM" },
  { date: "12 Apr", title: "Design Review", details: "Boardroom A" },
  { date: "13 Apr", title: "Client Call", details: "Call with ABC Corp" },
];

const Schedule = () => {
  return (
    <div className="schedule-card">
      <h3 className="schedule-title">Schedule</h3>
      <ul className="schedule-list">
        {scheduleData.map((item, index) => (
          <li key={index} className="schedule-item">
            <div className="schedule-date">{item.date}</div>
            <div>
              <p className="schedule-item-title">{item.title}</p>
              <p className="schedule-item-details">{item.details}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedule;
