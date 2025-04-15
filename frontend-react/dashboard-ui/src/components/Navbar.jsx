import React from "react";
import { FaBars } from "react-icons/fa";
import "./Navbar.css"; // Optional: for styling

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">MyApp</div>
      <div className="navbar__menu" onClick={toggleSidebar}>
        <FaBars />
      </div>
    </nav>
  );
};

export default Navbar;
