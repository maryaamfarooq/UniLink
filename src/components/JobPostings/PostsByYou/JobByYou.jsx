import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import JobApplication from './JobApplication';
import axios from 'axios'; 
import './job-by-you.css'

export default function JobByYou({job}) {

  const [open, setOpen] = useState(false);
  // const [allApplications, setAllApplications] = useState([
  //   {
  //     name: "Maryam",
  //     contact: "0316-5816865",
  //     resume: "https://mrsmeganparrish.weebly.com/uploads/3/8/0/5/38056115/the_kite_runner.pdf"
  //   }
  // ])  
  const [allApplications, setAllApplications] = useState([])

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  async function getApplications() {
    handleOpen();
    const token = localStorage.getItem("token");
    try {
      const {data} = await axios.get(`http://localhost:8080/api/v1/application/${job._id}/viewApplicants`, {
        headers:{
          authorization: `Bearer ${token}`,
        }
       });
       setAllApplications(data.applications);
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <div className="job-u-container">
      <img className="job-u-img" src={job.image}></img>
      {/* <img className="job-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg/1200px-M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg"></img> */}
      <div>
        <div className="job-u-title">{job.jobTitle}</div>
        <div className="job-u-comp">{job.companyName}</div>
        <div className="job-u-comp">{job.salary}</div>
      </div>
      <div className="job-u-app">
        {/* {job.applicantsNo} applicants */}
        20 applicants
      </div>
      <div>
        <div className='job-u-city'>{job.city}</div>
        <div className='job-u-country'>{job.country}</div>
      </div>
      <div className="job-u-date">{job.createdAt.slice(0,10)}</div>
      <button onClick={getApplications} className="job-u-apply">View Applications</button>

      <Dialog open={open} handleClose={handleClose}>
        <DialogTitle>Applications</DialogTitle>
        <DialogContent>
        {allApplications && allApplications.map((p) => (
          <JobApplication application={p} />
        ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}
