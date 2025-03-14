const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const { exec } = require("child_process");

// Initialize Express app
const app = express();

// Kill existing process on port 5000 (Windows & Unix)
const PORT = process.env.PORT || 5000;
exec(`kill $(lsof -t -i:${PORT})`, (err) => {
  if (err) console.log("No existing process found on port", PORT);
});

// Connect to MongoDB
connectDB();

// Allowed origins for CORS
const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Security Middleware
app.use(helmet()); // Helps secure the app with HTTP headers

// Body Parsers
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Session Middleware with MongoDB store
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // Secure in production
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

// Routes
app.use("/api/auth", authRoutes);

// Health check route
app.get("/", (req, res) => res.send("✅ Server Running..."));

// Global Error Handling
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
