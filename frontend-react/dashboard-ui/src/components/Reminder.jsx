import React from "react";
import "./Reminder.css"; // Make sure the path matches your folder structure

const Reminder = () => {
  const reminders = [
    { title: "Prepare Presentation", details: "Stakeholder's Meeting" },
  ];

  return (
    <div className="reminder-card">
      <h3 className="reminder-title">Reminder</h3>
      <ul className="reminder-list">
        {reminders.map((reminder, index) => (
          <li key={index} className="reminder-item">
            <p className="reminder-item-title">{reminder.title}</p>
            <p className="reminder-item-details">{reminder.details}</p>
            <button className="remind-btn">Remind Me</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reminder;
