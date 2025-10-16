const Project = require('../models/Project');

// Create a project
exports.createProject = async (req, res) => {
  try {
    const { name, description, members } = req.body || {};
    if (!name) return res.status(400).json({ msg: 'name is required' });

    const createdBy = req.user?.id || req.user?._id; // set by auth middleware
    if (!createdBy) return res.status(401).json({ msg: 'Unauthorized' });

    // Validate members to be array of valid ObjectIds, otherwise return 400
    let normalizedMembers = [];
    if (members !== undefined) {
      if (!Array.isArray(members)) {
        return res.status(400).json({ msg: 'members must be an array of user ids' });
      }
      for (const m of members) {
        if (!m || typeof m !== 'string' || !m.match(/^[a-fA-F0-9]{24}$/)) {
          return res.status(400).json({ msg: `Invalid member id: ${m}` });
        }
      }
      normalizedMembers = members;
    }

    const project = await Project.create({
      name,
      description,
      createdBy,
      members: normalizedMembers
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all projects
exports.getProjects = async (_req, res) => {
  try {
    const projects = await Project.find().populate('createdBy', 'name email').populate('members', 'name email');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one project
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('createdBy', 'name email').populate('members', 'name email');
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const { name, description, status, members } = req.body || {};
    const update = {};
    if (name !== undefined) update.name = name;
    if (description !== undefined) update.description = description;
    if (status !== undefined) update.status = status;
    if (members !== undefined) {
      if (!Array.isArray(members)) {
        return res.status(400).json({ msg: 'members must be an array of user ids' });
      }
      for (const m of members) {
        if (!m || typeof m !== 'string' || !m.match(/^[a-fA-F0-9]{24}$/)) {
          return res.status(400).json({ msg: `Invalid member id: ${m}` });
        }
      }
      update.members = members;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true, runValidators: true }
    );
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    res.json({ msg: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


