import React, { useState } from "react";
import './MessageCard.css';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import { useHistory } from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Modal from '../Modal/Modal';
import SnackBar from "../SnackBar/SnackBar";

const MessageCard = (props) => {
    const history = useHistory();
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

    const deleteMessage = async() =>{
        try {
            const res = await fetch("https://api-peer-finder.herokuapp.com/message", {
                method: "DELETE",
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "token" : localStorage.getItem('token')
                },
                body: JSON.stringify({
                    message_id : props.detail.message_id
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

  return (
    <div className="message_card_wrapper">
        <div className="message_card">
            <div className="delete">
                <Button color="error" onClick={deleteMessage}><DeleteIcon /></Button>
            </div>

            <div className="reply">
                <Modal reply={true} user={props.detail} obj={handleCallback}/>
            </div>

            <div className="message_title">
                <h2>Message from <span>{props.detail.first_name} {props.detail.last_name}</span></h2>
            </div>

            <div className="message_content">
                <h5>{props.detail.message}</h5>
            </div>

            <div className="contact">
                <div className="contact_detail">
                    <div className="contact_icon">
                        <CallIcon />
                    </div>
                    <div style={{width : "15px"}}></div>
                    <div className="contact_info">
                        {props.detail.mobile_number}
                    </div>
                </div>
                <div className="contact_detail">
                    <div className="contact_icon">
                        <EmailIcon />
                    </div>
                    <div style={{width : "15px"}}></div>
                    <div className="contact_info">
                        {props.detail.email}
                    </div>
                </div>
                <div className="contact_detail" style={{paddingBottom : "10px"}}>
                    <div className="contact_icon">
                        <AccessTimeIcon />
                    </div>
                    <div style={{width : "15px"}}></div>
                    <div className="contact_info">
                        {props.detail.sent_on}
                    </div>
                </div>
            </div>
            {(state) ? <SnackBar message={message}/> : null}
        </div>
    </div>
  );
};

export default MessageCard;
