// src/components/UpcomingHolidays.js
import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";

const UpcomingHolidays = ({ events, currentMonth }) => {
  const holidaysThisMonth = events.filter((event) => {
    const date = new Date(event.start);
    return date.getMonth() === currentMonth && event.color !== undefined;
  });

  return (
    <Box sx={{marginTop:'5px',marginLeft:'10px'}}>
    <Card
      sx={{
        width: 350,
        minHeight: "520px",
        m: 2,
        borderRadius: 3,
        boxShadow: 6,
        bgcolor: "#f0f3f3d5",
      }}
    >
      <CardHeader
        avatar={<EventIcon color="primary" />}
        title="Upcoming Events"
        titleTypographyProps={{ variant: "h5" }}
        sx={{ borderBottom: "2px solid #ddd", pb: 1 ,color:'#b4046bef',}}
      />
      <CardContent>
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
      </CardContent>
    </Card>
    </Box>
  );
};

export default UpcomingHolidays;
