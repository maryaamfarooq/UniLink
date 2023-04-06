// import Topbar from "../topbar/Topbar";
import React from 'react'
import Topbar from "../topbar1/Topbar";
import Sidebar from "../sidebar/Sidebar";
import Feed from "../feed/Feed";
import Rightbar from "../rightbar/Rightbar";
import Messages from "../messages/Messages";
import "./homepage.css"

export default function Homepage(props) {
  return (
    <>
      {/* <Topbar onHandleProfile={props.onHandleProfile}/>
      
        <Sidebar onHandleLogin={props.onHandleLogin}/>
        <Feed currComponent={props.currComponent}/>
        <Messages/>
       */}
      <div className="homeContainer">
      <Feed username={props.username} profilePicture={props.profilePicture} currComponent={props.currComponent}/>
      </div>
    </>
  );
}