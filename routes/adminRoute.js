const express = require("express");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const { registerAdmin, loginAdmin } = require("../controllers/adminController");
const User = require("../models/userModel");
const Team = require("../models/teamModel");

const router = express.Router();

// ----------------- Admin Authentication -----------------
router.post("/register", registerAdmin); // Admin registration
router.post("/login", loginAdmin);       // Admin login

// ----------------- User Management -----------------
router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

router.put("/users/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

router.delete("/users/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

// ----------------- Team Management -----------------
router.get("/teams", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teams", error });
  }
});

router.put("/teams/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );

    if (!updatedTeam) return res.status(404).json({ message: "Team not found" });
    res.json(updatedTeam);
  } catch (error) {
    res.status(500).json({ message: "Error updating team", error });
  }
});

router.delete("/teams/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: "Team deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting team", error });
  }
});

module.exports = router;
