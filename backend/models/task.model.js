const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        required: true,
        default: "Low"
    },
    status: {
        type: String,
        enum: ["To-Do", "In Progress", "Completed"],
        required: true,
        default: "To-Do"
    }
});

taskSchema.methods.getStatus = function() {
    return this.status;
};

taskSchema.methods.saveTask = async function() {
    try {
        await this.save();
        return { success: true, task: this };
    } catch (error) {
        return { success: false, error };
    }
};

module.exports = mongoose.model("Task", taskSchema);