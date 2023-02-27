import React from 'react';
import "./topbar.css";

import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Topbar(props) {
  return (
    <div className="topbar-container">
        <div className="topbar-logo">
            UniLink
        </div>
        <div className="topbar-search-wrapper">
            <div className="topbar-search-bar">
                <SearchIcon className="searchIcon" sx={{ color: "#bbbbbb"}}/>
                <input placeholder="Search"></input>
            </div>
        </div>
        <div className="topbar-right">
            <div className="topbar-notif">
                <NotificationsIcon sx={{ color: "white"}} />
            </div>
            <div className="topbar-profile">
                <img onClick={props.onHandleProfile}
                    src={
                        "assets/person/1.jpeg"
                    }
                    alt=""
                    className="topbar-profile-img"
                />
            </div>
        </div>
    </div>
  )
}
