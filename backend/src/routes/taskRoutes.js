const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, taskController.getTasks);
router.post('/', isAuthenticated, taskController.createTask);
router.put('/:id', isAuthenticated, taskController.updateTask);
router.delete('/:id', isAuthenticated, taskController.deleteTask);

module.exports = router;