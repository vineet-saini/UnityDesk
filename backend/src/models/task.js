const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: { type: String, enum: ['todo', 'inprogress', 'completed'], default: 'todo' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    assignedTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });
module.exports = mongoose.model('Task', TaskSchema);