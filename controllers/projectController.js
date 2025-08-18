const Project = require("../models/projectModel");

const createProject = async(req,res)=>{
    try{
        const {projectName, description, team,tasks,status,createdBy,createdAt} = req.body;
        if(!projectName || !team ){
            return res.status(400).json({
                message:"Please fill all the fields"
            });
        }

        const newProject = await Project.create({
            projectName,
            description,
            team,
            tasks,
            status,
            createdBy
            
        });

        await newProject.save();

        return res.status(201).json({
            message:"Project created"
        })
    }
    catch(err){
        return res.status(500).json({
            err:err.message
        })
    }
}

module.exports = {createProject};