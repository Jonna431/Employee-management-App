import React, { useState, useEffect } from "react";
import "./CustomCalendar.css";
import SectionTitle from "./SectionTitle";
import UpcomingHolidays from "./UpcomingHolidays";
import ClockInOutCard from './ClockInOutCard';
import WorkingHoursChart from './WorkingHoursChart';
import {
  Calendar,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Dialog,
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const localizer = momentLocalizer(moment);

const getRandomColor = () => {
  const colors = ["#FF5722", "#3F51B5", "#4CAF50", "#E91E63", "#FFC107", "#009688"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getDefaultEvents = (monthStart) => {
  const year = monthStart.getFullYear();
  const month = monthStart.getMonth();
  const holidaysByMonth = {
    0: [
      { title: "New Year's Day", day: 1, color: "#E91E63" },
      { title: "Pongal", day: 14, color: "#4CAF50" },
    ],
    1: [
      { title: "Vasant Panchami", day: 5, color: "#3F51B5" },
      { title: "Maha Shivaratri", day: 19, color: "#009688" },
    ],
    2: [
      { title: "Holi", day: 8, color: "#FFC107" },
      { title: "Ram Navami", day: 25, color: "#FF5722" },
    ],
    3: [
      { title: "Good Friday", day: 7, color: "#795548" },
      { title: "Ambedkar Jayanti", day: 14, color: "#9C27B0" },
    ],
    4: [
      { title: "Labour Day", day: 1, color: "#607D8B" },
      { title: "Eid al-Fitr", day: 10, color: "#FF9800" },
    ],
    5: [
      { title: "Environment Day", day: 5, color: "#4CAF50" },
      { title: "Father’s Day", day: 16, color: "#9E9E9E" },
    ],
    6: [
      { title: "Guru Purnima", day: 21, color: "#03A9F4" },
    ],
    7: [
      { title: "Independence Day", day: 15, color: "#2196F3" },
      { title: "Raksha Bandhan", day: 19, color: "#FFEB3B" },
      { title: "Janmashtami", day: 26, color: "#673AB7" },
    ],
    8: [
      { title: "Teachers' Day", day: 5, color: "#FF9800" },
      { title: "Ganesh Chaturthi", day: 7, color: "#CDDC39" },
    ],
    9: [
      { title: "Gandhi Jayanti", day: 2, color: "#00BCD4" },
      { title: "Dussehra", day: 20, color: "#F44336" },
    ],
    10: [
      { title: "Diwali", day: 3, color: "#FF5722" },
      { title: "Bhai Dooj", day: 5, color: "#8BC34A" },
      { title: "Guru Nanak Jayanti", day: 27, color: "#009688" },
    ],
    11: [
      { title: "Christmas", day: 25, color: "#F44336" },
      { title: "New Year’s Eve", day: 31, color: "#3F51B5" },
    ],
  };
  const holidays = holidaysByMonth[month] || [];
  return holidays.map((holiday) => ({
    id: `holiday-${year}-${month}-${holiday.day}`,
    title: holiday.title,
    start: new Date(year, month, holiday.day),
    end: new Date(year, month, holiday.day),
    color: holiday.color,
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

  useEffect(() => {
    const saved = localStorage.getItem("calendarEvents");
    let parsed = [];
    if (saved) {
      parsed = JSON.parse(saved).map((e) => ({
        ...e,
        start: new Date(e.start),
        end: new Date(e.end),
      }));
    }

    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const holidayEvents = getDefaultEvents(monthStart);
    const eventKeys = new Set(parsed.map((e) => e.id));
    const filteredHolidays = holidayEvents.filter((h) => !eventKeys.has(h.id));

    const updated = [...parsed, ...filteredHolidays];
    setEvents(updated);
    localStorage.setItem("calendarEvents", JSON.stringify(updated));
  }, [currentDate]);

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setEventName("");
    setOpen(true);
  };

  const handleAddEvent = () => {
    if (!eventName || !selectedSlot) return;
    const newEvent = {
      id: `event-${Date.now()}`,
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
    <Card
      sx={{
        mx: "auto",
        mt: 3,
        width: "95%",
        p: 2,
        pb: 10,
        pr: 6,
        borderRadius: 3,
        boxShadow: 6,
        backgroundColor: "#ffffffdd",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, width: "100%" }}>
          {/* Left - Calendar */}
          <Box sx={{ flex: 2.5 }}>
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
              style={{ height: 650 }}
              eventPropGetter={eventStyleGetter}
            />
          </Box>

          {/* Right - Clock and Stats */}
          <Box sx={{ flex: 1.5, display: "flex", flexDirection: "column", gap: 2 }}>
            <ClockInOutCard />
            <Box sx={{ display: "flex", gap: 2 }}>
              <UpcomingHolidays events={events} currentMonth={currentDate.getMonth()} />
              <WorkingHoursChart />
            </Box>
          </Box>
        </Box>
      </CardContent>

      {/* Dialogs */}
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

      <Dialog open={openView} onClose={() => setOpenView(false)}>
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent>
          <Typography variant="h6">{selectedEvent?.title}</Typography>
          <Typography>
            {moment(selectedEvent?.start).format("LLL")} - {moment(selectedEvent?.end).format("LLL")}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenView(false)} color="primary">Close</Button>
          {!selectedEvent?.isHoliday && (
            <Button onClick={handleDeleteEvent} color="error" variant="contained">Delete</Button>
          )}
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default CustomCalendar;
