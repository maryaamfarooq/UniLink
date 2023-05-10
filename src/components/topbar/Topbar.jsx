import React, {useEffect, useState} from 'react';
import "./topbar.css";
import axios from 'axios';

import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import FriendRequests from '../FriendRequest/FriendRequests';
import Notifications from '../Notifications/Notifications'

export default function Topbar(props) {

    var i = 0;
    const [showProfileDropdown, setShowProfileDropdown] = useState(false)
    const [search, setSearch] = useState("");
    const [isRequest, setIsRequest] = useState(false);
    const [isNotif, setIsNotif] = useState(false);
    const [allRequests, setAllRequests] = useState([]);
    const [allNotifications, setAllNotifications] = useState([])

    const handleShowProfileDropdown = () => {
        setShowProfileDropdown(prev => !prev);
    }

    async function fetchFriendRequests() {
      try {
        const token = localStorage.getItem("token");
        const {data} = await axios.get(`http://localhost:8080/api/v1/user/showRequests/all`, {
            headers:{
              authorization: `Bearer ${token}`
            }
          });
        setAllRequests(data.friendRequests);
      } catch (error) {
          console.error(error.response.data);
      }
    }

    useEffect(() => {
        i++;
        if (i <= 1) {
          async function fetchRequests() {
            await fetchFriendRequests();
          }
          fetchRequests();
        };
    }, [])

    async function fetchNotifications() {
        console.log("NNOTIF:");
        try {
          const token = localStorage.getItem("token");
          const {data} = await axios.get(`localhost:8080/api/v1/user/showNotifications/all`, {
              headers:{
                authorization: `Bearer ${token}`
              }
            });
            console.log("NNOTIF:"+data);
            setAllNotifications(data.notifications);
        } catch (error) {
            console.error(error.response.data);
        }
      }
  
      useEffect(() => {
          i++;
          if (i <= 1) {
            async function fetchNotif() {
              await fetchNotifications();
            }
            fetchNotif();
          };
      }, [])

    function setSearchFunc(searchQ) {
        if (searchQ.length > 0) {
            setSearch(searchQ);
            props.setSearchQuery(searchQ);
            props.onHandleSearch();
        }
        else {
            props.onHandleNewsFeed();
        }
    }

  return (
    <div className="topbar-container">
        <div onClick={props.onHandleNewsFeed} className="topbar-logo">
            UniLink
        </div>
        <div className="topbar-search-wrapper">
            <div className="topbar-search-bar">
                <SearchIcon className="searchIcon" sx={{ color: "#bbbbbb"}}/>
                <input onClick={e => setSearchFunc(search)} onChange={event => setSearchFunc(event.target.value)} placeholder="Search"></input>
            </div>
        </div>
        <div className="topbar-right">
            <div onClick={() => setIsRequest(prev => !prev)} className="topbar-notif">
                <PersonIcon sx={{ color: "white"}} />
            </div>
            {isRequest && <div className="friend-requests-div"><FriendRequests requests={allRequests} /></div>}
            <div onClick={() => setIsNotif(prev => !prev)} className="topbar-notif">
                <NotificationsIcon sx={{ color: "white"}} />
            </div>
            {isNotif && <div className="friend-requests-div"><Notifications notifications={allNotifications} /></div>}
            <div className="topbar-profile">
                <img onClick={handleShowProfileDropdown}
                    src={
                        props.profilePicture
                    }
                    alt=""
                    className="topbar-profile-img"
                />
                {showProfileDropdown && <div className='topbar-profile-dropdown'>
                    <div onClick={props.onHandleProfile} className='topbar-dropdown-div'>
                        <img className="topbar-dropdown-img" src={props.profilePicture} />
                        Profile
                    </div>
                    <div className='topbar-dropdown-div'>
                        <HelpRoundedIcon style={{ color: '#7FD8BE' }} className="topbar-dropdown-icon"/>
                        Help
                    </div>
                    <div className='topbar-dropdown-div'>
                        <SettingsIcon style={{ color: '#7FD8BE' }} className="topbar-dropdown-icon"/>
                        Settings
                    </div>
                    <div onClick={props.onHandleLogin} className='topbar-dropdown-div'>
                        <LogoutIcon style={{ color: '#7FD8BE' }} className="topbar-dropdown-icon"/>
                        Log out
                    </div>
                </div>}
            </div>
        </div>
    </div>
  )
}
