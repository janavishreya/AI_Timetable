const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  username: String,
  password: String,
  department: String,
  designation: String,
  roleid: String,
  joinDate: Date,
  lastLogin: Date
});

module.exports = mongoose.model("Admin", adminSchema);
