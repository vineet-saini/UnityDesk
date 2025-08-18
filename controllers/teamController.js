const Team = require("../models/teamModel");

const createTeam = async (req, res) => {
  const { teamName, description, members, createdBy } = req.body;

  if (!teamName || !description || !members || !createdBy) {
    return res.status(400).json({ message: "Please fill all the details" });
  }

  try {
    const newTeam = await Team.create({
      teamName,
      description,
      members,
      createdBy
    });

    return res.status(201).json({
      message: "Team created successfully",
      newTeam
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { createTeam };
