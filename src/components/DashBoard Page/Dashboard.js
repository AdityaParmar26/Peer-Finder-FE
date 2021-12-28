import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { useHistory } from "react-router-dom";
import Load from "../Loader/Loader";
import './Dashboard.css';
import UserNameCard from '../User Name Card/UserNameCard';
import SnackBar from "../SnackBar/SnackBar";

const Dashboard = () => {
  const [loader, setLoader] = useState(false);
  const [searchLoader, setsearchLoader] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [name, setName] = useState('');
  const [user, setUser] = useState([]);
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

  const history = useHistory();

  const callDashboardPage = async ()=>{
    try {
      const res = await fetch("https://api-peer-finder.herokuapp.com/profile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "token" : localStorage.getItem('token')
        },
        credentials: "include",
      });

      const response = await res.json(); 
      if(response.status === true){
        if(response.isProfileSetup === true && response.isVerified === true){
          setLoader(true); 
        }
        else{
          if(response.isProfileSetup === false){
            handleCallback({
              message : "Please set your profile",
              error : true
            });
            setTimeout(() => {
              history.push("/profile");
            }, 1000);
          }
          else{
            handleCallback({
              message : "Please verify your identity",
              error : true
            });
            setTimeout(() => {
              history.push("/otp");
            }, 1000);
          }
        }
      }
      else{
        history.push("/login");
      }
    } 
    catch (error) {
      history.push("/login");
    }
  }

  useEffect(() => {
    // calling the function if loader is false.
    if(loader === false)  callDashboardPage();
  });
  
  if(loader){

    const getUserData = async() => {
      setIsDisabled(true);
      setUser([]);
      setsearchLoader(true);
      setClicked(false);
      try {
        const res = await fetch(`https://api-peer-finder.herokuapp.com/users?name=${name}`,{
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "token" : localStorage.getItem('token')
          },
          credentials: "include",
        });
  
        const response = await res.json(); 
        
        if(response.status === true){
          await response.data.map((item) => {
            return setUser((user) => [...user, item]);
          });
          setClicked(true);
          setName('');
        }
        else{
          handleCallback({
            message : response.message,
            error : true
          });

          if(res.status !== 500){
            setName('');
          }
          else{
            window.location.reload();
          }
        }
      } 
      catch (error) {
        handleCallback({
          message : "Something went wrong",
          error : true
        });
        window.location.reload();
      }
      setIsDisabled(false);
      setsearchLoader(false);
    }

    const rendertheresponse = user.map((item) => (
      <UserNameCard user={item} key={item._id} />
    ));

    return (
      <div className="dashboard_wrapper">
          <NavBar />
          <div className="search_box">
            <div>
              <h1>Find User By Name</h1>
            </div>

            <div className="search_bar">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <button type="submit" className="btn btn-primary" onClick={getUserData} disabled={isDisabled}>
                  Search
                </button>
              </div>
            </div>
    
            {/* when button is not clicked and no loader is rendered */}
            {(clicked === false && searchLoader === false)
              ?
              <div className="search_box_message">
                <div>
                  <h4>
                    Find a friend who brings the best out of
                  </h4>
                </div>
                <div>
                  <h4>
                    yourselves.
                  </h4>
                </div>
              </div>
              :
              <div className="user_cards">
                {rendertheresponse}
              </div>
            }

            {/* for loading the loader when fetching the results */}
            {(clicked===false && searchLoader === true) 
              ?
              <div className="render_element">
                <Load />
              </div>
              :
              <div></div>
            }
          </div>
          {(state) ? <SnackBar message={message}/> : null}
      </div>
    );
  }
  else{
    return(
      <div className="render_element">
        <Load />
        {(state) ? <SnackBar message={message}/> : null}
      </div>
    );
  }
  
};

export default Dashboard;
