import React, {useState, useEffect} from 'react'
import Message from './message/Message'
import { messagesInfo } from '../../messages'
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import Connection from './Connection';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import axios from 'axios'; 
import "./messages.css";
import { DialogContent } from '@mui/material';
var jwt = require("jsonwebtoken");

export default function Messages(props) {

    const messageArr = messagesInfo.map(m => <Message key={m.id} data={m}/>);
    const [messagesArr, setMessagesArr] = useState([]);
    const [open, setOpen] = useState(false);
    const [allConnections, setAllConnections] = useState([]);

    useEffect(() => {
      addChat();
    }, [])

    // useEffect(() => {
    //   const token = localStorage.getItem('token')
    //   const decodedToken = jwt.decode(token);
    //   const username = decodedToken.email;

    //   async function getAllChats() {
    //     try{
    //       const res = axios.get(`https://api.chatengine.io/chats/${170401}/`, {
    //           headers: { 
    //             'Project-ID': '426da476-a27b-4f58-8285-d88a483bcfda',
    //             'User-Name': username,
    //             'User-Secret': "secret"
    //            },
    //       });
    //       setMessagesArr(res);
    //       console.log("ALL CHATSSS:" + JSON.stringify(res));
    //     }
    //     catch {
    //       console.log("errorrrrr");
    //     }
    //   }
    //   getAllChats();
    // }, []);

    async function addChat() {
      // handleClickOpen();
      try {
        const token = localStorage.getItem("token");
        const {data} = await axios.get(`http://localhost:8080/api/v1/user/${props.userId}/getFriends`, {
          headers:{
            authorization: `Bearer ${token}`
          }
        });
        const connectionsArray = data;
        // setAllConnections(prevConnections => [...connectionsArray]);
        setAllConnections(connectionsArray);
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
          Connections                
          {/* <div className="message-back-arrow-div"><div onClick={addChat} className="message-back-arrow-div2"><AddIcon htmlColor="#7FD8BE" /></div></div> */}
          <div onClick={props.onHandleMessenger} className="message-back-arrow-div"><div className="message-back-arrow-div2"><ChatBubbleOutlineIcon htmlColor="#7FD8BE" /></div></div>
          </div>
        {/* <div className="messages-wrapper">{messageArr}</div> */}
        <div>      
        {allConnections && allConnections.map((c) => (
          <Connection key={c._id} connection={c} onHandleMessenger={props.onHandleMessenger} createNewConversation={createNewConversation} />
        ))}
        {allConnections.length == 0 && <div>No connections</div>}
      </div>
    </div>

    {/* <Dialog open={open} onClose={handleClose}>
      <DialogContent>
      <div>      
        {allConnections && allConnections.map((c) => (
          <Connection key={c._id} connection={c} createNewConversation={createNewConversation} />
        ))}
        {allConnections.length == 0 && <div>No connections</div>}
      </div>
      </DialogContent>
    </Dialog> */}
  </>
  )
}
