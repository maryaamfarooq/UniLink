import React, { useState } from 'react'
import "./shared.css";
import axios from 'axios'; 
import Upload from '../FileUpload';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CancelIcon from '@mui/icons-material/Cancel';
import PublicIcon from '@mui/icons-material/Public';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
var jwt = require("jsonwebtoken");

export default function Shared(props) {

  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [hashtags, setHashtags] = useState([]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function sendPost(postDetails) {
    try {
      const token = localStorage.getItem("token");
      const {data} = await axios.post('http://localhost:8080/api/v1/post', postDetails, {
        headers:{
          authorization: `Bearer ${token}`
        }
      });
      setDesc("");
      setImg(null);
  } catch (error) {
      console.error(error.response.data);
  }
  }

  async function createPost(e) {
    e.preventDefault();
    // console.log(desc);
    const username = props.username;
    const profilePicture = props.profilePicture;
    if(desc.length > 0 || img.length > 0) {
    var res = await sendPost({
      desc,
      img,
      username,
      profilePicture,
    });}
  }

  function removeImg() {
    setImg(null);
  }

  return (
    <>
    <div className="shared">
      <div className="shareTop">
        <img className="shareProfileImg" src={props.profilePicture} alt="" />
        <input
          placeholder="Create a post"
          className="shareInput"
          name="desc"
          onChange={event => setDesc(event.target.value)} 
          value= {desc}
        />
      </div>
      {img && <div className="share-preview-img-div"><div className="share-preview-img-div2">
        <CancelIcon onClick={removeImg} style={{ color: 'white' }} className="share-cancel-img" />
        <img value={img} className="share-preview-img" src={img} />
        </div></div>}
      <div className="shareBottom">
        <div className="shareIcon"><PublicIcon htmlColor="white"/></div>
        <div onClick={handleClickOpen} className="shareIcon"><AttachFileIcon htmlColor="white"/></div>
        <button type="submit" className="shareButton" onClick={createPost}>Post</button>
      </div>
    </div>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Image</DialogTitle>
      <DialogContent>
        <div>
          {/* <input /> */}
          <Upload open={open} setOpen={handleClose} setImg={setImg}/>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}


