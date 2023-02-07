import React, { Component, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/global.css';
import "./styles/start-page.css";

import Login from './Login';
import SignUp from './SignUp';
import ChooseAuth from './ChooseAuth';
import ConfirmEmail from './AuthEmail/ConfirmEmail';
import EnterOTP from './AuthEmail/EnterOTP';
import UserProfile from './Profile/UserProfile';
import Newsfeed from './Newsfeed';
import Homepage from './homepage/Homepage';

export default function StartPage(props) {

  const [currComponent, setCurrComponent] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function goToNewsfeed() {
    setCurrComponent("newsfeed");
    setIsLoggedIn(true);
  }

  function goToLogin() {
    setCurrComponent("login");
    setIsLoggedIn(false);
  }

  function goToSignUp() {
    setCurrComponent("signUp");
    setIsLoggedIn(false);
  }

  return (
    <>
    {!isLoggedIn && <div className="body">
        <div className="login-container">
            <div className="left-div">
                {currComponent === "login" && <Login onHandleNewsFeed={goToNewsfeed} onHandleSignUp={goToSignUp}></Login>}
                {currComponent === "signUp" && <SignUp onHandleNewsFeed={goToNewsfeed} onHandleLogin={goToLogin}></SignUp>}
            </div>
            <div className="right-div">
                <div className="right-h">
                  <h1>UnıLınk</h1>
                  <h1 className="right-h-dot">.</h1>
                  <h1 className="right-h-dot2">.</h1>
                </div>
            </div>
        </div>
    </div>}
    {/* {currComponent === "newsfeed" && isLoggedIn && <Newsfeed onHandleLogin={goToLogin}></Newsfeed>} */}
    {currComponent === "newsfeed" && isLoggedIn && <Homepage onHandleLogin={goToLogin}></Homepage>}
    </>
  )
}
