const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], required: true },
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  department: { type: String },
  designation: { type: String },
  joinDate: { type: Date },
  lastLogin: { type: Date }

},{ collection: "login" });

module.exports = mongoose.model("User", UserSchema);
