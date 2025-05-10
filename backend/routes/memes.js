const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Meme = require("../models/memes.js");
const MintHistory = require("../models/mintHistory.js");
// const { isLoggedIn } = require("../middleware.js");
const Leaderboard = require("../models/LeaderboardEntry.js");
const axios = require("axios");

//Home Route
router.get("/", async (req, res) => {
  try {
    const trendingMemes = await Meme.find({})
      .sort({ popularityScore: -1 })
      .limit(10);
    res.json(trendingMemes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/api/image-proxy", async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl || !/^https?:\/\//i.test(imageUrl)) {
    console.error("Invalid or missing imageUrl:", imageUrl);
    return res.status(400).send("Invalid or missing URL");
  }
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    res.set("Content-Type", response.headers["content-type"]);
    res.send(response.data);
  } catch (err) {
    console.error("Image proxy error:", err.message);
    res.status(500).send("Failed to fetch image");
  }
});

//Explore Route
router.get("/explore", async (req, res) => {
  console.log("Explore endpoint hit");

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
    res.json({ memes });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading memes.");
  }
});

//Leaderboard Route
router.get("/leaderboard", async (req, res) => {
  try {
    // Top memes by popularityScore
    const topMemes = await Meme.find()
      .sort({ popularityScore: -1 })
      .limit(10)
      .populate("creatorId", "username");

    // Top users by score
    const topUsers = await Leaderboard.find()
      .sort({ score: -1 })
      .limit(10)
      .populate("userId", "username");

    res.json({ topMemes, topUsers });
    // console.log("Returning:", { topMemes, topUsers });
    // res.render("memes/leaderboard.ejs", { topMemes, topUsers });
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

module.exports = router;
