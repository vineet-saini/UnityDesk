const Team = require('../models/team');
const ActivityLog = require('../models/activityLog');

exports.getTeams = async (req, res) => {
    const teams = await Team.find().populate('creator leader members');
    res.json(teams);
};

exports.createTeam = async (req, res) => {
    try {
        const userId = req.session.userId;
        const teamData = {
            ...req.body,
            creator: userId,
            leader: userId,
            members: [userId]
        };
        const team = await Team.create(teamData);
        res.json(team);
    } catch (error) {
        res.status(500).json({ msg: 'Error creating team' });
    }
};

exports.updateTeam = async (req, res) => {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(team);
};

exports.deleteTeam = async (req, res) => {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ success: true });
};

exports.joinTeam = async (req, res) => {
    try {
        const teamId = req.params.id;
        const userId = req.session.userId;
        
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }
        
        if (team.members.includes(userId)) {
            return res.status(400).json({ msg: 'Already a member' });
        }
        
        team.members.push(userId);
        await team.save();
        
        // Log activity
        await ActivityLog.create({
            action: 'joined team',
            user: userId,
            team: teamId
        });
        
        res.json({ msg: 'Joined team successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Error joining team' });
    }
};

exports.leaveTeam = async (req, res) => {
    try {
        const teamId = req.params.id;
        const userId = req.session.userId;
        
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }
        
        if (!team.members.includes(userId)) {
            return res.status(400).json({ msg: 'Not a member' });
        }
        
        team.members = team.members.filter(member => member.toString() !== userId);
        await team.save();
        
        // Log activity
        await ActivityLog.create({
            action: 'left team',
            user: userId,
            team: teamId
        });
        
        res.json({ msg: 'Left team successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Error leaving team' });
    }
};

exports.addMember = async (req, res) => {
    try {
        const teamId = req.params.id;
        const { userId } = req.body;
        const currentUserId = req.session.userId;
        
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }
        
        // Check if current user is team leader, manager, or admin
        const User = require('../models/user');
        const currentUser = await User.findById(currentUserId);
        const isLeader = team.leader.toString() === currentUserId;
        const canManage = currentUser.role === 'manager' || currentUser.role === 'admin' || (currentUser.role === 'team_leader' && isLeader);
        
        if (!canManage) {
            return res.status(403).json({ msg: 'Not authorized' });
        }
        
        if (team.members.includes(userId)) {
            return res.status(400).json({ msg: 'User already a member' });
        }
        
        team.members.push(userId);
        await team.save();
        
        res.json({ msg: 'Member added successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Error adding member' });
    }
};

exports.removeMember = async (req, res) => {
    try {
        const teamId = req.params.id;
        const { userId } = req.body;
        const currentUserId = req.session.userId;
        
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }
        
        // Check if current user is team leader, manager, or admin
        const User = require('../models/user');
        const currentUser = await User.findById(currentUserId);
        const isLeader = team.leader.toString() === currentUserId;
        const canManage = currentUser.role === 'manager' || currentUser.role === 'admin' || (currentUser.role === 'team_leader' && isLeader);
        
        if (!canManage) {
            return res.status(403).json({ msg: 'Not authorized' });
        }
        
        team.members = team.members.filter(member => member.toString() !== userId);
        await team.save();
        
        res.json({ msg: 'Member removed successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Error removing member' });
    }
};

exports.getTeamAssignments = async (req, res) => {
    try {
        const teamId = req.params.id;
        
        const Task = require('../models/task');
        const Project = require('../models/project');
        
        const [tasks, projects] = await Promise.all([
            Task.find({ assignedTeam: teamId }).populate('project', 'name').select('title description status project'),
            Project.find({ assignedTeam: teamId }).select('name description')
        ]);
        
        res.json({ tasks, projects });
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching team assignments' });
    }
};