import React, { useState } from 'react';
import { redirect } from "react-router-dom";
import './styles/global.css';
import "./styles/login.css";
import UserProfile from './UserProfile/UserProfile';
import axios from 'axios';
var jwt = require("jsonwebtoken");

export default function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState('');
    const [loginFail, setLoginFail] = useState(false);
    const [loginStatus, setLoginStatus] = useState(200)

    async function loginUser(credentials) {
        try {
            // console.log(credentials);
            const {data} = await axios.post('http://localhost:8080/api/v1/auth/login', credentials);
            // console.log("DATA:" + data);
            if(data.token) {
                localStorage.setItem('token', data.token)
                // const decodedToken = jwt.decode(data.token);
                // props.setUsername(`${decodedToken.firstName} ${decodedToken.lastName}`);
                // console.log(decodedToken);
                // console.log(decodedToken.userId);
                // console.log(decodedToken.name);
                setLoginFail(false);
                return true;
            }
            // console.log("bhbnj"+data);
            return false;
        } catch (error) {
            setLoginStatus(error.response.status);
            setLoginFail(true);
            // console.error("ERROR: "+error.response.status);
        }
    }

    async function verifyLogin(e) {
        e.preventDefault();
        var res = await loginUser({
            email,
            password
        });
        if(res) {
            props.onHandleNewsFeed();
        } 
        // props.onHandleNewsFeed();
    }

  return (
    <div>
        <div className="form-div">
            <form className="form">
                <h1>Welcome Back!</h1>
                <div className="email-div">
                    <label className="email-label">Email</label>
                    <input type="text" className="email-inp" name="email" onChange={event => setEmail(event.target.value)} value={email}></input>
                </div>
                <div className="pass-div">
                    <label className="pass-label">Password</label>
                    <input type="password" className="pass-inp" name="password" onChange={event => setPassword(event.target.value)} value={password}></input>
                </div>
                <div className="form-btm-div">
                    <div>
                        <input className="check-inp" type="checkbox" name="remember-me" onChange={event => setRememberMe(event.target.value)} value={rememberMe}></input>
                        <label>Remember me</label>
                    </div>
                    <a href="">Forgot Password?</a>
                </div>
                {loginFail && loginStatus === 400 && <h4 className="login-fail">Please fill in your credentials</h4>}
                {loginFail && loginStatus != 400 && <h4 className="login-fail">Invalid credentials</h4>}
                <button type="submit" onClick={verifyLogin} className="sign-in-btn">Sign in</button>
            </form>
        </div>
        <span className="btm-sign-up">Don't have an account? <button onClick={props.onHandleChooseAuth}>Sign up</button></span>
    </div>
  )
}

