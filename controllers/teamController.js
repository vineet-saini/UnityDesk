
const { default: mongoose } = require("mongoose");
const Team = require("../models/teamModel");




const createTeam = async(req,res)=>{
    const {teamName, description, members, createdBy, createdAt} = req.body;
    if(!teamName || !description || !members || !createdBy){
        return res.status(400).json({
            message:"Please fill all the details"
        })
    }

    try{
        const newTeam = await Team.create({
        teamName,
        description,
        members,
        // projects : [req.body.projects],
        createdBy,
        createdAt
    });

    await newTeam.save();

    return res.status(201).json({
        message:"Team created successfully",
        newTeam
    });

    }
    catch(err){
        return res.status(500).json({
            err:err.message
        })
    }

}


const getTeams = async(req,res)=>{
    try{
        const teams = await Team.find().populate("members").populate("createdBy");
        return res.status(200).json({
            message:"All the teams",
            teams
        })
    }
    catch(err){
        return res.status(500).json({
            err:err.message
        })
    }
}

module.exports = {createTeam,getTeams};

