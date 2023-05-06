import React from 'react';
import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Users } from "../../dummyData";
import { useState } from "react";

export default function Post(props) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like,setLike] = useState(props.post.likes.length)
  const [isLiked,setIsLiked] = useState(false)

  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <div className="post-profile-pic">
                <img
                    src={
                        props.user.profilePicture
                    }
                    alt=""
                    className="post-profile-img"
                />
            </div>
            <div className="post-top-info">
              <span className="postUsername">
                {props.user.firstName}
              </span>
              <span className="postDate">{props.post.createdAt}</span>
            </div>
          </div>
          <div className="postTopRight">
            <MoreVertIcon htmlColor="grey"/>
          </div>
        </div>
        <div className="postCenter">
          <div className="postText">{props.post.desc}</div>
          {props.post.img && <div className="postImgDiv"><img className="postImg" src={props.post.img} alt="" /></div>}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {/* <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" /> */}
            <div className="likeIcon">
              {!isLiked && <FavoriteBorderIcon htmlColor="grey" onClick={likeHandler}></FavoriteBorderIcon>}
              {isLiked && <FavoriteIcon htmlColor="red" onClick={likeHandler}></FavoriteIcon>}
              <span className="postLikeCounter">{like}</span>
            </div>
            {/* <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" /> */}
            <div className="likeIcon">
              <ChatBubbleOutlineOutlinedIcon htmlColor="grey"></ChatBubbleOutlineOutlinedIcon>
              <span className="postLikeCounter">{like}</span>
            </div>
          </div>
          <div className="postBottomRight">
            {/* <span className="postCommentText">{post.comment} comments</span> */}
            <ShareOutlinedIcon htmlColor="grey"></ShareOutlinedIcon>
          </div>
        </div>
      </div>
    </div>
  );
}
