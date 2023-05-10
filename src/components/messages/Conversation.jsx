import React, { useState, useEffect } from 'react'
import { MultiChatSocket, MultiChatWindow, useMultiChatLogic} from 'react-chat-engine-advanced';
import axios from 'axios'; 
import './conversation.css'

export default function Conversation(props) {

  const chatProps = useMultiChatLogic("426da476-a27b-4f58-8285-d88a483bcfda", props.userEmail, "secret");
  // const chatProps = "";
  const projectID = "426da476-a27b-4f58-8285-d88a483bcfda"

    const [friend, setFriend] = useState();

    useEffect(() => {
      console.log("EMAILLL:"+props.userEmail)
    }, []);

    // useEffect(() => {
    //     console.log("props.conversationFriend" + props.conversationFriend);
    //     async function getUser() {    
    //         try {
    //           const token = localStorage.getItem("token");
    //           const {data} = await axios.get(`http://localhost:8080/api/v1/user/${props.conversationFriend}`, {
    //             headers:{
    //               authorization: `Bearer ${token}`
    //             }
    //           });
    //           const userObj = data;
    //           setFriend(userObj.user);
    //           console.log("FRIEND: "+JSON.stringify(friend));
    //         } catch (error) {
    //           console.error(error.response.data);
    //         }
    //       }
    //       getUser()
    // }, [])

    useEffect(() => {
        console.log("props.conversationFriend" + props.conversationFriend);
        async function getUser() {    
            try {
              const token = localStorage.getItem("token");
              const {data} = await axios.get(`http://localhost:8080/api/v1/user/${props.conversationFriend}`, {
                headers:{
                  authorization: `Bearer ${token}`
                }
              });
              const userObj = data;
              setFriend(userObj.user);
              console.log("FRIEND: "+JSON.stringify(friend));
            }
            catch (error) {
              console.error(error.response.data);
            }
          }
          getUser();
          // chatProps = useMultiChatLogic("426da476-a27b-4f58-8285-d88a483bcfda", friend.email, "secret");
    }, [])

    // useEffect(() => {
    //   if(chatProps != "")
    //   chatProps = useMultiChatLogic("426da476-a27b-4f58-8285-d88a483bcfda", "lfarooq.bscs19seecs@seecs.edu.pk", "secret");
    // }, [friend])

  return (
    <div className="conversation-div">
      {/* {friend && friend.firstName} */}
      <MultiChatWindow {...chatProps} />
      <MultiChatSocket {...chatProps} />
    </div>
  )
}