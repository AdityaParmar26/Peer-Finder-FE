import React from "react";
import { NavLink } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="banner">
      <h1>Welcome to Peer Finder!</h1>
      <p>Finds people of common interest.</p>
      <button className="sign_up_btn">
        <NavLink to="/register">sign up</NavLink>
      </button>
      <button className="sign_in_btn">
        <NavLink to="/login">sign in</NavLink>
      </button>
    </div>
  );
};

export default Banner;
