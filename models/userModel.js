const mongoose = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },  // ✅ use email
  password: { type: String, required: true },
  gender: { type: String },
  role: { 
    type: String, 
    enum: ["admin", "project_manager", "member"], // ✅ use full enum from main
    default: "member" 
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team"
    }
  ],
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project"
    }
  ]
}, { timestamps: true }); // ✅ covers createdAt/updatedAt automatically

module.exports = mongoose.model("User", userSchema);
