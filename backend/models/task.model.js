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
    status: {
        type: Number,
        enum: [0, 1, 2], // 0: Incomplete, 1: In Progress, 2: Completed
        required: true,
        default: 0
    }
});

taskSchema.methods.getStatus = function() {
    if (this.status === 1) {
        return "In Progress";
    } else if (this.status === 2) {
        return "Completed";
    } else {
        return "Incomplete";
    }
};

module.exports = mongoose.model("Task", taskSchema);