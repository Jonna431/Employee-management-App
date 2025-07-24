// src/pages/hr/DashboardHome.jsx
import { Box, Typography, Paper, Grid } from "@mui/material";
import {
  People as PeopleIcon,
  Inventory as InventoryIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material";

const HRDashboardHome = () => {
  const stats = [
    {
      title: "Total Employees",
      value: "124",
      icon: <PeopleIcon fontSize="large" />,
    },
    {
      title: "Assets Assigned",
      value: "89",
      icon: <InventoryIcon fontSize="large" />,
    },
    {
      title: "Pending Requests",
      value: "12",
      icon: <AssignmentIcon fontSize="large" />,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        HR Dashboard
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper sx={{ p: 3, display: "flex", alignItems: "center" }}>
              <Box sx={{ mr: 3, color: "primary.main" }}>{stat.icon}</Box>
              <Box>
                <Typography variant="h6">{stat.value}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HRDashboardHome;
// import { Typography } from '@mui/material';

// const HRDashboardHome = () => {
//   return (
//     <Typography variant="h4">HR Dashboard</Typography>
//   );
// };

// export default HRDashboardHome;
