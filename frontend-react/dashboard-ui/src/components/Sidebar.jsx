import React from "react";
import {
  FaTachometerAlt,
  FaRegCalendarAlt,
  FaTasks,
  FaEnvelope,
  FaUser,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";

import "./Sidebar.css"; // 👈 Make sure the path is correct

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Taskcore</h2>
      <ul>
        <li className="active">
          <FaTachometerAlt /> <span>Dashboard</span>
        </li>
        <li>
          <FaRegCalendarAlt /> <span>Calendar</span>
        </li>
        <li>
          <FaTasks /> <span>Tasks</span>
        </li>
        <li>
          <FaEnvelope /> <span>Messages</span>
        </li>
        <li>
          <FaUser /> <span>Profile</span>
        </li>
        <li>
          <FaCog /> <span>Settings</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
