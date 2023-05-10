import React from 'react'
import './connection.css';

export default function Connection(props) {

function createNewConversation(connection) {
// console.log("connection:"+JSON.stringify(connection));
  props.createNewConversation(connection);
}

  return (
    <div className="connect-div" onClick={props.onHandleMessenger}>
      <img className="connect-img" src={props.connection.profilePicture} />
      <div className="connect-info">
      <div className="connect-name">{props.connection.firstName} {props.connection.lastName}</div>
      {/* <div>{props.connection.email}</div> */}
      {/* <div className="connect-email">mfarooq.bscs19seecs@seecs.edu.pk</div> */}
      </div>
    </div>
  )
}
