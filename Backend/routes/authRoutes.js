const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Login Route
router.post("/login", async (req, res) => {
  console.log("🟢 Login request received:", req.body);
  try {
      if (!req.body || typeof req.body !== "object") {
          console.error("❌ Invalid request body:", req.body);
          return res.status(400).json({ error: "Invalid request data" });
      }
      
      const { username, password } = req.body;
      if (!username || !password) {
          console.error("❌ Missing username or password:", req.body);
          return res.status(400).json({ error: "Username and password are required" });
      }

      console.log(`🔍 Searching for user: ${username}`);
      const user = await User.findOne({ username });
      
      if (!user) {
          console.log("❌ User not found");
          return res.status(401).json({ error: "User not found" });
      }
      
      console.log("✅ User found, checking password...");
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          console.log("❌ Invalid password");
          return res.status(401).json({ error: "Invalid password" });
      }
      
      console.log("🔒 Creating session...");
      req.session.user = { id: user._id.toString(), username: user.username, role: user.role };
      
      console.log("✅ Login successful!");
      res.json({ message: "Login successful", user: req.session.user });
  } catch (error) {
      console.error("🔥 Login Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

// Check if user is logged in
router.get("/check-session", (req, res) => {
  console.log("🔄 Checking user session...");
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.json({ user: null });
  }
});

// Logout Route
router.post("/logout", (req, res) => {
  console.log("🚪 Logout request received");
  req.session.destroy(() => {
    res.json({ message: "Logged out successfully" });
  });
});

module.exports = router;
