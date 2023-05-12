import React, { useEffect } from 'react';
import "./timelinePost.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SendIcon from '@mui/icons-material/Send';
import Comment from './Comment/Comment';
import { Users } from "../../dummyData";
import axios from 'axios';
import { useState } from "react";
var jwt = require("jsonwebtoken");

export default function TimelinePost({setIsNewNotif, userInfo, post}) {

  const [like,setLike] = useState(post.likes.length)
  const [commentsArr, setCommentsArr] = useState([]);
  const [comment, setComment] = useState("");
  const [isViewComments, setIsViewComments] = useState(false);
  const [isLiked,setIsLiked] = useState(false)

  async function  likeHandler() {
    // setLike(isLiked ? like-1 : like+1)
    // setIsLiked(!isLiked)
    try {
      const token = localStorage.getItem("token");
      const {data} = await axios.put(`http://localhost:8080/api/v1/post/${post._id}/like`, null, {
        headers:{
          authorization: `Bearer ${token}`
        }
      });
      setLike(data.numLikes);
      setIsLiked(data.isLiked);
      if(setIsNewNotif) setIsNewNotif(prev => !prev);
    } catch (error) {
        console.error(error.response.data);
    }
  }

  async function commentHandler() {
    try {
    const token = localStorage.getItem("token");    
    const decodedToken = jwt.decode(token);
    const username = `${decodedToken.firstName} ${decodedToken.lastName}`;
    const profilePicture = decodedToken.profilePicture;
    setComment("");
    const {data} = await axios.post(`http://localhost:8080/api/v1/comment/${post._id}/createComment`, {
      postId: post._id,
      username: username,
      profilePicture: profilePicture,
      text: comment,
    }, {
      headers:{
        authorization: `Bearer ${token}`
      }
    });
    // console.log("COMMENTS: " + JSON.stringify(data));
    setCommentsArr(data.comments);
  } catch (error) {
      console.error(error.response.data);
  }
  }

useEffect(() => {
  const token = localStorage.getItem('token')
  const decodedToken = jwt.decode(token);
  const userId = decodedToken.userId;
  setIsLiked(post.likes.includes(userId) ? true : false);
  // console.log("POST COMMENTS: " + post.comments)
  setCommentsArr(post.comments);
}, [])

function showComments() {
  setIsViewComments(prev => !prev);
}

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <div className="post-profile-pic">
                {userInfo && <img
                    src={
                      userInfo.profilePicture
                    }
                    alt=""
                    className="post-profile-img"
                />}
                {!userInfo && <img
                    src={
                      post.profilePicture
                    }
                    alt=""
                    className="post-profile-img"
                />}
            </div>
            <div className="post-top-info">
              <span className="postUsername">
                {post.username}
              </span>
              <span className="postDate">{post.createdAt}</span>
            </div>
          </div>
          <div className="postTopRight">
            <MoreVertIcon htmlColor="grey"/>
          </div>
        </div>
        <div className="postCenter">
          <div className="postText">{post.desc}</div>
          {post.img && <div className="postImgDiv"><img className="postImg" src={post.img} alt="" /></div>}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <div className="likeIcon">
              {!isLiked && <FavoriteBorderIcon htmlColor="grey" onClick={likeHandler}></FavoriteBorderIcon>}
              {isLiked && <FavoriteIcon htmlColor="red" onClick={likeHandler}></FavoriteIcon>}
              <span className="postLikeCounter">{like}</span>
            </div>
            <div onClick={showComments} className="likeIcon">
              <ChatBubbleOutlineOutlinedIcon htmlColor="grey"></ChatBubbleOutlineOutlinedIcon>
              <span className="postLikeCounter">{commentsArr.length}</span>
            </div>
          </div>
          <div className="postBottomRight">
            <ShareOutlinedIcon htmlColor="grey"></ShareOutlinedIcon>
          </div>
        </div>
        {isViewComments && commentsArr.map((c) => (
          <Comment props={c}/>
        ))}
        <div className="postCommentDiv">
          <div className="postComment"><input className="postCommentInput" value={comment} onChange={event => setComment(event.target.value)} placeholder='Leave a comment...'/><button className="postCommentBtn" onClick={commentHandler}><SendIcon   sx={{
    ":hover": {
      color: "#7FD8BE"
    }
  }} /></button></div>
        </div>
      </div>
    </div>
  );
}
