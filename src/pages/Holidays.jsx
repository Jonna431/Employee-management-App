import React, { useState, useEffect } from "react";
import "./CustomCalendar.css";

import {
  Calendar,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";

const localizer = momentLocalizer(moment);

// Generate a random color
const getRandomColor = () => {
  const colors = ["#FF5722", "#3F51B5", "#4CAF50", "#E91E63", "#FFC107", "#009688"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const CustomCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [eventName, setEventName] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openView, setOpenView] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("calendarEvents");
    if (saved) {
      const parsed = JSON.parse(saved).map(e => ({
        ...e,
        start: new Date(e.start),
        end: new Date(e.end),
      }));
      setEvents(parsed);
    }
  }, []);

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setEventName("");
    setOpen(true);
  };

  const handleAddEvent = () => {
    if (!eventName || !selectedSlot) return;

    const newEvent = {
      id: Date.now(),
      title: eventName,
      start: new Date(selectedSlot.start),
      end: new Date(selectedSlot.end),
      color: getRandomColor(),
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
    setOpen(false);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setOpenView(true);
  };

  const handleDeleteEvent = () => {
    const updatedEvents = events.filter((e) => e.id !== selectedEvent.id);
    setEvents(updatedEvents);
    localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
    setOpenView(false);
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = event.color || "#3174ad";
    return {
      style: {
        backgroundColor,
        borderRadius: "5px",
        opacity: 0.9,
        color: "white",
        border: "0px",
        display: "block",
        paddingLeft: "5px",
      },
    };
  };

  return (
    <div style={{ height: "75vh", padding: "200px",paddingTop:'80px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        views={["month", "week", "day"]}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        style={{ height: "100%" }}
        eventPropGetter={eventStyleGetter}
      />

      {/* Add Event Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Event Name"
            fullWidth
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleAddEvent} color="primary" variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      {/* View Event Dialog */}
      <Dialog open={openView} onClose={() => setOpenView(false)}>
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent>
          <Typography variant="h6">{selectedEvent?.title}</Typography>
          <Typography>
            {moment(selectedEvent?.start).format("LLL")} -{" "}
            {moment(selectedEvent?.end).format("LLL")}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenView(false)} color="primary">Close</Button>
          <Button onClick={handleDeleteEvent} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomCalendar;
