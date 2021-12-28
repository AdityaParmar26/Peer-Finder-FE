import React from "react";
import Header from './Header';
import Hamburger from './Hambuger';
import './LandingPage.css';


const Home = () => {
    
  return (
    <div className="home_page">
      <div className="name">
        <h4>Peer Finder</h4>
      </div>
      <Hamburger />
      <Header />
    </div>
  );
};

export default Home;
