const Task = require("../models/task.model");
const userModel = require("../models/user.model");

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json({ tasks, msg: "all tasks found" });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ msg: "internal server error" });
    }
};

exports.saveTask = async (req, res) => {
    const { title, description, startTime, endTime, priority, status } = req.body;
    if (!title || !description || !startTime || !endTime || !priority || !status) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    try {
        const newTask = new Task({
            user: req.user.id,
            title,
            description,
            startTime,
            endTime,
            priority,
            status
        });
        const result = await newTask.saveTask();
        if (result.success) {
            res.status(201).json({ task: result.task, msg: "task saved successfully" });
        } else {
            res.status(400).json({ msg: "error saving task", error: result.error });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({ msg: "internal server error" });
    }
};

exports.updateTask = async (req, res) => {
    const { title, description, startTime, endTime, priority, status } = req.body;
    if (!title || !description || !startTime || !endTime || !priority || !status) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: "task not found" });
        }
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "user not authorized" });
        }
        task.title = title;
        task.description = description;
        task.startTime = startTime;
        task.endTime = endTime;
        task.priority = priority;
        task.status = status;
        const updatedTask = await task.save();
        res.status(200).json({ task: updatedTask, msg: "task updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ msg: "internal server error" });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: "task not found" });
        }
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "user not authorized" });
        }
        await task.remove();
        res.status(200).json({ msg: "task deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "internal server error" });
    }
};
