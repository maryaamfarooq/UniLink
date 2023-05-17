import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Upload from '../FileUpload';
import './all-events.css';

export default function AddEventForm(props) {
  const [open, setOpen] = useState(true);
  const [img, setImg] = useState('');
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState('');

  async function sendEventPost(eventDetails) {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        'http://localhost:8080/api/v1/event/',
        eventDetails,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      // props.addNewEvent(data);
      props.getAllEvents();
    } catch (error) {
      console.error(error.response.data);
    }
  }

  const handleAddEvent = (e) => {
    e.preventDefault();
    sendEventPost({
      img,
      eventName,
      location,
      date, 
      time,
    });
    props.onClose();
  };

  return (
    <div>
      {/* <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Event
      </Button> */}
      <Dialog open={open} onClose={props.onClose}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the following details to add a new event:
          </DialogContentText>
          <Upload setImg={setImg} />
          <TextField
            autoFocus
            margin="dense"
            id="event-name"
            label="Event Name"
            type="text"
            fullWidth
            onChange={(e) => setEventName(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="location"
            label="Location"
            type="text"
            fullWidth
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="date"
            label="Date"
            type="text"
            fullWidth
            onChange={(e) => setDate(e.target.value)}
          />
          <TextField
            margin="dense"
            id="time"
            label="Time"
            type="text"
            fullWidth
            onChange={(e) => setTime(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={handleAddEvent}>Add Event</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

