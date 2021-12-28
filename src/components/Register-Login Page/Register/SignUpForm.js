import React, { useState } from "react";
import { NavLink, useHistory } from 'react-router-dom';

const SignUpForm = (props) => {

  const history = useHistory();
  const [isDisabled, setIsDisabled] = useState(false);

  // Setting user schema same as in backend
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  //Handling form data and pushing every result into the user 
  let entry, value;
  const handleInputs = (e)=>{
    
    entry = e.target.name;
    value = e.target.value;

    setUser({...user, [entry]:value});
  }

  // Posting the data to the database after clicking next button
  const postData = async(e)=>{
    setIsDisabled(true);
    e.preventDefault();

    const {email, password, confirmPassword} = user;
    try {
      const res = await fetch('https://api-peer-finder.herokuapp.com/register', {
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          email, password, confirmPassword
        })
      });

      const response = await res.json();
      if(response.status === true){
        history.push("/login");
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
    <div className="sign_up_form">
      <div className="sign_up_form_head">
        <h1>Let's set up your account</h1>
      </div>
      <form method="POST">
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Enter Your E-mail"
            name="email"
            value={user.email}
            onChange={handleInputs}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Enter Your Password"
            name="password"
            value={user.password}
            onChange={handleInputs}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Your Password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleInputs}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={postData} disabled={isDisabled}>
          Register
        </button>
        <p className="login_account">
          Already a Member? <NavLink to="/login">Login Here</NavLink>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
