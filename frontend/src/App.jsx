import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Explore from "./pages/memes/explore.jsx";
import about from "./pages/memes/about.jsx";
import Home from "./pages/memes/home.jsx";
import Leaderboard from "./pages/memes/leaderboard.jsx";
import MemeDetails from "./pages/memes/MemeDetails.jsx";

import Mint from "./pages/my-memes/mint.jsx";
import MyMemes from "./pages/my-memes/myMemes.jsx";

import profile from "./pages/profile/profile.jsx";
import editProfile from "./pages/profile/editProfile.jsx";

import Signup from "./pages/users/signup";
import Login from "./pages/users/login";

import walletConnect from "./pages/wallet/walletConnect.jsx";

import Background from "./components/Background";
import Navbar from "./components/Navbar.jsx";
// import CustomFooter from "./components/Footer.jsx";
// import SidePanel from "./components/SidePanel.jsx";
import Particles from "./components/Particles.jsx";
import { ThemeProvider } from "./components/theme-provider.jsx";
import { SmoothCursor } from "./components/ui/smooth-cursor";

import { AuthProvider } from "./pages/users/AuthContext.jsx"; // ✅ import AuthProvider

import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <AuthProvider> */}
      <Router>
        <div className="app-container">
          {/* <SmoothCursor /> */}
          <Background />
          <Particles
            particleColors={["#ffffff", "#ffffff"]}
            particleCount={500}
            particleSpread={10}
            speed={0.5}
            particleBaseSize={150}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              minHeight: "100vh",
              paddingRight: "1rem",
            }}
          >
            {/* <SidePanel /> */}
            <Navbar />
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />

              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/mint" element={<Mint />} />
              <Route path="/login" element={<login />} />
              <Route path="/signup" element={<signup />} />
              <Route path="/my-memes" element={<MyMemes />} />
              <Route path="/meme/:id" element={<MemeDetails />} />
              <Route path="/about" element={<about />} />
              <Route path="/faq" element={<faq />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/profile" element={<profile />} />
              <Route path="/edit-profile" element={<editProfile />} />
              <Route path="/wallet-connect" element={<walletConnect />} />
            </Routes>
          </div>
        </div>
      </Router>
      {/* </AuthProvider> */}
    </ThemeProvider>
  );
}

export default App;
