// models/url.js

const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    longUrl: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true, // ensures no duplicate short codes
    },
  },
  { timestamps: true } // keeps track of createdAt & updatedAt
);

module.exports = mongoose.model("Url", urlSchema);
