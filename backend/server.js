// server.js

// Import required packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Import URL model
const Url = require("./models/url");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ================== ROUTES ==================

// 1) Shorten a URL
app.post("/api/shorten", async (req, res) => {
  try {
    const { longUrl } = req.body;

    if (!longUrl) {
      return res.status(400).json({ message: "longUrl is required" });
    }

    // Generate a random short code (6 characters)
    const shortCode = Math.random().toString(36).substring(2, 8);

    // Check if shortCode already exists (to avoid duplicate collisions)
    let existing = await Url.findOne({ shortCode });
    if (existing) {
      return res.json({ shortUrl: `http://localhost:5000/${existing.shortCode}` });
    }

    // Save new entry to DB
    const newUrl = new Url({ longUrl, shortCode });
    await newUrl.save();

    // Send response
    res.json({
      shortUrl: `http://localhost:5000/${shortCode}`,
    });
  } catch (err) {
    console.error("Error in /api/shorten:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 2) Redirect short URL -> long URL
app.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ message: "URL not found" });
    }
  } catch (err) {
    console.error("Error in redirect route:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================== DATABASE CONNECTION ==================
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
