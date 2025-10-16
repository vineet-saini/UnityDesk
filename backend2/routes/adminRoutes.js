const express = require("express");
const router = express.Router();
const { adminDashboard } = require("../controllers/adminController");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

// Only admins can access
router.get("/dashboard", verifyToken, authorizeRoles("admin"), adminDashboard);

module.exports = router;
