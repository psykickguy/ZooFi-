const path = require("path");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "../.env" });
}

const snoowrap = require("snoowrap");
const mongoose = require("mongoose");
const Meme = require("../models/memes.js"); // adjust if needed

// connect to DB
mongoose.connect("mongodb://localhost:27017/zoofi");

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
        if (
          post.url.endsWith(".jpg") ||
          post.url.endsWith(".png") ||
          post.url.endsWith(".jpeg")
        ) {
          const rarity = getRarity(post.ups || 0);
          const tags = extractTags(post.title).concat(["animal", "reddit"]);

          const meme = new Meme({
            title: post.title,
            imageUrl: {
              url: post.url,
              filename: path.basename(post.url), // gets the filename from the URL
            },
            description: `Fetched from Reddit by ${post.author.name}`,
            creatorId: "000000000000000000000000", // system user ObjectId
            memeLevel: rarity,
            popularityScore: post.ups,
            category: "Reddit",
            tags: tags,
            mintedAt: new Date(post.created_utc * 1000),
          });

          await meme.save();
          console.log(
            "Saved meme:",
            meme.title,
            meme.tags,
            meme.memeLevel,
            meme.popularityScore
          );
        }
      }
    }
  } catch (err) {
    console.error("Failed to fetch memes:", err);
  }
}

fetchRedditMemes();
