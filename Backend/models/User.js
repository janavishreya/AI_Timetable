const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], required: true }, // Role-based authentication
},
 { collection: "login" } // Force collection name to "login"
);

module.exports = mongoose.model("User", UserSchema);
