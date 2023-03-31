import React, { Component, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/global.css';
import "./styles/start-page.css";

import Login from './Login';
import SignUp from './SignUp';
import ChooseAuth from './ChooseAuth';
import ConfirmEmail from './AuthEmail/ConfirmEmail';
import EnterOTP from './AuthEmail/EnterOTP';
import UserProfile from './UserProfile/UserProfile';
import Newsfeed from './Newsfeed';
import Homepage from './homepage/Homepage';
import Profile from './profile/Profile';
import Topbar from './topbar1/Topbar';
import Sidebar from './sidebar/Sidebar';
import Rightbar from './rightbar/Rightbar';
import Messages from './messages/Messages';
import JobPostings from './JobPostings/JobPostings';

export default function StartPage(props) {

  const [currComponent, setCurrComponent] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [username, setUsername] = useState("");

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

  function goToProfile() {
    setCurrComponent("profile");
  }

  function goToJobs() {
    setCurrComponent("jobs");
  }

  return (
    <>
    {!isLoggedIn && <div className="body">
        <div className="login-container">
            <div className="left-div">
                {currComponent === "login" && <Login setUsername={setUsername} onHandleNewsFeed={goToNewsfeed} onHandleSignUp={goToSignUp}></Login>}
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

    {isLoggedIn && <><Topbar onHandleProfile={goToProfile} /><div className="cont">
        <Sidebar onHandleNewsFeed={goToNewsfeed} onHandleJobs={goToJobs} onHandleLogin={goToLogin} />
        {currComponent === "newsfeed" && <Homepage currComponent={currComponent}></Homepage>}
        {currComponent === "profile" && <UserProfile username={username}></UserProfile>}
        {currComponent === "jobs" && <JobPostings></JobPostings>}
        <Messages />
      </div></>}

{/* {true && <><Topbar onHandleProfile={goToProfile} /><div className="cont">
        <Sidebar onHandleNewsFeed={goToNewsfeed} onHandleJobs={goToJobs} onHandleLogin={goToLogin} />
        {currComponent === "newsfeed" && <Homepage currComponent={currComponent}></Homepage>}
        {currComponent === "profile" && <UserProfile username={username}></UserProfile>}
        {currComponent === "jobs" && <JobPostings></JobPostings>}
        <Messages />
      </div></>} */}

    </>
  )
}
