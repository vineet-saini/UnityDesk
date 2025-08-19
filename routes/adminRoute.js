const express = require("express");
const bcrypt = require("bcrypt");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const User = require("../models/userModel");
const Team = require("../models/teamModel");
const generateToken = require("../utils/generateToken");

const router = express.Router();

// ----------------- Admin Authentication -----------------

// Admin registration (creates first admin)
router.post("/register", async (req, res) => {
  try {
    const { name, emailId, password } = req.body;
    if (!name || !emailId || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // Check if admin already exists
    const existingAdmin = await User.findOne({ emailId, role: "admin" });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await User.create({
      name,
      emailId,
      password: hashedPassword,
      role: "admin",
    });

    const token = generateToken(newAdmin);

    res.status(201).json({ message: "Admin created", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin login
router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const admin = await User.findOne({ emailId, role: "admin" });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(admin);
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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
    const { name, emailId, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, emailId, role },
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
