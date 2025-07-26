import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Box, Divider } from "@mui/material";
import moment from "moment";

const ClockInOutCard = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [elapsed, setElapsed] = useState(0); // in seconds

  useEffect(() => {
    let timer;
    if (isClockedIn && clockInTime) {
      timer = setInterval(() => {
        setElapsed(Math.floor((new Date() - new Date(clockInTime)) / 1000));
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isClockedIn, clockInTime]);

  const handleClockIn = () => {
    const now = new Date();
    setClockInTime(now);
    setIsClockedIn(true);

    const dateKey = moment(now).format("YYYY-MM-DD");
    const stored = JSON.parse(localStorage.getItem("workingHours")) || {};
    stored[dateKey] = { ...(stored[dateKey] || {}), clockIn: moment(now).format("HH:mm") };
    localStorage.setItem("workingHours", JSON.stringify(stored));
  };

  const handleClockOut = () => {
    const now = new Date();
    setIsClockedIn(false);
    setElapsed(0);

    const dateKey = moment(now).format("YYYY-MM-DD");
    const stored = JSON.parse(localStorage.getItem("workingHours")) || {};

    if (stored[dateKey]?.clockIn) {
      stored[dateKey].clockOut = moment(now).format("HH:mm");
      localStorage.setItem("workingHours", JSON.stringify(stored));
    }

    setClockInTime(null);
  };

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600}>Let's get to work</Typography>
        <Typography color="text.secondary">
          {moment().format("ddd MMM DD YYYY")}
        </Typography>

        <Typography
          variant="h4"
          fontWeight={600}
          mt={1}
          sx={{ fontFamily: "monospace", color: "black" }}
        >
          {formatTime(elapsed)}
        </Typography>

        <Divider sx={{ my: 1 }} />
        <Typography variant="body2" color="text.secondary">
          Shift: 9:30am - 6:30pm
        </Typography>

        <Box mt={2}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: isClockedIn ? "#f44336" : "#4caf50",
              "&:hover": {
                backgroundColor: isClockedIn ? "#e53935" : "#43a047",
              },
              width: "100%",
            }}
            onClick={isClockedIn ? handleClockOut : handleClockIn}
          >
            {isClockedIn ? "Clock Out" : "Clock In"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClockInOutCard;
