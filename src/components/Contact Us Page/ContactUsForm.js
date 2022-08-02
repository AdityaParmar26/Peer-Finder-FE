import React, { useState } from "react";

const ContactUsForm = (props) => {

  const [isDisabled, setIsDisabled] = useState(false);

  // Setting user schema same as in backend
  const [user, setUser] = useState({
    name: "",
    email: "",
    message: ""
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

    const {name, email, message} = user;
    
    try {
      const res = await fetch('https://api-peer-finder.herokuapp.com/contact', {
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          name, email, message
        })
      });
  
      const response = await res.json();
      if(response.status === true){
        props.obj({
          message : response.message,
          error : false
        });
        setUser({name: "", email: "", message : ""});
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
    <div className="contact_us_form">
      <div className="contact_us_form_head">
        <h1>Please give Feedback!</h1>
      </div>
      <form method="POST">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Full Name"
            name="name"
            value={user.name}
            onChange={handleInputs}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Enter Your E-mail"
            name="email"
            value={user.email}
            onChange={handleInputs}
          />
        </div>
        <div className="form-group">
          <textarea className="form-control" 
            rows="2" 
            placeholder="Enter your message"
            name="message"
            value={user.message}
            onChange={handleInputs}
          > 
          </textarea>
        </div>
        <button type="submit" className="btn btn-primary" onClick={postData} disabled={isDisabled}>
          Submit
        </button>
        {/* <p className="message">
          Give you valuable Feedback here. Suggestions are welcomed.
        </p> */}
      </form>
    </div>
  );
};

export default ContactUsForm;
