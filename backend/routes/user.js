const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

// GET: Signup form
router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

// POST: Signup logic
router.post("/signup", async (req, res) => {
  const { username, email, walletAddress, password } = req.body;
  try {
    const user = new User({ username, email, walletAddress });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      res.redirect("/profile/" + registeredUser._id);
    });
  } catch (err) {
    console.error(err);
    res.redirect("/signup");
  }
});

// GET: Login form
router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

// POST: Login logic
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  (req, res) => {
    let redirectUrl = res.locals.redirectUrl || "/memes";
    res.redirect(redirectUrl);
  }
);

// Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/memes");
  });
});

module.exports = router;
