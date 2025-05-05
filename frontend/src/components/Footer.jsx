// src/components/Footer.jsx
import React from "react";
import "./Components.css";
import BurningFooter from "../../react-burning-footer/index";

export default function CustomFooter() {
  return (
    <footer className="footer">
      <BurningFooter height={200} backgroundColor="#f0554d">
        <a>Home</a>
      </BurningFooter>
    </footer>
  );
}
