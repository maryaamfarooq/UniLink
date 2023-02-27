import React from 'react'
import './topbar.css'
import Profile from "../profile/Profile";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Topbar(props) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
      <div className="topbarContainer">
        <div className="topbarLeft">
          <span className="logo">UniLink</span>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <SearchIcon className="searchIcon" />
            <input
              placeholder="Search for friend, post or video"
              className="searchInput"
            />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <PersonIcon />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <ChatIcon />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <NotificationsIcon />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <img onClick={props.onHandleProfile}
            src={
                 "assets/person/1.jpeg"
            }
            alt=""
            className="topbarImg"
          />
        </div>
      </div>
    );
  }