import React, { useState } from "react";
import { NavLink, useHistory } from 'react-router-dom';

const SignInForm = (props) => {

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const loginUser = async(e)=>{
    setIsDisabled(true);
    e.preventDefault();
    try {
      const res = await fetch('https://api-peer-finder.herokuapp.com/login',{
        method: "POST",
        withCredentials: true,
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          email, password
        })
      });
  
      const response = await res.json();
      if(response.status === true){
        localStorage.setItem('token', response.token);
        if(response.isProfileSetup === true){
          if(response.isVerified === false){
            props.obj({
              message : "Please verify the OTP",
              error : false
            });
            setTimeout(() => {
              history.push("/otp");
            }, 1000);
          }
          else{
            history.push("/home");
          }
        }
        else{
          props.obj({
            message : "Please set your profile",
            error : false
          });
          setTimeout(() => {
            history.push("/profile");
          }, 1000);
        }
      }
      else{
        props.obj({
          message : response.message,
          error : true
        });
      }
    } 
    catch (error) {
      props.obj({
        message : "Some error occurred",
        error : true
      });
    }
    setIsDisabled(false);
  }

  return (
    <div className="sign_in_form">
      <div className="sign_in_form_head">
        <h1>Login to your Account</h1>
      </div>
      <form method="POST">
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Your E-mail"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Your Password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={loginUser} disabled={isDisabled}>
          Log In
        </button>
        <p className="create_account">
          Does not have account? <NavLink to="/register">Create account</NavLink>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;
