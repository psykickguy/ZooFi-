module.exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  const expectsJSON =
    req.headers.accept?.includes("application/json") ||
    req.xhr ||
    req.headers["content-type"]?.includes("application/json");

  if (expectsJSON) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  // Store intended URL for redirection after login
  req.session.redirectUrl = req.originalUrl;
  return res.redirect("/login");
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};
