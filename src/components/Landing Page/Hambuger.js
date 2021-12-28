import React, { useState } from "react";
import Sidebar from "./Sidebar";

const Hamburger = () => {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <div className="hamburger_menu" onClick={toggleClass}>
      <div className="line line1"></div>
      <div className="line line2"></div>
      <div className="line line3"></div>
      {isActive ? <Sidebar />:null}
    </div>
  );
};

export default Hamburger;
