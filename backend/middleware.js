module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    if (req.originalUrl.startsWith("/api/")) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    req.session.redirectUrl = req.originalUrl;
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};
