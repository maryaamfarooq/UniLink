import React from 'react'
import Post from "../post/Post";
import { Posts } from "../../dummyData";
import './userProfile.css'

export default function UserProfile(props) {
  return (
    <div className="profile">
      <div className="profileCover">
        <img
          className="profileCoverImg"
          src="assets/post/8.jpeg"
          alt=""
        />
      </div>
      <div className="profileInfo">
          <img
            className="profileUserImg"
            src="assets/person/7.jpeg"
            alt=""
          />
          <div  className="profileDetails">
          <span className="profileName"><h4 className="profileInfoName">{props.username}</h4><span className="profileSeperator">&middot;</span><span className="userType">Alumni</span></span>
          <span className="profileBatch"><span>SEECS</span><span className="profileSeperator">&middot;</span><span>2022</span></span>
          <span className="profileInfoDesc">Hello my friends!</span>
          </div>
      </div>
      <div className="profileBottom">
        <div className="profileBottomTags">
          <div>Posts</div>
          <div>Friends</div>
          <div>About</div>
        </div>
        {/* {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))} */}
      </div>
    </div>
  )
}
