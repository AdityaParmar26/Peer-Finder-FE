import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { useHistory } from "react-router-dom";
import Load from "../Loader/Loader";
import './Inbox.css';
import MessageCard from '../Message Card/MessageCard';
import SnackBar from "../SnackBar/SnackBar";

const Inbox = () => {
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState([]);
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

  const history = useHistory();

  const callInboxPage = async ()=>{
    try {
      const res = await fetch("https://api-peer-finder.herokuapp.com/message", {
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
      }
      else{
          setLenChek(response.data.length);
          await response.data.map(item =>{
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
    // calling the function if loader is false.
    if(loader === false && lenCheck === 0)  callInboxPage();
  });
  
  return (
    <div>
      <NavBar />
      {(loader && user.length === lenCheck)
        ?
        <div>
          {(user.length === 0)
            ?
            <div className="render_element">
              <h4>No messages found!</h4>
            </div>
            :
            <div>
              <div className="inbox">
                <div>
                  <h3>Your Inbox!</h3>
                </div>
                  {user.map((item) => (
                    <MessageCard detail={item} key={item.message_id} obj = {handleCallback}/>
                  ))}
                {(state) ? <SnackBar message={message}/> : null}
              </div>
            </div>
          }
        </div>
        :
        <div className="render_element">
          <Load />
          {(state) ? <SnackBar message={message}/> : null}
        </div>
      }
    </div>
  );
  
};

export default Inbox;
