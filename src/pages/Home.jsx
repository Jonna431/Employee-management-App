// src/pages/Home.js
import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Employee Management App
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/register")}
        sx={{ m: 1 }}
      >
        Employee Register
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/login")}
        sx={{ m: 1 }}
      >
        Employee Login
      </Button>
      <Button
        variant="outlined"
        color="success"
        onClick={() => navigate("/hr")}
        sx={{ m: 1 }}
      >
        HR Login (Coming Soon)
      </Button>
    </Container>
  );
};

export default Home;
