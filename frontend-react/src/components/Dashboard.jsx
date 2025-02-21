import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (!token) {
      navigate("/login");
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-slate-500 to-slate-800 flex flex-col">
      {/* Header Section - Stays at the Top */}
      <div className="w-full bg-white shadow-md p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Welcome, {username}</h2>
        <button
          className="px-6 py-3 m-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl active:scale-95"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Main Content - Centered and Full Width */}
      <div className="flex flex-col items-center w-full mt-6">
        {/* Task Overview */}
        <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-4xl">
          <h3 className="text-lg font-semibold mb-4">Task Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-gray-200 rounded-md">
              <span>Total Tasks</span>
              <span className="font-bold">10</span>
            </div>
            <div className="flex justify-between p-3 bg-yellow-200 rounded-md">
              <span>Pending</span>
              <span className="font-bold">3</span>
            </div>
            <div className="flex justify-between p-3 bg-green-200 rounded-md">
              <span>Completed</span>
              <span className="font-bold">5</span>
            </div>
          </div>
        </div>

        {/* Add Task Button */}
        <button className="w-full text-white max-w-4xl mt-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-sm active:scale-95">
          + Add Task
        </button>

        {/* Task List */}
        <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-4xl mt-6">
          <h3 className="text-lg font-semibold mb-4">Task List</h3>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-gray-200 rounded-md">
              <span>Task 1</span>
              <div className="space-x-2">
                <button className="text-blue-500">Read</button>
                <button className="text-yellow-500">Edit</button>
                <button className="text-red-500">Delete</button>
              </div>
            </div>
            <div className="flex justify-between p-3 bg-gray-200 rounded-md">
              <span>Task 2</span>
              <div className="space-x-2">
                <button className="text-blue-500">Read</button>
                <button className="text-yellow-500">Edit</button>
                <button className="text-red-500">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
