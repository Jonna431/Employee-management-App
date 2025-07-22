// src/pages/Register.js
import React from "react";
import {
  Button,
  Container,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomTextField from "../pages/CustomTextField"; // Import custom component
import SectionTitle from "./SectionTitle";

// Validation schema
const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const existingUsers =
      JSON.parse(localStorage.getItem("employee-users")) || [];
    const userExists = existingUsers.find((user) => user.email === data.email);

    if (userExists) {
      alert("User already exists!");
    } else {
      localStorage.setItem(
        "employee-users",
        JSON.stringify([...existingUsers, data])
      );
      alert("Registered successfully!");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <SectionTitle title='Employee Registration' />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <CustomTextField
            label="Full Name"
            name="fullName"
            register={register}
            error={errors.fullName}
          />
          <CustomTextField
            label="Email"
            name="email"
            register={register}
            error={errors.email}
          />
          <CustomTextField
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password}
          />
          <CustomTextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            register={register}
            error={errors.confirmPassword}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, py: 1, backgroundColor: "#2a7b8bff" }}
          >
            Register
          </Button>
        </form>

        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Already have an account?{" "}
            <Button href="/" size="small">
              Login here
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
