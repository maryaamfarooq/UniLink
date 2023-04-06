import React, {useState, useEffect} from 'react';
import Event from './Event';
import axios from 'axios';
import AddEventForm from './AddEventForm';
import './all-events.css'

export default function AllEventsPostings(props) {
  const [allEvents, setAllEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  async function getAllEvents() {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get('http://localhost:8080/api/v1/event/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const eventsArray = data.events;
      setAllEvents(prevEvents => [...prevEvents, ...eventsArray]);
      console.log(JSON.stringify(allEvents));

    } catch (error) {
      console.error(error.response.data);
    }
  };
  
  useEffect(() => {
    getAllEvents();
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(allEvents));
  }, [allEvents]);

  return (
    <div className="all-events-container">
      Events
      {allEvents && allEvents.map((e) => (
        <Event key={e._id} event={e} />
      ))}
      <button className='event-add' onClick={handleAddClick}>Add Event</button>
      {showForm && <AddEventForm onClose={handleFormClose} />}
    </div>
  );
}
