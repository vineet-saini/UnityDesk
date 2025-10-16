const Task = require('../models/task');

exports.getTasks = async (req, res) => {
    const tasks = await Task.find().populate('project assignedUsers assignedTeam');
    res.json(tasks);
};

exports.createTask = async (req, res) => {
    const task = await Task.create(req.body);
    res.json(task);
};

exports.updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
};

exports.deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ success: true });
};