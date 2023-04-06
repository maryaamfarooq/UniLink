
import React, { useState } from 'react';
import AddEventForm from './AddEventForm';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ReplyIcon from '@mui/icons-material/Reply';
import './event.css';

const Event = ({event}) => {

  // const [isInterested, setIsInterested] = useState(event.isInterested)
  const [isInterested, setIsInterested] = useState(false)

  function handleInterested() {
    setIsInterested(prev => !prev);
    // send request
  }

  return (
    <div className="event-container">
    {/* <img className="event-img" src={event.img} alt="event"></img>
    <div>
      <div className="event-title">{event.eventName}</div>
    </div>
    <div>
    {event.hashtags && event.hashtags.map((k, index) => (
<div key={index} className="event-keyword">{k}</div>
))}

    </div>
    <div>
      <div className='event-city'>{event.location}</div>
      <div className='event-city'>{event.organizer}</div>
    </div>
    <div>{event.createdAt}</div> */}

      <div className="event-div1">
        <img className="event-img" src={event.img} alt="event" />
      </div>

      <div className="event-div2">
        <div className="event-title">{event.eventName}</div>
        {/* <div>{event.date} AT {event.time}</div> */}
        <div>23 July, 2023 AT 2:00PM</div>
        <div className='event-city'>{event.location}</div>
      </div>

      <div className="event-div3" onClick={handleInterested}>
        {/* {event.interestedCount} */}
        521 interested
        {!isInterested && <StarBorderIcon className="event-div3-star" size="large" htmlColor="#7FD8BE" />}
        {isInterested && <StarIcon className="event-div3-star" size="small" htmlColor="#7FD8BE" />}
      </div>

      <div className="event-div4">
        <div className="event-div4-send-div">
        <ReplyIcon htmlColor="white" className="event-div4-send" />
        </div>
      </div>

    </div>
   
  );
};

export default Event;
