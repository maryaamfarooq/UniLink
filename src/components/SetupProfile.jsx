import React, { Component } from 'react';
import { useEffect, useState } from "react";
import './styles/global.css';
import "./styles/login.css";
import "./styles/signup.css";
import axios from 'axios'; 
import EnterOTP from './AuthEmail/EnterOTP';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
        setComponentHeading("Account Created");
        setFirstPart(true);
    }

  return (
    <div>
        <div className="form-div">
            <form onSubmit={handleSubmit} className="form">
                {/* {!firstPart && <button className="back-btn" onClick={back}>Back</button>} */}
                {!firstPart && <div className="signup-back-arrow-div"><div onClick={back} className="signup-back-arrow-div2"><ArrowBackIcon htmlColor="#7FD8BE" /></div></div>}
                <h1>{componentHeading}</h1>
                {firstPart && <>
                    <button onClick={goToNext} className="sign-in-btn">Next</button>
                </>}
                {!firstPart && 
                    <>
                    <button type="submit" className="sign-in-btn">Sign up</button>
                    </>
                }
            </form>
        </div>
        <span className="btm-sign-up">Already have an account? <button onClick={props.onHandleLogin}>Sign in</button></span>
    </div>
  )
}

