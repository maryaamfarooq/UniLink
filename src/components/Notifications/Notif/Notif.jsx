import React from 'react'
import './notif.css'

export default function Notif({notif}) {
  return (
    <div>
    <div className="notif-wrapper">
      <div className="notif-pp">
        <img className="notif-img" src={notif.profilePicture} />
      </div>
      <div className="notif-info">
        <div><span className="notif-name">{notif.text}</span></div>
      </div>
    </div>
    </div>
  )
}
