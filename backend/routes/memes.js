const express = require("express");
const router = express.Router();
const Meme = require("../models/memes.js");
// const ObjectId = mongoose.Types.ObjectId;

//Index Route
router.get("/memes", async (req, res) => {
  const allMemes = await Meme.find({});
  res.render("memes/index.ejs", { allMemes });
});
