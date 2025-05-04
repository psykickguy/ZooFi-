import React from "react";
import { Link } from "react-router-dom";
import "./Components.css";
import Magnet from "./Magnet";

const isLoggedIn = false; // Replace with actual auth logic

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Left section */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          🦍 ZooFi
        </Link>
        <Magnet padding={50} disabled={false} magnetStrength={50}>
          <Link to="/explore" className="navbar-link">
            Explore
          </Link>
        </Magnet>
        <Magnet padding={50} disabled={false} magnetStrength={50}>
          <Link to="/leaderboard" className="navbar-link">
            Leaderboard
          </Link>
        </Magnet>
      </div>

      {/* Right section */}
      <div className="navbar-right">
        {" "}
        <Magnet padding={50} disabled={false} magnetStrength={50}>
          <Link to="/my-memes" className="navbar-link">
            My Memes
          </Link>
        </Magnet>
        <Magnet padding={50} disabled={false} magnetStrength={50}>
          <Link to="/mint" className="navbar-link">
            Mint
          </Link>
        </Magnet>
        {isLoggedIn ? (
          <Magnet padding={50} disabled={false} magnetStrength={50}>
            <Link to="/profile" className="navbar-link">
              <img
                src="/assets/profile-icon.svg"
                alt="Profile"
                className="profile-icon"
              />
            </Link>
          </Magnet>
        ) : (
          <>
            <Magnet padding={50} disabled={false} magnetStrength={50}>
              <Link to="/signup" className="navbar-link">
                Sign Up
              </Link>
            </Magnet>
            <Magnet padding={50} disabled={false} magnetStrength={50}>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
            </Magnet>
          </>
        )}
        <Magnet padding={50} disabled={false} magnetStrength={50}>
          <Link to="/wallet-connect">
            <button className="navbar-button">Connect Wallet</button>
          </Link>
        </Magnet>
      </div>
    </div>
  );
};

export default Navbar;
