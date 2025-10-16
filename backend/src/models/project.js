const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
    name: String,
    description: String,
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
}, { timestamps: true });
module.exports = mongoose.model('Project', ProjectSchema);