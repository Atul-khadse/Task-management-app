import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import TaskDetail from "./TaskDetail";

const Dashboard = ({ username }) => {
  const navigate = useNavigate();
  const [storedUsername, setStoredUsername] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ search: "", priority: "", status: "" });
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", priority: "Low", status: "To-Do", description: "", startTime: "", endTime: "" });
  const [selectedTask, setSelectedTask] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (!token) {
      navigate("/login");
    } else {
      setStoredUsername(storedUsername);
      fetchTasks();
    }
  }, [navigate]);

  useEffect(() => {
    filterTasks();
  }, [filters, tasks]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setTasks(response.data.tasks);
      setFilteredTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    Cookies.remove("token");
    navigate("/login");
  };

  const filterTasks = () => {
    let filtered = Array.isArray(tasks) ? tasks : [];
    if (filters.search) {
      filtered = filtered.filter(task => task.title.toLowerCase().includes(filters.search.toLowerCase()));
    }
    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }
    if (filters.status) {
      filtered = filtered.filter(task => task.status === filters.status);
    }
    setFilteredTasks(filtered);
  };

  const handleAddTask = async () => {
    try {
      const taskPayload = {
        ...newTask,
        startTime: new Date(newTask.startTime).toISOString(),
        endTime: new Date(newTask.endTime).toISOString()
      };
      console.log("Adding task:", taskPayload);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/tasks`, taskPayload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const updatedTasks = Array.isArray(tasks) ? [...tasks, response.data.task] : [response.data.task];
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
      setShowTaskForm(false);
      setNewTask({ title: "", priority: "Low", status: "To-Do", description: "", startTime: "", endTime: "" });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/tasks/${updatedTask._id}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const updatedTasks = tasks.map(task => task._id === updatedTask._id ? response.data.task : task);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
      setSelectedTask(null);
      setIsUpdateMode(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      console.log("Deleting task with ID:", taskId); // Log the task ID
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.status === 200) {
        const updatedTasks = tasks.filter(task => task._id !== taskId);
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
      } else {
        console.error("Failed to delete task:", response.data);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-100 to-blue-200 flex flex-col items-center p-6">
      {/* Header Section */}
      <div className="w-full bg-white shadow-md p-4 flex justify-between items-center rounded-lg transform transition duration-300 hover:shadow-lg">
        <h2 className="text-xl font-semibold">Welcome, {username}</h2>
        <span> {storedUsername}</span>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 transform hover:scale-105" onClick={handleLogout}>Logout</button>
      </div>

      {/* Task Overview */}
      <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-4xl mt-6 transform transition duration-300 hover:shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Task Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-200 rounded-md text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
            <p>Total Tasks</p>
            <h3 className="text-xl font-bold">{Array.isArray(tasks) ? tasks.length : 0}</h3>
          </div>
          <div className="p-4 bg-yellow-200 rounded-md text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
            <p>Pending</p>
            <h3 className="text-xl font-bold">{Array.isArray(tasks) ? tasks.filter(task => task.status === 'To-Do' || task.status === 'In Progress').length : 0}</h3>
          </div>
          <div className="p-4 bg-green-200 rounded-md text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
            <p>Completed</p>
            <h3 className="text-xl font-bold">{Array.isArray(tasks) ? tasks.filter(task => task.status === 'Completed').length : 0}</h3>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-md p-4 rounded-lg w-full max-w-4xl mt-4 flex flex-col md:flex-row gap-4 transform transition duration-300 hover:shadow-lg">
        <input type="text" placeholder="Search Tasks" className="p-2 border rounded w-full md:w-1/3" onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        <select className="p-2 border rounded w-full md:w-1/3" onChange={(e) => setFilters({ ...filters, priority: e.target.value })}>
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select className="p-2 border rounded w-full md:w-1/3" onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All Statuses</option>
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button className="bg-gray-700 text-white p-2 rounded w-full md:w-auto hover:bg-gray-800 transition duration-300 transform hover:scale-105" onClick={filterTasks}>Apply</button>
      </div>

      {/* Add Task Button */}
      <button className="w-full max-w-4xl mt-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-300 transform hover:scale-105" onClick={() => setShowTaskForm(true)}>
        + Add Task
      </button>

      {/* Task Form Popup */}
      {showTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition duration-300 scale-95 hover:scale-100">
            <h2 className="text-2xl font-bold mb-4 text-center">Add New Task</h2>
            <input type="text" placeholder="Task Title" className="w-full p-2 border rounded mb-3" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
            <select className="w-full p-2 border rounded mb-3" value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <select className="w-full p-2 border rounded mb-3" value={newTask.status} onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}>
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <input type="datetime-local" className="w-full p-2 border rounded mb-3" value={newTask.startTime} onChange={(e) => setNewTask({ ...newTask, startTime: e.target.value })} />
            <input type="datetime-local" className="w-full p-2 border rounded mb-3" value={newTask.endTime} onChange={(e) => setNewTask({ ...newTask, endTime: e.target.value })} />
            <textarea placeholder="Task Description" className="w-full p-2 border rounded mb-3" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}></textarea>
            <div className="flex justify-between mt-4">
              <button className="bg-red-500 text-white p-2 rounded w-1/3 hover:bg-red-600 transition duration-300 transform hover:scale-105" onClick={() => setShowTaskForm(false)}>Cancel</button>
              <button className="bg-blue-500 text-white p-2 rounded w-1/3 hover:bg-blue-600 transition duration-300 transform hover:scale-105" onClick={handleAddTask}>Add Task</button>
            </div>
          </div>
        </div>
      )}

      {/* Task List */}
      <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-4xl mt-4 transform transition duration-300 hover:shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Task List</h3>
        <div className="max-h-96 overflow-y-auto scrollbar-hide">
          {Array.isArray(filteredTasks) && filteredTasks.length > 0 ? filteredTasks.map((task) => (
            <div key={task._id} className="p-3 bg-gray-200 rounded-md mb-2 flex justify-between items-center transform transition duration-300 hover:scale-105 hover:shadow-lg hover:z-10">
              <span>{task.title}</span>
              <div className="flex space-x-2">
                <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 transform hover:scale-105" onClick={() => { setSelectedTask(task); setIsUpdateMode(false); }}>Show Detail</button>
                <button className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300 transform hover:scale-105" onClick={() => { setSelectedTask(task); setIsUpdateMode(true); }}>Update</button>
                <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300 transform hover:scale-105" onClick={() => handleDeleteTask(task._id)}>Delete</button>
              </div>
            </div>
          )) : Array.isArray(tasks) && tasks.map((task) => (
            <div key={task._id} className="p-3 bg-gray-200 rounded-md mb-2 flex justify-between items-center transform transition duration-300 hover:scale-105 hover:shadow-lg hover:z-10">
              <span>{task.title}</span>
              <div className="flex space-x-2">
                <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 transform hover:scale-105" onClick={() => { setSelectedTask(task); setIsUpdateMode(false); }}>Show Detail</button>
                <button className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300 transform hover:scale-105" onClick={() => { setSelectedTask(task); setIsUpdateMode(true); }}>Update</button>
                <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300 transform hover:scale-105" onClick={() => handleDeleteTask(task._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Detail Popup */}
      {selectedTask && <TaskDetail task={selectedTask} closeDetail={() => setSelectedTask(null)} updateTask={handleUpdateTask} isUpdateMode={isUpdateMode} />}
    </div>
  );
};

export default Dashboard;
