import React from "react";
import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "./Conversation";
import Messagee from "./Messagee";
// import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

export default function Messenger(props) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null); // initially we dont have any chat open
  const [messages, setMessages] = useState([]); // these messages were added thorough api and are get from the backend
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  // const { user } = useContext(AuthContext); //here we get the logged in user
  const [user, setUser] = useState({_id: 0})
  const scrollRef = useRef();
  const jwt = require('jsonwebtoken');

  useEffect(() => {
    const token = localStorage.getItem('token')
    const decodedToken = jwt.decode(token);
    setUser({_id:`${decodedToken.userId}`});
    console.log("USERID:"+user._id);
  }, [])

  useEffect(() => {
    socket.current = io("ws://localhost:8900"); // connecting the socket server
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => { // check for the messages of the same conversation
    if (arrivalMessage && currentChat && currentChat.members.includes(arrivalMessage.sender)) {
      setMessages(prev => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);
  

  useEffect(() => {
    socket.current.emit("addUser", user._id); // send something to the server. sending the user id
    socket.current.on("getUsers", (users) => { // take event from a client . now we have become socket and take something from client 
      setOnlineUsers(
        user.friends.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        // const token = localStorage.getItem('token');
        // const decodedToken = jwt.verify(token, 'your_jwt_secret_key_here');
        const userId = user._id;
        const res = await axios.get('localhost:8080/api/v1/conv/'+ userId); // get the conversation of a user id. axios.get("/conversations")
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
 
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("localhost:8080/api/v1/message/" + (currentChat && currentChat._id)); // getting the messages of a conversation. by using the conservation id

        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    }; // sending a new message to post it in conversation

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]); // only post the new message 
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   scrollRef.current.scrollIntoView({ behavior: "smooth" }); // when new messages are added scroll to the new message
  // }, [messages]);
  
  return (
    <>
      {/* <Topbar /> */}
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}> 
                <Conversation conversation={c} currentUser={user} />    
              </div> //Here we are showing all the conversations(threads) in the topbar. for onclick method a conversation opens on a click
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Messagee message={m} own={m.sender === user._id} />
                    </div> // if the current user is sender we own this message
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        {/* <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div> */}
      </div>
    </>
  );
}
