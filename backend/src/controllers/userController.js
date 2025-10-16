const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Handles user registration (signup)
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ msg: "User registered successfully", userId: user._id });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ msg: error.message || 'Error creating user' });
    }
};

// Handles user login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt:', { email, password: '***' });
        
        if (!email || !password) {
            return res.status(400).json({ msg: 'Email and password are required' });
        }
        
        const user = await User.findOne({ email });
        console.log('User found:', user ? 'Yes' : 'No');
        
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        console.log('Comparing passwords...');
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);
        
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid password' });
        }

        // Set user ID in session to mark as logged in
        req.session.userId = user._id;
        res.status(200).json({ 
            msg: 'Login successful', 
            userId: user._id,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ msg: 'Error logging in' });
    }
};

// Handles user logout
exports.logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ msg: 'Could not log out, please try again.' });
        }
        res.clearCookie('connect.sid'); 
        res.status(200).json({ msg: 'Logged out successfully' });
    });
};

// Gets all users (protected route)
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Get single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching user' });
    }
};

exports.getUserAssignments = async (req, res) => {
    try {
        const userId = req.params.id;
        
        const Team = require('../models/team');
        const Task = require('../models/task');
        const Project = require('../models/project');
        
        // Get user's teams
        const userTeams = await Team.find({ members: userId }).select('_id');
        const teamIds = userTeams.map(team => team._id);
        
        // Get tasks assigned to user's teams
        const tasks = await Task.find({ 
            assignedTeam: { $in: teamIds }
        }).populate('project assignedTeam', 'name').select('title description status project assignedTeam');
        
        // Get unique projects from tasks
        const projectIds = [...new Set(tasks.filter(task => task.project).map(task => task.project._id.toString()))];
        const projects = await Project.find({ _id: { $in: projectIds } }).select('name description');
        
        const teams = await Team.find({ members: userId }).select('name description');
        
        res.json({ teams, tasks, projects });
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching assignments' });
    }
};

// Updates a user (protected route)
exports.updateUser = async (req, res) => {
    try {
        // Prevent password from being updated directly through this route
        const { password, ...updateData } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error });
    }
};

// Deletes a user (protected route)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};