import React, { useState } from 'react'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import './job.css'
import { useEffect } from 'react';
import axios from 'axios'; 

export default function Job({job}) {

const [isSaved, setIsSaved] = useState(false)
const [openApply, setOpenApply] = useState(false);
const [applicantName, setApplicantName] = useState("");
const [applicantContact, setApplicantContact] = useState("");
const [applicantResume, setApplicantResume] = useState("");

function handleClose() {
  setOpenApply(false);
}

function saveJob() {
  setIsSaved(!isSaved);
}

async function uploadResume(r) {
  // console.log("EVENT: " + r.files[0])
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append('file',r)
  try {
    const {data:{file:{src}}} = await axios.post('http://localhost:8080/api/v1/post/uploadsFile', formData,{
      headers:{
        authorization: `Bearer ${token}`,
       'Content-Type':'multipart/form-data'
      }
     });
    if (src) setApplicantResume(src);
    else setApplicantResume("");
  } catch (error) {
      console.error(error);
  }
}

async function applyJob() {
  handleClose();  
  const token = localStorage.getItem("token");
  const jobDetails = {
    "name": applicantName,
    "contact": applicantContact,
    "resume": applicantResume,
    "jobId": job._id
  }
  try {
    const {data} = await axios.post(`http://localhost:8080/api/v1/application/${job._id}/createApplication`, jobDetails, {
      headers:{
        authorization: `Bearer ${token}`,
      }
     });
  } catch (error) {
      console.error(error);
  }
}

  return (
    <div className="job-container">
      <img className="job-img" src={job.image}></img>
      {/* <img className="job-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg/1200px-M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg"></img> */}
      <div className="job-div1">
        <div className="job-title">{job.jobTitle}</div>
        {/* <div className="job-title">1h</div> */}
        <div className="job-comp">{job.companyName}</div>
        <div className="job-comp">{job.salary}</div>
      </div>
      <div className="job-div2">
        {job.keywords.map((k) => (
        <div className="job-keyword">{k}</div>
        ))}
      </div>
      <div className="job-div3">
        <div className='job-city'>{job.city}</div>
        <div className='job-country'>{job.country}</div>
      </div>
      <div className="job-div4">{job.createdAt.slice(0,10)}</div>
      {/* <div className="job-div4">1h</div> */}
      <div className="job-div5"><button onClick={() => {setOpenApply(true)}} className="job-apply">Apply</button></div>
      <div onClick={saveJob} className='job-save'>
        {!isSaved && <BookmarkBorderOutlinedIcon/>}
        {isSaved && <BookmarkIcon/>}
        </div>

        <Dialog open={openApply} onClose={handleClose}>
        <DialogTitle>Post Job</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="applicant-name"
            label="Applicant Name"
            type="text"
            fullWidth
            onChange={(e) => setApplicantName(e.target.value)}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="applicant-contact"
            label="Contact Info"
            type="text"
            fullWidth
            onChange={(e) => setApplicantContact(e.target.value)}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="applicant-resume"
            label="Resume"
            InputLabelProps={{ shrink: true }} 
            type="file"
            fullWidth
            // value={applicantResume}
            onChange={(e) => uploadResume(e.target.files[0])}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {applicantResume.length > 0 && applicantName.length > 0 && applicantContact.length > 0 ? <Button onClick={applyJob}>Post</Button> : <Button disabled>Post</Button>}
        </DialogActions>
      </Dialog>

    </div>
  )
}
