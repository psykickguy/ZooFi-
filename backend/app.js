require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const User = require("./models/users.js");

// const ObjectId = mongoose.Types.ObjectId;

const memesRouter = require("./routes/memes.js");
const userRouter = require("./routes/user.js");
const profileRoutes = require("./routes/profile.js");
const walletRoutes = require("./routes/wallet");
const myMemesRoutes = require("./routes/my-memes.js");

const MONGO_URL = process.env.MONGODB_URI;

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

app.use(
  cors({
    origin: ["http://localhost:5173", "https://zoofi.netlify.app"], // your frontend origin
    credentials: true,
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // For JSON requests (React/Axios)

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.use(
  session({
    name: "zoofi.sid",
    secret: "zoofi-secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URL }), // ✅ store in DB
    cookie: {
      httpOnly: true,
      secure: true, // ✅ true for HTTPS (Render, Netlify)
      sameSite: "none", // ✅ allows cross-origin
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log("🔍 Incoming Request:");
  console.log("👉 Method:", req.method);
  console.log("👉 URL:", req.originalUrl);
  console.log("👉 Cookies:", req.headers.cookie);
  console.log("👉 Session:", req.session);
  console.log("👉 User:", req.user);
  next();
});

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currUser = req.user;
  next();
});

app.use("/memes", memesRouter);
app.use("/api", userRouter);
app.use("/profile", profileRoutes);
app.use("/", walletRoutes);
app.use("/api/my-memes", myMemesRoutes);

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
