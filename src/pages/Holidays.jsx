import React, { useState, useEffect } from "react";
import "./CustomCalendar.css";
import SectionTitle from "./SectionTitle";
import { Calendar, momentLocalizer } from "react-big-calendar";
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

const getRandomColor = () => {
  const colors = ["#FF5722", "#3F51B5", "#4CAF50", "#E91E63", "#FFC107", "#009688"];
  return colors[Math.floor(Math.random() * colors.length)];
};

// 🏖️ Default holidays per month
const getDefaultHolidaysForMonth = (year, month) => {
  const holidaysByMonth = {
    0: [
      { title: "New Year's Day", day: 1, color: "#E91E63" },
      { title: "Pongal", day: 14, color: "#4CAF50" },
      { title: "Republic Day", day: 26, color: "#3F51B5" },
    ],
    1: [
      { title: "Maha Shivaratri", day: 18, color: "#009688" },
    ],
    2: [
      { title: "Holi", day: 8, color: "#FFC107" },
      { title: "Ram Navami", day: 25, color: "#FF5722" },
    ],
    
    9: [
      { title: "Gandhi Jayanti", day: 2, color: "#00BCD4" },
      { title: "Dussehra", day: 24, color: "#F44336" },
    ],
    10: [
      { title: "Diwali", day: 12, color: "#FF9800" },
      { title: "Children's Day", day: 14, color: "#03A9F4" },
    ],
    11: [
      { title: "Christmas", day: 25, color: "#F44336" },
      { title: "New Year’s Eve", day: 31, color: "#3F51B5" },
    ],
  };

  const holidays = holidaysByMonth[month] || [];
  return holidays.map((h) => ({
    id: `holiday-${year}-${month}-${h.day}`,
    title: h.title,
    start: new Date(year, month, h.day),
    end: new Date(year, month, h.day),
    color: h.color,
    isHoliday: true,
  }));
};

const CustomCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [eventName, setEventName] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // 🧠 Load from localStorage on first render
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("calendarEvents")) || [];
    const parsed = saved.map((e) => ({
      ...e,
      start: new Date(e.start),
      end: new Date(e.end),
    }));
    setEvents(parsed);
  }, []);

  // 🌟 Add holidays if missing for the month
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const holidays = getDefaultHolidaysForMonth(year, month);

    const existing = events.filter((e) => e.isHoliday);
    const hasHoliday = holidays.some((h) =>
      existing.find((e) => e.id === h.id)
    );

    if (!hasHoliday) {
      const updatedEvents = [...events, ...holidays];
      setEvents(updatedEvents);
      localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
    }
  }, [currentDate, events]);

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
      isHoliday: false,
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
    setOpen(false);
  };

  const handleSelectEvent = (event) => {
    if (event.isHoliday) return; // holidays cannot be deleted
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
    <div style={{ height: "75vh", padding: "180px", paddingTop: "40px" }}>
      <SectionTitle title=" 🏢 Team Calendar" />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        views={["month", "week", "day"]}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onNavigate={(date) => setCurrentDate(date)}
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
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddEvent} variant="contained">
            Add
          </Button>
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
          <Button onClick={() => setOpenView(false)}>Close</Button>
          <Button onClick={handleDeleteEvent} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomCalendar;
