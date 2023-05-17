import React from 'react'
import Button from '@mui/material/Button';
import './job-application.css'

export default function JobApplication({application}) {
  return (
    <div className="job-app-div">
      <div className="job-app-name">Name: {application.name}</div>  
      <div className="job-app-contact">Contact: {application.contact}</div>
      {/* <div className="job-app-resume">Resume: {application.resume}</div> */}
      <div className="job-app-resume">Resume: 
        <Button size="small" component="label">
          <a className="job-app-a" href={application.resume} target="_blank" download>
            Download
          </a>
        </Button></div>
      
    </div>
  )
}
