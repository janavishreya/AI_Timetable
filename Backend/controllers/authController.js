const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Register User (Admin or User)
exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login User
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    console.log("Found User:", user); // Debugging

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch); // Debugging

    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    req.session.user = { id: user._id, username: user.username, role: user.role };
    res.status(200).json({ message: "Login successful", user: req.session.user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// Logout User
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({ message: "Logged out successfully" });
  });
};
