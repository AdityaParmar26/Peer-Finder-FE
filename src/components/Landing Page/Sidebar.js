import React from "react";
import { NavLink } from 'react-router-dom';
import logo from "../../Images/peer-finder-logo.png";

const Sidebar = () => {
  return (
    <section className="sidebar">
      <div className="sidebarImg">
        <img src={logo} alt="" />
      </div>
      <div className="sidebar_head">
        Peer Finder
      </div>
      <ul className="menu">
        <li className="menu_item">
          <div>
            <NavLink to="/" className="menu_link" data-content="Home">
              Home
            </NavLink>
          </div>
        </li>
        <li className="menu_item">
          <div>
            <NavLink to="/home" className="menu_link" data-content="Dashboard">
              Dashboard
            </NavLink>
          </div>
        </li>
        <li className="menu_item">
          <div>
            <NavLink to="/contact" className="menu_link" data-content="Contact">
              Contact
            </NavLink>
          </div>
        </li>
      </ul>

      <div className="buttons">
        <button>
          <NavLink to="/register" className="sidebar_buttons">sign up</NavLink>
        </button>
        <button>
          <NavLink to="/login" className="sidebar_buttons">sign in</NavLink>
        </button>
      </div>
    </section>
  );
};

export default Sidebar;
