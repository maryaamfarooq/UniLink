import React, {useState, useEffect} from 'react';
import Event from './Event';
import axios from 'axios';
import AddEventForm from './AddEventForm';
import './all-events.css'

export default function AllEventsPostings(props) {
  const [allEvents, setAllEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  var i = 0;

  function handleFormOpen() {
    console.log("OPEN")
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

  function addNewEvent() {

  }
  
  useEffect(() => {
    i++;
    if (i <= 1) getAllEvents();
  }, []);

  // useEffect(() => {
  //   console.log(JSON.stringify(allEvents));
  // }, [allEvents]);

  return (
    <div className="all-events-container">
    <button onClick={handleFormOpen} className="events-fab">+</button>
      <div className="events-heading">Events</div>
      {allEvents && allEvents.map((e) => (
        <Event key={e._id} event={e} />
      ))}
      {showForm && <AddEventForm onClose={handleFormClose} />}
    </div>
  );
}
