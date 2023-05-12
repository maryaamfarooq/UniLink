import React, { Component } from 'react';
// import { ChatEngine } from 'react-chat-engine';
import { useEffect, useState } from "react";
import './styles/global.css';
import "./styles/login.css";
import "./styles/signup.css";
import axios from 'axios'; 
import EnterOTP from './AuthEmail/EnterOTP';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
var jwt = require("jsonwebtoken");
// const getFile = async (url) => {
//     const response = await fetch(url);
//     const data = await response.blob();

//     return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' });
//   };


export default function SignUp(props) {

    const [componentHeading, setComponentHeading] = useState("Authorization Complete");
    const [firstPart, setFirstPart] = useState(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [department, setDepartment] = useState("");
    const [batch, setBatch] = useState("");
    const [invalid, setInvalid] = useState(false);

    const [disFirstName, setDisFirstName] = useState("");
    const [disLastName, setDisLastName] = useState("");

    var batchArr = Array.from(Array().keys())
    var departmentArr = ['SEECS (School of Electrical Engineering and Computer Science)', 'SMME (School of Mechanical and Manufacturing Engineering)', 'NICE (Nust Institute of Civil Engineering', 'SADA (School of Art Design and Architecture', 'S3H (School of Social Sciences and Humanities)', 'SCME (School of Chemical and Materials Engineering)', 'NBS (Nust Business School)', 'ASAB (Atta Ur Rehman School of Applied Biosciences)', 'NSTP (National Science and Technology Park)', 'RIMMS (Research Institute for Microwave and Milimeter-Wave Studies)', 'IAEC', 'SNS (School of Natural Sciences)', 'IGIS (Institue of Geographical Information Systems)'];
    var newDepartmentArr = departmentArr.map(dep => <option key={dep} value={dep}>{dep}</option>);

    async function handleSubmit(event) {
        event.preventDefault();
        const res = await signUpUser({
            email,
            password,
            firstName,
            lastName,
            department,
            batch
        });
        //console.log("token: " + JSON.stringify(res.data));
        // console.log(res);
        // setDisFirstName(res.firstName);
        // setDisLastName(res.lastName);
        props.onHandleSetupProfile();
    }

    async function signUpUser(credentials) {
        try {
            if(credentials.email.length < 0 && credentials.password.length < 0 && credentials.firstName.length < 0 && credentials.lastName.length < 0 && credentials.department.length < 0 && credentials.batch.length < 0 && Number(credentials.batch) < 1995 && Number(credentials.batch) > 2028) {setInvalid(true)}
            const {data} = await axios.post('http://localhost:8080/api/v1/auth/register', credentials);
            localStorage.setItem('token', data.token)
    
            const decodedToken = jwt.decode(data.token);
            console.log(decodedToken);
    
            const formdata = new FormData();
            formdata.append('username', credentials.email);
            formdata.append('secret', 'secret');
            formdata.append('first_name', credentials.firstName);
        
            // getFile('https://res.cloudinary.com/diyzgufu3/image/upload/v1682950746/Posts/WhatsApp_Image_2023-05-01_at_7.17.18_PM_c16moa.jpg')
            //   .then((avatar) => {
            //     formdata.append('avatar', avatar, avatar.name);
            axios.post('https://api.chatengine.io/users/', formdata, {
                headers: { 'Private-Key': '7f7bd096-bcaa-4ae2-b6af-7dc96a7f389a' },
            });
            //   })
            //   .catch((error) => {
            //     console.log('Error creating user:', error);
            //   });
    
        } catch (error) {
            // console.error(error.response.data);
            console.log("errorrrrr");
        }
    }

    function goToNext() {
        setComponentHeading("Complete Sign Up");
        setFirstPart(false);
    }

    function back() {
        setComponentHeading("Authorization Complete");
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
                <div className="email-div">
                    <label htmlFor="name" className="email-label">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className="email-inp" name="email"></input>
                </div>
                <div className="pass-div">
                    <label htmlFor="password" className="pass-label">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="pass-inp" name="password"></input>
                </div>
                    <button onClick={goToNext} className="sign-in-btn">Next</button>
                </>}
                {!firstPart && 
                    <>
                    <div className="name-div">
                        <div className="email-div">
                            <label htmlFor="firstName" className="email-label">First Name</label>
                            <input onChange={(e) => setFirstName(e.target.value)} value={firstName} type="text" className="pass-inp fn-inp" name="firstName"></input>
                        </div>
                        <div className="email-div">
                            <label htmlFor="lastName" className="email-label">Last Name</label>
                            <input onChange={(e) => setLastName(e.target.value)} value={lastName} type="text" className="pass-inp" name="lastName"></input>
                        </div>
                    </div>
                    <div className="email-div dp-div">
                        <label htmlFor="department" className="email-label">Department</label>
                        {/* <input onChange={(e) => setDepartment(e.target.value)} value={department} type="text" className="pass-inp" name="department"></input> */}
                        <select onChange={(e) => setDepartment(e.target.value)} className="pass-inp">
                            <option defaultValue>Select Department</option>
                            {newDepartmentArr};
                        </select>
                    </div>
                    <div className="email-div dp-div">
                        <label htmlFor="batch" className="email-label">Batch</label>
                        <input onChange={(e) => setBatch(e.target.value)} value={batch} type="number" className="pass-inp" name="batch"></input>
                    </div>
                    {invalid && <div className="error-msg">Invalid info</div>}
                    <button type="submit" className="sign-in-btn">Sign up</button>
                    </>
                }
            </form>
        </div>
        <span className="btm-sign-up">Already have an account? <button onClick={props.onHandleLogin}>Sign in</button></span>
    </div>
  )
}

