import React, { useEffect, useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { useHistory } from "react-router-dom";
import Load from "../Loader/Loader";

const SetProfile1Form = (props) => {

  const TechInterest =  ["Web Development", "Android Development", "ML", "AI", "AWS"];
  const NonTechInterest =  ["Cricket", "Football", "Chess"];
  const CulturalInterest =  ["Singing", "Dancing", "Vocal", "Musical Instrument"];

  // loader 
  const [loader, setLoader] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [id, setId] = useState();

  // User Profile schema
  const [user, setUser] = useState({
    _id : "",
    first_name : "",
    last_name : "",
    mobile_number: "",
    bio: "",
    year_of_passing: "",
    linkedin_url: "",
    github_url: "",
    technical_interest : [], 
    non_technical_interest: [], 
    cultural_interest: []
  });

  const history = useHistory();

  const callProfilePage = async ()=>{
    try {
      const res = await fetch("https://api-peer-finder.herokuapp.com/profile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "token" : localStorage.getItem('token')
        },
        credentials: "include",
      });

      const response = await res.json();
      setLoader(true);  
      if(response.status === true){
        if(response.isProfileSetup === true && response.isVerified === true){
          history.push('/home');
        }
        else if(response.isProfileSetup === true && response.isVerified === false){
          props.obj({
            message : "Please verify the OTP",
            error : false
          });
          setTimeout(() => {
            history.push("/otp");
          }, 1000);
        }
        else{
          setId(response._id);
        }
      }
      else{
        history.push("/login");
      }
    } 
    catch (error) {
      history.push("/login");
    }
  }

  useEffect(() => {
    // calling the function if loader is false.
    if(loader === false)  callProfilePage();
  });

  

  if(loader){
    const selectTech = (TechInterestList, selectedItem) =>{
      user.technical_interest = TechInterestList
    };

    const removeTech = (TechInterestList, selectedItem) =>{
      user.technical_interest = TechInterestList
    };
    const selectNonTech = (NonTechInterestList, selectedItem) =>{
      user.non_technical_interest = NonTechInterestList
    };

    const removeNonTech = (NonTechInterestList, selectedItem) =>{
      user.non_technical_interest = NonTechInterestList
    };
    const selectCultural = (CulturalInterestList, selectedItem) =>{
      user.cultural_interest = CulturalInterestList
    };

    const removeCultural = (CulturalInterestList, selectedItem) =>{
      user.cultural_interest = CulturalInterestList
    };

    user._id = id;

    //Handling form data and pushing every result into the user 
    let entry, value;
    const handleInputs = (e)=>{
      entry = e.target.name;
      value = e.target.value;
      setUser({...user, [entry]:value});
    }

    const postData = async(e)=>{
      setIsDisabled(true);
      e.preventDefault();
    
      const {_id, first_name, last_name, mobile_number, bio, technical_interest, non_technical_interest, cultural_interest, year_of_passing, linkedin_url, github_url} = user;
      try{
        const res = await fetch('https://api-peer-finder.herokuapp.com/profile', {
          method:"POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            _id, first_name, last_name, mobile_number, bio, technical_interest, non_technical_interest, cultural_interest, year_of_passing, linkedin_url, github_url
          })
        });
    
        const response = await res.json();
        if(response.status === true){
          props.obj({
            message : "Please verify the OTP",
            error : false
          });
          setTimeout(() => {
            history.push("/otp");
          }, 1000);
        }
        else{
          props.obj({
            message : response.message,
            error : true
          });
        }
      }
      catch(error){
        props.obj({
          message : "Some error occurred",
          error : true
        });
      }  
      setIsDisabled(false);
    }
  
    return (
      <div className="set_profile_form">
        <div className="set_profile_form_head">
          <h1>Set Up Your Profile </h1>
        </div>
        <form method="POST">
  
          <div className="form-row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Enter First name"
                name="first_name"
                value={user.first_name}
                onChange={handleInputs}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Last name"
                name="last_name"
                value={user.last_name}
                onChange={handleInputs}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Mobile Number"
                name="mobile_number"
                value={user.mobile_number}
                onChange={handleInputs}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Graduation Year"
                name="year_of_passing"
                value={user.year_of_passing}
                onChange={handleInputs}
              />
            </div>
          </div>

          <div className="form-group">
            <textarea 
              className="form-control"
              rows="2" 
              placeholder="Enter your bio"
              value={user.bio}
              onChange={handleInputs}
              name="bio"
            >  
            </textarea>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your LinkedIn URL"
              name="linkedin_url"
              value={user.linkedin_url}
              onChange={handleInputs}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your GitHub URL"
              name="github_url"
              value={user.github_url}
              onChange={handleInputs}
            />
          </div>
  
          <Multiselect
            options={TechInterest}
            closeIcon="close"
            isObject={false}
            selectionLimit="2"
            showCheckbox={true}
            placeholder="Select Technical Interest"
            hidePlaceholder={true}
            onSelect={selectTech}
            onRemove={removeTech}
            showArrow
            avoidHighlightFirstOption
          />

          <Multiselect
            options={NonTechInterest}
            closeOnSelect={true}
            closeIcon="close"
            isObject={false}
            selectionLimit="2"
            showCheckbox={true}
            placeholder="Select NonTechnical Interest"
            hidePlaceholder={true}
            onSelect={selectNonTech}
            onRemove={removeNonTech}
            showArrow
            avoidHighlightFirstOption
          />

          <Multiselect
            options={CulturalInterest}
            closeIcon="close"
            isObject={false}
            selectionLimit="2"
            showCheckbox={true}
            placeholder="Select Cultural Interest"
            hidePlaceholder={true}
            onSelect={selectCultural}
            onRemove={removeCultural}
            showArrow
            avoidHighlightFirstOption
          />

          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "12px" }}
            onClick={postData}
            disabled={isDisabled}
          >
            Next
          </button>
        </form>
      </div>
    );  
  }
  else{
    return(
      <Load />
    );
  }

}
export default SetProfile1Form;
