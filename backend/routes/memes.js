const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Meme = require("../models/memes.js");
const MintHistory = require("../models/mintHistory.js");
const { isLoggedIn } = require("../middleware.js");
const Leaderboard = require("../models/LeaderboardEntry.js");

//Home Route
router.get("/", async (req, res) => {
  try {
    const trendingMemes = await Meme.find({}).sort({ popularityScore: -1 });
    //   .limit(10);
    res.render("./memes/home.ejs", { trendingMemes });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//Mint Route
router.get("/mint", (req, res) => {
  res.render("memes/mint.ejs");
});

//Explore Route
router.get("/explore", async (req, res) => {
  const { category, memeLevel, tags, sortBy } = req.query;

  // Build dynamic filter
  const filter = {};
  if (category) filter.category = category;
  if (memeLevel) filter.memeLevel = memeLevel;
  if (tags) filter.tags = { $in: tags.split(",") };

  // Build sort options
  let sortOption = {};
  if (sortBy === "popularity") sortOption = { popularityScore: -1 };
  else if (sortBy === "recent") sortOption = { mintedAt: -1 };

  try {
    const memes = await Meme.find(filter).sort(sortOption).limit(50);
    res.render("memes/explore.ejs", { memes });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading memes.");
  }
});

//My Memes Route
router.get("/my-memes", isLoggedIn, async (req, res) => {
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

//Leaderboard Route
router.get("/leaderboard", async (req, res) => {
  try {
    // Top memes by popularityScore
    const topMemes = await Meme.find().sort({ popularityScore: -1 }).limit(10);

    // Top users by score
    const topUsers = await Leaderboard.find()
      .sort({ score: -1 })
      .limit(10)
      .populate("userId");

    res.render("memes/leaderboard.ejs", { topMemes, topUsers });
  } catch (err) {
    console.error("Leaderboard Error:", err);
    res.status(500).send("Server Error");
  }
});

//FAQ Route
router.get("/faq", (req, res) => {
  res.render("memes/faq.ejs");
});

//About Route
router.get("/about", (req, res) => {
  res.render("memes/about.ejs");
});

//Display Route
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid meme ID");
  }

  try {
    const meme = await Meme.findById(id)
      .populate("creatorId", "username")
      .populate("mintedBy", "username")
      .exec();

    if (!meme) return res.status(404).send("Meme not found");

    const creator = await Meme.findById(meme.creatorId)
      .populate("creatorId", "username")
      .exec();
    const mintHistory = await MintHistory.find({ memeId: id })
      .populate("userId", "username")
      .sort({ mintedAt: -1 });

    res.render("memes/memeDetails.ejs", {
      meme,
      creator,
      mintHistory,
      listing: null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading meme details.");
  }
});

//Create Route
router.post("/", async (req, res) => {
  try {
    const { title, description, imageUrl, category, tags } = req.body;

    const newMeme = new Meme({
      title,
      description,
      imageUrl,
      category,
      tags: tags.split(",").map((tag) => tag.trim()),
      creatorId: new mongoose.Types.ObjectId(), // Replace with logged-in user or connected wallet address
      memeLevel: "Common", // You can dynamically assign this later
      popularityScore: 0,
      mintedBy: [],
      mintedAt: new Date(),
    });

    await newMeme.save();
    res.redirect("/explore");
  } catch (err) {
    console.error("Minting error:", err);
    res.status(500).send("Something went wrong while minting.");
  }
});

module.exports = router;
