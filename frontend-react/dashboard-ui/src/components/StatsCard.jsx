import React from "react";
import "./StatsCard.css"; // Ensure the path is correct

const StatsCard = ({ icon, count, label, color }) => {
  return (
    <div className="stats-card">
      <div className="stats-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="stats-content">
        <h3 className="stats-count">{count}</h3>
        <p className="stats-label">{label}</p>
      </div>
    </div>
  );
};

export default StatsCard;
