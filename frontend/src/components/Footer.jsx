// src/components/Footer.jsx
import React from "react";
import "./Components.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} ZooFi. All rights reserved.</p>
    </footer>
  );
}
