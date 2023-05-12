import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/global.css';
import "./styles/start-page.css";
import axios from 'axios'; 

import Login from './Login';
import SignUp from './SignUp';
import ChooseAuth from './ChooseAuth';
import AuthCard from './AuthCard';
import ConfirmEmail from './AuthEmail/ConfirmEmail';
import EnterOTP from './AuthEmail/EnterOTP';
import UserProfile from './UserProfile/UserProfile';
import Homepage from './homepage/Homepage';
import Topbar from './topbar/Topbar';
import Sidebar from './sidebar/Sidebar';
import Messages from './messages/Messages';
import JobPostings from './JobPostings/JobPostings';
import AllEventsPostings from './Events/AllEventsPostings';
import Conversation from './messages/Conversation';
import Search from './Search/Search';
import ViewUserProfile from './ViewUserProfile/ViewUserProfile';
import SetupProfile from './SetupProfile';
var jwt = require("jsonwebtoken");

export default function StartPage(props) {

  const [currComponent, setCurrComponent] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState();
  const [profilePicture, setProfilePicture] = useState("");
  const [conversationFriend, setConversationFriend] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewUserProfileId, setViewUserProfileId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isNewNotif, setIsNewNotif] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if(localStorage.getItem("token")) {
      const token = localStorage.getItem('token')
      const decodedToken = jwt.decode(token);
      setUsername(`${decodedToken.firstName} ${decodedToken.lastName}`);
      setUserId(decodedToken.userId);
      setUserEmail(decodedToken.email);
      setIsLoggedIn(true);
      async function getUser() {
        try {
          const {data} = await axios.get(`http://localhost:8080/api/v1/user/${decodedToken.userId}`, {
            headers:{
              authorization: `Bearer ${token}`
            }
          });
          const userObj = data;
          setProfilePicture(userObj.user.profilePicture);
          // console.log("user: "+JSON.stringify(userObj));
        } catch (error) {
          console.error(error);
        }
      }
      getUser();
      goToNewsfeed()
    };
  }, [])

  function goToNewsfeed() {
    if(localStorage.getItem("token")) {
    const token = localStorage.getItem('token')
    const decodedToken = jwt.decode(token);
    setUsername(`${decodedToken.firstName} ${decodedToken.lastName}`);
    setUserId(decodedToken.userId);
    setUserEmail(decodedToken.email);
    setIsLoggedIn(true);
    setCurrComponent("newsfeed");
    }
  }

  function goToNewsfeed2() {
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

  function goToConversation() {
    setCurrComponent("conversation");
  }

  function goToSearch() {
    setCurrComponent("search");
  }

  function goToMessenger() {
    setCurrComponent("messenger");
  }

  function goToViewUserProfile(userInfo) {
    setViewUserProfileId(userInfo);
    setCurrComponent("viewUserProfile");
  }

  function goToSetupProfile() {
    setCurrComponent("setupProfile");
  }

  return (
    <>
    {!isLoggedIn && <div className="body">
        <div className="login-container">
            <div className="left-div">
                {currComponent === "login" && <Login setUsername={setUsername} onHandleNewsFeed={goToNewsfeed} onHandleChooseAuth={goToChooseAuth}></Login>}
                {currComponent === "chooseAuth" && <ChooseAuth onHandleAuthCard={goToAuthCard} onHandleAuthEmail={goToAuthEmail}></ChooseAuth>}
                {currComponent === "authEmail" && <ConfirmEmail setOtp={setOtp} onHandleLogin={goToLogin} onHandleEnterOTP={goToEnterOTP}></ConfirmEmail>}
                {currComponent === "authCard" && <AuthCard onHandleChooseAuth={goToChooseAuth} onHandleSignUp={goToSignUp}></AuthCard>}
                {currComponent === "enterOTP" && <EnterOTP otp={otp} onHandleLogin={goToLogin} onHandleSignUp={goToSignUp}></EnterOTP>}
                {currComponent === "signUp" && <SignUp onHandleNewsFeed={goToNewsfeed} onHandleLogin={goToLogin} onHandleSetupProfile={goToSetupProfile}></SignUp>}
        {currComponent === "setupProfile" && <SetupProfile onHandleNewsFeed={goToNewsfeed} />}
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

    {isLoggedIn && currComponent != "messenger" && <><Topbar onHandleViewUserProfile={goToViewUserProfile} setSearchQuery={setSearchQuery} profilePicture={profilePicture} onHandleSearch={goToSearch} onHandleLogin={goToLogin} onHandleProfile={goToProfile} onHandleNewsFeed={goToNewsfeed}/><div className="cont">
        <Sidebar onHandleNewsFeed={goToNewsfeed} onHandleJobs={goToJobs} onHandleLogin={goToLogin} onHandleEvents={goToEvents} />
        {currComponent === "newsfeed" && <Homepage setIsNewNotif={setIsNewNotif} username={username} profilePicture={profilePicture} currComponent={currComponent}></Homepage>}
        {currComponent === "profile" && <UserProfile userId={userId} username={username}></UserProfile>}
        {currComponent === "jobs" && <JobPostings></JobPostings>}
        {currComponent === "events" && <AllEventsPostings />}
        {currComponent === "conversation" && <Conversation conversationFriend={conversationFriend} userEmail={userEmail}/>}
        {currComponent === "search" && <Search searchQuery={searchQuery} onHandleViewUserProfile={goToViewUserProfile} />}
        {currComponent === "viewUserProfile" && <ViewUserProfile userInfo={viewUserProfileId}/>}
        <Messages userId={userId} onHandleConversation={goToConversation} setConversationFriend={setConversationFriend} onHandleMessenger={goToMessenger}/>
      </div></>}

    {isLoggedIn && currComponent === "messenger" && <>
    <Topbar setIsNewNotif={setIsNewNotif} setSearchQuery={setSearchQuery} profilePicture={profilePicture} onHandleSearch={goToSearch} onHandleLogin={goToLogin} onHandleProfile={goToProfile} onHandleNewsFeed={goToNewsfeed}/><div className="cont">
      <Conversation userEmail={userEmail}/>
    </div>
    </>}

{/* {true && <><Topbar onHandleProfile={goToProfile} /><div className="cont">
        <Sidebar onHandleNewsFeed={goToNewsfeed} onHandleJobs={goToJobs} onHandleLogin={goToLogin} />
        {currComponent === "newsfeed" && <Homepage currComponent={currComponent}></Homepage>}
        {currComponent === "profile" && <UserProfile username={username}></UserProfile>}
        {currComponent === "jobs" && <JobPostings></JobPostings>}
        <Messages />
      </div></>} */}

{/* <Messenger userId={userId} /> */}

{/* <div className="body">
        <div className="login-container">
            <div className="left-div">
        <SetupProfile onHandleNewsFeed={goToNewsfeed2} />
            </div>
            <div className="right-div">
                <div className="right-h">
                  <h1>UnıLınk</h1>
                  <h1 className="right-h-dot">.</h1>
                  <h1 className="right-h-dot2">.</h1>
                </div>
            </div>
        </div>
    </div> */}

    </>
  )
}
