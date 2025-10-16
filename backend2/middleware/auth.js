const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, "your_jwt_secret");
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ message: "Unauthorized" });
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

exports.teamMemberOnly = (req, res, next) => {
    if (req.user.role !== "Team Member") {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};
