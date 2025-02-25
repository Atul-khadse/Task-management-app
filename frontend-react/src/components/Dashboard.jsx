import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [filters, setFilters] = useState({ search: "", priority: "", status: "" });

  // Default username if not logged in
  const username = "Guest";

  useEffect(() => {
    axios.get("/tasks")
      .then(response => {
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error("Fetched tasks is not an array:", response.data);
          setTasks([]);
        }
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
        setTasks([]); // Prevents breaking if API fails
      });
  }, []);

  const handleLogout = () => {
    axios.post("/logout").then(() => {
      navigate("/");
    }).catch(error => console.error("Error logging out:", error));
  };

  const addTask = (newTask) => {
    axios.post("/tasks", newTask)
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error("Error adding task:", error));
    setShowTaskForm(false);
  };

  const filterTasks = () => {
    let filtered = tasks;
    if (filters.search) {
      filtered = filtered.filter((task) => task.title.toLowerCase().includes(filters.search.toLowerCase()));
    }
    if (filters.priority) {
      filtered = filtered.filter((task) => task.priority === filters.priority);
    }
    if (filters.status) {
      filtered = filtered.filter((task) => task.status === filters.status);
    }
    setFilteredTasks(filtered);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center p-6">
      {/* Header Section */}
      <div className="w-full bg-white shadow-md p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Task Management Dashboard</h2>
        <span>Welcome, {username}</span>
        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleLogout}>Logout</button>
      </div>

      {/* Task Overview */}
      <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-4xl mt-6">
        <h3 className="text-lg font-semibold mb-4">Task Overview</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-200 rounded-md text-center">
            <p>Total Tasks</p>
            <h3 className="text-xl font-bold">{Array.isArray(tasks) ? tasks.length : 0}</h3>
          </div>
          <div className="p-4 bg-yellow-200 rounded-md text-center">
            <p>Pending</p>
            <h3 className="text-xl font-bold">{Array.isArray(tasks) ? tasks.filter(task => task.status === 'To-Do').length : 0}</h3>
          </div>
          <div className="p-4 bg-green-200 rounded-md text-center">
            <p>Completed</p>
            <h3 className="text-xl font-bold">{Array.isArray(tasks) ? tasks.filter(task => task.status === 'Completed').length : 0}</h3>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-md p-4 rounded-lg w-full max-w-4xl mt-4 flex gap-4">
        <input type="text" placeholder="Search Tasks" className="p-2 border rounded w-1/3" onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        <select className="p-2 border rounded w-1/3" onChange={(e) => setFilters({ ...filters, priority: e.target.value })}>
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select className="p-2 border rounded w-1/3" onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All Statuses</option>
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button className="bg-gray-700 text-white p-2 rounded" onClick={filterTasks}>Apply</button>
      </div>

      {/* Add Task Button */}
      <button className="w-full max-w-4xl mt-4 py-3 bg-gray-700 text-white rounded-lg" onClick={() => setShowTaskForm(true)}>
        + Add Task
      </button>

      {/* Task Form Popup */}
      {showTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">Add New Task</h2>
            <input type="text" placeholder="Task Title" className="w-full p-2 border rounded mb-3" />
            <select className="w-full p-2 border rounded mb-3">
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
            <select className="w-full p-2 border rounded mb-3">
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <textarea placeholder="Task Description" className="w-full p-2 border rounded mb-3"></textarea>
            <div className="flex justify-between mt-4">
              <button className="bg-red-500 text-white p-2 rounded w-1/3" onClick={() => setShowTaskForm(false)}>Cancel</button>
              <button className="bg-blue-500 text-white p-2 rounded w-1/3">Add Task</button>
            </div>
          </div>
        </div>
      )}

      {/* Task List */}
      <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-4xl mt-4">
        <h3 className="text-lg font-semibold mb-4">Task List</h3>
        {filteredTasks.length > 0 ? filteredTasks.map((task) => (
          <div key={task.id} className="p-3 bg-gray-200 rounded-md mb-2">{task.title}</div>
        )) : tasks.map((task) => (
          <div key={task.id} className="p-3 bg-gray-200 rounded-md mb-2">{task.title}</div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
