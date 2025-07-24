import React from 'react';
import {
  Card, CardContent, Typography, Box,
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,Cell
} from 'recharts';

const data = [
  { day: 'Sun', date: 14, hours: 0 },
  { day: 'Mon', date: 15, hours: 4, color: '#4285F4' },
  { day: 'Tue', date: 16, hours: 3.5, color: '#F4B400' },
  { day: 'Wed', date: 17, hours: 6, color: '#34A853' },
  { day: 'Thu', date: 18, hours: 0 },
];

export default function WorkingHoursChart() {
  return (
    <Card sx={{ width: 400 ,mt:'20px',}}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" fontWeight="bold">Working hours</Typography>
          <Typography variant="body2">7:30 hrs</Typography>
        </Box>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="hours"
              radius={[10, 10, 0, 0]}
              fill="#8884d8"
              isAnimationActive={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || '#ccc'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
