import React, {useState} from "react";
import EditProfileForm from "./EditProfileForm";
import SnackBar from "../SnackBar/SnackBar";

const EditProfile = () => {

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
        <EditProfileForm obj = {handleCallback}/>
        {(state) ? <SnackBar message={message}/> : null}
      </div>
    </div>
  );
};

export default EditProfile;