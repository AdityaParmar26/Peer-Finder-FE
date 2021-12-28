import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Card from '../Card/Card';
import '../Card/Card.css';
import './Favourite.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Load from "../Loader/Loader";
import SnackBar from "../SnackBar/SnackBar";

const Favourite = () => {

  // setting for slider...
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState([]);
  const history = useHistory();
  const [lenCheck, setLenChek] = useState(0);
  const [state, setState] = useState(false);
  const [message, setMessage] = useState();

  // settig state of snackbar!
  const handleCallback = (e) =>{
    setMessage(e);
    setState(true);
  }

  if(state === true){
    setTimeout(()=>{
      setState(false);
    }, 2000)
  }

  const callFavouritePage = async ()=>{
      try {
        const res = await fetch("https://api-peer-finder.herokuapp.com/favourite", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "token" : localStorage.getItem('token')
          },
          credentials: "include",
        });
        const response = await res.json();

        if(response.status === false){

          // for not getting multiple calls to api
          setLenChek(1);

          handleCallback({
            message : response.message,
            error : true
          });

          if(response.message === "Set up your profile"){
            setTimeout(() => {
              history.push("/profile");
            }, 1000);
          }
          else if(response.message === "Please verify your identity"){
            setTimeout(() => {
              history.push("/otp");
            }, 1000);
          }
          else if(response.message === "Authentication failed."){
            setTimeout(() => {
              history.push("/login");
            }, 1000);
          }
          else{
            setTimeout(() => {
              history.push("/home");
            }, 1000);
          }
        }
        else{
          setLenChek(response.data.length);
          await response.data.map((item) => {
            return setUser((user) => [...user, item]);
          });
          setLoader(true);
        }
      } 
      catch (error) {
        handleCallback({
          message : "Some error occurred",
          error : true
        });
        setTimeout(() => {
          history.push("/login");
        }, 1000);
      }
    }
  
    useEffect(() => {
      if(loader === false && lenCheck === 0) callFavouritePage();
    }); 

    if(loader && user.length === lenCheck){

      const rendertheresponse = user.map((item) => (
        <div className="slider_content">
          <Card user={item} interest={item.from} key={item._id} isInterest={false} obj = {handleCallback}/>
        </div>
      ));

      return (
        <div>
          <NavBar />
            <div className="slider_wrapper">
              <Slider {...settings}   >
                {rendertheresponse}
              </Slider>
          </div>
          {(state) ? <SnackBar message={message}/> : null}
        </div>
      );
    }
    else{
      return(
        <div className="render_element" style={{height : "50vh"}}>
            <Load />
            {(state) ? <SnackBar message={message}/> : null}
        </div>
      );
    }

  
};

export default Favourite;