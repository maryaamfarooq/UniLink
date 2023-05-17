
import React, { useState } from 'react';
import AddEventForm from './AddEventForm';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ReplyIcon from '@mui/icons-material/Reply';
import axios from 'axios';
import './event.css';
import { useEffect } from 'react';

const Event = ({event}) => {

  // const [isInterested, setIsInterested] = useState(event.isInterested)
  const [isInterested, setIsInterested] = useState(event.isInterested)
  const [numInterested, setNumInterested] = useState(event.numInterested);

  useEffect(() => {
    setNumInterested(event.numInterested)
    setIsInterested(event.isInterested)
  }, [event])

  async function handleInterested() {
    setNumInterested(prev => isInterested? prev-1 : prev+1);
    setIsInterested(prev => !prev);
    // send request
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(`http://localhost:8080/api/v1/event/${event._id}/interestedEvent`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // setIsInterested(data.isInterested);
    } catch (error) {
      console.error(error.response.data);
    }
  }

  return (
    <div className="event-container">
      <div className="event-div1">
        <img className="event-img" src={event.img} alt="event" />
      </div>

      <div className="event-div2">
        <div className="event-title">{event.eventName}</div>
        {event.date && <div>{event.date} {event.time && <span>AT {event.time}</span>}</div>}
        <div className='event-city'>{event.location}</div>
      </div>

      <div className="event-div3" onClick={handleInterested}>
        {numInterested} interested
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
