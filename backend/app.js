const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Meme = require("./models/memes.js");
const MintHistory = require("./models/mintHistory.js");
const { isLoggedIn } = require("./middleware.js");
// const ObjectId = mongoose.Types.ObjectId;

// const memesRouter = require("./routes/memes.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/zoofi";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

// app.use("/memes", memesRouter);

//Home Route
app.get("/memes", async (req, res) => {
  try {
    const trendingMemes = await Meme.find({}).sort({ popularityScore: -1 });
    //   .limit(10);
    res.render("memes/home.ejs", { trendingMemes });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//Mint Route
app.get("/memes/mint", (req, res) => {
  res.render("memes/mint.ejs");
});

//Display Route
app.get("/memes/:id", async (req, res) => {
  const { id } = req.params;

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
app.post("/memes/mint", async (req, res) => {
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

//Explore Route
app.get("/explore", async (req, res) => {
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
app.get("/my-memes", isLoggedIn, async (req, res) => {
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

// app.get("/testMeme", async (req, res) => {
//   let sampleMeme = new Meme({
//     title: "Bombardiro Crocodilo",
//     imageUrl: "https://gateway.pinata.cloud/ipfs/xyz",
//     description: "A viral meme of a crocodile flying like a chopper.",
//     creatorId: new ObjectId(),
//     mintedBy: [new ObjectId()], // userIds
//     memeLevel: "Legendary", // Common, Rare, Epic, Legendary
//     popularityScore: 89.5, // dynamically calculated
//     category: "Animal",
//     tags: ["crocodile", "viral", "funny"],
//     mintedAt: Date.now(), // current date
//   });

//   await sampleMeme.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
