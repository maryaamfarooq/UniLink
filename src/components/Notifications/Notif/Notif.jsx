import React from 'react'
import './notif.css'

export default function Notif({notif}) {
  return (
    <div className={notif.IsSeen? "notif-wrapper" : "notif-wrapper notif-not-seen"}>
      <div className="notif-pp">
        <img className="notif-img" src={notif.profilePicture} />
      </div>
      <div className="notif-info">
        <div className='notif-info-div'>
            <div><span className="notif-name">{notif.firstName} {notif.lastName} liked your post</span>
            {notif.post.desc && <div className="notif-post-desc" >{notif.post.desc}</div>}</div>
            {notif.post.img && <img className="notif-post-img" src={notif.post.img} />}
        </div>
      </div>
    </div>
  )
}
