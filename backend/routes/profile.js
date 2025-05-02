const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const Meme = require("../models/memes.js");

// GET Edit Profile Form
router.get("/:userId/edit", async (req, res) => {
  try {
    const userId = req.params.userId; // Replace with real logic
    const user = await User.findById(userId);
    res.render("profile/edit-profile.ejs", { user });
  } catch (err) {
    res.status(500).send("Error loading profile edit page");
  }
});

// POST Update Profile
router.post("/:userId/edit", async (req, res) => {
  try {
    const userId = req.params.userId; // Replace with real logic
    const { username, profilePicture } = req.body;
    await User.findByIdAndUpdate(userId, {
      username,
      profilePicture,
    });
    res.redirect("/profile/" + userId); // Redirect to the profile page after update
  } catch (err) {
    res.status(500).send("Error updating profile");
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const memes = await Meme.find({ creatorId: userId });

    if (!user) return res.status(404).send("User not found");

    res.render("profile/profile.ejs", { user, memes });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
