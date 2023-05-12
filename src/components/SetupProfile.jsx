import React, { Component } from 'react';
import { useEffect, useState } from "react";
import './styles/global.css';
import "./styles/login.css";
import "./styles/signup.css";
import './styles/setup-profile.css';
import './styles/confirm-email.css';
import axios from 'axios'; 
import EnterOTP from './AuthEmail/EnterOTP';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Upload from './FileUpload';
// import { FileUpload } from '@mui/icons-material';
var jwt = require("jsonwebtoken");

export default function SetupProfile(props) {

    const [open, setOpen] = useState(false);
    const [pp, setPp] = useState("");
    const [cp, setCp] = useState("");
    const [location, setLocation] = useState("");
    const [desc, setDesc] = useState("");
    const [employment, setEmployment] = useState("");
    const [category, setCategory] = useState("");

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [componentHeading, setComponentHeading] = useState("Account Created!");
    const [firstPart, setFirstPart] = useState(true);

    async function handleSubmit(event) {
        event.preventDefault();
        const info = {
            "profilePicture": pp,
            "coverPicture": cp,
            "desc": desc,
            "city": location,
            "employment": employment,
            "category": category
        }
        console.log("INFO: " + JSON.stringify(info))
        try {
            const token = localStorage.getItem("token");
            const {data} = await axios.put(`http://localhost:8080/api/v1/user/signup/completeSignup`, info, {
            headers:{
              authorization: `Bearer ${token}`
            }
            });
            console.log(JSON.stringify(data))
            props.onHandleNewsFeed();
        }
        catch(error) {
            console.log(error);
        }
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
            <div className="form">
                {/* {!firstPart && <button className="back-btn" onClick={back}>Back</button>} */}
                {!firstPart && <div className="signup-back-arrow-div"><div onClick={back} className="signup-back-arrow-div2"><ArrowBackIcon htmlColor="#7FD8BE" /></div></div>}
                <div className="setup-heading">{componentHeading}</div>
                {firstPart && <>
                <div className="btn-div">
                    <button onClick={goToNext} className="next-btn"><span className="next">Next</span><span className="gt">&gt;</span></button>
                </div>
                </>}
                {!firstPart && 
                    <>
                    <div>
                        Profile Picture
                        <Upload open={open} setOpen={handleClose} setImg={setPp}/>
                    </div>
                    <div>
                        Cover Picture
                        <Upload open={open} setOpen={handleClose} setImg={setCp}/>
                    </div>
                    <div className="row"><div>
                        <input className="setup-pass-inp" onChange={event => setLocation(event.target.value)} value={location} placeholder='Location' />
                    </div>
                    <div>
                        <input className="setup-pass-inp" onChange={event => setDesc(event.target.value)} value={desc} placeholder='Description' />
                    </div></div>
                    <div className="row"><div>
                        <input className="setup-pass-inp" onChange={event => setEmployment(event.target.value)} value={employment} placeholder='Employment' />
                    </div>
                    <select className="setup-pass-inp setup-select" onChange={event => setCategory(event.target.value)}required>
                        <option defaultValue>Select Category</option>
                        <option value="Student">Student</option>
                        <option value="Alumni">Alumni</option>
                        <option value="Faculty">Faculty</option>
                    </select></div>
                    <button onClick={handleSubmit} type="submit" className="sign-in-btn">Complete</button>
                    </>
                }
            </div>
        </div>
        <span className="btm-sign-up">Already have an account? <button onClick={props.onHandleLogin}>Sign in</button></span>
    </div>
  )
}

