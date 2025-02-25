import React from "react";

const TaskDetail = ({ task, closeDetail }) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{task.title}</h2>
        <p className="mb-2"><strong>Priority:</strong> {task.priority}</p>
        <p className="mb-2"><strong>Status:</strong> {task.status}</p>
        <p className="mb-4"><strong>Description:</strong> {task.description}</p>
        <button className="bg-gray-700 text-white p-2 rounded w-full" onClick={closeDetail}>Close</button>
      </div>
    </div>
  );
};

export default TaskDetail;
