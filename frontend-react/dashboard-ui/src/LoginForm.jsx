import React, { useState } from "react";
import "./index.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in with Username: ${formData.username}`);
    // Here, you can integrate API call for login
  };

  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <div className="inputBox">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <span>Username</span>
          <i></i>
        </div>
        <div className="inputBox">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span>Enter password</span>
          <i></i>
        </div>
        <input type="submit" value="Login" />
        <div className="links">
          <a href="#">Forgot password?</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
