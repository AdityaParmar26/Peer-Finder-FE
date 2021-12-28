import React, { useEffect, useState } from "react";
import Load from "../Loader/Loader";
import { useHistory } from "react-router-dom";

const OtpForm = (props) => {

  // loader 
  const [loader, setLoader] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [id, setId] = useState();

  const [payLoad, setpayLoad] = useState({
    _id : "",
    otp : ""
  });

  const history = useHistory();

  const callOtpPage = async ()=>{
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
        if(response.isVerified === true){
          history.push('/home');
        }
        else{
          if(response.isProfileSetup === false){
            props.obj({
              message : "Please set your profile",
              error : true
            });
            setTimeout(() => {
              history.push("/profile");
            }, 1000);
          }
          else{
            setId(response._id);
            setLoader(true);
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
    if(loader === false)  callOtpPage();
  });

  if(loader){

    payLoad._id = id;

    //Handling form data and pushing every result into the user 
    let entry, value;
    const handleInputs = (e)=>{
      entry = e.target.name;
      value = e.target.value;
      setpayLoad({...payLoad, [entry]:value});
    }

    const verifyOTP = async(e)=>{
      setIsDisabled(true);
      e.preventDefault();
    
      const {_id, otp} = payLoad;
      try{
        const res = await fetch('https://api-peer-finder.herokuapp.com/otp', {
          method:"POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            _id, otp
          })
        });
    
        const response = await res.json();
        if(response.status === true){
          props.obj({
            message : response.message,
            error : false
          });
          setTimeout(() => {
            history.push("/home");
          }, 1000);
        }
        else{
          if(res.status === 400){
            props.obj({
              message : response.message,
              error : true
            });
          }
          else{
            props.obj({
              message : response.message,
              error : true
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        }
      }
      catch(error){
        props.obj({
          message : "Some error occurred",
          error : true
        });
      }  
      setIsDisabled(false);
    }

    return (
      <div className="otp_form">
        <div className="otp_form_head">
          <h2>Please Verify the OTP</h2>
        </div>
        <div className="otp_form_subhead">
           <h5> Otp is sent to your registered e-mail address. </h5>
        </div>
        <form method="POST">
            <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter the OTP"
              name = "otp"
              value = {payLoad.otp}
              onChange={handleInputs}
            />
            </div>
            <button type="submit" className="btn btn-primary" onClick={verifyOTP} disabled={isDisabled}>
            Verify
            </button>
        </form>
      </div>
    );  
  }
  else{
    return(
      <Load />
    );
  }

}
export default OtpForm;
