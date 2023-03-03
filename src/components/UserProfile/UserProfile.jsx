import React from 'react'
import Feed from '../feed/Feed'
import './userProfile.css'

export default function UserProfile() {
  return (
    <div className="profile">
      <div className="profileCover">
        <img
          className="profileCoverImg"
          src="assets/post/8.jpeg"
          alt=""
        />
        <img
          className="profileUserImg"
          src="assets/person/7.jpeg"
          alt=""
        />
      </div>
      <div className="profileInfo">
          <h4 className="profileInfoName">Kalsoom Waseem</h4>
          <span className="profileInfoDesc">Hello my friends!</span>
      </div>
      <div className="profileBottom">
        <div className="profileBottomTags">
          <div>Posts</div>
          <div>Friends</div>
          <div>About</div>
        </div>
          <Feed />
      </div>
    </div>
  )
}
