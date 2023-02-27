import React from 'react'
import Message from './message/Message';
import { messagesInfo } from '../../messages'
import "./messages.css"

export default function Messages() {

    const messageArr = messagesInfo.map(m => <Message key={m.id} data={m}/>);

  return (
    <div className="rightbar-container">
        <div className="rightbar-heading-container">Messages</div>
        <div className="messages-wrapper">{messageArr}</div>
    </div>
  )
}
