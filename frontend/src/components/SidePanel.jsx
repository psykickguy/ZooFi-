import React from "react";
import "./Components.css";
import BurningFooter from "../../react-burning-footer/index";

export default function SidePanel() {
  return (
    <div className="side-panel">
      <div className="leftside">
        <BurningFooter height={75} backgroundColor="#f0554d" />
      </div>
      <div className="rightside">
        <BurningFooter height={75} backgroundColor="#f0554d" />
      </div>
    </div>
  );
}
