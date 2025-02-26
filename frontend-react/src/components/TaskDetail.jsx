import React, { useState } from "react";

const TaskDetail = ({ task, closeDetail, updateTask, isUpdateMode }) => {
  const [editableTask, setEditableTask] = useState(task);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableTask({ ...editableTask, [name]: value });
  };

  const handleUpdate = () => {
    updateTask(editableTask);
  };

  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {isUpdateMode ? (
          <>
            <h2 className="text-xl font-bold mb-4">{editableTask.title}</h2>
            <input type="text" name="title" value={editableTask.title} onChange={handleChange} className="w-full p-2 border rounded mb-3" />
            <select name="priority" value={editableTask.priority} onChange={handleChange} className="w-full p-2 border rounded mb-3">
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
            <select name="status" value={editableTask.status} onChange={handleChange} className="w-full p-2 border rounded mb-3">
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <input type="datetime-local" name="startTime" value={editableTask.startTime} onChange={handleChange} className="w-full p-2 border rounded mb-3" />
            <input type="datetime-local" name="endTime" value={editableTask.endTime} onChange={handleChange} className="w-full p-2 border rounded mb-3" />
            <textarea name="description" value={editableTask.description} onChange={handleChange} className="w-full p-2 border rounded mb-3"></textarea>
            <div className="flex justify-between mt-4">
              <button className="bg-red-500 text-white p-2 rounded w-1/3" onClick={closeDetail}>Cancel</button>
              <button className="bg-blue-500 text-white p-2 rounded w-1/3" onClick={handleUpdate}>Update</button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">{task.title}</h2>
            <p className="mb-2"><strong>Priority:</strong> {task.priority}</p>
            <p className="mb-2"><strong>Status:</strong> {task.status}</p>
            <p className="mb-2"><strong>Start Time:</strong> {task.startTime}</p>
            <p className="mb-2"><strong>End Time:</strong> {task.endTime}</p>
            <p className="mb-4"><strong>Description:</strong> {task.description}</p>
            <button className="bg-gray-700 text-white p-2 rounded w-full" onClick={closeDetail}>Close</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;
