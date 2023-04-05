import React, {useState, useEffect} from 'react';
import {Jobs} from '../dummyJobs.js';
import Job from '../Job';
import axios from 'axios';

export default function AllJobPostings(props) {

  const [allJobs, setAllJobs] = useState([]);
  var i = 0;

  async function getAllJobs() {
    try {
      const token = localStorage.getItem("token");
      const {data} = await axios.get('http://localhost:8080/api/v1/job/', {
        headers:{
          authorization: `Bearer ${token}`
        }
      });
      const jobsArray = data.jobs;
      setAllJobs(prevJobs => [...prevJobs, ...jobsArray]);
    } catch (error) {
        console.error(error.response.data);
    }
  }

  useEffect(() => {
    console.log("displayed all jobs");
    i++;
    if (i <= 1) getAllJobs();
  }, [])

  return (
    <div>
      {allJobs && allJobs.map((j) => (
          <Job job={j} />
        ))}
    </div>
  )
}
