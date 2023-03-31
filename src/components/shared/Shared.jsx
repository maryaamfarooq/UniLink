import React, { useState } from 'react'
import "./shared.css";
import axios from 'axios'; 
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PublicIcon from '@mui/icons-material/Public';
var jwt = require("jsonwebtoken");

export default function Shared(props) {

  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [hashtags, setHashtags] = useState([]);

  async function sendPost(postDetails) {
    try {
      // console.log(postDetails);
      const token = localStorage.getItem("token");
      //console.log(postDetails);
      // console.log(token);
      const {data} = await axios.post('http://localhost:8080/api/v1/post', postDetails, {
        headers:{
          authorization: `Bearer ${token}`
        }
      });
      // console.log(data);
      // console.log("data.desc: "+ data.newPost.desc.toString());
      // props.setPostDetails(data);
      // props.setPostDetails({
      //   createdAt: data.newPost.createdAt.toString(),
      //   createdBy: data.newPost.createdBy.toString(),
      //   desc: data.newPost.desc.toString(),
      //   hashtags: data.newPost.hashtags,
      //   likes: data.newPost.likes,
      //   _id: data.newPost._id
      // })

      // props.setPosts((prev, props) => ({
      //   posts: prev.posts.add(data.newPost)
      // }))
      // console.log("postdetails: "+props.postDetails2);
  } catch (error) {
      // console.error(error.response.data);
  }
  }

  async function createPost(e) {
    e.preventDefault();
    // console.log(desc);
    var res = await sendPost({
      desc
    });
  }

  return (
    <div className="shared">
      <div className="shareTop">
        <img className="shareProfileImg" src="assets/person/1.jpeg" alt="" />
        <input
          placeholder="Create a post"
          className="shareInput"
          name="desc"
          onChange={event => setDesc(event.target.value)} 
          value= {desc}
        />
      </div>

      <div className="shareBottom">
        <div className="shareIcon"><PublicIcon htmlColor="white"/></div>
        <div className="shareIcon"><AttachFileIcon htmlColor="white"/></div>
        <button type="submit" className="shareButton" onClick={createPost}>Post</button>
      </div>
    </div>
  );
}


