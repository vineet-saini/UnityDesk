const Team = require("../models/Team");

// Get all teams
exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate("members", "name email").populate("createdBy", "name email");
    res.json(teams);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Create team
exports.createTeam = async (req, res) => {
  try {
    const { name, description, members } = req.body;
    const team = new Team({
      name,
      description,
      members: members || [],
      createdBy: req.user?.id || "000000000000000000000000" // fallback for testing
    });
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update team
exports.updateTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!team) return res.status(404).json({ msg: "Team not found" });
    res.json(team);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete team
exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ msg: "Team not found" });
    res.json({ msg: "Team deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};