import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Explore from "./pages/memes/explore.jsx";
import about from "./pages/memes/about.jsx";
import faq from "./pages/memes/faq.jsx";
import Home from "./pages/memes/home.jsx";
import leaderboard from "./pages/memes/leaderboard.jsx";
import memeDetails from "./pages/memes/memeDetails.jsx";

import mint from "./pages/my-memes/mint.jsx";
import myMemes from "./pages/my-memes/myMemes.jsx";

import profile from "./pages/profile/profile.jsx";
import editProfile from "./pages/profile/editProfile.jsx";

import login from "./pages/users/login.jsx";
import signup from "./pages/users/signup.jsx";

import walletConnect from "./pages/wallet/walletConnect.jsx";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/mint" element={<mint />} />
        <Route path="/login" element={<login />} />
        <Route path="/signup" element={<signup />} />
        <Route path="/my-memes" element={<myMemes />} />
        <Route path="/meme/:id" element={<memeDetails />} />
        <Route path="/about" element={<about />} />
        <Route path="/faq" element={<faq />} />
        <Route path="/leaderboard" element={<leaderboard />} />
        <Route path="/profile" element={<profile />} />
        <Route path="/edit-profile" element={<editProfile />} />
        <Route path="/wallet-connect" element={<walletConnect />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
