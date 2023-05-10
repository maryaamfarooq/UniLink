import React from 'react'
import './comment.css'

export default function Comment({props}) {
  return (
    <div className="comment-wrapper">
      <div className="comment-img-div">
        <img className="comment-img" src={props.profilePicture} />
      </div>
      <div className="comment-text-div">
        <div className="comment-username">{props.username}</div>
        <p className="comment-text">{props.text}</p>
        <div className="comments-time">{props.createdAt}</div>
      </div>
    </div>
  )
}
