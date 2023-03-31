import React, { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AllJobPostings from './AllJobPostings/AllJobPostings'
import './job-postings.css'
import PostsByYou from './PostsByYou/PostsByYou';
import axios from 'axios';

export default function JobPostings(props) {

  // const [allJobs, setAllJobs] = useState({
  //   jobTitle: "",
  //   companyName: "",
  //   salary: "",
  //   keywords: [],
  //   city: "",
  //   country: "",
  //   jobDesc: "",
  //   contact: []
  // });
  // const [allJobs, setAllJobs] = useState([]);
  // var allJobs = [];

  // useEffect(() => {
  //   getAllJobs();
  // }, [])

  // async function getAllJobs() {
  //   try {
  //     const token = localStorage.getItem("token");
  //     //console.log(postDetails);
  //     // console.log(token);
  //     const {data} = await axios.get('http://localhost:8080/api/v1/job/', {
  //       headers:{
  //         authorization: `Bearer ${token}`
  //       }
  //     });
  //   //   setAllJobs({
  //   //     jobTitle: data.jobTitle,
  //   //     companyName: data.companyName,
  //   //     salary: data.salary,
  //   //     keywords: data.keywords,
  //   //     city: data.city,
  //   //     country: data.country,
  //   //     jobDesc: data.jobDesc,
  //   //     contact: data.contact
  //   // });
  //   // setAllJobs(data);
  //   const jobsArray = data.jobs;
  //     setAllJobs(prevJobs => [...prevJobs, ...jobsArray]);
  //     console.log("gotemm" + Array.isArray(jobsArray));
  //     // console.log("gotemm22" + allJobs[0].jobTitle);
  //   } catch (error) {
  //       console.error(error.response.data);
  //   }
  // }

  function goToAllJobs() {
    setCurrJobComp("allJobs");
  }

  function goToPostsByYou() {
    setCurrJobComp("postsByYou");
  }

const [currJobComp, setCurrJobComp] = useState("allJobs");

  return (
    <div className="jobPostings">

        <div className="jobs-topbar">
            <div className='jobs-topbar-div' onClick={goToAllJobs}>All job postings</div>
            <div className='jobs-topbar-div2' onClick={goToPostsByYou}>Posts by you</div>
        </div>

        <div className="jobs-search">
            <input className="jobs-search-input" placeholder="Search by title, company, or keyword..." />
            <button className="jobs-search-btn"><SearchIcon sx={{ color: "white"}}/></button>
        </div>

        <div>
          {currJobComp == "allJobs" && <AllJobPostings />}
          {currJobComp == "postsByYou" && <PostsByYou />}
        </div>
      
    </div>
  )
}
