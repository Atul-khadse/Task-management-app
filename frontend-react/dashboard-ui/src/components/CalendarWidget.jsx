import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarWidget = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold">Calendar</h3>
      <Calendar />
    </div>
  );
};

export default CalendarWidget;
