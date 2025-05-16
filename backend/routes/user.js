const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

// ----- Auth Status ----- //
router.get("/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ isLoggedIn: true, user: req.user });
  } else {
    res.status(200).json({ isLoggedIn: false });
  }
});

// ----- Signup ----- //
router.post("/signup", async (req, res) => {
  const { username, email, walletAddress, password } = req.body;
  try {
    const user = new User({ username, email, walletAddress });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return res.status(500).json({ message: "Login error", err });
      return res
        .status(201)
        .json({ message: "Signup successful", user: registeredUser });
    });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "Signup failed", error: err.message });
  }
});

// ----- Login ----- //
router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("✅ Logged in user:", req.user);
  res.status(200).json({ message: "Login successful", user: req.user });
});

// ----- Logout ----- //
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: "Logged out successfully" });
  });
});

// OPTIONAL: Legacy routes (EJS forms)
router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

// router.post(
//   "/login",
//   saveRedirectUrl,
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureMessage: true,
//   }),
//   (req, res) => {
//     let redirectUrl = res.locals.redirectUrl || "/memes";
//     res.redirect(redirectUrl);
//   }
// );

module.exports = router;
