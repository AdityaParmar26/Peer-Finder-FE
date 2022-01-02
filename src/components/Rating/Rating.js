import * as React from 'react';
import Rating from '@mui/material/Rating';
import { useHistory } from "react-router-dom";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  emptyStar: {
    color: "#a0a0a0"
  }
}));

export default function Rate(props) {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState(props.user.rating);

  // if(props.user.rating > 0) setValue(props.user.rating);

  const postData = async(val)=>{    
    try {
      const res = await fetch('https://api-peer-finder.herokuapp.com/rate', {
        method:"POST",
        headers:{
          "Content-Type" : "application/json",
          "token" : localStorage.getItem('token')
        },
        body: JSON.stringify({
          to : props.user._id, rate : val, interest : props.interest
        })
      });
  
      const response = await res.json();
      if(response.status === true){
        props.obj({
          message : response.message,
          error : false
        });
      }
      else{
        props.obj({
          message : response.message,
          error : true
        });
        if(res.status === 401) {
          setTimeout(() => {
            history.push('/login');
          }, 1000);
        }
      }
    } 
    catch (error) {
      props.obj({
        message : "Something went wrong",
        error : true
      });
    }
  }

  return (
    <Rating
      name="simple-controlled"
      value={value}
      emptyIcon={<StarBorderIcon className={classes.emptyStar}/>}
      onChange={(e, newValue)=>{
        setValue(newValue);
        if(e.type === "change"){
          postData(newValue);
        }
      }}
    />
  );
}


