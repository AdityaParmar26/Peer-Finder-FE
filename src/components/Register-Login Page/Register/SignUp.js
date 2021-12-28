import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import '../RegisterLogin.css';
import SnackBar from "../../SnackBar/SnackBar";


const SignUp = () => {

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

  return (
    <div className="sign_up_page">
      <div className="sign_up_wrapper">
        <SignUpForm obj = {handleCallback}/>
        {(state) ? <SnackBar message={message}/> : null}
      </div>
    </div>
  );
};

export default SignUp;
