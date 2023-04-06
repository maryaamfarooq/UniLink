import React, { useState } from 'react'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import './job.css'

export default function Job({job}) {

const [isSaved, setIsSaved] = useState(false)

function saveJob() {
  setIsSaved(!isSaved);
}

  return (
    <div className="job-container">
      <img className="job-img" src={job.image}></img>
      {/* <img className="job-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg/1200px-M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg"></img> */}
      <div className="job-div1">
        <div className="job-title">{job.jobTitle}</div>
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
      <div className="job-div4">{job.createdAt}</div>
      <div className="job-div5"><button className="job-apply">Apply</button></div>
      <div onClick={saveJob} className='job-save'>
        {!isSaved && <BookmarkBorderOutlinedIcon/>}
        {isSaved && <BookmarkIcon/>}
        </div>
    </div>
  )
}
