import React, {useState} from "react";
import ContactUsForm from "./ContactUsForm";
import './ContactUs.css';
import SnackBar from "../SnackBar/SnackBar";
const ContactUs = () => {

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
    <div className="contact_us_page">
      <div className="contact_us_wrapper">
        <ContactUsForm obj = {handleCallback}/>
        {(state) ? <SnackBar message={message}/> : null}
      </div>
    </div>
  );
};

export default ContactUs;
