import React, {useState} from 'react'
import Message from './message/Message'
import { messagesInfo } from '../../messages'
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import Connection from './Connection';
import axios from 'axios'; 
import "./messages.css";
import { DialogContent } from '@mui/material';

export default function Messages(props) {

    const messageArr = messagesInfo.map(m => <Message key={m.id} data={m}/>);
    const [open, setOpen] = useState(false);
    const [allConnections, setAllConnections] = useState([]);

    async function addChat() {
      handleClickOpen();
      try {
        const token = localStorage.getItem("token");
        const {data} = await axios.get(`http://localhost:8080/api/v1/user/${props.userId}/getFriends`);
        const connectionsArray = data;
        console.log("connectionsArray: "+JSON.stringify(data));
        setAllConnections(prevConnections => [...connectionsArray]);
        // console.log(JSON.stringify(jobsArray));
      } catch (error) {
          console.error(error);
      }
    }

    async function createNewConversation(connection) {
      props.setConversationFriend(connection);
      props.onHandleConversation();
    }

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <>
    <div className="rightbar-container">
        <div className="rightbar-heading-container">
          Messages                
          <div className="message-back-arrow-div"><div onClick={addChat} className="message-back-arrow-div2"><AddIcon htmlColor="#7FD8BE" /></div></div>
          </div>
        <div className="messages-wrapper">{messageArr}</div>
    </div>

    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
      <div>      
        {allConnections && allConnections.map((c) => (
          <Connection key={c._id} connection={c} createNewConversation={createNewConversation} />
        ))}
        {allConnections.length == 0 && <div>No connections</div>}
      </div>
      </DialogContent>
    </Dialog>
  </>
  )
}
