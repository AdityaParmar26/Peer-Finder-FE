import React from "react";
import { useHistory } from 'react-router-dom';
import './Card.css';
import user_image from '../../Images/user.png';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import {Button} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const Card = (props) => {

    const history = useHistory();

    // --------------- for favourite feature ----------------

    const addFavourite = async (id, from) =>{
        try {
            const res = await fetch('https://api-peer-finder.herokuapp.com/favourite', {
                method:"POST",
                headers:{
                "Content-Type" : "application/json",
                "token" : localStorage.getItem('token')
                },
                body: JSON.stringify({
                    id : id, from : from
                }),
            });
      
            const response = await res.json();
            if(response.status === true){
                props.obj({
                    message : response.message,
                    error : false
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
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
            setTimeout(() => {
                history.push('/login');
            }, 1000);
        }
    }
    
    //  deleting user from favourites list...
    const removeFavourite = async(id, from) =>{
        try {
            const res = await fetch("https://api-peer-finder.herokuapp.com/favourite", {
                method: "DELETE",
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "token" : localStorage.getItem('token')
                },
                body: JSON.stringify({
                 id : id, from : from
                }),
                credentials: "include",
            });

            const response = await res.json();

            if(response.status === true){
                props.obj({
                    message : response.message,
                    error : false
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
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
            setTimeout(() => {
                history.push('/login');
            }, 1000);
            
        }
    }

    // rendering the star type based on page.
    const renderContent = () => {
        if (props.isInterest === false)
            return <Button color="warning" onClick={()=>removeFavourite(props.user._id, props.user.from)}> <StarIcon /> </Button>
        else if (props.user.is_favourite === true)
            return <Button color="warning"> <StarIcon /> </Button>
        else if (props.user.is_favourite === false)
            return <Button color="warning" onClick={()=>addFavourite(props.user._id, props.interest)}> <StarBorderIcon /> </Button>
        else
            return null;
    }

  return (
    <div className="card_bg">
        <div className="card-container">

            {/* for favourite feature */}

            <div className="star">
                {
                    renderContent()
                }
            </div>
            <div className="card-container-image">
                <img className="round" src={user_image} alt="user" />
            </div>

            <h3>{props.user.first_name} {props.user.last_name}</h3>

            <p>{props.user.bio}</p>
            
            <div className="section">
                {(props.isInterest === true) 
                    ? 
                    <div className="sub_section">
                        <div>
                            <h5>Peerability - </h5>
                        </div>
                        <div>
                            <h5> {props.user.match_percent}</h5>
                        </div>
                    </div>
                    :
                    null
                }
                <div className="sub_section">
                    <div>
                        <h5>Year of Passing - </h5>
                    </div>
                    <div>
                        <h5> {props.user.year_of_passing}</h5>
                    </div>
                </div>
            </div>

            <div className="social_links">
                <div className="social_buttons">
                    {(props.user.linkedin_url === "") ? 
                        <LinkedInIcon fontSize="large"/> :
                        <a href = {props.user.linkedin_url} target='_blank' rel='noopener noreferrer'>
                            <LinkedInIcon fontSize="large"/>
                        </a> 
                    }
                </div>
                <div className="social_buttons">
                    {(props.user.github_url === "") ? 
                        <GitHubIcon fontSize="large"/> : 
                        <a href = {props.user.github_url} target='_blank' rel='noopener noreferrer'>
                            <GitHubIcon fontSize="large"/>
                        </a> 
                    }
                </div>
            </div>

            <section className="skills">
                <h6>Interests</h6>
                <ul>
                    { props.user[props.interest].map((value)=>(
                        <li key={value}>{value}</li>
                    ))}
                </ul>
            </section>
        </div>
    </div>
  );
};

export default Card;
