// import Topbar from "../topbar/Topbar";
import React from 'react'
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import Feed from "../feed/Feed";
import Messages from "../messages/Messages";
import "./homepage.css"

export default function Homepage(props) {
  return (
    <>
      <div className="homeContainer">
      <Feed username={props.username} profilePicture={props.profilePicture} currComponent={props.currComponent}/>
      </div>
    </>
  );
}