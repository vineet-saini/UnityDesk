const ActivityLog = require('../models/activityLog');

exports.getActivityLogs = async (req, res) => {
    const logs = await ActivityLog.find().populate('user task team project').sort({ timestamp: -1 });
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