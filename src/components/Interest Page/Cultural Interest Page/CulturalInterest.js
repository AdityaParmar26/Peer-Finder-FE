import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Load from "../../Loader/Loader";
import Card from '../../Card/Card';
import '../Interest.css';
import SnackBar from "../../SnackBar/SnackBar";

const CulturalInterest = () => {
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

    const callCulturalPage = async ()=>{
        try {
          const res = await fetch("https://api-peer-finder.herokuapp.com/search/cultural", {
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
        if(loader === false && lenCheck === 0) callCulturalPage();
      }); 

    if(loader && user.length === lenCheck){
    
        const rendertheresponse = user.map((item) => (
          <Card user={item} key={item._id} interest="cultural_interest" isInterest = {true} id={item._id} obj = {handleCallback}/>
        ));
        
        if(user.length === 0){
            return(
              <div className="render_element">
                  No User Found!!
              </div>
            );
        }
        else{
            return (
              <div className="render_element">
                {rendertheresponse}
                {(state) ? <SnackBar message={message}/> : null}
              </div>
            );  
        }
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

export default CulturalInterest;