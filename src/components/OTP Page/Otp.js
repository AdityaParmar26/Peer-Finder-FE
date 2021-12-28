import React, {useState} from "react";
import OtpForm from "./OtpForm";
import './Otp.css';
import SnackBar from "../SnackBar/SnackBar";
const Otp = () => {

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
    <div className="otp_form_page">
      <div className="otp_form_wrapper">
        <OtpForm obj = {handleCallback}/>
        {(state) ? <SnackBar message={message}/> : null}
      </div>
    </div>
  );
};

export default Otp;