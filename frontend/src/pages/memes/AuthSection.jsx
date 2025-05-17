import React from "react";
import { Link } from "react-router-dom";
// import Section from "./Section"; // adjust path as needed

function AuthSection() {
  const isLoggedIn = localStorage.getItem("user"); // Or use a context/auth hook

  if (isLoggedIn) return null; // Hide section if logged in

  return (
    <Section id="auth" title="Join ZooFi 🚀" linkTo="/login">
      <p className="mb-6 text-lg text-center text-white/90">
        Login or sign up to start minting and sharing memes 🎭✨
      </p>
      <div className="flex justify-center gap-6">
        <Link
          to="/login"
          className="px-6 py-2 text-lg font-bold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-green-400 via-emerald-500 to-lime-500 hover:from-lime-400 hover:to-green-600 shadow-lg shadow-green-500/50 animate-bounce hover:animate-none"
        >
          🚪 Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-2 text-lg font-bold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:from-pink-400 hover:to-blue-600 shadow-lg shadow-pink-500/50 animate-pulse hover:animate-none"
        >
          ✍️ Sign Up
        </Link>
      </div>
    </Section>
  );
}

export default AuthSection;
