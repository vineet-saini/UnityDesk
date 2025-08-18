const mongoose = require("mongoose");

const {Schema} = mongoose;

const TaskSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project"
    },
    status:{
        type:String,
        enum:["todo","in-progress","done"],
        default:"todo"
    },
    dueDate:{
        type:Date
    },
    createdAt:{
        type:Date,
        default : Date.now
    }

})

module.exports = mongoose.model("Tasks",TaskSchema);
