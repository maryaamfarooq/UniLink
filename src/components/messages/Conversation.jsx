import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id); // here the conversations object has memebers array in which one is sender and other is receiver. we will get the id of the receiver

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId); // here we are getting the user id of the variable frienid
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user && user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
        alt=""
      />
      <span className="conversationName">{user && user.username}</span>  
    </div>
    // here in conversationanem we are using the friendid user as conversation name
  );
}
