import React from 'react'
import "./sidebar.css";
import HomeIcon from '@mui/icons-material/Home';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { Users } from "../../dummyData";
import CloseFriend from "../trends/Trends";

export default function Sidebar(props) {

  function goToNewsfeed() {
    props.onHandleNewsFeed();
  }

  function goToJobs() {
    props.onHandleJobs();
  }

  const trendsArr = ["#trend1", "#trend2","#trend3","#trend4","#trend5"];
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sideBarListWrapper">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <HomeIcon className="sidebarIcon" />
              <span className="sidebarListItemText" onClick={goToNewsfeed}>Home</span>
            </li>
            <li className="sidebarListItem">
              <WorkOutlineIcon className="sidebarIcon" />
              <span className="sidebarListItemText" onClick={goToJobs}>Job Postings</span>
            </li>
            <li className="sidebarListItem">
              <EventIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Events</span>
            </li>
            <li className="sidebarListItem">
              <MoreHorizIcon className="sidebarIcon" />
              <span className="sidebarListItemText">More</span>
            </li>
          </ul>
        </div>
        <div className="sidebarTrendsWrapper">
          <h4 className="trendsHeading">Trends</h4>
          <ul className="sidebarTrendsList">
            {trendsArr.map(trend => <li key={trend}>{trend}</li>)}
          </ul>
        </div>
      </div>
      {/* <button onClick={props.onHandleLogin}>Log out</button> */}
    </div>
  );
}