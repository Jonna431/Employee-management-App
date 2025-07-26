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
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Reports", path: "/reports" },
  { name: "Leave Management", path: "/leaves" },
  { name: "Tax Calculations", path: "/tax" },
  { name: "Payroll", path: "/payroll" }
];

const Navbar = () => {
  const { user, } = useContext(AuthContext);
  const navigate = useNavigate();
  const [avatarHover, setAvatarHover] = useState(false);

  const handleLogout = () => {
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
          <Box sx={{ display: "flex", gap: 18,fontWeight:600 }}>
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                style={({ isActive }) => ({
                  textDecoration: "none",
                })}
              >
                {({ isActive }) => (
                  <Typography
                    sx={{
                      color: isActive ? "#dab708ff" : "#fff",
                      fontSize: "1rem",
                      fontWeight: isActive ? 700 : 500,
                      transition: "0.3s",
                      "&:hover": {
                        color: "#dab708ff",
                      },
                    }}
                  >
                    {item.name}
                  </Typography>
                )}
              </NavLink>
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
                  component={Link}
                  to='/login'
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
