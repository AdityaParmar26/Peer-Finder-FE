import * as React from 'react';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CommentIcon from '@mui/icons-material/Comment';
import ReplyIcon from '@mui/icons-material/Reply';
import './Modal.css';

export default function FormDialog(props) {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setMessage('');
    setOpen(false);
  };

  const sendMessage = async() => {
    try {
      const res = await fetch('https://api-peer-finder.herokuapp.com/message', {
        method:"POST",
        headers:{
        "Content-Type" : "application/json",
        "token" : localStorage.getItem('token')
        },
        body: JSON.stringify({
            to : props.user._id, message : message
        }),
      });

      const response = await res.json();
      setOpen(false);
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
    setMessage('');
  }

  return (
    <div>
      <Button onClick={handleClickOpen} style={{color : (props.reply === true) ? "#000000" : "#a0a0a0"}}>
        {(props.reply === true) ? <ReplyIcon /> : <CommentIcon />}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="title">You are sending message to {props.user.first_name}</DialogTitle>
        <DialogContent>
          <DialogContentText className = {(props.reply === true) ? null : "sub_title"}>
            Please enter your message here.
          </DialogContentText>
          <TextField
            margin="dense"
            label="Message"
            fullWidth
            variant="outlined"
            multiline
            rows={2}
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{color : "#ff0000"}}>Cancel</Button>
          <Button onClick={sendMessage} style={{color : "#337c4a"}}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}