import React from 'react'
import "./trends.css";

export default function Trends({posts}) {
  return (
    <li className="sidebarFriend">
      
      <span className="sidebarFriendName">{posts.desc}</span>
    </li>
  );
}