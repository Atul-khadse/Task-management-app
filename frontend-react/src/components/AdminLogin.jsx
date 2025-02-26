import { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validateForm = () => {
    let newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/admin/login`, { email, password });
        setMessage("Login successful");
        alert("Login successful"); // Add alert for successful login
        // Handle successful login (e.g., store token, redirect)
      } catch (error) {
        setMessage(error.response.data.message || "Login failed");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>

        {message && <p className="text-center mb-4">{message}</p>}

        <form onSubmit={handleLogin}>
          <label className="block mb-2 font-medium">Email:</label>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full p-3 border rounded mb-3 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <label className="block mb-2 font-medium">Password:</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full p-3 border rounded mb-3 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}

          <button className="w-full text-white py-3 mt-2 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-sm active:scale-95">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
