import React, {useEffect, useState} from 'react';
import "./topbar.css";

import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Topbar(props) {

    const [showProfileDropdown, setShowProfileDropdown] = useState(false)

    const handleShowProfileDropdown = () => {
        setShowProfileDropdown(prev => !prev);
    }

    useEffect(() => {
        console.log("pp topbar:"+props.profilePicture)
    }, [props.profilePicture])

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
