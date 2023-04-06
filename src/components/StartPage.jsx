import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/global.css';
import "./styles/start-page.css";

import Login from './Login';
import SignUp from './SignUp';
import ChooseAuth from './ChooseAuth';
import AuthCard from './AuthCard';
import ConfirmEmail from './AuthEmail/ConfirmEmail';
import EnterOTP from './AuthEmail/EnterOTP';
import UserProfile from './UserProfile/UserProfile';
import Homepage from './homepage/Homepage';
import Topbar from './topbar1/Topbar';
import Sidebar from './sidebar/Sidebar';
import Messages from './messages/Messages';
import JobPostings from './JobPostings/JobPostings';
import AllEventsPostings from './Events/AllEventsPostings';
var jwt = require("jsonwebtoken");

export default function StartPage(props) {

  const [currComponent, setCurrComponent] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState();
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    if(localStorage.getItem("token")) goToNewsfeed();
  }, [])

  useEffect(() => {
    console.log("pp: "+ profilePicture);
  }, [profilePicture])

  function goToNewsfeed() {
    const token = localStorage.getItem('token')
    const decodedToken = jwt.decode(token);
    setUsername(`${decodedToken.firstName} ${decodedToken.lastName}`);
    setUserId(`${decodedToken.userId}`);
    setProfilePicture(`${decodedToken.profilePicture}`);
    setIsLoggedIn(true);
    setCurrComponent("newsfeed");
  }

  function goToLogin() {
    localStorage.setItem("token", "");
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

  function goToChooseAuth() {
    setCurrComponent("chooseAuth");
  }

  function goToAuthCard() {
    setCurrComponent("authCard");
  }

  function goToAuthEmail() {
    setCurrComponent("authEmail");
  }

  function goToEnterOTP() {
    setCurrComponent("enterOTP");
  }

  function goToEvents() {
    setCurrComponent("events");
  }

  return (
    <>
    {!isLoggedIn && <div className="body">
        <div className="login-container">
            <div className="left-div">
                {currComponent === "login" && <Login setUsername={setUsername} onHandleNewsFeed={goToNewsfeed} onHandleChooseAuth={goToChooseAuth}></Login>}
                {currComponent === "chooseAuth" && <ChooseAuth onHandleAuthCard={goToAuthCard} onHandleAuthEmail={goToAuthEmail}></ChooseAuth>}
                {currComponent === "authEmail" && <ConfirmEmail onHandleLogin={goToLogin} onHandleEnterOTP={goToEnterOTP}></ConfirmEmail>}
                {currComponent === "authCard" && <AuthCard onHandleChooseAuth={goToChooseAuth} onHandleLogin={goToLogin}></AuthCard>}
                {currComponent === "enterOTP" && <EnterOTP onHandleLogin={goToLogin} onHandleSignUp={goToSignUp}></EnterOTP>}
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

    {isLoggedIn && <><Topbar profilePicture={profilePicture} onHandleLogin={goToLogin} onHandleProfile={goToProfile} /><div className="cont">
        <Sidebar onHandleNewsFeed={goToNewsfeed} onHandleJobs={goToJobs} onHandleLogin={goToLogin} onHandleEvents={goToEvents} />
        {currComponent === "newsfeed" && <Homepage username={username} profilePicture={profilePicture} currComponent={currComponent}></Homepage>}
        {currComponent === "profile" && <UserProfile userId={userId} username={username}></UserProfile>}
        {currComponent === "jobs" && <JobPostings></JobPostings>}
        {currComponent === "events" && <AllEventsPostings />}
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
