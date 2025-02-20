import { useState } from "react";

const UserSignup = ({ showUserLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle signup logic here
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
            className="w-full p-3 border rounded mb-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}

          <label className="block mb-2 font-medium">Email:</label>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full p-3 border rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <label className="block mb-2 font-medium">Password:</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full p-3 border rounded mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}

          <label className="block mb-2 font-medium">Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full p-3 border rounded mb-3"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}

<button className="w-full text-white py-3 mt-2 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-sm active:scale-95">
            SIGN UP
          </button>
        </form>

        <p className="text-center mt-2">
          Already have an account?{" "}
          <span className="text-blue-500 cursor-pointer" onClick={showUserLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
