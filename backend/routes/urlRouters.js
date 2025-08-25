// routes/urlRoutes.js
const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

let urlDatabase = {}; // simple in-memory store

// POST /api/shorten -> create short URL
router.post("/shorten", (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) {
    return res.status(400).json({ error: "longUrl is required" });
  }

  const shortId = nanoid(6); // generate short code
  const shortUrl = `http://localhost:5000/${shortId}`;

  urlDatabase[shortId] = longUrl;

  res.json({ shortUrl });
});

// GET /:shortId -> redirect to original URL
router.get("/:shortId", (req, res) => {
  const { shortId } = req.params;
  const longUrl = urlDatabase[shortId];

  if (longUrl) {
    return res.redirect(longUrl);
  } else {
    return res.status(404).json({ error: "URL not found" });
  }
});

module.exports = router;
