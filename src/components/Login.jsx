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

    async function loginUser(credentials) {
        try {
            // console.log(credentials);
            const {data} = await axios.post('http://localhost:8080/api/v1/auth/login', credentials);
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
            setLoginFail(true);
            // console.log("bhbnj"+data);
            return false;
        } catch (error) {
            // console.error(error.response.data);
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
                {loginFail && <h4>Invalid login details</h4>}
                <button type="submit" onClick={verifyLogin} className="sign-in-btn">Sign in</button>
            </form>
        </div>
        <span className="btm-sign-up">Don't have an account? <button onClick={props.onHandleChooseAuth}>Sign up</button></span>
    </div>
  )
}

