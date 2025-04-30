const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Meme = require("./models/memes.js");
const ObjectId = mongoose.Types.ObjectId;

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

app.get("/", (req, res) => {
  res.send("Hi, I am root");
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
