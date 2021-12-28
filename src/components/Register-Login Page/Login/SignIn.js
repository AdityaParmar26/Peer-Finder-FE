import React, { useState } from "react";
import SignInForm from './SignInForm';
import SnackBar from "../../SnackBar/SnackBar";
import '../RegisterLogin.css';
const SignIn = () =>{

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

    return(
    <div className="sign_in_page">
        <div className="sign_in_wrapper">
            <SignInForm obj = {handleCallback} />
            {(state) ? <SnackBar message={message}/> : null}
        </div>
    </div>
    );
}

export default SignIn;