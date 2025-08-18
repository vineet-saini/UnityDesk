
const Task = require("../models/taskModel");

const createTask = async (req,res)=>{
    try{
        const {title, description, assignedTo, project, dueDate} = req.body;
        if(!title || !assignedTo || !project){
            return res.status(400).json({
                message:"Please fill all fields"
            });
        }

        
        const newTask = new Task({
            title,
            description,
            assignedTo,
            project,
            dueDate
        });


        await newTask.save();

        return res.status(201).json({
            message:"Task created",
            newTask
        })
    }
    catch(err){
        return res.status(500).json({
            err:err.message
        })
    }
}

