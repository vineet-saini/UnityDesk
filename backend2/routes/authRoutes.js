const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// signup
router.post("/register", register);

// login
router.post("/login", login);

// logout
router.post("/logout", (req, res) => {
  res.json({ msg: "Logged out successfully" });
});

module.exports = router;
