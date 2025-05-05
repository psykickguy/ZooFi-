import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dock from "./Dock"; // your dock component
import {
  FaCompass,
  FaTrophy,
  FaSmile,
  FaPlus,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaWallet,
  FaHome,
  FaMoon,
  FaSun,
} from "react-icons/fa"; // icon examples
import "./Dock.css"; // your styles
import FuzzyText from "./FuzzyText";

const isLoggedIn = false; // Replace with actual auth logic

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const leftItems = [
    {
      icon: <FaCompass size={24} color="#fff" />,
      label: "Explore",
      onClick: () => (window.location.href = "/explore"),
    },
    {
      icon: <FaTrophy size={24} color="#fff" />,
      label: "Leaderboard",
      onClick: () => (window.location.href = "/leaderboard"),
    },
    {
      icon: <FaSmile size={24} color="#fff" />,
      label: "My Memes",
      onClick: () => (window.location.href = "/my-memes"),
    },
    {
      icon: <FaPlus size={24} color="#fff" />,
      label: "Mint",
      onClick: () => (window.location.href = "/mint"),
    },
  ];

  const rightItems = [
    {
      icon: darkMode ? (
        <FaSun size={24} color="#fff" />
      ) : (
        <FaMoon size={24} color="#fff" />
      ),
      label: darkMode ? "Light Mode" : "Dark Mode",
      onClick: toggleTheme,
    },
    ...(isLoggedIn
      ? [
          {
            icon: <FaUser size={24} color="#fff" />,
            label: "Profile",
            onClick: () => (window.location.href = "/profile"),
          },
        ]
      : [
          {
            icon: <FaUserPlus size={24} color="#fff" />,
            label: "Sign Up",
            onClick: () => (window.location.href = "/signup"),
          },
          {
            icon: <FaSignInAlt size={24} color="#fff" />,
            label: "Login",
            onClick: () => (window.location.href = "/login"),
          },
        ]),
    {
      icon: <FaWallet size={24} color="#fff" />,
      label: "Connect Wallet",
      onClick: () => (window.location.href = "/wallet-connect"),
    },
  ];

  return (
    <div className="navbar-container">
      <div className="Home-Logo">
        <Link to="/" className="navbar-logo">
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
          >
            Zoofi-
          </FuzzyText>
        </Link>
      </div>
      <div className="options">
        <Dock
          items={leftItems}
          panelHeight={72}
          dockHeight={100}
          baseItemSize={48}
          magnification={72}
          distance={150}
          spring={{ mass: 0.1, stiffness: 150, damping: 12 }}
        />
        <Dock
          items={rightItems}
          panelHeight={72}
          dockHeight={100}
          baseItemSize={48}
          magnification={72}
          distance={150}
          spring={{ mass: 0.1, stiffness: 150, damping: 12 }}
        />
      </div>
    </div>
  );
};

export default Navbar;
