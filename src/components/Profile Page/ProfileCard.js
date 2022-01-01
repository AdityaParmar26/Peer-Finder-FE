import React, { useEffect, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import profileImage from '../../Images/user-profile-image.png';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Load from "../Loader/Loader";
import EditIcon from '@mui/icons-material/Edit';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const ProfileCard = (props) => {

  // loader 
  const [loader, setLoader] = useState(false);
  
  const [user, setUser] = useState({
    _id : "",
    first_name : "",
    last_name : "",
    email : "",
    mobile_number: "",
    bio: "",
    year_of_passing: "",
    linkedin_url: "",
    github_url: "",
    technical_interest : [], 
    non_technical_interest: [], 
    cultural_interest: [],
    tech_rate : "",
    non_tech_rate: "",
    cultural_rate : ""
  });
  const history = useHistory();

  // Getting the Signed In User Data
  const callProfilePage = async ()=>{
    try {
      const res = await fetch("https://api-peer-finder.herokuapp.com/user", {
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
        if(response.data.isProfileSetup === true){
          if(response.data.isVerified === true){
            setUser(response.data);
            setLoader(true);
          }
          else{
            props.obj({
              message : "Please verify your identity",
              error : true
            });
            setTimeout(() => {
              history.push("/otp");
            }, 1000);
          }
        }
        else{
          props.obj({
            message : "You haven't set your profile yet",
            error : true
          });
          setTimeout(() => {
            history.push("/profile");
          }, 1000);
        }
      }
      else{
        props.obj({
          message : response.error,
          error : true
        });
        history.push("/login");
      }
    } 
    catch (error) {
      history.push("/login");
    }
  }

  useEffect(() => {
    if(loader === false && user._id === "")  callProfilePage();
  });

  if(loader){
    return (
      <div className="profile">
        <div className="profile_card">
          <span className="edit_icon"><NavLink to='/edit/profile'><EditIcon /></NavLink></span>
          <div className="profile_image">
            <img src={profileImage} alt="ProfileImage" />
            <br />
            <br />
            <div className="social_links">
                <div className="social_button">
                  {(user.linkedin_url === "") ? 
                    <LinkedInIcon fontSize="large"/> :
                    <a href = {user.linkedin_url} target='_blank' rel='noopener noreferrer'>
                        <LinkedInIcon fontSize="large"/>
                    </a> 
                  }
                </div>
                <div className="social_button">
                  {(user.github_url === "") ? 
                    <GitHubIcon fontSize="large"/> : 
                    <a href = {user.github_url} target='_blank' rel='noopener noreferrer'>
                        <GitHubIcon fontSize="large"/>
                    </a> 
                  }
                </div>
              </div>
          </div>
          <div className="profile_info">
            <div>
              <span className="profile_info_head">Name</span>
              <span className="profile_info_subhead">{user.first_name} {user.last_name}</span>
            </div>
            <div>
              <span className="profile_info_head">Email</span>
              <span className="profile_info_subhead">{user.email}</span>
            </div>
            <div className="bio" style={{marginTop : "5px"}}>
              <span className="profile_info_head">Bio</span>
              <span className="profile_info_subhead">{user.bio}</span>
            </div>
            <div>
              <span className="profile_info_head">Mobile Number</span>
              <span className="profile_info_subhead">{user.mobile_number}</span>
            </div>
            <div>
              <span className="profile_info_head">Year of Passing</span>
              <span className="profile_info_subhead">{user.year_of_passing}</span>
            </div>
            <div className="bio">
              <span className="profile_info_head">Technical Interest</span>
              { user["technical_interest"].map((value)=>(
                <span className="profile_info_subhead user_interests" key={value}>{value}</span>
              ))}
            </div>
            <div className="bio">
              <span className="profile_info_head">Non Technical Interest</span>
              { user["non_technical_interest"].map((value)=>(
                <span className="profile_info_subhead user_interests" key={value}>{value}</span>
              ))}
            </div>
            <div className="bio">
              <span className="profile_info_head">Cultural Interest</span>
              { user["cultural_interest"].map((value)=>(
                <span className="profile_info_subhead user_interests" key={value}>{value}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="profile_rating">
          <h3 style={{textDecoration : "underline"}}>Your Ratings</h3>
          <div className="profile_rating_info">
            <div className="profile_rating_head">
              Technical -
            </div>
            <div className="profile_rating_sub_head">
              {user.tech_rate} <StarBorderIcon />
            </div>
          </div>
          <div className="profile_rating_info">
            <div className="profile_rating_head">
                Non-Technical -
            </div>
            <div className="profile_rating_sub_head">
              {user.non_tech_rate} <StarBorderIcon />
            </div>
          </div>
          <div className="profile_rating_info">
            <div className="profile_rating_head">
                Cultural -
            </div>
            <div className="profile_rating_sub_head">
                {user.cultural_rate} <StarBorderIcon /> 
            </div>
          </div>
        </div>
      </div>
    );
  }
  else{
    return(
      <div className="render_element" style={{height : "50vh"}}>
        <Load />
      </div>
    );
  }
};

export default ProfileCard;