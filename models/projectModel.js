const mongoose = require("mongoose");

const {Schema} = mongoose;

const ProjectSchema = new Schema({
    projectName:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    team:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"Team",
        required:true
    },
    tasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task"
    }],
    
    status:{
        type:String,
        enum:["active","completed","archieved"],
        default:"active"
    },
    createdBy:{
        type:Date,
        default:Date.now

    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Projects",ProjectSchema);