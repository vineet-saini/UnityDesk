const mongoose = require("mongoose");

const {Schema} = mongoose;

const TeamSchema = new Schema({
    teamName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    projects:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project"
    }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model("Teams",TeamSchema);

