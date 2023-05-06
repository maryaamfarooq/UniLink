import React, { useState, useEffect } from 'react'
import axios from 'axios'; 
import './conversation.css'

export default function Conversation(props) {

    const [friend, setFriend] = useState();

    useEffect(() => {
        console.log("props.conversationFriend" + props.conversationFriend);
        async function getUser() {    
            try {
              const token = localStorage.getItem("token");
              const {data} = await axios.get(`http://localhost:8080/api/v1/user/${props.conversationFriend}`);
              const userObj = data;
              setFriend(userObj);
              console.log("FRIEND: "+JSON.stringify(friend));
            } catch (error) {
              console.error(error.response.data);
            }
          }
          getUser()
    }, [])

    useEffect(() => {
        console.log("props.conversationFriend" + props.conversationFriend);
        async function getUser() {    
            try {
              const token = localStorage.getItem("token");
              const {data} = await axios.get(`http://localhost:8080/api/v1/user/${props.conversationFriend}`);
              const userObj = data;
              setFriend(userObj);
              console.log("FRIEND: "+JSON.stringify(friend));
            } catch (error) {
              console.error(error.response.data);
            }
          }
          getUser()
    }, [])

  return (
    <div className="conversation-div">
      {friend && friend.firstName}
    </div>
  )
}
