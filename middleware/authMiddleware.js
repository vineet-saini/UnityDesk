const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware to check if user/admin is authenticated
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    console.log("Token received:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID
    const account = await User.findById(decoded.id).select("-password");

    if (!account) {
      return res.status(401).json({ message: "Account not found" });
    }

    req.user = account;
    next();
  } catch (error) {
    console.log("JWT verify error:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware for admin-only access
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};

module.exports = { authMiddleware, adminMiddleware };
