// controllers/adminController.js

// Admin Dashboard Controller
exports.adminDashboard = (req, res) => {
  // req.user is added by verifyToken middleware
  res.json({
    msg: "Welcome to Admin Dashboard",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
};
