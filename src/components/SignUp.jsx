import React, { Component } from 'react';
import { useEffect, useState } from "react";
import './styles/global.css';
import "./styles/login.css";
import "./styles/signup.css";
import axios from 'axios'; 
import EnterOTP from './AuthEmail/EnterOTP';

async function signUpUser(credentials) {
    try {
        console.log(credentials);
        const {data} = await axios.post('http://localhost:8080/api/v1/auth/register', credentials);
        //return await axios.post('http://localhost:8080/api/v1/auth/register', credentials);
        localStorage.setItem('token', data.token)
        //console.log(localStorage.getItem('token'));
        console.log("bhbnj"+data.email);
    } catch (error) {
        // console.error(error.response.data);
        console.log("errorrrrr");
    }
}

export default function SignUp(props) {

    const [componentHeading, setComponentHeading] = useState("Authorization Complete");
    const [firstPart, setFirstPart] = useState(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [department, setDepartment] = useState("");
    const [batch, setBatch] = useState("");

    const [disFirstName, setDisFirstName] = useState("");
    const [disLastName, setDisLastName] = useState("");

    var batchArr = Array.from(Array().keys())
    var departmentArr = ["SEECS (School of Electrical Engineering and Computer Science)", "SMME", "SADA"];
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
        props.onHandleNewsFeed();
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
                {!firstPart && <button className="back-btn" onClick={back}>Back</button>}
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
                            <option selected>Select Department</option>
                            {newDepartmentArr};
                        </select>
                    </div>
                    <div className="email-div dp-div">
                        <label htmlFor="batch" className="email-label">Batch</label>
                        <input onChange={(e) => setBatch(e.target.value)} value={batch} type="number" className="pass-inp" name="batch"></input>
                    </div>
                    <button type="submit" className="sign-in-btn">Sign up</button>
                    </>
                }
            </form>
        </div>
        <span className="btm-sign-up">Already have an account?<button onClick={props.onHandleLogin}>Sign in</button></span>
    </div>
  )
}

