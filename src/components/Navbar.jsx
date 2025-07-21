// src/components/Navbar.js
import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Avatar,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo1 from "../assets/logo1.png";

const navItems = [
  { name: "Holidays", path: "/holidays" },
  { name: "Leave Management", path: "/leave" },
  { name: "Tax Calculations", path: "/tax" },
  { name: "Payroll", path: "/payroll" },
];

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [avatarHover, setAvatarHover] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2a7b8bff" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img src={logo1} alt="Logo" style={{ height: 60 }} />
        </Box>

        {/* Middle: Nav Links */}
        {user && (
          <Box sx={{ display: "flex", gap: 8 }}>
            {navItems.map((item) => (
              <Typography
                key={item.name}
                component={Link}
                to={item.path}
                sx={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                  "&:hover": {
                    // textDecoration: "underline",
                    color: "#0c0c0cff",
                  },
                }}
              >
                {item.name}
              </Typography>
            ))}
          </Box>
        )}

        {/* Right: Avatar + Hover Menu */}
        {user && (
          <Box
            onMouseEnter={() => setAvatarHover(true)}
            onMouseLeave={() => setAvatarHover(false)}
            sx={{ position: "relative" }}
          >
            <IconButton>
              <Avatar sx={{ bgcolor: "#fff", color: "#1976d2" }}>
                {user.fullName?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>

            {avatarHover && (
              <Box
                sx={{
                  position: "absolute",
                  top: 40,
                  right: 0,
                  backgroundColor: "#333",
                  p: 1,
                  borderRadius: 1,
                  zIndex: 999,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  component={Link}
                  to="/profile"
                  sx={{
                    color: "#fff",
                    textDecoration: "none",
                    p: 1,
                    "&:hover": { color: "#90caf9" },
                  }}
                >
                  Profile
                </Typography>
                <Typography
                  onClick={handleLogout}
                  sx={{
                    color: "#fff",
                    p: 1,
                    cursor: "pointer",
                    "&:hover": { color: "#f44336" },
                  }}
                >
                  Logout
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
