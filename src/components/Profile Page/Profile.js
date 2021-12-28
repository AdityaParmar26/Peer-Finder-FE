import React, {useState} from "react";
import NavBar from "../NavBar/NavBar";
import ProfileCard from "./ProfileCard";
import SnackBar from "../SnackBar/SnackBar";
import './ProfilePage.css';

const Profile = () => {

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
    <div>
      <NavBar />
      <div className="profile_card_wrapper">
        <ProfileCard key="User_Name" obj = {handleCallback}/>
        {(state) ? <SnackBar message={message}/> : null}
      </div>
      
    </div>
  );
};

export default Profile;