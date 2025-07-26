// src/components/UpcomingHolidays.js
import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  Paper,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";

const UpcomingHolidays = ({ events, currentMonth }) => {
  const holidaysThisMonth = events.filter((event) => {
    const date = new Date(event.start);
    return date.getMonth() === currentMonth && event.color !== undefined;
  });

  return (
    <Box sx={{ marginTop: "5px", marginLeft: "10px" }}>
      <Paper
        elevation={6}
        sx={{
          // width: 620,
          minHeight: "250px",
          m: 2,
          mt:1,
          p: 2,
          marginLeft: "10px",
          borderRadius:2,
         
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: "2px solid #ddd",
            pb: 1,
            mb: 1,
          }}
        >
          <EventIcon color="primary" sx={{ mr: 1 }} />
          <Typography
            variant="h5"
            sx={{ color: "#b4046bef", fontWeight: "bold" }}
          >
            Upcoming Events
          </Typography>
        </Box>

        {holidaysThisMonth.length > 0 ? (
          <List dense>
            {holidaysThisMonth.map((holiday) => (
              <React.Fragment key={holiday.id}>
                <ListItem sx={{ mb: 1 }}>
                  <ListItemText
                    primary={
                      <Typography fontWeight={600}>
                        {holiday.title}
                      </Typography>
                    }
                    secondary={new Date(holiday.start).toDateString()}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No holidays this month.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default UpcomingHolidays;
