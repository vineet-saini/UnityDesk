const jwt = require('jsonwebtoken');

// Simple auth middleware
function auth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ msg: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
}
const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

// Create
router.post('/', auth, createProject);

// Read
router.get('/', auth, getProjects);
router.get('/:id', auth, getProjectById);

// Update
router.put('/:id', auth, updateProject);

// Delete
router.delete('/:id', auth, deleteProject);

module.exports = router;

