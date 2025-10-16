const mongoose = require('mongoose');
const ActivityLogSchema = new mongoose.Schema({
    action: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('ActivityLog', ActivityLogSchema);