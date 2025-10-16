// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// const Passport = async (req,res,next)=>{
//     const {authorization} = req.headers;

//     const token = authorization.split(" ")[1];

//     const userData = jwt.verify(token, process.env.JWT_SECRET);
//     if(!userData){
//         res.status(401).json({
//             message:"user not found"
//         })
//     }
//     const {_id} = userData.user;

//     const user = await User.find({_id});
//     if(user.length == 0){
//         return res.status(401).json({
//             message:"unauthorized user"
//         })
//     }

//     req.user = user;
//     next();

// }

// module.exports = Passport;


const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const Passport = async (req, res, next) => {
    try {
        // Safely check authorization header
        const token = req.headers.authorization?.split(' ')[1] || '';

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication token required"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Authentication failed"
        });
    }
};

module.exports = Passport;