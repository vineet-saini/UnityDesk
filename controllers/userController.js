const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");

const registerUser = async(req,res)=>{
    const{ name,emailId, password} = req.body;

    if(!name || !emailId ||!password){
        return res.status(400).json({
            message:"Please enter all the fields"  
        })
    }

    try{
        const userExists = await User.findOne({emailId});
        if(userExists){
            return res.status(400).json({
                message:"User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            name,
            emailId,
            password: hashedPassword
        })
        await newUser.save();
        const token = generateToken(newUser);

        return res.status(201).json({
            message:"User Created successfully",
            token
        })
    }
    catch(err){
        return res.status(500).json({
            err: err.message
        })
    }
}

const loginUser = async(req,res)=>{
    const {emailId, password} = req.body;
    try{
        if(!emailId || !password){
            return res.status(400).json({
                message:"Please enter all the fields"
            })
        }

        const userExists = await User.findOne({emailId});
        console.log(userExists);
    
        if(!userExists){
            return res.status(400).json({
                message:"User does not exist"
            });
        }
    
        const isValid = await bcrypt.compare(password, userExists.password);
        if(!isValid){
            return res.status(400).json({
                message:"Incorrect Password"
            });
        }
        const token = generateToken(userExists);

        return res.status(200).json({
            message:"Logged In",
            token
        });

    }
    catch(err){
        return res.status(500).json({
            err: err.message
        });
    }
}

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = req.body.name || user.name;
        user.emailId = req.body.emailId || user.emailId;

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            emailId: updatedUser.emailId,
        });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

module.exports = { registerUser, loginUser, getProfile, updateProfile };