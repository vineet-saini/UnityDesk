const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/auth');

// Public routes for authentication
router.post('/signup', userController.createUser); // Assuming createUser is for signup
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);

// Protected routes
router.get('/', isAuthenticated, userController.getUsers);
router.get('/:id', isAuthenticated, userController.getUserById);
router.get('/:id/assignments', isAuthenticated, userController.getUserAssignments);
router.put('/:id', isAuthenticated, userController.updateUser);
router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;