import React, { useState, useEffect } from "react";
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
import { useTheme } from "./theme-provider";
import { useAuth } from "../pages/users/AuthContext"; // ✅ use correct path
import api from "../services/api"; // ✅ use your axios instance

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("isLoggedIn")
  );

  useEffect(() => {
    const updateLoginState = () => {
      setIsLoggedIn(!!localStorage.getItem("isLoggedIn"));
    };

    window.addEventListener("loginStatusChanged", updateLoginState);

    return () => {
      window.removeEventListener("loginStatusChanged", updateLoginState);
    };
  }, []);

  // const { isLoggedIn, setIsLoggedIn } = useAuth(); // ✅ use context instead of localStorage

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
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
      icon: isDark ? (
        <FaMoon size={24} color="#fff" />
      ) : (
        <FaSun size={24} color="#fff" />
      ),
      label: isDark ? "Dark Mode" : "Light Mode",
      onClick: toggleTheme,
    },
    ...(isLoggedIn
      ? [
          {
            icon: <FaUser size={24} color="#fff" />,
            label: "Profile",
            onClick: () => (window.location.href = "/profile"),
          },
          {
            icon: <FaSignInAlt size={24} color="#fff" />,
            label: "Logout",
            onClick: () => {
              localStorage.removeItem("isLoggedIn");
              window.dispatchEvent(new Event("loginStatusChanged"));
              setIsLoggedIn(false);
              // window.location.href = "/";
            },
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
