import React from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

const Notifications = () => {
  // This would come from your API/backend
  const notifications = [
    { id: 1, text: "Company meeting on Friday at 10 AM", date: "2023-05-15" },
    { id: 2, text: "New HR policies updated", date: "2023-05-10" },
    { id: 3, text: "Your leave request has been approved", date: "2023-05-05" },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Company Notifications
      </Typography>

      {notifications.length > 0 ? (
        <List>
          {notifications.map((notification) => (
            <ListItem key={notification.id} divider>
              <ListItemText
                primary={notification.text}
                secondary={notification.date}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No notifications available</Typography>
      )}
    </Box>
  );
};

export default Notifications;
