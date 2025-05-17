const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const Meme = require("../models/memes.js");
// const MintHistory = require("../models/mintHistory.js");
const { isLoggedIn, saveRedirectUrl } = require("../middleware.js");
// const Leaderboard = require("../models/LeaderboardEntry.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//Mint Route
router.get("/mint", (req, res) => {
  res.render("memes/mint.ejs");
});

//Create Route
router.post("/", isLoggedIn, upload.single("imageUrl"), async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;

    // ✅ Log the user minting the meme
    console.log("🎨 Minting meme for user:", req.user.username); // or req.user._id

    // const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newMeme = new Meme({
      title,
      description,
      // imageUrl,
      category,
      tags: tags.split(",").map((tag) => tag.trim()),
      creatorId: req.user._id, // Assuming you have the user ID in req.params._id
      memeLevel: "Common", // You can dynamically assign this later
      popularityScore: 0,
      mintedBy: [],
      mintedAt: new Date(),
    });

    if (req.file) {
      newMeme.imageUrl = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    await newMeme.save();
    console.log("Meme created:", newMeme);
    res.status(200).json({ message: "Meme minted successfully" });
    // res.redirect("/my-memes"); // Redirect to the user's memes page after minting
  } catch (err) {
    console.error("Minting error:", err);
    res.status(500).send("Something went wrong while minting.");
  }
});

//My Memes Route
router.get("/", isLoggedIn, saveRedirectUrl, async (req, res) => {
  try {
    const userId = req.user._id;

    console.log("✅ Entered /my-memes");
    console.log("🧠 req.user inside route:", req.user);
    console.log(
      "🔍 Looking for memes with creatorId or mintedBy:",
      req.user._id
    );

    console.log("🔐 Authenticated user:", req.user.username); // or req.user.email

    const memes = await Meme.find({
      $or: [{ creatorId: userId }, { mintedBy: userId }],
    });

    // Check if request expects JSON (coming from React via axios)
    if (req.headers.accept.includes("application/json")) {
      return res.status(200).json({ memes });
    }
    console.log(memes);
    res.render("memes/my-memes.ejs", { memes });
  } catch (err) {
    console.error("Error fetching memes:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
