import React, {useState, useEffect} from 'react'
import './posts-by-you.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import JobByYou from './JobByYou';
import axios from 'axios'; 
import Upload from '../../FileUpload';

export default function PostsByYou() {

    const [open, setOpen] = React.useState(false);
    const [image, setImage] = useState();
    const [jobTitle, setJobTitle] = useState();
    const [companyName, setCompanyName] = useState();
    const [jobDesc, setJobDesc] = useState();
    const [keywords, setKeywords] = useState([]);
    const [salary, setSalary] = useState();
    const [city, setCity] = useState();
    const [country, setCountry] = useState();
    const [contact, setContact] = useState([]);

    const [allJobs, setAllJobs] = useState([]);
    var i  = 0;

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    async function sendJobPost(jobDetails) {
      try {
        const token = localStorage.getItem("token");
        //console.log(postDetails);
        // console.log(token);
        // console.log(jobDetails);
        const {data} = await axios.post('http://localhost:8080/api/v1/job/', jobDetails, {
          headers:{
            authorization: `Bearer ${token}`
          }
        });
      } catch (error) {
          console.error(error.response.data);
      }
    }

    async function postJob(e) {
      handleClose();
      e.preventDefault();
      var res = await sendJobPost({
        image,
        jobTitle,
        companyName,
        jobDesc,
        keywords,
        salary,
        city,
        country,
        contact,
      });
    }

    async function getAllJobs() {
      try {
        const token = localStorage.getItem("token");
        const {data} = await axios.get('http://localhost:8080/api/v1/job/getUserJobs/', {
          headers:{
            authorization: `Bearer ${token}`
          }
        });
        const jobsArray = data.userJobs;
        setAllJobs(prevJobs => [...prevJobs, ...jobsArray]);
        console.log(JSON.stringify(jobsArray));
      } catch (error) {
          console.error(error.response.data);
      }
    }
  
    useEffect(() => {
      i++;
      if (i <= 1) getAllJobs();
    }, [])

  return (
    <div className="posts-by-you-cont">
      <button onClick={handleClickOpen} className="jobs-fab">+</button>

      {allJobs && allJobs.map((j) => (
          <JobByYou job={j} />
        ))}


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Post Job</DialogTitle>
        <DialogContent>
          <div className="post-job-form">
          {/* <TextField
            autoFocus
            margin="dense"
            id="img"
            label="Upload Image"
            fullWidth
            variant="standard"
            onChange={event => setImage(event.target.value)} 
          /> */}
          <Upload setImg={setImage} />
            <div className="post-job-form-row">
          <TextField
            autoFocus
            margin="dense"
            id="job-title"
            label="Job Title"
            fullWidth
            variant="standard"
            onChange={event => setJobTitle(event.target.value)} 
            required
            // value= {jobTitle}
          />
          <div className="gap"></div>
          <TextField
           autoFocus
           margin="dense"
           id="company-name"
           label="Company Name"
           fullWidth
           variant="standard"
           onChange={event => setCompanyName(event.target.value)} 
           required
          //  value= {companyName}
         />
          </div>
          <TextField
           autoFocus
           margin="dense"
           id="job-desc"
           label="Job Description"
           fullWidth
           variant="standard"
           onChange={event => setJobDesc(event.target.value)} 
           required
           multiline
          //  value= {jobDesc}
         />
         <div className="post-job-form-row">
         <TextField
          className='margin-right'
          autoFocus
          margin="dense"
          id="keywords"
          label="Keywords"
          type="email"
          fullWidth
          variant="standard"
          onChange={event => setKeywords(event.target.value)} 
          // value= {keywords}
        />
        <div className="gap"></div>
        <TextField
         autoFocus
         margin="dense"
         id="salary"
         label="Salary Range"
         fullWidth
         variant="standard"
         onChange={event => setSalary(event.target.value)} 
        //  value= {salary}
       />
       </div>
       <div className="post-job-form-row">
       <TextField
          className='margin-right'
        autoFocus
        margin="dense"
        id="city"
        label="City"
        fullWidth
        variant="standard"
        onChange={event => setCity(event.target.value)} 
        // value= {city}
      />
      <div className="gap"></div>
      <TextField
       autoFocus
       margin="dense"
       id="country"
       label="Country"
       fullWidth
       variant="standard"
       onChange={event => setCountry(event.target.value)} 
      //  value= {country}
     />
     </div>
     <TextField
      autoFocus
      margin="dense"
      id="contact"
      label="Contact Info"
      fullWidth
      variant="standard"
      onChange={event => setContact(event.target.value)} 
      // value= {contact}
    />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={postJob}>Post</Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}
