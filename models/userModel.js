const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" } // new field
}, { timestamps: true });
module.exports = mongoose.model("User", userSchema);
