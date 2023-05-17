import React from 'react'
import './recommendations.css'

export default function Recommendations({onClick, user}) {
  return (
    <div onClick={onClick}>
    {user && <li className="recommendFriend">
        <img className="recommendFriendImg" src={user.profilePicture} />
        <span className="recommendFriendName">{user.firstName} {user.lastName}</span>
    </li>}
    </div>
  )
}
