// src/components/Navbar.js
import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Button,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear user data
    navigate("/"); // Redirect to home page
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        {/* Company Logo (Left) */}
        <Typography
          variant="h6"
          component={Link}
          to="/dashboard"
          sx={{ flexGrow: 1, textDecoration: "none", color: "#fff" }}
        >
          MyCompany
        </Typography>

        {/* Nav Links (Middle) */}
        {user && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button component={Link} to="/profile" sx={{ color: "#fff" }}>
              Profile
            </Button>
            <Button component={Link} to="/holidays" sx={{ color: "#fff" }}>
              Holidays
            </Button>
            <Button component={Link} to="/tax" sx={{ color: "#fff" }}>
              Tax
            </Button>
            <Button component={Link} to="/leave" sx={{ color: "#fff" }}>
              Leave
            </Button>
            <Button component={Link} to="/payroll" sx={{ color: "#fff" }}>
              Payroll
            </Button>
          </Box>
        )}

        {/* Avatar & Logout (Right) */}
        {user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 3 }}>
            <Avatar>{user.fullName?.charAt(0).toUpperCase()}</Avatar>
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
