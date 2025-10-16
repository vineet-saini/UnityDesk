const express = require('express');
const router = express.Router();
const activityLogController = require('../controllers/activityLogController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, activityLogController.getActivityLogs);
router.post('/', isAuthenticated, activityLogController.createActivityLog);
router.put('/:id', isAuthenticated, activityLogController.updateActivityLog);
router.delete('/:id', isAuthenticated, activityLogController.deleteActivityLog);

module.exports = router;