// src/pages/Dashboard.js
import React from "react";
import { Typography, Box, Paper, Container } from "@mui/material";

const Dashboard = () => {
  const dashboardData = [
    {
      title: "Total Working Days",
      value: "220",
      gradient: "linear-gradient(135deg, #e3f2fd 50%, #ffffff 50%)",
      textColor: "#1976d2",
    },
    {
      title: "Leave Taken",
      value: "12",
      gradient: "linear-gradient(135deg, #fce4ec 50%, #ffffff 50%)",
      textColor: "#d81b60",
    },
    {
      title: "Salary Processed",
      value: "₹6,50,000",
      gradient: "linear-gradient(135deg, #e8f5e9 50%, #ffffff 50%)",
      textColor: "#388e3c",
    },
    {
      title: "Upcoming Holidays",
      value: "3",
      gradient: "linear-gradient(135deg, #fff9c4 50%, #ffffff 50%)",
      textColor: "#080807ff",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        {dashboardData.map((item, index) => (
          <Paper
            key={index}
            elevation={6}
            sx={{
              flex: "1 1 calc(50% - 32px)",
              minWidth: "250px",
              height: 160,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 3,
              background: item.gradient,
              color: item.textColor,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, textAlign: "center" }}
            >
              {item.title}
            </Typography>
            <Typography variant="h4" fontWeight="bold" mt={1}>
              {item.value}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default Dashboard;
