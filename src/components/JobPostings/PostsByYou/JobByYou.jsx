import React, { useState } from 'react'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import './job-by-you.css'

export default function JobByYou({job}) {

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
      <button className="job-u-apply">View Applications</button>
    </div>
  )
}
