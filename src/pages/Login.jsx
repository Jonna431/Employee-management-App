import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CustomTextField from "./CustomTextField";
import SectionTitle from "./SectionTitle";

// Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Home = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [hrLoginOpen, setHrLoginOpen] = useState(false);
  const [hrCredentials, setHrCredentials] = useState({
    email: "hr@company.com",
    password: "",
  });

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
      setLoginError("");
      login(user);
      navigate("/dashboard");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  const handleHrLogin = () => {
    // Simple HR authentication - in production, use proper authentication
    if (hrCredentials.password === "hrpassword") {
      login({
        email: hrCredentials.email,
        name: "HR Manager",
        role: "hr",
        id: "hr-001",
      });
      setHrLoginOpen(false);
      navigate("/hr/dashboard");
    } else {
      setLoginError("Invalid HR credentials");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      {/* Heading */}
      <SectionTitle title="Employee Management App" />

      {/* Login Card */}
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

          {loginError && (
            <Typography
              color="error"
              variant="body2"
              align="center"
              sx={{ mt: 1 }}
            >
              {loginError}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#2a7b8bff",
              "&:hover": {
                bgcolor: "#22b7b7ff",
              },
            }}
          >
            Login
          </Button>
        </form>

        {/* Register Link */}
        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            Don't have an account?{" "}
            <Button onClick={() => navigate("/register")} size="small">
              Register here
            </Button>
          </Typography>
        </Box>

        {/* HR Login Button */}
        <Box mt={2} textAlign="center">
          <Button
            variant="outlined"
            onClick={() => setHrLoginOpen(true)}
            sx={{
              borderColor: "#2a7b8bff",
              color: "#2a7b8bff",
              "&:hover": {
                borderColor: "#22b7b7ff",
                color: "#22b7b7ff",
              },
            }}
          >
            HR Login
          </Button>
        </Box>
      </Paper>

      {/* HR Login Dialog */}
      <Dialog open={hrLoginOpen} onClose={() => setHrLoginOpen(false)}>
        <DialogTitle>HR Portal Login</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, minWidth: 300 }}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={hrCredentials.email}
              onChange={(e) =>
                setHrCredentials({ ...hrCredentials, email: e.target.value })
              }
              disabled
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={hrCredentials.password}
              onChange={(e) =>
                setHrCredentials({ ...hrCredentials, password: e.target.value })
              }
            />
            {loginError && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {loginError}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHrLoginOpen(false)}>Cancel</Button>
          <Button
            onClick={handleHrLogin}
            variant="contained"
            sx={{
              backgroundColor: "#2a7b8bff",
              "&:hover": {
                bgcolor: "#22b7b7ff",
              },
            }}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;
