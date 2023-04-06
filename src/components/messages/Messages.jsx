import React, {useState} from 'react'
import Message from './message/Message';
import { messagesInfo } from '../../messages'
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import Connection from './Connection';
import axios from 'axios'; 
import "./messages.css"

export default function Messages() {

    const messageArr = messagesInfo.map(m => <Message key={m.id} data={m}/>);
    const [open, setOpen] = useState(false);
    const [allConnections, setAllConnections] = useState([]);

    async function addChat() {
      try {
        const token = localStorage.getItem("token");
        const {data} = await axios.get('http://localhost:8080/api/v1/job/getUserJobs/', {
          headers:{
            authorization: `Bearer ${token}`
          }
        });
        const connectionsArray = data.userConnections;
        setAllConnections(prevConnections => [...prevConnections, ...connectionsArray]);
        // console.log(JSON.stringify(jobsArray));
      } catch (error) {
          console.error(error.response.data);
      }
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
      <div>      
        {/* {allConnections && allConnections.map((c) => (
          <Connection connection={c} />
        ))} */}
        {!allConnections && <div>No connections</div>}
      </div>
    </Dialog>
  </>
  )
}
