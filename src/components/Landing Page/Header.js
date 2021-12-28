import React from "react";
import backgroundImage from "../../Images/background_image.jpg";
import Banner from './Banner';

const Header = () =>{
    return(
        <header className="header">
          <div className="img_wrapper">
            <img src={backgroundImage} alt="BackgroundIMG" />
          </div>
          <Banner />
      </header>
    );
}

export default Header;