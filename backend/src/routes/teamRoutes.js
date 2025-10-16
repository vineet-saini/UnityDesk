const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, teamController.getTeams);
router.post('/', isAuthenticated, teamController.createTeam);
router.put('/:id', isAuthenticated, teamController.updateTeam);
router.delete('/:id', isAuthenticated, teamController.deleteTeam);
router.post('/:id/join', isAuthenticated, teamController.joinTeam);
router.post('/:id/leave', isAuthenticated, teamController.leaveTeam);
router.post('/:id/add-member', isAuthenticated, teamController.addMember);
router.post('/:id/remove-member', isAuthenticated, teamController.removeMember);
router.get('/:id/assignments', isAuthenticated, teamController.getTeamAssignments);

module.exports = router;