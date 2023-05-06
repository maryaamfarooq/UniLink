import React from 'react'
import './connection.css';

export default function Connection(props) {

function createNewConversation(connection) {
// console.log("connection:"+JSON.stringify(connection));
  props.createNewConversation(connection);
}

  return (
    <div className="connect-div" onClick={() => createNewConversation(props.connection._id)}>
      <img className="connect-img" src={props.connection.profilePicture} />
      {props.connection.firstName}
    </div>
  )
}
