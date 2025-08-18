const mongoose = require("mongoose");

const {Schema} = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","project_manager","member"],
        default:"member"
    },
    teams:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Team"
        }
    ],
    projects:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Project"
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

module.exports = mongoose.model("User",UserSchema);

