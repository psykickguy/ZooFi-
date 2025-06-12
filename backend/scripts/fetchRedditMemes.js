const path = require("path");
const axios = require("axios");
const fs = require("fs");
const tmp = require("tmp-promise");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "../.env" });
}

const snoowrap = require("snoowrap");
const mongoose = require("mongoose");
const Meme = require("../models/memes.js"); // adjust if needed
const User = require("../models/users.js"); // adjust path if needed
const Leaderboard = require("../models/LeaderboardEntry.js"); // adjust if needed
const { cloudinary } = require("../cloudConfig.js"); // cloudinary config

const MONGO_URL = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URL);

const reddit = new snoowrap({
  userAgent: "zoofi-bot",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD,
});

// List of animal meme subreddits
const animalSubreddits = [
  "AnimalMemes",
  "AnimalsBeingDerps",
  "AnimalsBeingBros",
  "aww",
  "rarepuppers",
  "cats",
  "dogmemes",
  "StartledCats",
];

function getRarity(ups) {
  if (ups > 5000) return "Legendary";
  if (ups > 1500) return "Epic";
  if (ups > 500) return "Rare";
  return "Common";
}

function extractTags(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .split(" ")
    .filter((word) => word.length > 3)
    .slice(0, 5); // limit to 5 tags
}

async function fetchRedditMemes() {
  try {
    for (let sub of animalSubreddits) {
      const posts = await reddit.getSubreddit(sub).getHot({ limit: 10 });

      for (let post of posts) {
        // Skip non-image posts
        const url = post.url;
        if (!url.match(/\.(jpg|jpeg|png)$/i)) continue;

        const head = await axios.head(url);
        if (!head.headers["content-type"].startsWith("image/")) {
          console.log(`⚠️ Skipped non-image content: ${url}`);
          continue;
        }

        // Check if the meme already exists in the database
        const existing = await Meme.findOne({
          "imageUrl.filename": `reddit-${post.id}`,
        });
        if (existing) {
          console.log(`⚠️ Meme already exists: ${post.title}`);
          continue;
        }

        const rarity = getRarity(post.ups || 0);
        const tags = extractTags(post.title).concat(["animal", "reddit"]);

        // Check if the Reddit user exists in the User collection
        let user = await User.findOne({ username: post.author.name });

        // If user does not exist, create a new one
        if (!user) {
          user = new User({
            username: post.author.name,
            email: `${post.author.name}@reddit.com`, // 👈 fake but unique
            // You can also add additional details if needed (e.g., email, profilePic)
            walletAddress: `reddit-${post.author.name}`, // 👈 ensures uniqueness
          });
          await user.save();
        }

        // 🔽 Download image and upload to Cloudinary
        const tmpFile = await tmp.file();
        const writer = fs.createWriteStream(tmpFile.path);

        const response = await axios({
          url: post.url,
          method: "GET",
          responseType: "stream",
        });

        await new Promise((resolve, reject) => {
          response.data.pipe(writer);
          writer.on("finish", resolve);
          writer.on("error", reject);
        });

        const cloudinaryResult = await cloudinary.uploader.upload(
          tmpFile.path,
          {
            folder: "zoofi_memes",
            public_id: `reddit-${post.id}`,
          }
        );

        await tmpFile.cleanup(); // remove temp file

        const meme = new Meme({
          title: post.title,
          imageUrl: {
            url: cloudinaryResult.secure_url,
            filename: cloudinaryResult.public_id,
          },
          description: `Fetched from Reddit by ${post.author.name}`,
          creatorId: user._id, // Assign the User's ObjectId to creatorId
          memeLevel: rarity,
          popularityScore: post.ups,
          category: "Reddit",
          tags: tags,
          mintedAt: new Date(post.created_utc * 1000),
        });

        await meme.save();

        // Update leaderboard entry for the creator
        await Leaderboard.findOneAndUpdate(
          { userId: meme.creatorId },
          {
            $inc: { score: meme.popularityScore || 0, totalMints: 1 },
          },
          { upsert: true, new: true }
        );

        console.log(
          "Saved meme:",
          meme.title,
          meme.description,
          meme.creatorId,
          meme.tags,
          meme.memeLevel,
          meme.popularityScore
        );
      }
    }
    console.log("🎉 All Reddit memes fetched and saved.");
  } catch (err) {
    console.error("Failed to fetch memes:", err);
  } finally {
    mongoose.disconnect();
  }
}

fetchRedditMemes();
