// src/pages/Home.js
import React, { useContext } from "react";
import {
  Button,
  Container,
  Typography,
  TextField,
  Box,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Home = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("employee-users")) || [];
    const user = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (user) {
      login(user);
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      {/* Heading */}
      <Typography variant="h4" align="center" gutterBottom color="#2a7b8bff">
        Employee Management App
      </Typography>

      {/* Login Card */}
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit"  variant="contained" fullWidth  sx={{ mt: 2 ,backgroundColor:'#2a7b8bff'}}>
            Login
          </Button>
        </form>

        {/* Register Link */}
        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            Don’t have an account?{" "}
            <Button onClick={() => navigate("/register")} size="small">
              Register here
            </Button>
          </Typography>
        </Box>

        {/* HR Login Button */}
        <Box mt={2} textAlign="center">
          <Button variant="outlined" >
            HR Login (Coming Soon)
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
