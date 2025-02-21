import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserSignup = ({ showUserLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userData = {
        username,
        email,
        password,
      };
      console.log("Sending user data:", userData);
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/signup`, userData);
        console.log("Server response:", response);
        if (response.status === 200) {
          alert("Signup successful");
          showUserLogin();
        } else {
          alert("Signup failed");
        }
      } catch (error) {
        console.error("Signup error:", error.response ? error.response.data : error.message);
        if (error.response && error.response.data && error.response.data.msg) {
          setErrors({ server: error.response.data.msg });
          alert(error.response.data.msg);
        } else {
          alert("Signup failed");
        }
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">User Signup</h2>

        <form onSubmit={handleSignup}>
          <label className="block mb-2 font-medium">Username:</label>
          <input
            type="text"
            placeholder="Enter username"
            className="w-full p-3 border rounded mb-3 text-white "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}

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

          {errors.server && <p className="text-red-500">{errors.server}</p>}

          <button className="w-full text-white py-3 mt-2 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-sm active:scale-95">
            SIGN UP
          </button>
        </form>

        <p className="text-center mt-2">
          Already have an account?{" "}
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/login')}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
