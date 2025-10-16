const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const { authMiddleware, teamMemberOnly } = require("../middleware/auth");

// GET all tasks assigned to logged-in team member
router.get("/my-tasks", authMiddleware, teamMemberOnly, async (req, res) => {
    try {
        const tasks = await Task.find({ assignedUsers: req.user._id });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

// UPDATE task status
router.put("/update-status/:taskId", authMiddleware, teamMemberOnly, async (req, res) => {
    try {
        const { status } = req.body;
        if (!["To Do", "In Progress", "Completed"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const task = await Task.findOne({ _id: req.params.taskId, assignedUsers: req.user._id });
        if (!task) return res.status(404).json({ message: "Task not found" });

        task.status = status;
        await task.save();

        res.status(200).json({ message: "Task status updated", task });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
