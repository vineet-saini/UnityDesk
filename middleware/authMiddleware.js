const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");

// Middleware for checking if user/admin is authenticated
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    console.log("Token received:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Try finding in User collection first
    let account = await User.findById(decoded.id).select("-password");

    // If not found, try in Admin collection
    if (!account) {
      account = await Admin.findById(decoded.id).select("-password");
    }

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
  // If user is from Admin collection
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};

module.exports = { authMiddleware, adminMiddleware };
