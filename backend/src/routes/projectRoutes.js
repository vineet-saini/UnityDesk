const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, projectController.getProjects);
router.post('/', isAuthenticated, projectController.createProject);
router.put('/:id', isAuthenticated, projectController.updateProject);
router.delete('/:id', isAuthenticated, projectController.deleteProject);

module.exports = router;