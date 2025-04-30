// routes/wallet.js
const express = require("express");
const router = express.Router();

router.get("/wallet-connect", (req, res) => {
  // In a real app, wallet info would come from the frontend (e.g., Web3.js or Ethers.js)
  res.render("wallet/wallet-connect.ejs", {
    walletAddress: req.session.walletAddress || null,
    network: req.session.network || null,
    balance: req.session.balance || null,
  });
});

router.post("/wallet-connect", (req, res) => {
  const { walletAddress, network, balance } = req.body;

  // Store wallet info in session
  req.session.walletAddress = walletAddress;
  req.session.network = network;
  req.session.balance = balance;

  res.redirect("/wallet-connect");
});

router.post("/wallet-disconnect", (req, res) => {
  req.session.walletAddress = null;
  req.session.network = null;
  req.session.balance = null;

  res.redirect("/wallet-connect");
});

module.exports = router;
