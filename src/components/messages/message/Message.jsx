import React from 'react'
import "./message.css";

export default function Message({data}) {
  return (
    <div className="message-container">
      <img className="message-pf" src={data.profilePicture} />
      <div className="message-info-wrapper">
        <p className="message-name">{data.username}</p>
        <p className="message-preview">{data.messagePreview}</p>
        <p className="message-date">{data.date}</p>
      </div>
    </div>
  )
}
