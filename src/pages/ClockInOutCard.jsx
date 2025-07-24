import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, Typography, Button, LinearProgress, Box,
} from '@mui/material';


const shiftStart = new Date();
shiftStart.setHours(9, 30, 0, 0);

const shiftEnd = new Date();
shiftEnd.setHours(18, 30, 0, 0);

export default function ClockInOutCard() {
  const [startTime, setStartTime] = useState(null);
  const [workedSeconds, setWorkedSeconds] = useState(0);

  useEffect(() => {
    let interval;
    if (startTime) {
      interval = setInterval(() => {
        setWorkedSeconds(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime]);

  const handleClockIn = () => setStartTime(Date.now());
  const handleClockOut = () => setStartTime(null);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const shiftDuration = (shiftEnd - shiftStart) / 1000;
  const progress = (workedSeconds / shiftDuration) * 100;

  return (
    <Card sx={{ width: 450,marginLeft:'50px'}}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">Let's get to work</Typography>
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography>
            {new Date().toDateString()}
          </Typography>
          <Typography>{formatTime(workedSeconds)}</Typography>
        </Box>

        <LinearProgress variant="determinate" value={progress} sx={{ my: 2 }} />

        <Typography variant="body2" color="text.secondary">
          Shift: 9:30am - 6:30pm
        </Typography>

        <Button
          variant="contained"
          color={startTime ? 'error' : 'success'}
          onClick={startTime ? handleClockOut : handleClockIn}
          sx={{ mt: 2, width: '100%' }}
        >
          {startTime ? 'Clock Out' : 'Clock In'}
        </Button>
      </CardContent>
    </Card>
  );
}
