const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const Meme = require("../models/memes.js");
// const MintHistory = require("../models/mintHistory.js");
const { isLoggedIn } = require("../middleware.js");
// const Leaderboard = require("../models/LeaderboardEntry.js");

//Mint Route
router.get("/mint", (req, res) => {
  res.render("memes/mint.ejs");
});

//Create Route
router.post("/", isLoggedIn, async (req, res) => {
  try {
    const { title, description, imageUrl, category, tags } = req.body;

    const newMeme = new Meme({
      title,
      description,
      imageUrl,
      category,
      tags: tags.split(",").map((tag) => tag.trim()),
      creatorId: req.user._id, // Assuming you have the user ID in req.params._id
      memeLevel: "Common", // You can dynamically assign this later
      popularityScore: 0,
      mintedBy: [],
      mintedAt: new Date(),
    });

    await newMeme.save();
    res.redirect("/my-memes"); // Redirect to the user's memes page after minting
  } catch (err) {
    console.error("Minting error:", err);
    res.status(500).send("Something went wrong while minting.");
  }
});

//My Memes Route
router.get("/", isLoggedIn, async (req, res) => {
  try {
    const userId = req.user._id;

    const memes = await Meme.find({
      $or: [{ creatorId: userId }, { mintedBy: userId }],
    });

    res.render("memes/my-memes.ejs", { memes });
  } catch (err) {
    console.error("Error fetching memes:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
