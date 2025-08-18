const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  emailId: { type: String, required: true, unique: true },
  // gender: { type: String },
  password: { type: String, required: true }, // hashed
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
