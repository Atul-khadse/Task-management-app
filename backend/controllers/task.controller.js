const Task = require("../models/task.model");
const userModel = require("../models/user.model");



exports.getTasks = async (req , res ) => {
    try {
        const tasks = await Task.find({ user: req.user.id});
        res.status(200).json({tasks, msg: "all tasks found"});
    } catch (error) {
        console.error(error);
        return res.status(400).json({ msg : "internal server error"});
    }
}
