import React, { Component } from 'react';
import { useEffect, useState } from "react";
import './styles/global.css';
import "./styles/login.css";
import "./styles/signup.css";
import './styles/setup-profile.css';
import axios from 'axios'; 
import EnterOTP from './AuthEmail/EnterOTP';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Upload from './FileUpload';
// import { FileUpload } from '@mui/icons-material';
var jwt = require("jsonwebtoken");

async function signUpUser(credentials) {
    try {
        console.log(credentials);
        // const {data} = await axios.post('http://localhost:8080/api/v1/auth/register', credentials);
        // localStorage.setItem('token', data.token)
    } catch (error) {
        // console.error(error.response.data);
        console.log("errorrrrr");
    }
}

export default function SetupProfile(props) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [componentHeading, setComponentHeading] = useState("Account Created");
    const [firstPart, setFirstPart] = useState(true);

    async function handleSubmit(event) {
        event.preventDefault();
        const res = await signUpUser({

        });
        props.onHandleNewsFeed();
    }

    function goToNext() {
        setComponentHeading("Setup Profile");
        setFirstPart(false);
    }

    function back() {
        setComponentHeading("Account Created!");
        setFirstPart(true);
    }

  return (
    <div>
        <div className="form-div">
            <form onSubmit={handleSubmit} className="form">
                {/* {!firstPart && <button className="back-btn" onClick={back}>Back</button>} */}
                {!firstPart && <div className="signup-back-arrow-div"><div onClick={back} className="signup-back-arrow-div2"><ArrowBackIcon htmlColor="#7FD8BE" /></div></div>}
                <div className="setup-heading">{componentHeading}</div>
                {firstPart && <>
                    <button onClick={goToNext} className="sign-in-btn">Next</button>
                </>}
                {!firstPart && 
                    <>
                    <div>
                        Profile Picture
                        <Upload open={open} setOpen={handleClose}/>
                    </div>
                    <div>
                        Cover Picture
                        <Upload open={open} setOpen={handleClose}/>
                    </div>
                    <div>
                        <input placeholder='Location' />
                    </div>
                    <div>
                        <input placeholder='Description' />
                    </div>
                    <div>
                        <input placeholder='Employment' />
                    </div>
                    <select>
                        <option>Select Category</option>
                        <option>Student</option>
                        <option>Alumni</option>
                        <option>Faculty</option>
                    </select>
                    <button onClick={props.onHandleNewsFeed} type="submit" className="sign-in-btn">Complete Sign up</button>
                    </>
                }
            </form>
        </div>
        <span className="btm-sign-up">Already have an account? <button onClick={props.onHandleLogin}>Sign in</button></span>
    </div>
  )
}

