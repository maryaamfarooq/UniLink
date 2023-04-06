
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

export default function AddEventForm(props) {
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState('');
  const [eventName, setEventName] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [location, setLocation] = useState('');
  const [desc, setDesc] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      props.addNewEvent(data);
    } catch (error) {
      console.error(error.response.data);
    }
  }

  const handleAddEvent = (e) => {
    e.preventDefault();
    sendEventPost({
      img,
      eventName,
      hashtags,
      organizer,
      location,
      desc,
    });
    handleClose();
  };

  return (
    <div>
      {/* <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Event
      </Button> */}
      <Dialog open={open} onClose={handleClose}>
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
            id="hashtags"
            label="Hashtags"
            type="text"
            fullWidth
            onChange={(e) => setHashtags(e.target.value)}
          />
          <TextField
            margin="dense"
            id="organizer"
            label="Organizer"
            type="text"
            fullWidth
            onChange={(e) => setOrganizer(e.target.value)}
          />
          <TextField
            margin="dense"
            id="location"
            label="Location"
            type="text"
            fullWidth
            onChange={(e) => setLocation(e.target.value)}
          />
          <TextField
            margin="dense"
            id="desc"
            label="Description"
            type="text"
            fullWidth
            onChange={(e) => setDesc(e.target.value)}
            required
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddEvent}>Add Event</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

