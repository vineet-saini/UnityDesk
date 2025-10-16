const ActivityLog = require('../models/activityLog');
const Project = require('../models/project');

exports.getActivityLogs = async (req, res) => {
    const logs = await ActivityLog.find().populate('user task');
    res.json(logs);
};

exports.createActivityLog = async (req, res) => {
    const log = await ActivityLog.create(req.body);
    res.json(log);
};

exports.updateActivityLog = async (req, res) => {
    const log = await ActivityLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(log);
};

exports.deleteActivityLog = async (req, res) => {
    await ActivityLog.findByIdAndDelete(req.params.id);
    res.json({ success: true });
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('team');
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects', error });
    }
};

exports.createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: 'Error creating project', error });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ message: 'Error updating project', error });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project', error });
    }
};