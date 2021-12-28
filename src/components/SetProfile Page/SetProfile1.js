import React, {useState} from "react";
import SetProfile1Form from "./SetProfile1Form";
import './SetProfile.css';
import SnackBar from "../SnackBar/SnackBar";
const SetProfile1 = () => {

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
    <div className="set_profile_page">
      <div className="set_profile_wrapper">
        <SetProfile1Form obj = {handleCallback}/>
        {(state) ? <SnackBar message={message}/> : null}
      </div>
    </div>
  );
};

export default SetProfile1;